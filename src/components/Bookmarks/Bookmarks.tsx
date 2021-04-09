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

interface Props {
  className?: string;
  bookmarks: Bookmark[];
}

const Bookmarks: FunctionComponent<Props> = ({
  className,
  bookmarks,
}) => (
  <Container className={className}>
    {bookmarks.map((bookmark) => (
      <BookmarkListItem key={bookmark.id}>
        <Title>
          <Url>{bookmark.url}</Url>
          {bookmark.keywords.map((keyword, idx) => (
            <Keyword key={idx}>{keyword}</Keyword>
          ))}
        </Title>

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
  </Container>
);

export default Bookmarks;
