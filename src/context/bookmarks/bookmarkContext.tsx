import React, {
  createContext, FunctionComponent,
  useContext,
  useMemo,
  useState,
} from 'react';

import BookmarksApi from 'src/api/BookmarksApi';
import { Bookmark } from 'src/types/bookmarks.types';

export interface UseBookmarks {
  allBookmarks: Bookmark[];
  addBookmark: (newBookmark: Bookmark) => void;
  updateBookmark: (bookmarkId: string, newBookmark: Bookmark) => void;
  deleteBookmark: (id: string) => void;
}

const BookmarkContext = createContext<UseBookmarks | undefined>(undefined);

export const BookmarksProvider: FunctionComponent = (props) => {
  const [allBookmarks, setBookmarks] = useState<Bookmark[]>(BookmarksApi.getBookmarks());

  const hookValue: UseBookmarks = useMemo(() => ({
    allBookmarks,
    addBookmark,
    updateBookmark,
    deleteBookmark,
  }), [allBookmarks]);

  return (
    <BookmarkContext.Provider value={hookValue} {...props} />
  );

  function addBookmark(newBookmark: Bookmark): void {
    updateBookmarks([newBookmark, ...allBookmarks]);
  }

  function deleteBookmark(id: string): void {
    const newBookmarks = allBookmarks.filter((bookmark) => bookmark.id !== id);
    updateBookmarks(newBookmarks);
  }

  function updateBookmark(bookmarkId: string, newBookmark: Bookmark): void {
    const bookmarkIndex = allBookmarks.findIndex(({ id }) => id === bookmarkId);
    if (bookmarkIndex === -1) {
      return;
    }

    const newBookmarks = [...allBookmarks];
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

export function useBookmarks(): UseBookmarks {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return context;
}

interface UsePaginatedBookmarks {
  bookmarks: Bookmark[];
  nbPages: number;
  currentPage: number;
  selectPage: (page: number) => void;
}

/*
 * Important note:
 * I guess that pagination was just a pretext to code some logic because in that exercice
 * all the data is stored and manipulated in the front; in a real project pagination is used to avoid
 * requested huge lists from the backend database -> so here it is not useful
 */
export function usePaginatedBookmarks(initialPage: number, itemsPerPage: number): UsePaginatedBookmarks {
  const { allBookmarks } = useBookmarks();
  const [currentPage, setCurrentPage] = useState(initialPage);

  const firstIndex = (currentPage - 1) * itemsPerPage;
  return {
    bookmarks: allBookmarks.slice(firstIndex, firstIndex + itemsPerPage),
    nbPages: Math.ceil(allBookmarks.length / itemsPerPage),
    currentPage,
    selectPage: setCurrentPage,
  };
}

export function useBookmark(id: string): Bookmark | undefined {
  const { allBookmarks } = useBookmarks();
  return allBookmarks.find((bookmark) => bookmark.id === id);
}
