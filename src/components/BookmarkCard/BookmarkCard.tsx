import React, { FunctionComponent } from 'react';

import { Bookmark } from 'src/types/bookmarks.types';

import {
  Container,
  Value,
} from './BookmarkCard.styles';

interface Props {
  className?: string;
  dataTestId?: string;
  bookmark: Bookmark;
  showKeywords?: boolean;
}

const BookmarkCard: FunctionComponent<Props> = ({
  className,
  dataTestId,
  bookmark,
  showKeywords = true,
}) => {
  const bookmarkKeys = Object.keys(bookmark) as Array<keyof Bookmark>;

  return (
    <Container
      className={className}
      data-testid={dataTestId}
    >
      {bookmarkKeys.map((key) => {
        const keyValue = bookmark[key];
        if (key === 'keywords' && !showKeywords) {
          return null;
        }
        return (
          <Value
            key={key}
            data-testid={`${dataTestId}-${key}`}
          >
            <b>{key}</b>
            {': '}
            {Array.isArray(keyValue)
              ? keyValue.join(', ')
              : keyValue}
          </Value>
        );
      })}
    </Container>
  );
};

export default BookmarkCard;
