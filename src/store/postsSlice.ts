import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Post, PostsState } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get<Post[]>(API_URL);
    // Initialize with mock data for likes and comments
    return response.data.map(post => ({
        ...post,
        likes: Math.floor(Math.random() * 50),
        commentsCount: Math.floor(Math.random() * 20),
        isLiked: false
    }));
});

const initialState: PostsState = {
    posts: [],
    searchQuery: '',
    filter: 'all',
    loading: false,
    error: null,
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<Post>) => {
            state.posts.unshift(action.payload);
        },
        updatePost: (state, action: PayloadAction<Post>) => {
            const index = state.posts.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.posts[index] = action.payload;
            }
        },
        deletePost: (state, action: PayloadAction<number>) => {
            state.posts = state.posts.filter(p => p.id !== action.payload);
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setFilter: (state, action: PayloadAction<'all' | 'mine'>) => {
            state.filter = action.payload;
        },
        toggleLike: (state, action: PayloadAction<number>) => {
            const post = state.posts.find(p => p.id === action.payload);
            if (post) {
                if (post.likes === undefined) post.likes = 0;
                post.isLiked = !post.isLiked;
                post.likes += post.isLiked ? 1 : -1;
            }
        },
        updateCommentCount: (state, action: PayloadAction<{ postId: number; increment: boolean }>) => {
            const post = state.posts.find(p => p.id === action.payload.postId);
            if (post) {
                if (post.commentsCount === undefined) post.commentsCount = 0;
                post.commentsCount += action.payload.increment ? 1 : -1;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch posts';
            });
    },
});

export const { addPost, updatePost, deletePost, setSearchQuery, setFilter, toggleLike, updateCommentCount } = postsSlice.actions;
export default postsSlice.reducer;
