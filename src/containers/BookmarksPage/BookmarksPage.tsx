import React, { FunctionComponent, useState } from 'react';

import AddBookmarkForm from 'src/components/AddBookmarkForm/AddBookmarkForm';
import BookmarkCard from 'src/components/BookmarkCard/BookmarkCard';
import Bookmarks from 'src/components/Bookmarks/Bookmarks';
import { useBookmarks, usePaginatedBookmarks } from 'src/context/bookmarks/bookmarkContext';
import { Bookmark } from 'src/types/bookmarks.types';

import {
  Container,
  MainSection,
  StyledPagination,
  LeftPanel,
  RightPanel,
} from './BookmarksPage.styles';

export const ITEMS_PER_PAGE = 3;

const BookmarksPage: FunctionComponent = () => {
  const {
    bookmarks,
    currentPage,
    nbPages,
    selectPage,
  } = usePaginatedBookmarks(1, ITEMS_PER_PAGE);
  const {
    addBookmark,
    deleteBookmark,
  } = useBookmarks();
  const [selectedBookmark, selectBookmark] = useState<Bookmark | null>(null);

  return (
    <Container>
      <h1>Add a bookmark</h1>
      <AddBookmarkForm onSubmit={addBookmark} />

      <MainSection>
        <LeftPanel>
          <h1>My bookmarks</h1>

          <Bookmarks
            bookmarks={bookmarks}
            onBookmarkClicked={selectBookmark}
            onDeleteBookmark={onDeleteBookmark}
          />
          {nbPages > 1 && (
            <StyledPagination
              count={nbPages}
              onChange={(_, newPage) => selectPage(newPage)}
              showFirstButton
              showLastButton
            />
          )}
        </LeftPanel>

        <RightPanel>
          <h1>Selected bookmark</h1>

          {selectedBookmark && (
            <BookmarkCard
              dataTestId="selectedBookmark"
              bookmark={selectedBookmark}
            />
          )}
        </RightPanel>
      </MainSection>
    </Container>
  );

  function onDeleteBookmark(id: string): void {
    if (bookmarks.length > 1) {
      deleteBookmark(id);
    } else {
      // last item of that page, going to previous page (if possible) to display some bookmarks
      deleteBookmark(id);
      if (currentPage > 1) {
        selectPage(currentPage - 1);
      }
    }
  }
};

export default BookmarksPage;
