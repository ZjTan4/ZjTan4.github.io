import React, { useEffect, useState } from "react";

import "@assets/styles/layout.css"
import Article from "@components/Article";
import { Blog } from "@utils/types";
import { fetchBlogs } from "@utils/api";

const Blogs : React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const defaultBlog: Blog = {
        id: -1,
        title: "No Blog Selected",
        body: "Please select a blog from the list.",
        createdAt: new Date().toISOString(),
    };
    const [selectedBlog, setSelectedBlog] = useState<Blog>(defaultBlog);
    
    useEffect(() => {
        const loadBlog = async () => {
            try {
                const fetchedBlogs = await fetchBlogs();
                setBlogs(fetchedBlogs);
                // if there are blogs, display the first one by default
                if (fetchedBlogs.length > 0) {
                    setSelectedBlog(fetchedBlogs[0]);
                }
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
                    blog={selectedBlog}
                />
            </div>
        </div>
    )
};

export default Blogs;
