import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { logout } from '../store/authSlice';
import { setSearchQuery } from '../store/postsSlice';
import { LogOut, Bell, Search, Zap } from 'lucide-react';

const Navbar = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-700/50">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-primary-500 p-1.5 rounded-lg">
                        <Zap size={20} className="text-white fill-current" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight hidden sm:block">FeedApp</span>
                </div>

                <div className="flex-1 max-w-md mx-8 hidden md:block">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search posts..."
                            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all relative">
                        <Bell size={20} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0f172a]"></span>
                    </button>

                    <div className="flex items-center gap-3 pl-4 border-l border-slate-700/50">
                        <div className="flex flex-col items-end hidden sm:flex">
                            <span className="text-sm font-semibold text-white">{user?.name}</span>
                            <span className="text-xs text-slate-500">@{user?.username}</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-primary-400 font-bold">
                            {user?.name.charAt(0)}
                        </div>
                        <button
                            onClick={() => dispatch(logout())}
                            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-all"
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
