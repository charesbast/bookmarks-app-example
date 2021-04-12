import { RenderResult, screen } from '@testing-library/react';

import BookmarksApi from 'src/api/BookmarksApi';
import { RoutePath } from 'src/types/routing.types';
import { mockedBookmarkList } from 'src/utils/testing/mocks/bookmarkMocks';
import { renderApp } from 'src/utils/testing/testRenderer';

const renderEditionPage = (bookmarkId: string): RenderResult => renderApp({
  route: RoutePath.BookmarkEdition.replace(':bookmarkId', bookmarkId),
});

const getBookmarksSpy = jest.spyOn(BookmarksApi, 'getBookmarks');

describe('Bookmark edition page rendering tests', () => {
  beforeEach(() => {
    getBookmarksSpy.mockReturnValue(mockedBookmarkList);
  });

  it('Should redirect to the bookmarks page when the bookmark is not found', () => {
    renderEditionPage('unknownBookmarkId');
    expect(screen.queryByRole('heading', { name: 'Bookmark edition' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'My bookmarks' })).toBeInTheDocument();
  });

  describe('When the bookmark id is found', () => {
    const editedBookmark = mockedBookmarkList[1];
    const bookmarkId = editedBookmark.id;

    it('Should render the page title', () => {
      renderEditionPage(bookmarkId);

      expect(screen.queryByRole('heading', { name: 'Bookmark edition' })).toBeInTheDocument();
    });

    it('Should render an input to add a new keyword', () => {
      renderEditionPage(bookmarkId);

      expect(screen.getByPlaceholderText('Type a new keyword')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
    });

    it('Should render the current bookmark keywords', () => {
      renderEditionPage(bookmarkId);

      editedBookmark.keywords.forEach((keyword) => {
        expect(screen.getByTestId(`keyword-${keyword}`)).toHaveTextContent(keyword);
      });
    });

    it('Should render a submit button for the form', () => {
      renderEditionPage(bookmarkId);
      expect(screen.getByRole('button', { name: 'Submit changes' })).toBeInTheDocument();
    });
  });
});
