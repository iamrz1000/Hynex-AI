import React, { useState } from 'react';
import {
  Search,
  Check,
  ChevronRight,
  Sparkles,
  Zap,
  BrainCircuit,
  Eye,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';

export interface ModelDetail {
  id: string;
  name: string;
  provider: 'HYNEX AI' | 'Google' | 'OpenAI' | 'Anthropic' | 'DeepSeek' | 'ElevenLabs';
  inputs: string[];
  capabilities: string[];
  description: string;
  pricing: string;
  discountBadge?: string;
  isRecent?: boolean;
}

const ALL_MODELS: ModelDetail[] = [
  {
    id: 'gemini-3.1-flash-lite',
    name: 'HYNEX 3.1 Flash',
    provider: 'HYNEX AI',
    inputs: ['Text', 'Image', 'File', 'Audio'],
    capabilities: ['Reasoning', 'Tool calling', 'Vision', 'Voice'],
    description: 'Flagship multi-modal model with ultra-fast latency, 1M context window, and native function calling.',
    pricing: 'Free Tier · $0.00 / M',
    discountBadge: 'Default',
    isRecent: true,
  },
  {
    id: 'gemini-3.8-flash',
    name: 'HYNEX Pro 3.8',
    provider: 'HYNEX AI',
    inputs: ['Text', 'Image', 'File', 'Audio', 'Video'],
    capabilities: ['Reasoning', 'Vision', 'Voice'],
    description: 'Deep analytical reasoning, complex code generation, and multi-hour long document comprehension.',
    pricing: '$0.25 / M',
    discountBadge: 'Pro',
    isRecent: true,
  },
  {
    id: 'gemini-flash-latest',
    name: 'HYNEX Turbo',
    provider: 'Google',
    inputs: ['Text', 'Image'],
    capabilities: ['Tool calling', 'Vision'],
    description: 'High throughput orchestration engine engineered for massive real-time pipelines and agent loops.',
    pricing: '$0.08 / M',
    discountBadge: '50% off',
    isRecent: true,
  },
  {
    id: 'claude-3-7-sonnet',
    name: 'Claude 3.7 Sonnet',
    provider: 'Anthropic',
    inputs: ['Text', 'Image', 'File'],
    capabilities: ['Reasoning', 'Tool calling', 'Vision'],
    description: 'State-of-the-art coding, autonomous software engineering, and human-grade long-form composition.',
    pricing: '$3.00 / M',
    discountBadge: 'Coding Champ',
    isRecent: true,
  },
  {
    id: 'gpt-6-sol',
    name: 'GPT 6.1 Sol',
    provider: 'OpenAI',
    inputs: ['Text', 'Image', 'Audio'],
    capabilities: ['Reasoning', 'Vision', 'Voice'],
    description: 'Near-Astra intelligence at low cost for complex coding, computer use, and agentic workflows.',
    pricing: '$1.69 / M',
    discountBadge: '30% off',
    isRecent: true,
  },
  {
    id: 'deepseek-v4-flash',
    name: 'DeepSeek V4.1 Flash',
    provider: 'DeepSeek',
    inputs: ['Text', 'Image'],
    capabilities: ['Reasoning', 'Vision'],
    description: 'Combines a one-million-token context window with configurable mathematical thinking and code synthesis.',
    pricing: '$0.253 / M',
    discountBadge: '30% off',
    isRecent: true,
  },
  {
    id: 'gpt-6-luna',
    name: 'GPT 6 Luna',
    provider: 'OpenAI',
    inputs: ['Text'],
    capabilities: ['Tool calling'],
    description: 'Fast, lightweight variant for high-volume text classification, routing, and quick agent handoffs.',
    pricing: '$0.084 / M',
    discountBadge: '30% off',
    isRecent: true,
  },
  {
    id: 'veo-2-video',
    name: 'Veo 2 Cinematic Video',
    provider: 'Google',
    inputs: ['Text', 'Image'],
    capabilities: ['Vision'],
    description: 'Hollywood-level high definition video generation with photorealistic physics and fluid camera control.',
    pricing: 'Standard Quota',
    discountBadge: 'Video Leader',
  },
];

interface ModelsViewProps {
  onSelectModel: (modelId: string) => void;
  selectedModel: string;
}

export const ModelsView: React.FC<ModelsViewProps> = ({
  onSelectModel,
  selectedModel,
}) => {
  const [search, setSearch] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<string>('All');
  const [selectedInput, setSelectedInput] = useState<string>('All');
  const [selectedCapability, setSelectedCapability] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'name' | 'pricing'>('newest');

  const providers = ['All', 'HYNEX AI', 'Google', 'Anthropic', 'OpenAI', 'DeepSeek'];
  const inputTypes = ['All', 'Text', 'Image', 'File', 'Audio', 'Video'];
  const capabilities = ['All', 'Reasoning', 'Tool calling', 'Vision', 'Voice'];

  const filteredModels = ALL_MODELS.filter((m) => {
    if (selectedProvider !== 'All' && m.provider !== selectedProvider) return false;
    if (selectedInput !== 'All' && !m.inputs.includes(selectedInput)) return false;
    if (selectedCapability !== 'All' && !m.capabilities.includes(selectedCapability)) return false;
    if (
      search &&
      !m.name.toLowerCase().includes(search.toLowerCase()) &&
      !m.description.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex-1 h-full overflow-hidden flex flex-col md:flex-row bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors">
      {/* Left Filter Sidebar matching ai7_027bcfda.png */}
      <aside className="w-full md:w-56 lg:w-64 shrink-0 border-r border-zinc-200 dark:border-white/10 p-5 overflow-y-auto space-y-6 bg-zinc-50/50 dark:bg-[#0c0c0e]">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
            Filters
          </h2>
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">
            {filteredModels.length} models available
          </p>
        </div>

        {/* Input Types */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            INPUT
          </h3>
          <div className="space-y-1">
            {inputTypes.map((t) => (
              <label
                key={t}
                onClick={() => setSelectedInput(t)}
                className="flex items-center justify-between py-1 px-1.5 rounded-lg text-xs hover:bg-zinc-200/50 dark:hover:bg-white/5 cursor-pointer"
              >
                <span className={selectedInput === t ? 'font-semibold text-purple-600 dark:text-purple-400' : 'text-zinc-600 dark:text-zinc-400'}>
                  {t}
                </span>
                <span
                  className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                    selectedInput === t
                      ? 'border-purple-600 bg-purple-600'
                      : 'border-zinc-300 dark:border-white/20'
                  }`}
                >
                  {selectedInput === t && <Check className="w-2.5 h-2.5 text-white" />}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Capabilities */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            CAPABILITIES
          </h3>
          <div className="space-y-1">
            {capabilities.map((c) => (
              <label
                key={c}
                onClick={() => setSelectedCapability(c)}
                className="flex items-center justify-between py-1 px-1.5 rounded-lg text-xs hover:bg-zinc-200/50 dark:hover:bg-white/5 cursor-pointer"
              >
                <span className={selectedCapability === c ? 'font-semibold text-purple-600 dark:text-purple-400' : 'text-zinc-600 dark:text-zinc-400'}>
                  {c}
                </span>
                <span
                  className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                    selectedCapability === c
                      ? 'border-purple-600 bg-purple-600'
                      : 'border-zinc-300 dark:border-white/20'
                  }`}
                >
                  {selectedCapability === c && <Check className="w-2.5 h-2.5 text-white" />}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Providers */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            PROVIDERS
          </h3>
          <div className="space-y-1">
            {providers.map((p) => (
              <label
                key={p}
                onClick={() => setSelectedProvider(p)}
                className="flex items-center justify-between py-1 px-1.5 rounded-lg text-xs hover:bg-zinc-200/50 dark:hover:bg-white/5 cursor-pointer"
              >
                <span className={selectedProvider === p ? 'font-semibold text-purple-600 dark:text-purple-400' : 'text-zinc-600 dark:text-zinc-400'}>
                  {p}
                </span>
                <span
                  className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                    selectedProvider === p
                      ? 'border-purple-600 bg-purple-600'
                      : 'border-zinc-300 dark:border-white/20'
                  }`}
                >
                  {selectedProvider === p && <Check className="w-2.5 h-2.5 text-white" />}
                </span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
        {/* Top Header Row matching ai7_027bcfda.png */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Models</h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Explore and compare AI models and capabilities.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search models..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-full bg-zinc-100 dark:bg-[#141416] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 text-xs rounded-full bg-zinc-100 dark:bg-[#141416] border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-200 focus:outline-none"
            >
              <option value="newest">Newest</option>
              <option value="name">Name</option>
              <option value="pricing">Price</option>
            </select>
          </div>
        </div>

        {/* Recent Models Carousel Section matching ai7_027bcfda.png */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-white">
            Recent Models
          </h2>
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {ALL_MODELS.filter((m) => m.isRecent).map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => onSelectModel(m.id)}
                className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-[#121214] border border-zinc-200 dark:border-white/10 hover:border-purple-500/50 hover:shadow-xs transition-all text-left w-56 shrink-0 cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-black flex items-center justify-center font-bold text-xs">
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs text-zinc-900 dark:text-white truncate">
                      {m.name}
                    </h3>
                    <p className="text-[10px] text-zinc-400">{m.provider}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1">
                  <span>{m.pricing}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Model Grid matching ai7_027bcfda.png */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredModels.map((m) => {
            const isSelected = selectedModel === m.id;
            return (
              <div
                key={m.id}
                className={`p-5 rounded-2xl bg-zinc-50/80 dark:bg-[#121214] border transition-all space-y-3 flex flex-col justify-between ${
                  isSelected
                    ? 'border-purple-500 ring-2 ring-purple-500/20 shadow-md'
                    : 'border-zinc-200/80 dark:border-white/10 hover:border-purple-500/40'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-xs shadow-xs">
                        {m.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                            {m.name}
                          </h3>
                          {isSelected && (
                            <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.2 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-400">by {m.provider}</p>
                      </div>
                    </div>

                    {/* Capability Tags */}
                    <div className="flex flex-wrap items-center gap-1">
                      {m.capabilities.slice(0, 2).map((cap) => (
                        <span
                          key={cap}
                          className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-200/70 dark:bg-white/10 text-zinc-600 dark:text-zinc-300"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {m.description}
                  </p>
                </div>

                {/* Bottom Row */}
                <div className="flex items-center justify-between pt-2 border-t border-zinc-200/60 dark:border-white/5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      {m.pricing}
                    </span>
                    {m.discountBadge && (
                      <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        {m.discountBadge}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectModel(m.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-zinc-900 text-white dark:bg-white dark:text-black hover:opacity-90 shadow-xs'
                    }`}
                  >
                    <span>{isSelected ? 'Active Model' : 'Chat with this model'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
