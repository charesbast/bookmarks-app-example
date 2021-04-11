import { Bookmark } from 'src/types/bookmarks.types';
import { mockBookmark } from 'src/utils/testing/mocks/bookmarkMocks';

import BookmarksApi, {
  BOOKMARKS_SESSION_STORAGE_KEY,
  INCOMPLETE_BOOKMARK_ERROR,
  NO_EMBED_BASE_URL,
} from './BookmarksApi';

const fetchSpy = jest.spyOn(window, 'fetch');

describe('BookmarksApi', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  describe('getBookmarks', () => {
    it('Should return an empty array when the storage contains no data', () => {
      sessionStorage.removeItem(BOOKMARKS_SESSION_STORAGE_KEY);
      expect(BookmarksApi.getBookmarks()).toEqual([]);
    });

    it('Should return an empty array and clear the data when the storage contains malformed data', () => {
      sessionStorage.setItem(BOOKMARKS_SESSION_STORAGE_KEY, 'incorrectBookmarksData');
      expect(BookmarksApi.getBookmarks()).toEqual([]);
      expect(sessionStorage.getItem(BOOKMARKS_SESSION_STORAGE_KEY)).toEqual(null);
    });

    it('Should return an empty array and clear the data when the storage contains incomplete bookmarks data', () => {
      const incompleteData: Partial<Bookmark> = {
        id: 'id',
        url: 'url',
      };
      sessionStorage.setItem(BOOKMARKS_SESSION_STORAGE_KEY, JSON.stringify(incompleteData));
      expect(BookmarksApi.getBookmarks()).toEqual([]);
      expect(sessionStorage.getItem(BOOKMARKS_SESSION_STORAGE_KEY)).toEqual(null);
    });

    it('Should return the session storage data when it is correctly formed', () => {
      const storedBookmarks: Bookmark[] = [
        mockBookmark({ id: 'id1' }),
        mockBookmark({ id: 'id2' }),
        mockBookmark({ id: 'id3' }),
      ];
      sessionStorage.setItem(BOOKMARKS_SESSION_STORAGE_KEY, JSON.stringify(storedBookmarks));

      expect(BookmarksApi.getBookmarks()).toEqual(storedBookmarks);
    });
  });

  describe('saveBookmarks', () => {
    it('Should save the input bookmarks into the session storage', () => {
      const bookmarksToSave: Bookmark[] = [
        mockBookmark({ id: 'id1' }),
        mockBookmark({ id: 'id2' }),
      ];

      BookmarksApi.saveBookmarks(bookmarksToSave);

      expect(
        sessionStorage.getItem(BOOKMARKS_SESSION_STORAGE_KEY),
      ).toEqual(JSON.stringify(bookmarksToSave));
    });
  });

  describe('createBookmark', () => {
    it('Should throw an error when noembed api is enable to fetch the url metadata', async () => {
      fetchSpy.mockResolvedValue({
        json: () => Promise.resolve({
          error: 'Unable to fetch the url metadata',
        }),
      } as Response);
      const bookmarkUrl = 'http://some-url.com';

      await expect(
        BookmarksApi.createBookmark(bookmarkUrl),
      ).rejects.toThrowError('Unable to fetch the url metadata');
      expect(fetchSpy).toHaveBeenCalledWith(`${NO_EMBED_BASE_URL}?url=${encodeURIComponent(bookmarkUrl)}`);
    });

    it('Should throw an error when the metadata fetched by noembed is incomplete', async () => {
      const incompleteMetadata = {
        url: 'url',
        title: 'title',
      };
      fetchSpy.mockResolvedValue({
        json: () => Promise.resolve(incompleteMetadata),
      } as Response);

      await expect(
        BookmarksApi.createBookmark('url'),
      ).rejects.toThrowError(INCOMPLETE_BOOKMARK_ERROR);
    });

    it('Should return a bookmark created using noembed metadata when it is complete', async () => {
      const completeMetadata = {
        url: 'url',
        title: 'title',
        upload_date: 'createdAt',
        width: 100,
        height: 100,
        author_name: 'author',
      };
      fetchSpy.mockResolvedValue({
        json: () => Promise.resolve(completeMetadata),
      } as Response);

      const result = await BookmarksApi.createBookmark('url');

      expect(result).toMatchObject({
        url: 'url',
        title: 'title',
        author: 'author',
        createdAt: 'createdAt',
        width: 100,
        height: 100,
        keywords: [],
      });
    });
  });
});
