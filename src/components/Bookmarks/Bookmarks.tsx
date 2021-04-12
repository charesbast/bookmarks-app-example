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
}

const Bookmarks: FunctionComponent<Props> = ({
  className,
  bookmarks,
  onBookmarkClicked,
}) => {
  return (
    <Container className={className}>
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
            >
              Delete
            </DeleteButton>
          </Toolbar>
        </BookmarkListItem>
      ))}
    </Container>
  );

  function onListItemClicked(bookmark: Bookmark) {
    return () => onBookmarkClicked(bookmark);
  }
};

export default Bookmarks;
