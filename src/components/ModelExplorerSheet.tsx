import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  Sparkles,
  Lock,
  Check,
  Compass,
} from 'lucide-react';

export interface ModelCardItem {
  id: string;
  name: string;
  badge: 'INCLUDED' | 'UPGRADE';
  provider: string;
  iconBg: string;
  iconLetter: string;
}

const ALL_EXPLORE_MODELS: ModelCardItem[] = [
  { id: 'hynex-x1', name: 'HYNEX-X1', badge: 'INCLUDED', provider: 'HYNEX AI', iconBg: 'bg-purple-600', iconLetter: 'H' },
  { id: 'mercury-2', name: 'Mercury 2', badge: 'INCLUDED', provider: 'Inception', iconBg: 'bg-zinc-800', iconLetter: 'M' },
  { id: 'gpt-6-1-sol', name: 'GPT 6.1 Sol', badge: 'UPGRADE', provider: 'OpenAI', iconBg: 'bg-zinc-900 dark:bg-white/10', iconLetter: 'G' },
  { id: 'gpt-6-1-terra', name: 'GPT 6.1 Terra', badge: 'UPGRADE', provider: 'OpenAI', iconBg: 'bg-zinc-900 dark:bg-white/10', iconLetter: 'G' },
  { id: 'gpt-6-astra', name: 'GPT 6 Astra', badge: 'UPGRADE', provider: 'OpenAI', iconBg: 'bg-zinc-900 dark:bg-white/10', iconLetter: 'G' },
  { id: 'gpt-6-sol', name: 'GPT 6 Sol', badge: 'UPGRADE', provider: 'OpenAI', iconBg: 'bg-zinc-900 dark:bg-white/10', iconLetter: 'G' },
  { id: 'gpt-6-luna', name: 'GPT 6 Luna', badge: 'INCLUDED', provider: 'OpenAI', iconBg: 'bg-zinc-900 dark:bg-white/10', iconLetter: 'G' },
  { id: 'gpt-5-5', name: 'GPT 5.5', badge: 'UPGRADE', provider: 'OpenAI', iconBg: 'bg-zinc-900 dark:bg-white/10', iconLetter: 'G' },
  { id: 'gpt-5-6-sol', name: 'GPT 5.6 Sol', badge: 'UPGRADE', provider: 'OpenAI', iconBg: 'bg-zinc-900 dark:bg-white/10', iconLetter: 'G' },
  { id: 'gpt-5-6-terra', name: 'GPT 5.6 Terra', badge: 'UPGRADE', provider: 'OpenAI', iconBg: 'bg-zinc-900 dark:bg-white/10', iconLetter: 'G' },
  { id: 'gpt-5-6-luna', name: 'GPT 5.6 Luna', badge: 'INCLUDED', provider: 'OpenAI', iconBg: 'bg-zinc-900 dark:bg-white/10', iconLetter: 'G' },
  { id: 'gpt-5-4-thinking', name: 'GPT 5.4 Thinking', badge: 'UPGRADE', provider: 'OpenAI', iconBg: 'bg-zinc-900 dark:bg-white/10', iconLetter: 'G' },
  { id: 'gpt-5-4', name: 'GPT 5.4', badge: 'INCLUDED', provider: 'OpenAI', iconBg: 'bg-zinc-900 dark:bg-white/10', iconLetter: 'G' },
  { id: 'gpt-5-3-codex', name: 'GPT 5.3 Codex', badge: 'UPGRADE', provider: 'OpenAI', iconBg: 'bg-zinc-900 dark:bg-white/10', iconLetter: 'G' },
  { id: 'gpt-5-2', name: 'GPT 5.2', badge: 'INCLUDED', provider: 'OpenAI', iconBg: 'bg-zinc-900 dark:bg-white/10', iconLetter: 'G' },
  { id: 'gpt-5-2-thinking', name: 'GPT 5.2 Thinking', badge: 'UPGRADE', provider: 'OpenAI', iconBg: 'bg-zinc-900 dark:bg-white/10', iconLetter: 'G' },
  { id: 'gpt-5-1', name: 'GPT 5.1', badge: 'INCLUDED', provider: 'OpenAI', iconBg: 'bg-zinc-900 dark:bg-white/10', iconLetter: 'G' },
  { id: 'gpt-5', name: 'GPT 5', badge: 'UPGRADE', provider: 'OpenAI', iconBg: 'bg-zinc-900 dark:bg-white/10', iconLetter: 'G' },
  { id: 'gpt-4o', name: 'GPT 4o', badge: 'UPGRADE', provider: 'OpenAI', iconBg: 'bg-zinc-900 dark:bg-white/10', iconLetter: 'G' },
  { id: 'gemini-3.1-flash-lite', name: 'Gemini 3.1 Flash-Lite', badge: 'INCLUDED', provider: 'Google', iconBg: 'bg-blue-600', iconLetter: '✦' },
  { id: 'gemini-3.8-flash', name: 'Gemini 3.5 Flash', badge: 'UPGRADE', provider: 'Google', iconBg: 'bg-blue-600', iconLetter: '✦' },
  { id: 'gemini-flash-latest', name: 'Gemini 2.5 Flash', badge: 'INCLUDED', provider: 'Google', iconBg: 'bg-blue-600', iconLetter: '✦' },
  { id: 'claude-opus-4-5', name: 'Claude Opus 4.5', badge: 'UPGRADE', provider: 'Anthropic', iconBg: 'bg-amber-700', iconLetter: 'C' },
  { id: 'claude-sonnet-4-5', name: 'Claude Sonnet 4.5', badge: 'UPGRADE', provider: 'Anthropic', iconBg: 'bg-amber-700', iconLetter: 'C' },
  { id: 'claude-haiku-4-5', name: 'Claude Haiku 4.5', badge: 'INCLUDED', provider: 'Anthropic', iconBg: 'bg-amber-700', iconLetter: 'C' },
  { id: 'mistral-large-3', name: 'Mistral Large 3', badge: 'INCLUDED', provider: 'Mistral', iconBg: 'bg-orange-600', iconLetter: 'M' },
  { id: 'kimi-k3', name: 'Kimi K3', badge: 'UPGRADE', provider: 'Moonshot', iconBg: 'bg-zinc-800', iconLetter: 'K' },
  { id: 'glm-5-3', name: 'GLM 5.3', badge: 'INCLUDED', provider: 'Zhipu AI', iconBg: 'bg-emerald-700', iconLetter: 'Z' },
  { id: 'nemotron-ultra', name: 'Nemotron Ultra', badge: 'INCLUDED', provider: 'NVIDIA', iconBg: 'bg-green-600', iconLetter: 'N' },
];

interface ModelExplorerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
  onOpenUpgrade?: () => void;
}

export const ModelExplorerSheet: React.FC<ModelExplorerSheetProps> = ({
  isOpen,
  onClose,
  selectedModel,
  onSelectModel,
  onOpenUpgrade,
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredModels = ALL_EXPLORE_MODELS.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.provider.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full h-[88vh] max-h-[850px] bg-[#121214] text-zinc-100 rounded-t-3xl border-t border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300"
      >
        {/* Top Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1.5 font-bold text-sm">
            <Compass className="w-4 h-4 text-purple-400" />
            <span>Explore</span>
          </div>
          <div className="w-9" />
        </div>

        {/* Scrollable Model Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Upgrade Banner matching video 00:56 */}
          <div className="p-4 rounded-2xl bg-zinc-900/90 border border-white/10 space-y-1.5">
            <p className="text-xs text-zinc-300 leading-relaxed">
              <strong className="text-white">Needs a higher plan:</strong> GPT 6.1 Sol, GPT 6.1 Terra, GPT 6 Astra, GPT 6 Sol, GPT 5.5, GPT 5.6 Sol, GPT 5.4 Thinking, GPT 5.3 Codex, Claude Opus 4.5, Claude Sonnet 4.5, Kimi K3...
            </p>
            {onOpenUpgrade && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenUpgrade();
                }}
                className="text-xs font-semibold text-purple-400 hover:text-purple-300 underline cursor-pointer"
              >
                View all plans
              </button>
            )}
          </div>

          {/* Favorites Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              FAVORITES
            </h3>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  onSelectModel('gemini-3.1-flash-lite');
                  onClose();
                }}
                className="p-3 rounded-2xl bg-zinc-900/80 border border-purple-500/40 hover:border-purple-400 text-center flex flex-col items-center justify-center gap-2 cursor-pointer transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
                  H
                </div>
                <div className="w-full truncate">
                  <p className="text-xs font-bold text-white truncate">HYNEX-X1</p>
                  <span className="text-[10px] font-semibold text-emerald-400 block">
                    INCLUDED
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* All Agents / Models Grid (3 columns matching video 00:57) */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              ALL AGENTS
            </h3>
            <div className="grid grid-cols-3 gap-2.5">
              {filteredModels.map((m) => {
                const isSelected = selectedModel === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      if (m.badge === 'UPGRADE' && onOpenUpgrade) {
                        onClose();
                        onOpenUpgrade();
                      } else {
                        onSelectModel(m.id);
                        onClose();
                      }
                    }}
                    className={`p-3 rounded-2xl bg-zinc-900/80 border transition-all text-center flex flex-col items-center justify-center gap-2 cursor-pointer group ${
                      isSelected
                        ? 'border-purple-500 ring-2 ring-purple-500/30'
                        : 'border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl ${m.iconBg} text-white flex items-center justify-center font-bold text-sm shadow-md group-hover:scale-105 transition-transform`}
                    >
                      {m.iconLetter}
                    </div>
                    <div className="w-full truncate">
                      <p className="text-xs font-semibold text-white truncate">{m.name}</p>
                      {m.badge === 'INCLUDED' ? (
                        <span className="text-[10px] font-semibold text-emerald-400 block">
                          INCLUDED
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-amber-400 flex items-center justify-center gap-0.5">
                          <Lock className="w-2.5 h-2.5" />
                          UPGRADE
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sticky Search bar at bottom matching video 00:56 */}
        <div className="p-3 border-t border-white/10 bg-[#0c0c0e] shrink-0">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search models..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-full bg-zinc-900 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
