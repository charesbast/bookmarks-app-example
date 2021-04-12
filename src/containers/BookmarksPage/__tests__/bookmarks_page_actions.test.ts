import {
  RenderResult,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react';

import BookmarksApi from 'src/api/BookmarksApi';
import { RoutePath } from 'src/types/routing.types';
import { mockBookmark, mockedBookmarkList } from 'src/utils/testing/mocks/bookmarkMocks';
import { renderApp } from 'src/utils/testing/testRenderer';

const renderBookmarksPage = (): RenderResult => renderApp({
  route: RoutePath.Bookmarks,
});

const createBookmarkSpy = jest.spyOn(BookmarksApi, 'createBookmark');
const getBookmarksSpy = jest.spyOn(BookmarksApi, 'getBookmarks');
jest.spyOn(BookmarksApi, 'saveBookmarks');

describe('BookmarksPage actions tests', () => {
  beforeEach(() => {
    getBookmarksSpy.mockReturnValue(mockedBookmarkList);
  });

  describe('Adding a new bookmark', () => {
    beforeEach(() => {
      createBookmarkSpy.mockResolvedValue(mockBookmark());
    });

    describe('When typing something in the text input', () => {
      function changeTextInput(text: string): void {
        fireEvent.change(
          screen.getByTestId('addBookmarkForm-textInput'),
          { target: { value: text } },
        );
      }

      it('Should enable the submit button', () => {
        renderBookmarksPage();

        changeTextInput('something');

        expect(screen.getByTestId('addBookmarkForm-submitBtn')).not.toHaveAttribute('disabled');
      });

      describe('When clicking on the submit button', () => {
        function clickOnSubmitButton(): void {
          screen.getByTestId('addBookmarkForm-submitBtn').click();
        }

        it('Should call BookmarksApi.createBookmark with the correct param', async () => {
          renderBookmarksPage();

          changeTextInput('something');
          clickOnSubmitButton();

          await waitFor(() => {
            expect(createBookmarkSpy).toHaveBeenCalledWith('something');
          });
        });

        describe('When the BookmarksApi.createBookmark call rejects', () => {
          const errorMsg = 'Something happened';

          beforeEach(() => {
            createBookmarkSpy.mockRejectedValue(new Error(errorMsg));
          });

          it('Should display an error message and enable the submit button when BookmarksApi.createBookmark call rejects', async () => {
            renderBookmarksPage();

            changeTextInput('something');
            clickOnSubmitButton();

            expect(await screen.findByTestId('addBookmarkForm-error')).toHaveTextContent(errorMsg);
          });
        });

        describe('When the BookmarksApi.createBookmark call resolves', () => {
          const createdBookmark = mockBookmark({ id: 'createdBookmarkId' });

          beforeEach(() => {
            createBookmarkSpy.mockResolvedValue(createdBookmark);
          });

          it('Should add the created bookmark to the displayed list', async () => {
            renderBookmarksPage();

            changeTextInput('something');
            clickOnSubmitButton();

            expect(await screen.findByTestId(`bookmark-${createdBookmark.id}`)).toBeInTheDocument();
            expect(screen.queryByTestId('addBookmarkForm-error')).not.toBeInTheDocument();
          });
        });
      });
    });
  });

  describe('Click on a bookmark "Modify" button', () => {
    function clickOnModifyBtn(bookmarkId: string): void {
      screen.getByTestId(`bookmark-${bookmarkId}-modifyBtn`).click();
    }

    it('Should redirect to the correct edition page when clicking on a bookmark modify button', () => {
      const clickedBookmark = mockedBookmarkList[1];
      renderBookmarksPage();

      clickOnModifyBtn(clickedBookmark.id);

      expect(screen.getByRole('heading', { name: 'Bookmark edition' })).toBeInTheDocument();
    });
  });

  describe('Deleting a bookmark', () => {
    function clickOnDeleteBookmarkBtn(bookmarkId: string): void {
      screen.getByTestId(`bookmark-${bookmarkId}-deleteBtn`).click();
    }

    it('Should remove the selected bookmark from the saved list', () => {
      const [deletedBookmark, ...keptBookmarks] = mockedBookmarkList;

      renderBookmarksPage();
      clickOnDeleteBookmarkBtn(deletedBookmark.id);

      expect(screen.queryByTestId(`bookmark-${deletedBookmark.id}`)).not.toBeInTheDocument();
      expect(BookmarksApi.saveBookmarks).toHaveBeenCalledWith(keptBookmarks);
    });
  });
});
