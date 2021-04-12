import React, { FunctionComponent } from 'react';
import { useParams, Link, Redirect } from 'react-router-dom';

import { useBookmark } from 'src/context/bookmarks/bookmarkContext';
import { RoutePath } from 'src/types/routing.types';

import { Container } from './BookmarkEditionPage.styles';

interface RouteParams {
  bookmarkId: string;
}
const BookmarkEditionPage: FunctionComponent = () => {
  const { bookmarkId } = useParams<RouteParams>();
  const bookmark = useBookmark(bookmarkId);

  if (!bookmark) {
    return <Redirect to={RoutePath.Bookmarks} />;
  }

  return (
    <Container>
      <h1>Bookmark edition</h1>
      <h3>
        <Link to={RoutePath.Bookmarks}>Go back</Link>
      </h3>

      Edition page for bookmark with id:
      {' '}
      {bookmarkId}
    </Container>
  );
};

export default BookmarkEditionPage;
