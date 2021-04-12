import { RenderResult, screen } from '@testing-library/react';

import BookmarksApi from 'src/api/BookmarksApi';
import { ITEMS_PER_PAGE } from 'src/containers/BookmarksPage/BookmarksPage';
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

  describe('Add a bookmark section', () => {
    it('Should display the section title', () => {
      const { getByRole } = renderBookmarksPage();
      expect(getByRole('heading', { name: 'Add a bookmark' })).toBeInTheDocument();
    });

    it('Should render a text input empty by default', () => {
      const { getByTestId } = renderBookmarksPage();
      const textInput = getByTestId('addBookmarkForm-textInput');
      expect(textInput).toBeInTheDocument();
      expect(textInput).toHaveAttribute('type', 'text');
      expect(textInput).toHaveAttribute('placeholder', 'Type the bookmark url here');
      expect(textInput).toHaveAttribute('value', '');
    });

    it('Should render a disabled submit button by default', () => {
      const { getByTestId } = renderBookmarksPage();
      const submitBtn = getByTestId('addBookmarkForm-submitBtn');
      expect(submitBtn).toBeInTheDocument();
      expect(submitBtn).toHaveAttribute('type', 'submit');
      expect(submitBtn).toHaveAttribute('disabled');
      expect(submitBtn).toHaveTextContent('Submit');
    });
  });

  describe('My bookmarks section', () => {
    it('Should display the section title', () => {
      const { getByRole } = renderBookmarksPage();
      expect(getByRole('heading', { name: 'My bookmarks' })).toBeInTheDocument();
    });

    it('Should display the common information of the bookmarks of the first page', () => {
      const { getByTestId } = renderBookmarksPage();

      mockedBookmarkList
        .slice(0, ITEMS_PER_PAGE)
        .forEach((bookmark) => {
          const titleContent = getByTestId(`bookmark-${bookmark.id}-title`);
          expect(titleContent).toHaveTextContent(bookmark.url);
          bookmark.keywords.forEach((keyword) => {
            expect(titleContent).toHaveTextContent(keyword);
          });

          const metadataContent = getByTestId(`bookmark-${bookmark.id}-metadata`);
          expect(metadataContent).toHaveTextContent(bookmark.title);
          expect(metadataContent).toHaveTextContent(bookmark.author);
          expect(metadataContent).toHaveTextContent(bookmark.createdAt ?? '');

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
      function clickOnBookmarkItem(bookmarkId: string): void {
        screen.getByTestId(`bookmark-${bookmarkId}`).click();
      }

      it('Should display the clicked bookmark complete data', () => {
        const clickedBookmark = mockedBookmarkList[2];
        renderBookmarksPage();

        clickOnBookmarkItem(clickedBookmark.id);

        expect(screen.getByTestId('selectedBookmark')).toBeInTheDocument();
        expect(screen.getByTestId('selectedBookmark-id')).toHaveTextContent(clickedBookmark.id);
        expect(screen.getByTestId('selectedBookmark-url')).toHaveTextContent(clickedBookmark.url);
        expect(screen.getByTestId('selectedBookmark-author')).toHaveTextContent(clickedBookmark.author);
        expect(screen.getByTestId('selectedBookmark-title')).toHaveTextContent(clickedBookmark.title);
        expect(screen.getByTestId('selectedBookmark-createdAt')).toHaveTextContent(clickedBookmark.createdAt ?? '');
        expect(screen.getByTestId('selectedBookmark-width')).toHaveTextContent(clickedBookmark.width.toString());
        expect(screen.getByTestId('selectedBookmark-height')).toHaveTextContent(clickedBookmark.height.toString());
        expect(screen.getByTestId('selectedBookmark-keywords')).toHaveTextContent(clickedBookmark.keywords.join(', '));
      });
    });
  });
});
