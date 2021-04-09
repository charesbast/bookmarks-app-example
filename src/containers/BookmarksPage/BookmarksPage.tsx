import React, { FunctionComponent } from 'react';

import Bookmarks from 'src/components/Bookmarks/Bookmarks';
import { useBookmarks } from 'src/context/bookmarks/bookmarkContext';

import { Container } from './BookmarksPage.styles';

const BookmarksPage: FunctionComponent = () => {
  const { bookmarks } = useBookmarks();

  return (
    <Container>
      <h1>My bookmarks</h1>
      <Bookmarks bookmarks={bookmarks} />
    </Container>
  );
};

export default BookmarksPage;
