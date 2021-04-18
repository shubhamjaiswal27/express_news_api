export interface INewsArticleResponse {
  status: string;
  totalResults: number;
  articles: IArticle[];
}

export interface INewsResponse {
  count: number;
  data: INews[];
}

export interface IArticle {
  title: string;
  author: string;
  url: string;
  publishedAt: string;
  content: string;
  description: string;
}

export interface INews {
  headline: string;
  link: string;
  author: string;
  publishedAt: string;
  content: string;
  description: string;
}
