import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { Comment } from '../types';
import type { RootState } from '../store';
import { deleteComment, updateComment } from '../store/commentsSlice';
import { updateCommentCount } from '../store/postsSlice';
import { MoreHorizontal, Edit2, Trash2, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommentItemProps {
    comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedBody, setEditedBody] = useState(comment.body);
    const [showMenu, setShowMenu] = useState(false);
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    // In this simulation, we consider ownership based on userId if it exists, 
    // or if the name matches (since JSONPlaceholder doesn't have our user IDs)
    const isOwner = user?.id === comment.userId || user?.name === comment.name;

    const handleUpdate = () => {
        dispatch(updateComment({ ...comment, body: editedBody }));
        setIsEditing(false);
    };

    const handleDelete = () => {
        dispatch(deleteComment({ postId: comment.postId, id: comment.id }));
        dispatch(updateCommentCount({ postId: comment.postId, increment: false }));
    };

    return (
        <div className="flex gap-3 group">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex-shrink-0 flex items-center justify-center border border-slate-700 text-slate-400 text-xs font-bold">
                {comment.name.charAt(0)}
            </div>
            <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{comment.name}</span>
                        <span className="text-[10px] text-slate-500">• 1h ago</span>
                    </div>

                    {isOwner && (
                        <div className="relative opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="p-1 text-slate-500 hover:text-white hover:bg-slate-800 rounded-md transition-all"
                            >
                                <MoreHorizontal size={14} />
                            </button>

                            <AnimatePresence>
                                {showMenu && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setShowMenu(false)}
                                        ></div>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="absolute right-0 mt-1 w-28 glass-card rounded-lg py-1 z-20 shadow-xl"
                                        >
                                            <button
                                                onClick={() => { setIsEditing(true); setShowMenu(false); }}
                                                className="w-full flex items-center gap-2 px-3 py-1.5 text-[10px] text-slate-300 hover:bg-white/10"
                                            >
                                                <Edit2 size={10} />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => { handleDelete(); setShowMenu(false); }}
                                                className="w-full flex items-center gap-2 px-3 py-1.5 text-[10px] text-red-400 hover:bg-red-400/10"
                                            >
                                                <Trash2 size={10} />
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
                    <div className="flex flex-col gap-2 mt-1">
                        <textarea
                            value={editedBody}
                            onChange={(e) => setEditedBody(e.target.value)}
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 h-24"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md"
                            >
                                <X size={14} />
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="p-1.5 bg-primary-600 hover:bg-primary-500 text-white rounded-md"
                            >
                                <Check size={14} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-slate-800/40 rounded-2xl rounded-tl-none p-3 border border-slate-700/30">
                        <p className="text-sm text-slate-300 leading-relaxed font-medium">{comment.body}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentItem;
