import React from "react";
import ArticleList from "../components/articlelist";
import "../app.css";

const Lifetips = () => {
  return (
    <div>
      <h1 className="article-title">Life Tips Articles</h1>
      <ArticleList category="life" />
    </div>
  );
};

export default Lifetips;
