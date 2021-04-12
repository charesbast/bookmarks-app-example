import React, { FunctionComponent, useState } from 'react';

import AddBookmarkForm from 'src/components/AddBookmarkForm/AddBookmarkForm';
import BookmarkCard from 'src/components/BookmarkCard/BookmarkCard';
import Bookmarks from 'src/components/Bookmarks/Bookmarks';
import { useBookmarks } from 'src/context/bookmarks/bookmarkContext';
import { Bookmark } from 'src/types/bookmarks.types';

import {
  Container,
  MainSection,
  StyledPagination,
  LeftPanel,
  RightPanel,
} from './BookmarksPage.styles';

const ITEMS_PER_PAGE = 3;

const BookmarksPage: FunctionComponent = () => {
  const {
    bookmarks,
    addBookmark,
    deleteBookmark,
  } = useBookmarks();
  const [selectedBookmark, selectBookmark] = useState<Bookmark | null>(null);

  const nbPages = Math.ceil(bookmarks.length / ITEMS_PER_PAGE);

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
            onDeleteBookmark={deleteBookmark}
          />
          {nbPages > 1 && (
            <StyledPagination
              count={nbPages}
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
};

export default BookmarksPage;
