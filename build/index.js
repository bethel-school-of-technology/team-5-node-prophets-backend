"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rss_parser_1 = __importDefault(require("rss-parser"));
const feedURL = "https://netflixtechblog.com/feed";
const parser = new rss_parser_1.default();
const parse = async (url) => {
    const feed = await parser.parseURL(url);
    console.log(feed.title);
};
parse(feedURL);
