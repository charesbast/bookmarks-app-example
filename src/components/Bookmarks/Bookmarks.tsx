import React, { FunctionComponent } from 'react';

import {
  Container,
  BookmarkListItem,
  Title,
  Url,
  Keyword,
  Metadata,
  Toolbar,
  ModifyButton,
  DeleteButton,
} from 'src/components/Bookmarks/Bookmarks.styles';
import { Bookmark } from 'src/types/bookmarks.types';
import { RoutePath } from 'src/types/routing.types';

interface Props {
  className?: string;
  bookmarks: Bookmark[];
  onBookmarkClicked: (bookmark: Bookmark) => void;
  onDeleteBookmark: (bookmarkId: string) => void;
}

const Bookmarks: FunctionComponent<Props> = ({
  className,
  bookmarks,
  onBookmarkClicked,
  onDeleteBookmark,
}) => {
  return (
    <Container className={className}>
      {bookmarks.length === 0 && (
        <p>No bookmarks saved yet !</p>
      )}

      {bookmarks.map((bookmark) => (
        <BookmarkListItem
          data-testid={`bookmark-${bookmark.id}`}
          key={bookmark.id}
          onClick={onListItemClicked(bookmark)}
        >
          <Title data-testid={`bookmark-${bookmark.id}-title`}>
            <Url>{bookmark.url}</Url>
            {bookmark.keywords.map((keyword, idx) => (
              <Keyword
                key={idx}
                label={keyword}
              />
            ))}
          </Title>

          <Metadata data-testid={`bookmark-${bookmark.id}-metadata`}>
            {bookmark.title}
            {', '}
            {bookmark.author}
            {', '}
            {bookmark.createdAt}
          </Metadata>

          <Toolbar>
            <ModifyButton
              data-testid={`bookmark-${bookmark.id}-modifyBtn`}
              to={RoutePath.BookmarkEdition.replace(':bookmarkId', bookmark.id)}
            >
              Modify
            </ModifyButton>
            <DeleteButton
              data-testid={`bookmark-${bookmark.id}-deleteBtn`}
              type="button"
              onClick={onDeleteButtonClicked(bookmark.id)}
            >
              Delete
            </DeleteButton>
          </Toolbar>
        </BookmarkListItem>
      ))}
    </Container>
  );

  function onDeleteButtonClicked(bookmarkId: string) {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onDeleteBookmark(bookmarkId);
    };
  }

  function onListItemClicked(bookmark: Bookmark) {
    return () => onBookmarkClicked(bookmark);
  }
};

export default Bookmarks;
