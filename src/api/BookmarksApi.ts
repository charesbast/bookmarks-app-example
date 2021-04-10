import { Bookmark } from 'src/types/bookmarks.types';
import { isBookmarks } from 'src/utils/runtime-validation/bookmarksValidation';
import { mockedBookmarkList } from 'src/utils/testing/mocks/bookmarkMocks';

const BOOKMARKS_SESSION_STORAGE_KEY = 'my-bookmarks';

/* TODO: to remove */
sessionStorage.setItem(BOOKMARKS_SESSION_STORAGE_KEY, JSON.stringify(mockedBookmarkList));

function getBookmarks(): Bookmark[] {
  const rawStorageData = sessionStorage.getItem(BOOKMARKS_SESSION_STORAGE_KEY);
  const storageData = rawStorageData
    ? JSON.parse(rawStorageData)
    : [];

  if (!isBookmarks(storageData)) {
    /* TODO log error on Sentry or equivalent */
    sessionStorage.removeItem(BOOKMARKS_SESSION_STORAGE_KEY);
    return [];
  }

  return storageData;
}

function saveBookmarks(bookmarks: Bookmark[]): void {
  sessionStorage.setItem(BOOKMARKS_SESSION_STORAGE_KEY, JSON.stringify(bookmarks));
}

const BookmarksApi = {
  getBookmarks,
  saveBookmarks,
};

export default BookmarksApi;
