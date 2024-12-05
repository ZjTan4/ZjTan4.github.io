
export interface Blog {
    id: number;
    title: string;
    body: string;
    createdAt: string;
};

export interface GitHubIssue {
    id: number;
    title: string;
    body: string;
    created_at: string;
};

export interface Project {
    id: string;
    name: string;
    skills: string[];
    description: string;
}