import React from "react";
import ArticleList from "../components/articlelist";
import "../app.css";

const Education = () => {
  return (
    <div>
      <h1 className="article-title">Education Tips </h1>
      <ArticleList category="education" />
    </div>
  );
};

export default Education;

   