/* 博客 */
export interface IBlog {
  id?: string;
  blogId: string;
  title: string;
  content: string;
  publishDate?: string;
  isActive?: boolean;
  linkUrl?: string;
  description?: string;
  keywords?: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}
