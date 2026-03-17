export interface User {
    id: number;
    name: string;
    username: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    allUsers: User[]; // Simulated DB
}

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
    username?: string; // Derived
    likes: number;
    commentsCount: number;
    isLiked?: boolean;
}

export interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
    userId?: number; // Simulated
}

export interface PostsState {
    posts: Post[];
    searchQuery: string;
    filter: 'all' | 'mine';
    loading: boolean;
    error: string | null;
}

export interface CommentsState {
    commentsByPostId: Record<number, Comment[]>;
    loading: boolean;
    error: string | null;
}
