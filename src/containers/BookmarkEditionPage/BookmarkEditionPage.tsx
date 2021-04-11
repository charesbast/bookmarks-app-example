import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router';

import { Container } from './BookmarkEditionPage.styles';

interface RouteParams {
  bookmarkId: string;
}
const BookmarkEditionPage: FunctionComponent = () => {
  const { bookmarkId } = useParams<RouteParams>();

  return (
    <Container>
      <h1>Bookmark edition</h1>

      Edition page for bookmark with id:
      {' '}
      {bookmarkId}
    </Container>
  );
};

export default BookmarkEditionPage;
