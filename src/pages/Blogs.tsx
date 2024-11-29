import React, { useEffect, useState } from "react";

import "@assets/styles/layout.css"
import Article from "@components/Article";

type GitHubIssue = {
    id: number;
    title: string;
    body: string;
    created_at: string;
};

type Blog = {
    id: number;
    title: string;
    body: string;
    createdAt: string;
};

const fetchBlogs = async (): Promise<Blog[]> => {
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
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

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
            <div className="side-bar">
                {blogs.map((blog) => (
                    <div>
                        {blog.title}
                    </div>
                ))}
            </div>
            <Article />
        </div>
    )
};

export default Blogs;
