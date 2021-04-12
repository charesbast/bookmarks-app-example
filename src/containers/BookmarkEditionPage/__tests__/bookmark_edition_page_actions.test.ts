import { RenderResult, screen } from '@testing-library/react';

import BookmarksApi from 'src/api/BookmarksApi';
import { RoutePath } from 'src/types/routing.types';
import { mockedBookmarkList } from 'src/utils/testing/mocks/bookmarkMocks';
import { renderApp } from 'src/utils/testing/testRenderer';

const renderEditionPage = (bookmarkId: string): RenderResult => renderApp({
  route: RoutePath.BookmarkEdition.replace(':bookmarkId', bookmarkId),
});

const getBookmarksSpy = jest.spyOn(BookmarksApi, 'getBookmarks');

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
});
