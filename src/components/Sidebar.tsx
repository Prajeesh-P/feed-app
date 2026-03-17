import { Home, Compass, User, Bookmark, Settings, Hash } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../store/postsSlice';
import type { RootState } from '../store';

const Sidebar = () => {
    const dispatch = useDispatch();
    const currentFilter = useSelector((state: RootState) => state.posts.filter);

    const menuItems = [
        { icon: Home, label: 'Feed', filter: 'all' as const },
        { icon: User, label: 'My Posts', filter: 'mine' as const },
        { icon: Compass, label: 'Explore' },
        { icon: Hash, label: 'Topics' },
        { icon: Bookmark, label: 'Bookmarks' },
        { icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="space-y-2 sticky top-20">
            {menuItems.map((item) => {
                const isActive = item.filter ? currentFilter === item.filter : false;
                return (
                    <button
                        key={item.label}
                        onClick={() => item.filter && dispatch(setFilter(item.filter))}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-primary-500/10 text-primary-400 font-bold'
                                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                            }`}
                    >
                        <item.icon size={22} className={isActive ? 'text-primary-400' : 'text-slate-500 group-hover:text-white'} />
                        <span className="text-base">{item.label}</span>
                    </button>
                );
            })}

            <div className="mt-8 pt-8 border-t border-slate-800">
                <div className="glass-card p-4 rounded-xl">
                    <p className="text-sm font-bold text-white mb-2">Upgrade to Pro</p>
                    <p className="text-xs text-slate-400 mb-4">Get access to premium themes and features.</p>
                    <button className="w-full bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold py-2 rounded-lg transition-all">
                        Upgrade Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
