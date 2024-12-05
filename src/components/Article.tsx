import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import "@assets/styles/layout.css"
import { Blog } from "@utils/types";

interface ArticleProps {
    blog: Blog | null;
}

const Article : React.FC<ArticleProps> = ({blog}) => {
    if (!blog) {
        return (
            <p>Select a blog to read. </p>
        )
    }
    return (
        <div>
            <h1>{blog.title}</h1>
            <p>
                <em>Published on: {new Date(blog.createdAt).toLocaleDateString()}</em>
            </p>
            <ReactMarkdown
                children={blog.body}
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
