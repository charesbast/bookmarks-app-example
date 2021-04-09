import { Bookmark } from 'src/types/bookmarks.types';
import { isBookmarks } from 'src/utils/runtime-validation/bookmarksValidation';

const BOOKMARKS_SESSION_STORAGE_KEY = 'my-bookmarks';

// TODO: mocked data to remove
const initialBookmarks: Bookmark[] = [
  {
    id: 'bookmark1',
    url: 'https://vimeo.com/33316741',
    author: 'C2C',
    title: 'F.U.Y.A',
    createdAt: new Date().toISOString(),
    width: 200,
    height: 200,
    duration: 340,
    keywords: ['techno', 'live', 'trendy'],
  },
  {
    id: 'bookmark2',
    url: 'https://vimeo.com/33316742',
    author: 'C2C',
    title: 'F.U.Y.A',
    createdAt: new Date().toISOString(),
    width: 200,
    height: 200,
    duration: 340,
    keywords: ['techno', 'concert'],
  },
  {
    id: 'bookmark3',
    url: 'https://vimeo.com/33316743',
    author: 'C2C',
    title: 'F.U.Y.A',
    createdAt: new Date().toISOString(),
    width: 200,
    height: 200,
    duration: 340,
    keywords: ['video', 'film', 'français'],
  },
  {
    id: 'bookmark4',
    url: 'https://vimeo.com/33316744',
    author: 'C2C',
    title: 'F.U.Y.A',
    createdAt: new Date().toISOString(),
    width: 200,
    height: 200,
    duration: 340,
    keywords: ['série', 'US', 'comédie'],
  },
];

sessionStorage.setItem(BOOKMARKS_SESSION_STORAGE_KEY, JSON.stringify(initialBookmarks));

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
