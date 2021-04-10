import React, { FunctionComponent, useState } from 'react';

import BookmarkCard from 'src/components/BookmarkCard/BookmarkCard';
import Bookmarks from 'src/components/Bookmarks/Bookmarks';
import { useBookmarks } from 'src/context/bookmarks/bookmarkContext';
import { Bookmark } from 'src/types/bookmarks.types';

import {
  Container,
  StyledPagination,
  BookmarksContainer,
  SelectedBookmarkContainer,
} from './BookmarksPage.styles';

const ITEMS_PER_PAGE = 3;

const BookmarksPage: FunctionComponent = () => {
  const { bookmarks } = useBookmarks();
  const [selectedBookmark, selectBookmark] = useState<Bookmark | null>(null);

  const nbPages = Math.ceil(bookmarks.length / ITEMS_PER_PAGE);

  return (
    <Container>
      <BookmarksContainer>
        <h1>My bookmarks</h1>

        <Bookmarks
          bookmarks={bookmarks}
          onBookmarkClicked={selectBookmark}
        />
        {nbPages > 1 && (
          <StyledPagination
            count={nbPages}
            showFirstButton
            showLastButton
          />
        )}
      </BookmarksContainer>

      <SelectedBookmarkContainer>
        <h1>Selected bookmark</h1>

        {selectedBookmark && (
          <BookmarkCard
            dataTestId="selectedBookmark"
            bookmark={selectedBookmark}
          />
        )}
      </SelectedBookmarkContainer>
    </Container>
  );
};

export default BookmarksPage;
