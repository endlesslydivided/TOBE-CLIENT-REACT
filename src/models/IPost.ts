
export interface IPost {
    id: number;
    title: string;
    description: string;
    content: string;
    userId: number;
    categoryId: number;
    tags: string[];
}
