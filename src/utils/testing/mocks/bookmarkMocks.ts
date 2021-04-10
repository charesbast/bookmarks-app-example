import { Bookmark } from 'src/types/bookmarks.types';

export function mockBookmark(data?: Partial<Bookmark>): Bookmark {
  return {
    id: 'bookmarkId',
    url: 'https://vimeo.com/33316741',
    author: 'author name',
    title: 'video title',
    createdAt: new Date().toISOString(),
    width: 200,
    height: 200,
    keywords: [],
    ...data,
  };
}

export const mockedBookmarkList: Bookmark[] = [
  mockBookmark({
    id: 'bookmark1',
    url: 'https://vimeo.com/33316741',
    author: 'C2C',
    title: 'F.U.Y.A',
    duration: 340,
    keywords: ['music', 'electronic'],
  }),
  mockBookmark({
    id: 'bookmark2',
    url: 'https://vimeo.com/33316742',
    title: 'Title 2',
    duration: 340,
    keywords: ['techno', 'concert'],
  }),
  mockBookmark({
    id: 'bookmark3',
    url: 'https://vimeo.com/33316743',
    author: 'C2C',
    title: 'Title 3',
    duration: 340,
    keywords: ['video', 'film', 'french'],
  }),
  mockBookmark({
    id: 'bookmark4',
    url: 'https://vimeo.com/33316744',
    author: 'C2C',
    title: 'Title 4',
    createdAt: new Date().toISOString(),
    duration: 340,
    keywords: ['série', 'US', 'comedy'],
  }),
];
