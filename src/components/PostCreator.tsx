import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { addPost } from '../store/postsSlice';
import { Image, MapPin, Smile, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PostCreator = () => {
    const [content, setContent] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const handlePost = () => {
        if (!content.trim()) return;

        dispatch(addPost({
            id: Date.now(),
            userId: user?.id || 0,
            title: content.substring(0, 50),
            body: content,
            username: user?.username,
            likes: 0,
            commentsCount: 0,
            isLiked: false
        }));

        setContent('');
        setIsExpanded(false);
    };

    return (
        <div className="glass-card rounded-2xl p-4 overflow-hidden border-primary-500/20 shadow-lg shadow-primary-500/5">
            <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex-shrink-0 flex items-center justify-center border border-slate-700 text-primary-400 font-bold">
                    {user?.name.charAt(0)}
                </div>
                <div className="flex-1">
                    <textarea
                        placeholder="What's on your mind?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onFocus={() => setIsExpanded(true)}
                        className="w-full bg-transparent border-none text-white text-lg placeholder-slate-500 focus:outline-none resize-none pt-2 min-h-[40px]"
                        rows={isExpanded ? 3 : 1}
                    />

                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="mt-4 pt-4 border-t border-slate-800/50 flex items-center justify-between"
                            >
                                <div className="flex gap-2">
                                    {[Image, MapPin, Smile].map((Icon, i) => (
                                        <button key={i} className="p-2 text-primary-400 hover:bg-primary-500/10 rounded-lg transition-all">
                                            <Icon size={20} />
                                        </button>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className={`text-xs ${content.length > 250 ? 'text-red-400' : 'text-slate-500'}`}>
                                        {content.length}/280
                                    </span>
                                    <button
                                        onClick={handlePost}
                                        disabled={!content.trim()}
                                        className="bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:hover:bg-primary-600 text-white font-bold px-6 py-2 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-primary-500/20"
                                    >
                                        <span>Post</span>
                                        <Send size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default PostCreator;
