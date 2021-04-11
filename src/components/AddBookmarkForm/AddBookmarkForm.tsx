import React, { FunctionComponent, useState } from 'react';
import { useAsyncCallback } from 'react-async-hook';

import BookmarksApi from 'src/api/BookmarksApi';
import { Bookmark } from 'src/types/bookmarks.types';

import {
  Form,
  TextInput,
  ErrorMsg,
} from './AddBookmarkForm.styles';

interface Props {
  className?: string;
  onSubmit: (newBookmark: Bookmark) => void;
}

const AddBookmarkForm: FunctionComponent<Props> = ({
  className,
  onSubmit,
}) => {
  const [url, setUrl] = useState('');
  const asyncOnFormSubmit = useAsyncCallback(onFormSubmit);

  return (
    <Form
      className={className}
      onSubmit={asyncOnFormSubmit.execute}
    >
      <TextInput
        data-testid="addBookmarkForm-textInput"
        type="text"
        placeholder="Type the bookmark url here"
        value={url}
        onChange={onInputChange}
      />
      <button
        data-testid="addBookmarkForm-submitBtn"
        type="submit"
        disabled={
          url.length === 0
          || asyncOnFormSubmit.loading
        }
      >
        {asyncOnFormSubmit.loading
          ? 'Fetching bookmark metadata...'
          : 'Submit'}
      </button>
      {asyncOnFormSubmit.error && (
        <ErrorMsg data-testid="addBookmarkForm-error">{asyncOnFormSubmit.error.message}</ErrorMsg>
      )}
    </Form>
  );

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setUrl(e.target.value);
  }

  async function onFormSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const createdBookmark = await BookmarksApi.createBookmark(url);
    onSubmit(createdBookmark);
    setUrl('');
  }
};

export default AddBookmarkForm;
