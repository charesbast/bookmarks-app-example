import React, { FunctionComponent, useState } from 'react';

import {
  Container,
  PendingKeywords,
  PendingKeyword,
} from './BookmarkKeywordsForm.styles';

interface Props {
  className?: string;
  initialValues: string[];
  onSubmit: (keywords: string[]) => void;
}

const BookmarkKeywordsForm: FunctionComponent<Props> = ({
  className,
  initialValues,
  onSubmit,
}) => {
  const [keywords, setKeywords] = useState<string[]>(initialValues);
  const [newKeyword, setNewKeyword] = useState('');
  return (
    <Container className={className}>
      <form onSubmit={onFormSubmit}>
        <div>
          <input
            placeholder="Type a new keyword"
            value={newKeyword}
            onChange={onInputChange}
          />
          <button
            type="button"
            onClick={addNewKeyword}
            disabled={newKeyword.length === 0}
          >
            Add
          </button>
        </div>

        <h3>Pending keywords:</h3>
        {keywords.length === 0 && (
          <p>No keywords</p>
        )}
        <PendingKeywords>
          {keywords.map((keyword) => (
            <PendingKeyword
              dataTestId={`keyword-${keyword}`}
              key={keyword}
              label={keyword}
            >
              <button
                data-testid={`keyword-${keyword}-removeBtn`}
                type="button"
                onClick={removeKeyword(keyword)}
              >
                X
              </button>
            </PendingKeyword>
          ))}
        </PendingKeywords>

        <button type="submit">Submit changes</button>
      </form>
    </Container>
  );

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setNewKeyword(e.target.value);
  }

  function addNewKeyword(): void {
    const keywordAlreadyExists = !!keywords.find((value) => value === newKeyword);
    return keywordAlreadyExists
      ? setNewKeyword('')
      : setKeywords([...keywords, newKeyword]);
  }

  function removeKeyword(value: string) {
    return () => setKeywords(
      keywords.filter((keyword) => keyword !== value),
    );
  }

  function onFormSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    onSubmit(keywords);
    setNewKeyword('');
  }
};

export default BookmarkKeywordsForm;
