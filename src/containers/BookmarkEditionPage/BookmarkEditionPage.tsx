import React, { FunctionComponent } from 'react';
import { useParams, Redirect, Link } from 'react-router-dom';

import BookmarkCard from 'src/components/BookmarkCard/BookmarkCard';
import BookmarkKeywordsForm from 'src/components/BookmarkKeywordsForm/BookmarkKeywordsForm';
import { useBookmark, useBookmarks } from 'src/context/bookmarks/bookmarkContext';
import { RoutePath } from 'src/types/routing.types';

import {
  Container,
  Content,
  LeftPanel,
  RightPanel,
} from './BookmarkEditionPage.styles';

interface RouteParams {
  bookmarkId: string;
}
const BookmarkEditionPage: FunctionComponent = () => {
  const { bookmarkId } = useParams<RouteParams>();
  const { updateBookmark } = useBookmarks();
  const bookmark = useBookmark(bookmarkId);

  if (!bookmark) {
    return <Redirect to={RoutePath.Bookmarks} />;
  }

  return (
    <Container>
      <h1>Bookmark edition</h1>
      <Link to={RoutePath.Bookmarks}>Go back</Link>

      <Content>
        <LeftPanel>
          <h2>Keywords edition</h2>
          <BookmarkKeywordsForm
            initialValues={bookmark.keywords}
            onSubmit={onKeywordsChanged}
          />
        </LeftPanel>

        <RightPanel>
          <h2>Bookmark data (not editable)</h2>
          <BookmarkCard
            bookmark={bookmark}
            showKeywords={false}
          />
        </RightPanel>
      </Content>
    </Container>
  );

  function onKeywordsChanged(keywords: string[]): void {
    if (bookmark) {
      updateBookmark(bookmark.id, {
        ...bookmark,
        keywords,
      });

      alert('Bookmark updated !');
    }
  }
};

export default BookmarkEditionPage;
