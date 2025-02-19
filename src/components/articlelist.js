import React from "react";

const articles = {
  "life": [
    "/articles/life/life-1.jpg",
    "/articles/life/life-2.jpg",
    "/articles/life/life-3.jpg",
    "/articles/life/life-4.jpg",
    "/articles/life/life-5.jpg",
    "/articles/life/life-6.jpg",
    "/articles/life/life-7.jpg",
    "/articles/life/life-8.jpg",
    "/articles/life/life-9.jpg",
  ],

  "love": [
    "/articles/love/love-1.jpg",
    "/articles/love/love-2.jpg",
    "/articles/love/love-3.jpg",
    "/articles/love/love-4.jpg",
    "/articles/love/love-5.jpg",
    "/articles/love/love-6.jpg",
    "/articles/love/love-7.jpg",
    "/articles/love/love-8.jpg",
    "/articles/love/love-9.jpg",
  ],

  "child": [
    "/articles/child/child-1.jpg",
    "/articles/child/child-2.jpg",
    "/articles/child/child-3.jpg",
    "/articles/child/child-4.jpg",
    "/articles/child/child-5.jpg",
    "/articles/child/child-6.jpg",
    "/articles/child/child-7.jpg",
    "/articles/child/child-8.jpg",
    "/articles/child/child-9.jpg",
  ],
 
};

const ArticleList = ({ category }) => {
  return (
    <div>
    
      <div className="article-container">
        {articles[category]?.map((imgSrc, index) => (
          <img key={index} src={imgSrc} alt={`Article ${index + 1}`} className="article-image" />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
