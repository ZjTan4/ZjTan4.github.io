import React from "react";

import "@assets/styles/layout.css"

export type ArticleDetail = {
    id: number;
    title: string;
    body: string;
    createdAt: string;
};

interface ArticleProps {
    articleDetail: ArticleDetail | null;
}

const Article : React.FC<ArticleProps> = ({articleDetail}) => {
    if (!articleDetail) {
        return (
            <p>Select a blog to read. </p>
        )
    }
    return (
        <div>
            <h1>{articleDetail.title}</h1>
            <p>
                <em>Published on: {new Date(articleDetail.createdAt).toLocaleDateString()}</em>
            </p>
            
        </div>
    )
};

export default Article;
