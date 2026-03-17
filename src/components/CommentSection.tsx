import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { fetchCommentsByPost, addComment } from '../store/commentsSlice';
import { updateCommentCount } from '../store/postsSlice';
import { Send } from 'lucide-react';
import CommentItem from './CommentItem';

interface CommentSectionProps {
    postId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
    const [newComment, setNewComment] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const comments = useSelector((state: RootState) => state.comments.commentsByPostId[postId] || []);
    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (comments.length === 0) {
            dispatch(fetchCommentsByPost(postId));
        }
    }, [dispatch, postId, comments.length]);

    const handleAddComment = () => {
        if (!newComment.trim()) return;

        dispatch(addComment({
            postId,
            id: Date.now(),
            name: user?.name || 'Anonymous',
            email: user?.username || 'user@example.com',
            body: newComment,
            userId: user?.id
        }));

        dispatch(updateCommentCount({ postId, increment: true }));

        setNewComment('');
    };

    return (
        <div className="bg-slate-900/30 p-4 sm:p-6 space-y-6">
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex-shrink-0 flex items-center justify-center border border-slate-700 text-primary-400 text-xs font-bold">
                    {user?.name.charAt(0)}
                </div>
                <div className="flex-1 relative">
                    <input
                        type="text"
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-full py-2 pl-4 pr-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all font-medium"
                    />
                    <button
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                        className="absolute right-1 top-1/2 -translate-y-1/2 p-2 text-primary-500 hover:text-primary-400 disabled:opacity-50 transition-all"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {comments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
