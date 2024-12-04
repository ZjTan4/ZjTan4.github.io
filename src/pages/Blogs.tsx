import React, { useEffect, useState } from "react";

import "@assets/styles/layout.css"
import Article, { ArticleDetail } from "@components/Article";

type GitHubIssue = {
    id: number;
    title: string;
    body: string;
    created_at: string;
};

const fetchBlogs = async (): Promise<ArticleDetail[]> => {
    const response = await fetch(
        "https://api.github.com/repos/ZjTan4/Hear_my_Voice/issues"
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch blogs: ${response.statusText}`);
    }

    const data: GitHubIssue[] = await response.json();

    return data.map((issue) => ({
        id: issue.id,
        title: issue.title,
        body: issue.body,
        createdAt: issue.created_at,
    }));
};

const Blogs : React.FC = () => {
    const [blogs, setBlogs] = useState<ArticleDetail[]>([]);
    const defaultBlog: ArticleDetail = {
        id: -1,
        title: "No Blog Selected",
        body: "Please select a blog from the list.",
        createdAt: new Date().toISOString(),
    };
    const [selectedBlog, setSelectedBlog] = useState<ArticleDetail>(defaultBlog);
    
    useEffect(() => {
        const loadBlog = async () => {
            try {
                const fetchedBlogs = await fetchBlogs();
                setBlogs(fetchedBlogs);
            } catch (error) {
                console.error("Error fetching blogs: ", error);
            }
        };
        loadBlog();
    }, [])

    return (
        <div className="blogs">
            {/* sidebar */}
            <div className="side-bar">
                {blogs.map((blog) => (
                    <li
                        key={blog.id}
                        className="blog-list-item"
                        onClick={() => setSelectedBlog(blog)}
                    >
                        {blog.title}
                    </li>
                ))}
            </div>
            {/* Article Display */}
            <div className="article-display">
                <Article 
                    articleDetail={selectedBlog}
                />
            </div>
        </div>
    )
};

export default Blogs;
