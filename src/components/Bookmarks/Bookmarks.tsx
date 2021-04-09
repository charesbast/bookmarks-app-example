import React, { FunctionComponent } from 'react';

import {
  Container,
  BookmarkListItem,
  Url,
  Metadata,
  Toolbar,
  ModifyButton,
  DeleteButton,
} from 'src/components/Bookmarks/Bookmarks.styles';
import { Bookmark } from 'src/types/bookmarks.types';

interface Props {
  className?: string;
  bookmarks: Bookmark[];
}

const Bookmarks: FunctionComponent<Props> = ({
  className,
  bookmarks,
  children,
}) => (
  <Container className={className}>
    {bookmarks.map((bookmark) => (
      <BookmarkListItem key={bookmark.id}>
        <Url>{bookmark.url}</Url>
        <Metadata>
          {bookmark.title}
          {', '}
          {bookmark.author}
          {', '}
          {bookmark.createdAt}
        </Metadata>
        <Toolbar>
          <ModifyButton type="button">Modify</ModifyButton>
          <DeleteButton type="button">Delete</DeleteButton>
        </Toolbar>
      </BookmarkListItem>
    ))}
    {children}
  </Container>
);

export default Bookmarks;
