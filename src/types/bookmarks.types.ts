export interface CommonBookmarkData {
  id: string;
  url: string;
  title: string;
  author: string;
  createdAt: string | null;
  keywords: string[];
}

export interface VideoBookmark extends CommonBookmarkData {
  width: number;
  height: number;
  duration: number;
}

export interface PictureBookmark extends CommonBookmarkData {
  width: number;
  height: number;
}

export type Bookmark = VideoBookmark | PictureBookmark;
