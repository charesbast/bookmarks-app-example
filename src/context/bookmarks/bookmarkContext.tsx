import React, {
  createContext, FunctionComponent,
  useContext,
  useMemo,
  useState,
} from 'react';

import BookmarksApi from 'src/api/BookmarksApi';
import { Bookmark } from 'src/types/bookmarks.types';

export interface UseBookmark {
  bookmarks: Bookmark[];
  addBookmark: (newBookmark: Bookmark) => void;
  updateBookmark: (bookmarkId: string, newBookmark: Bookmark) => void;
  deleteBookmark: (id: string) => void;
}

const BookmarkContext = createContext<UseBookmark | undefined>(undefined);

export const BookmarksProvider: FunctionComponent = (props) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(BookmarksApi.getBookmarks());

  const hookValue: UseBookmark = useMemo(() => ({
    bookmarks,
    addBookmark,
    updateBookmark,
    deleteBookmark,
  }), [bookmarks]);

  return (
    <BookmarkContext.Provider value={hookValue} {...props} />
  );

  function addBookmark(newBookmark: Bookmark): void {
    updateBookmarks([newBookmark, ...bookmarks]);
  }

  function deleteBookmark(id: string): void {
    const newBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
    updateBookmarks(newBookmarks);
  }

  function updateBookmark(bookmarkId: string, newBookmark: Bookmark): void {
    const bookmarkIndex = bookmarks.findIndex(({ id }) => id === bookmarkId);
    if (bookmarkIndex === -1) {
      return;
    }

    const newBookmarks = [...bookmarks];
    newBookmarks[bookmarkIndex] = newBookmark;
    updateBookmarks(newBookmarks);
  }

  function updateBookmarks(updatedBookmarks: Bookmark[]): void {
    BookmarksApi.saveBookmarks(updatedBookmarks);
    setBookmarks(updatedBookmarks);
  }
};

/*
* Hooks
* */

export function useBookmarks(): UseBookmark {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return context;
}

export function useBookmark(id: string): Bookmark | undefined {
  const { bookmarks } = useBookmarks();
  return bookmarks.find((bookmark) => bookmark.id === id);
}
