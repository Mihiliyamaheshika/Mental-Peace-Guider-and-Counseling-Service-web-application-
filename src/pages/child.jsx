import React from "react";
import ArticleList from "../components/articlelist";
import "../app.css";

const Child = () => {
  return (
    <div>
      <h1 className="article-title">Child Mental Peace</h1>
      <ArticleList category="child" />
    </div>
  );
};

export default Child;
