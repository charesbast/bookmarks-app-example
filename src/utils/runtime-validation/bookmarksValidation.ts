import { Bookmark } from 'src/types/bookmarks.types';

/**
 * Quick notes here:
 * - We could of couse use a library if the app need a lot of runtime validation, but I saw the
 * opportunity to use Typescript type guards
 *
 * - If the data was stored in a backend we would not have to do that validation
 * */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function isBookmark(data: any): data is Bookmark {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  if (typeof data?.id !== 'string'
    || typeof data?.url !== 'string'
    || typeof data?.title !== 'string'
    || typeof data?.author !== 'string'
    || typeof data?.createdAt !== 'string'
    || typeof data?.width !== 'number'
    || typeof data?.height !== 'number'
  ) {
    return false;
  }

  return data.duration
    ? typeof data?.duration !== 'number'
    : true;
}

export function isBookmarks(data: unknown): data is Bookmark[] {
  if (!Array.isArray(data)) {
    return false;
  }

  // non consistent return for performance reasons
  // eslint-disable-next-line consistent-return
  data.forEach((item) => {
    if (!isBookmark(item)) {
      return false;
    }
  });

  return true;
}
