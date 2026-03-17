import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { fetchPosts } from '../store/postsSlice';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import PostCreator from '../components/PostCreator';
import PostList from '../components/PostList';

const Feed = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { posts, loading, searchQuery, filter } = useSelector((state: RootState) => state.posts);
    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.body.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === 'all' || post.userId === user?.id;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-transparent">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 pt-20 pb-10 grid grid-cols-1 md:grid-cols-4 gap-6">
                <aside className="hidden md:block">
                    <Sidebar />
                </aside>

                <main className="md:col-span-2 space-y-6">
                    <PostCreator />

                    {loading && posts.length === 0 ? (
                        <div className="flex justify-center py-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                        </div>
                    ) : (
                        <PostList posts={filteredPosts} />
                    )}
                </main>

                <aside className="hidden lg:block">
                    <div className="glass-card rounded-2xl p-6 sticky top-20">
                        <h3 className="text-lg font-bold text-white mb-4">Trending Topics</h3>
                        <ul className="space-y-4">
                            {['#ReactJS', '#ReduxToolkit', '#TailwindCSS', '#Vite'].map(tag => (
                                <li key={tag} className="flex flex-col">
                                    <span className="text-primary-400 font-medium cursor-pointer hover:underline">{tag}</span>
                                    <span className="text-xs text-slate-500">1.2k posts</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Feed;
