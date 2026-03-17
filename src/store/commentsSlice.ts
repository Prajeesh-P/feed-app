import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Comment, CommentsState } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com/comments';

export const fetchCommentsByPost = createAsyncThunk(
    'comments/fetchByPost',
    async (postId: number) => {
        const response = await axios.get<Comment[]>(`${API_URL}?postId=${postId}`);
        return { postId, comments: response.data };
    }
);

const initialState: CommentsState = {
    commentsByPostId: {},
    loading: false,
    error: null,
};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment: (state, action: PayloadAction<Comment>) => {
            const { postId } = action.payload;
            if (!state.commentsByPostId[postId]) {
                state.commentsByPostId[postId] = [];
            }
            state.commentsByPostId[postId].push(action.payload);
        },
        updateComment: (state, action: PayloadAction<Comment>) => {
            const { postId, id } = action.payload;
            const comments = state.commentsByPostId[postId];
            if (comments) {
                const index = comments.findIndex(c => c.id === id);
                if (index !== -1) {
                    comments[index] = action.payload;
                }
            }
        },
        deleteComment: (state, action: PayloadAction<{ postId: number, id: number }>) => {
            const { postId, id } = action.payload;
            const comments = state.commentsByPostId[postId];
            if (comments) {
                state.commentsByPostId[postId] = comments.filter(c => c.id !== id);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCommentsByPost.fulfilled, (state, action) => {
                state.loading = false;
                state.commentsByPostId[action.payload.postId] = action.payload.comments;
            })
            .addCase(fetchCommentsByPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch comments';
            });
    },
});

export const { addComment, updateComment, deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;
