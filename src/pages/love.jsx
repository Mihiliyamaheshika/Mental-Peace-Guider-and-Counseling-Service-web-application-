import React from "react";
import ArticleList from "../components/articlelist";
import "../app.css";

const Love = () => {
  return (
    <div>
      <h1 className="article-title">For a Peaceful love mind</h1>
      <ArticleList category="love" />
    </div>
  );
};

export default Love;