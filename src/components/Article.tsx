import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
            <ReactMarkdown
                children={articleDetail.body}
                remarkPlugins={[remarkGfm]}
                components={{
                    // Ensure Return Types Are React Elements
                    a: ({ href, children }) => {
                        if (!href) return <>{children}</>
                        return (
                            <a href={href} target="_blank" rel="noopener noreferrer">
                                {children}
                            </a>
                        )
                    },
                    code: ({ inline, children, ...props}: React.ComponentProps<"code"> & {inline?:boolean}) => 
                        inline ? (
                            <code className="inline-code" {...props}>
                                {children}
                            </code>
                        ) : (
                            <pre className="block-code">
                                <code {...props}>
                                    {children}
                                </code>
                            </pre>
                        )
                }}
            />
        </div>
    )
};

export default Article;
