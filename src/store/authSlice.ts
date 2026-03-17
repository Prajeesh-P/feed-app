import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '../types';
import Cookies from 'js-cookie';

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('currentUser') || 'null'),
    isAuthenticated: !!localStorage.getItem('currentUser'),
    allUsers: JSON.parse(localStorage.getItem('allUsers') || '[]'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        register: (state, action: PayloadAction<User & { password: string }>) => {
            const { password, ...user } = action.payload;
            const existing = state.allUsers.find(u => u.username === user.username);
            if (existing) {
                throw new Error('Username already exists');
            }
            state.allUsers.push(user);
            localStorage.setItem('allUsers', JSON.stringify(state.allUsers));
        },
        login: (state, action: PayloadAction<{ username: string }>) => {
            const user = state.allUsers.find(u => u.username === action.payload.username);
            if (user) {
                state.user = user;
                state.isAuthenticated = true;
                Cookies.set('username', user.username);
                localStorage.setItem('currentUser', JSON.stringify(user));
            } else {
                throw new Error('Invalid credentials');
            }
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            Cookies.remove('username');
            localStorage.removeItem('currentUser');
        },
    },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
