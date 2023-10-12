import { Request, Response } from "express";
import RSSParser from "rss-parser";

const feedURLs = [
  "https://www.techrepublic.com/rssfeeds/articles/",
  "https://www.techrepublic.com/rssfeeds/topic/artificial-intelligence/",
  "https://www.techrepublic.com/rssfeeds/topic/smart-persons-guides/",
  "https://www.techrepublic.com/rssfeeds/topic/cloud-security/",
  "https://www.techrepublic.com/rssfeeds/topic/cybersecurity/",
  "https://www.techrepublic.com/rssfeeds/topic/developer/",
  "https://www.techrepublic.com/rssfeeds/topic/devops/",
  "https://www.techrepublic.com/rssfeeds/topic/education/",
  "https://www.techrepublic.com/rssfeeds/topic/google/",
  "https://www.techrepublic.com/rssfeeds/topic/tech-and-work/",
  "https://www.techrepublic.com/rssfeeds/topic/tech-industry/"
];

const parser = new RSSParser();
let articles: any[] = [];

const parse = async (urls: string[]) => {
  for (const url of urls) {
    const feed = await parser.parseURL(url);
    articles.push(...feed.items);
  }
};

parse(feedURLs);

export const getRssFeeds = (req: Request, res: Response) => {
  res.send(articles);
};
