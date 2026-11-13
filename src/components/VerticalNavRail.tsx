import React from 'react';
import {
  MessageSquare,
  Bot,
  Calendar,
  Layers,
  FolderKanban,
  Link2,
  Atom,
  Compass,
  Gift,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';
import { User } from '../types/index.ts';

export type NavTab =
  | 'chat'
  | 'agents'
  | 'tasks'
  | 'build'
  | 'library'
  | 'integrate'
  | 'models'
  | 'upgrade'
  | 'profile';

interface VerticalNavRailProps {
  activeTab: string;
  onTabChange: (tab: NavTab) => void;
  currentUser: User | null;
  drawerOpen: boolean;
  onToggleDrawer: () => void;
  onOpenUpgrade: () => void;
  onOpenRewards: () => void;
}

export const VerticalNavRail: React.FC<VerticalNavRailProps> = ({
  activeTab,
  onTabChange,
  currentUser,
  drawerOpen,
  onToggleDrawer,
  onOpenUpgrade,
  onOpenRewards,
}) => {
  const navItems = [
    { id: 'chat' as NavTab, label: 'Chat', icon: MessageSquare },
    { id: 'agents' as NavTab, label: 'Agent', icon: Bot },
    { id: 'tasks' as NavTab, label: 'Tasks', icon: Calendar },
    { id: 'build' as NavTab, label: 'Build', icon: Layers },
    { id: 'library' as NavTab, label: 'Library', icon: FolderKanban },
    { id: 'integrate' as NavTab, label: 'Integrate', icon: Link2 },
    { id: 'models' as NavTab, label: 'Models', icon: Atom },
    { id: 'upgrade' as NavTab, label: 'Upgrade', icon: Compass },
  ];

  return (
    <aside className="w-16 sm:w-[72px] shrink-0 h-full flex flex-col items-center justify-between py-3.5 bg-white dark:bg-[#0c0c0e] border-r border-zinc-200/90 dark:border-white/10 select-none z-30 transition-colors">
      {/* Top: Avatar & Drawer Toggle */}
      <div className="flex flex-col items-center gap-3 w-full px-2">
        {/* User Profile Avatar */}
        <button
          type="button"
          onClick={() => onTabChange('profile')}
          title={currentUser?.displayName || 'Your Profile'}
          className="relative group cursor-pointer focus:outline-none"
        >
          <div className="w-9 h-9 rounded-full ring-2 ring-zinc-200 dark:ring-white/15 overflow-hidden bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-xs group-hover:ring-purple-500 transition-all">
            {currentUser?.displayName ? (
              currentUser.displayName.charAt(0).toUpperCase()
            ) : (
              'H'
            )}
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#0c0c0e]" />
        </button>

        {/* Conversation Drawer Toggle [|] */}
        <button
          type="button"
          onClick={onToggleDrawer}
          title={drawerOpen ? 'Hide History Drawer' : 'Show History Drawer'}
          className="w-10 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-all cursor-pointer"
        >
          {drawerOpen ? (
            <PanelLeftClose className="w-4 h-4" />
          ) : (
            <PanelLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Middle: Navigation Items */}
      <nav className="flex flex-col items-center gap-1.5 w-full px-1.5 my-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if (item.id === 'upgrade') {
                  onOpenUpgrade();
                } else {
                  onTabChange(item.id);
                }
              }}
              title={item.label}
              className={`w-full py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer group relative ${
                isActive
                  ? 'bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-semibold'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/80 dark:hover:bg-white/5 font-normal'
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'
                }`}
              />
              <span className="text-[10.5px] leading-none tracking-tight">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-purple-600 dark:bg-purple-400 rounded-r-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom: Rewards / Perks */}
      <div className="flex flex-col items-center gap-2 w-full px-2">
        <button
          type="button"
          onClick={onOpenRewards}
          title="Daily Perks & Rewards"
          className="relative w-10 h-10 rounded-xl flex items-center justify-center text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all cursor-pointer group"
        >
          <Gift className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
        </button>
      </div>
    </aside>
  );
};
