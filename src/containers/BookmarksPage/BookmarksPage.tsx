import React, { FunctionComponent } from 'react';

import Bookmarks from 'src/components/Bookmarks/Bookmarks';
import { useBookmarks } from 'src/context/bookmarks/bookmarkContext';

import { Container, StyledPagination } from './BookmarksPage.styles';

const ITEMS_PER_PAGE = 3;

const BookmarksPage: FunctionComponent = () => {
  const { bookmarks } = useBookmarks();

  return (
    <Container>
      <h1>My bookmarks</h1>
      <Bookmarks bookmarks={bookmarks} />
      <StyledPagination
        count={bookmarks.length / ITEMS_PER_PAGE}
        showFirstButton
        showLastButton
      />
    </Container>
  );
};

export default BookmarksPage;
