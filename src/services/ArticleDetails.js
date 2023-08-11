import React from 'react';

const ArticleDetails = ({ article, onClose }) => {
  return (
    <div className="article-details">
        <div className="article-details-content">
        <h2>User ID: {article.userId}</h2>
        <h2>ID: {article.id}</h2>
        <h3>{article.title}</h3>
        <p>{article.body}</p>
        <button  className= 'close-btn'onClick={onClose}>Close</button>
        </div>
    </div>
  );
};

export default ArticleDetails;