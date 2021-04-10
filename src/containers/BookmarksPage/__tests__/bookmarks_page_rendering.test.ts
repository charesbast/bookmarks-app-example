import { RenderResult } from '@testing-library/react';

import BookmarksApi from 'src/api/BookmarksApi';
import { RoutePath } from 'src/types/routing.types';
import { mockedBookmarkList } from 'src/utils/testing/mocks/bookmarkMocks';
import { renderApp } from 'src/utils/testing/testRenderer';

const renderBookmarksPage = (): RenderResult => renderApp({
  route: RoutePath.Bookmarks,
});

const getBookmarksSpy = jest.spyOn(BookmarksApi, 'getBookmarks');

describe('Bookmarks page rendering tests', () => {
  beforeEach(() => {
    getBookmarksSpy.mockReturnValue(mockedBookmarkList);
  });

  describe('My bookmarks section', () => {
    it('Should display the section title', () => {
      const { getByRole } = renderBookmarksPage();
      expect(getByRole('heading', { name: 'My bookmarks' })).toBeInTheDocument();
    });

    it('Should display the common information of the all the bookmarks', () => {
      const { getByTestId } = renderBookmarksPage();

      mockedBookmarkList.forEach((bookmark) => {
        const titleContent = getByTestId(`bookmark-${bookmark.id}-title`);
        expect(titleContent).toHaveTextContent(bookmark.url);
        bookmark.keywords.forEach((keyword) => {
          expect(titleContent).toHaveTextContent(keyword);
        });

        const metadataContent = getByTestId(`bookmark-${bookmark.id}-metadata`);
        expect(metadataContent).toHaveTextContent(bookmark.title);
        expect(metadataContent).toHaveTextContent(bookmark.author);
        expect(metadataContent).toHaveTextContent(bookmark.createdAt);

        expect(getByTestId(`bookmark-${bookmark.id}-modifyBtn`)).toHaveTextContent('Modify');
        expect(getByTestId(`bookmark-${bookmark.id}-deleteBtn`)).toHaveTextContent('Delete');
      });
    });
  });

  describe('Selected bookmark section', () => {
    it('Should display the section title', () => {
      const { getByRole } = renderBookmarksPage();
      expect(getByRole('heading', { name: 'Selected bookmark' })).toBeInTheDocument();
    });

    it('Should render nothing when no list item has been clicked yet', () => {
      const { queryByTestId } = renderBookmarksPage();

      expect(queryByTestId('selectedBookmark')).not.toBeInTheDocument();
    });

    describe('When a bookmark from the list is clicked', () => {
      function clickOnBookmarkItem(bookmarkId: string) {
        return ({ getByTestId }: RenderResult) => getByTestId(`bookmark-${bookmarkId}`).click();
      }

      it('Should display the clicked bookmark complete data', () => {
        const clickedBookmark = mockedBookmarkList[2];
        const renderResult = renderBookmarksPage();
        const { getByTestId } = renderResult;

        clickOnBookmarkItem(clickedBookmark.id)(renderResult);

        expect(getByTestId('selectedBookmark')).toBeInTheDocument();
        expect(getByTestId('selectedBookmark-id')).toHaveTextContent(clickedBookmark.id);
        expect(getByTestId('selectedBookmark-url')).toHaveTextContent(clickedBookmark.url);
        expect(getByTestId('selectedBookmark-author')).toHaveTextContent(clickedBookmark.author);
        expect(getByTestId('selectedBookmark-title')).toHaveTextContent(clickedBookmark.title);
        expect(getByTestId('selectedBookmark-createdAt')).toHaveTextContent(clickedBookmark.createdAt);
        expect(getByTestId('selectedBookmark-width')).toHaveTextContent(clickedBookmark.width.toString());
        expect(getByTestId('selectedBookmark-height')).toHaveTextContent(clickedBookmark.height.toString());
        expect(getByTestId('selectedBookmark-keywords')).toHaveTextContent(clickedBookmark.keywords.join(', '));
      });
    });
  });
});
