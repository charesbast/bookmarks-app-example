import { Bookmark } from 'src/types/bookmarks.types';
import { isBookmark, isBookmarks } from 'src/utils/runtime-validation/bookmarksValidation';
import { mockedBookmarkList } from 'src/utils/testing/mocks/bookmarkMocks';

export const BOOKMARKS_SESSION_STORAGE_KEY = 'my-bookmarks';
export const NO_EMBED_BASE_URL = 'https://noembed.com/embed';

/* TODO: to remove */
sessionStorage.setItem(BOOKMARKS_SESSION_STORAGE_KEY, JSON.stringify(mockedBookmarkList));

function getSessionStorageBookmarks(): unknown {
  const rawStorageData = sessionStorage.getItem(BOOKMARKS_SESSION_STORAGE_KEY);
  if (!rawStorageData) {
    return [];
  }
  try {
    return JSON.parse(rawStorageData);
  } catch {
    sessionStorage.removeItem(BOOKMARKS_SESSION_STORAGE_KEY);
    return [];
  }
}

function getBookmarks(): Bookmark[] {
  const sessionStorageBookmarks = getSessionStorageBookmarks();

  if (!isBookmarks(sessionStorageBookmarks)) {
    /* TODO log error on Sentry or equivalent */
    sessionStorage.removeItem(BOOKMARKS_SESSION_STORAGE_KEY);
    return [];
  }

  return sessionStorageBookmarks;
}

function saveBookmarks(bookmarks: Bookmark[]): void {
  sessionStorage.setItem(BOOKMARKS_SESSION_STORAGE_KEY, JSON.stringify(bookmarks));
}

export const INCOMPLETE_BOOKMARK_ERROR = `Malformed bookmark: some metadata are missing, possible reasons:
  - at the moment only urls from Vimo and Flickr are officially supported
  - noembed does not fetch correctly those metadata anymore`;

async function createBookmark(url: string): Promise<Bookmark> {
  const response = await fetch(`${NO_EMBED_BASE_URL}?url=${encodeURIComponent(url)}`);
  const metadata = await response.json();
  if (metadata.error) {
    throw new Error(metadata.error);
  }

  const maybeBookmark: unknown = {
    // quick trick just to get a unique value
    id: new Date().getTime().toString(),
    url: metadata.url,
    title: metadata.title,
    author: metadata.author_name,
    createdAt: metadata.upload_date,
    width: metadata.width,
    height: metadata.height,
    duration: metadata.duration,
    keywords: [],
  };

  if (!isBookmark(maybeBookmark)) {
    // That message is not really relevant for the user, in a real project we would log it then
    // display something else to the user (he should not be aware of noembed)
    throw new Error(INCOMPLETE_BOOKMARK_ERROR);
  }

  return maybeBookmark;
}

const BookmarksApi = {
  getBookmarks,
  saveBookmarks,
  createBookmark,
};

export default BookmarksApi;
