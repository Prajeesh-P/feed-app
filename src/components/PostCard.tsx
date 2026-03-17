import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { Post } from '../types';
import type { RootState } from '../store';
import { deletePost, updatePost, toggleLike } from '../store/postsSlice';
import { MessageSquare, Share2, Heart, MoreHorizontal, Edit2, Trash2, X, Check } from 'lucide-react';
import CommentSection from './CommentSection';
import { motion, AnimatePresence } from 'framer-motion';

interface PostCardProps {
    post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(post.body);
    const [showComments, setShowComments] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const isOwner = user?.id === post.userId;

    const handleUpdate = () => {
        dispatch(updatePost({ ...post, body: editedContent }));
        setIsEditing(false);
    };

    const handleDelete = () => {
        dispatch(deletePost(post.id));
    };

    const handleLike = () => {
        dispatch(toggleLike(post.id));
    };

    return (
        <div className="glass-card rounded-2xl overflow-hidden mb-6">
            <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-primary-400 font-bold">
                            {post.username?.charAt(0) || post.userId.toString().charAt(0)}
                        </div>
                        <div>
                            <h4 className="font-bold text-white leading-none">
                                {post.username || `User ${post.userId}`}
                            </h4>
                            <span className="text-xs text-slate-500 mt-1 block">2 hours ago</span>
                        </div>
                    </div>

                    {isOwner && (
                        <div className="relative">
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
                            >
                                <MoreHorizontal size={20} />
                            </button>

                            <AnimatePresence>
                                {showMenu && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setShowMenu(false)}
                                        ></div>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                            className="absolute right-0 mt-2 w-36 glass-card rounded-xl py-1 z-20 shadow-2xl overflow-hidden"
                                        >
                                            <button
                                                onClick={() => { setIsEditing(true); setShowMenu(false); }}
                                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all"
                                            >
                                                <Edit2 size={14} />
                                                Edit Post
                                            </button>
                                            <button
                                                onClick={() => { handleDelete(); setShowMenu(false); }}
                                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-all font-medium"
                                            >
                                                <Trash2 size={14} />
                                                Delete
                                            </button>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                {isEditing ? (
                    <div className="space-y-4">
                        <textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 min-h-[100px]"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
                            >
                                <X size={20} />
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="p-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg"
                            >
                                <Check size={20} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2 leading-snug">{post.title}</h3>
                        <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{post.body}</p>
                    </div>
                )}

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800/50">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-2 transition-all group ${post.isLiked ? 'text-red-500' : 'text-slate-400 hover:text-red-400'}`}
                        >
                            <span className={`p-2 rounded-lg transition-all ${post.isLiked ? 'bg-red-400/10' : 'group-hover:bg-red-400/10'}`}>
                                <Heart size={20} className={post.isLiked ? 'fill-current' : ''} />
                            </span>
                            <span className="text-sm font-medium">{post.likes}</span>
                        </button>
                        <button
                            onClick={() => setShowComments(!showComments)}
                            className="flex items-center gap-2 text-slate-400 hover:text-primary-400 transition-all group"
                        >
                            <span className="p-2 group-hover:bg-primary-400/10 rounded-lg transition-all">
                                <MessageSquare size={20} />
                            </span>
                            <span className="text-sm font-medium">{post.commentsCount} Comments</span>
                        </button>
                    </div>
                    <button className="flex items-center gap-2 text-slate-400 hover:text-green-400 transition-all group">
                        <span className="p-2 group-hover:bg-green-400/10 rounded-lg transition-all">
                            <Share2 size={20} />
                        </span>
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {showComments && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-slate-800/50"
                    >
                        <CommentSection postId={post.id} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PostCard;
