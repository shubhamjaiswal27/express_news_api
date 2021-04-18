const NewsAPI = require("newsapi");

import {
  INewsArticleResponse,
  INewsResponse,
  IArticle,
  INews,
} from "./news.dto";
import config from "../config";

export default class NewsService {
  private newsapi: any;

  constructor() {
    this.newsapi = new NewsAPI(config.newsAPIKey);
  }

  async getPage(query: string, page: number = 1): Promise<INewsResponse> {
    let response: INewsArticleResponse = await this.newsapi.v2.everything({
      q: query,
      language: "en",
      sortBy: "relevancy",
      page: page,
      pageSize: 10,
    });

    const data = response.articles.map(
      (article: IArticle): INews => {
        return {
          headline: article.title,
          link: article.url,
          author: article.author,
          publishedAt: article.publishedAt,
          content: article.content,
          description: article.description,
        };
      }
    );

    return {
      count: response.totalResults,
      data,
    };
  }
}
