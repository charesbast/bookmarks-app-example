import { RenderResult, screen, fireEvent } from '@testing-library/react';

import BookmarksApi from 'src/api/BookmarksApi';
import { RoutePath } from 'src/types/routing.types';
import { mockedBookmarkList } from 'src/utils/testing/mocks/bookmarkMocks';
import { renderApp } from 'src/utils/testing/testRenderer';

const renderEditionPage = (bookmarkId: string): RenderResult => renderApp({
  route: RoutePath.BookmarkEdition.replace(':bookmarkId', bookmarkId),
});

const getBookmarksSpy = jest.spyOn(BookmarksApi, 'getBookmarks');
const saveBookmarksSpy = jest.spyOn(BookmarksApi, 'saveBookmarks');

window.alert = jest.fn();

describe('Bookmark edition page action tests', () => {
  beforeEach(() => {
    getBookmarksSpy.mockReturnValue(mockedBookmarkList);
  });

  describe('When clicking on the "Go back" button', () => {
    function clickOnGoBackBtn(): void {
      screen.getByRole('link', { name: 'Go back' }).click();
    }

    it('Should redirect to the bookmarks page', () => {
      renderEditionPage(mockedBookmarkList[0].id);

      clickOnGoBackBtn();

      expect(screen.getByRole('heading', { name: 'My bookmarks' })).toBeInTheDocument();
    });
  });

  describe('Editing bookmark keywords', () => {
    function submitNewKeyword(value: string): void {
      fireEvent.change(
        screen.getByPlaceholderText('Type a new keyword'),
        { target: { value } },
      );
      screen.getByRole('button', { name: 'Add' }).click();
    }

    function removeKeyword(keyword: string): void {
      screen.getByTestId(`keyword-${keyword}-removeBtn`).click();
    }

    function submitForm(): void {
      screen.getByRole('button', { name: 'Submit changes' }).click();
    }

    it('Should call BookmarksApi.saveBookmarks with the correct data', () => {
      const editedBookmark = mockedBookmarkList[2];
      renderEditionPage(editedBookmark.id);

      submitNewKeyword('newKeyword');
      removeKeyword(editedBookmark.keywords[1]);
      submitForm();

      expect(saveBookmarksSpy).toHaveBeenCalledWith([
        mockedBookmarkList[0],
        mockedBookmarkList[1],
        {
          ...mockedBookmarkList[2],
          keywords: ['video', 'french', 'newKeyword'],
        },
        mockedBookmarkList[3],
      ]);
    });
  });
});
