import axios from "axios";
import { Blog, GitHubIssue } from "./types";

export const fetchProjects = async () => {
    try {
        const response = await axios.get("/data/projects.json");
        return response.data.projects; // Assuming JSON contains { "projects": [...] }
    } catch (error: any) {
        console.error("Error fetching projects json:", error.response?.data || error.message);
        throw new Error("Failed to fetch peojects json. Please try again later.");
    }
};

export const fetchCardInfos = async () => {
    try {
        const response = await axios.get("/data/cardInfos.json");
        return response.data.cardInfos;
    } catch (error: any) {
        console.error("Error fetching cardInfo json:", error.response?.data || error.message);
        throw new Error("Failed to fetch cardInfo json. Please try again later.");
    }
};

export const fetchBlogs = async (): Promise<Blog[]> => {
    try {
         const response = await axios.get<GitHubIssue[]>(
            "https://api.github.com/repos/ZjTan4/Hear_my_Voice/issues"
         );
        return response.data.map((issue) => ({
            id: issue.id,
            title: issue.title,
            body: issue.body,
            createdAt: issue.created_at,
        }));
    } catch (error: any) {
        console.error("Error fetching blogs:", error.response?.data || error.message);
        throw new Error("Failed to fetch blogs. Please try again later.");
    }
};
