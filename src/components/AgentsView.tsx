import React, { useState } from 'react';
import {
  Search,
  Plus,
  ChevronRight,
  Bot,
  Code,
  Sparkles,
  Film,
  GraduationCap,
  Briefcase,
  Eye,
  Megaphone,
  Check,
  X,
  Compass,
} from 'lucide-react';

export interface AgentItem {
  id: string;
  name: string;
  category: string;
  description: string;
  iconBg: string;
  iconColor: string;
  model: string;
  systemPrompt?: string;
  custom?: boolean;
}

interface AgentsViewProps {
  onSelectAgent: (agent: AgentItem) => void;
  onOpenCreateAgent?: () => void;
}

const DEFAULT_AGENTS: AgentItem[] = [
  {
    id: 'hynex-x1',
    name: 'HYNEX-X1',
    category: 'Assistant',
    description: 'HYNEX-X1 is the default autonomous orchestration model for general tasks, synthesis, and deep research.',
    iconBg: 'bg-gradient-to-tr from-purple-500 to-indigo-600',
    iconColor: 'text-white',
    model: 'gemini-3.1-flash-lite',
  },
  {
    id: 'mercury-2',
    name: 'Mercury 2',
    category: 'Coding',
    description: 'High-speed technical reasoning, full-stack architecture, bug eradication, and algorithmic refactoring.',
    iconBg: 'bg-gradient-to-tr from-cyan-500 to-blue-600',
    iconColor: 'text-white',
    model: 'gemini-flash-latest',
  },
  {
    id: 'gpt-6-sol',
    name: 'GPT 6.1 Sol',
    category: 'Assistant',
    description: 'Delivers near-frontier intelligence for multimodal workflows, document generation, and business analysis.',
    iconBg: 'bg-zinc-900 dark:bg-white/10',
    iconColor: 'text-white',
    model: 'gemini-3.8-flash',
  },
  {
    id: 'nano-banana-agent',
    name: 'Nano Banana Visuals',
    category: 'ImageAgents',
    description: 'State-of-the-art photorealistic imagery, cinematic prompt engineering, and visual asset generation.',
    iconBg: 'bg-gradient-to-tr from-amber-500 to-orange-500',
    iconColor: 'text-white',
    model: 'gemini-3.8-flash',
    systemPrompt: 'You are Nano Banana Visuals, an elite AI visual director specialized in ultra-high quality image prompts, camera settings, lighting, and rendering aesthetics.',
  },
  {
    id: 'veo-director',
    name: 'Veo 2 Director',
    category: 'VideoAgents',
    description: 'Autonomous cinematographic agent for text-to-video scene prompts, camera motion, and storyboard planning.',
    iconBg: 'bg-gradient-to-tr from-rose-500 to-purple-600',
    iconColor: 'text-white',
    model: 'gemini-3.8-flash',
    systemPrompt: 'You are Veo 2 Director, an expert AI filmmaker crafting Hollywood-grade cinematic video prompts, keyframes, motion curves, and camera blocking.',
  },
  {
    id: 'gpt-6-astra',
    name: 'GPT 6 Astra',
    category: 'Developer',
    description: 'Frontier code generation, distributed systems, infrastructure automation, and automated test writing.',
    iconBg: 'bg-zinc-900 dark:bg-white/10',
    iconColor: 'text-white',
    model: 'gemini-flash-latest',
  },
  {
    id: 'truth-auditor',
    name: 'Truth Auditor',
    category: 'Education',
    description: 'Zero-hallucination verification engine cross-referencing claims against real-time web knowledge.',
    iconBg: 'bg-gradient-to-tr from-emerald-500 to-teal-600',
    iconColor: 'text-white',
    model: 'gemini-3.8-flash',
    systemPrompt: 'You are Truth Auditor. Analyze facts, identify logical fallacies, verify mathematical statements, and cite verifiable sources.',
  },
  {
    id: 'hynex-vision',
    name: 'Vision Analyst Pro',
    category: 'Vision',
    description: 'Inspects photos, diagrams, UI layouts, scans, and mathematical charts with high-precision computer vision.',
    iconBg: 'bg-gradient-to-tr from-sky-500 to-indigo-500',
    iconColor: 'text-white',
    model: 'gemini-3.8-flash',
  },
  {
    id: 'growth-marketer',
    name: 'Growth & Copy Lead',
    category: 'Marketing',
    description: 'Crafts viral hooks, high-converting product copies, social campaigns, and strategic brand positioning.',
    iconBg: 'bg-gradient-to-tr from-pink-500 to-rose-600',
    iconColor: 'text-white',
    model: 'gemini-3.1-flash-lite',
  },
];

export const AgentsView: React.FC<AgentsViewProps> = ({ onSelectAgent }) => {
  const [subTab, setSubTab] = useState<'explore' | 'my' | 'shared'>('explore');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [agentsList, setAgentsList] = useState<AgentItem[]>(() => {
    try {
      const saved = localStorage.getItem('hynex_custom_agents');
      if (saved) {
        return [...DEFAULT_AGENTS, ...JSON.parse(saved)];
      }
    } catch {}
    return DEFAULT_AGENTS;
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentCategory, setNewAgentCategory] = useState('Assistant');
  const [newAgentDesc, setNewAgentDesc] = useState('');
  const [newAgentPrompt, setNewAgentPrompt] = useState('');

  const categories = [
    'All',
    'Coding',
    'ImageAgents',
    'VideoAgents',
    'Assistant',
    'Education',
    'Developer',
    'Vision',
    'Marketing',
  ];

  const filteredAgents = agentsList.filter((ag) => {
    if (subTab === 'my' && !ag.custom) return false;
    if (subTab === 'shared' && ag.category !== 'Marketing' && ag.category !== 'Education') return false;
    if (category !== 'All' && ag.category !== category) return false;
    if (
      search &&
      !ag.name.toLowerCase().includes(search.toLowerCase()) &&
      !ag.description.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleCreateAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgentName.trim()) return;

    const newAgent: AgentItem = {
      id: `custom-agent-${Date.now()}`,
      name: newAgentName.trim(),
      category: newAgentCategory,
      description: newAgentDesc.trim() || 'Custom intelligent assistant tailored for specific user workflows.',
      iconBg: 'bg-gradient-to-tr from-purple-600 to-indigo-600',
      iconColor: 'text-white',
      model: 'gemini-3.8-flash',
      systemPrompt: newAgentPrompt.trim(),
      custom: true,
    };

    const updated = [newAgent, ...agentsList];
    setAgentsList(updated);
    try {
      const customOnly = updated.filter((a) => a.custom);
      localStorage.setItem('hynex_custom_agents', JSON.stringify(customOnly));
    } catch {}

    setShowCreateModal(false);
    setNewAgentName('');
    setNewAgentDesc('');
    setNewAgentPrompt('');
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 p-4 sm:p-8 transition-colors">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Agents</h1>

            {/* Sub-tabs: Explore, My Agents, Shared */}
            <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-[#141416] rounded-full border border-zinc-200 dark:border-white/10 text-xs font-medium">
              <button
                type="button"
                onClick={() => setSubTab('explore')}
                className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                  subTab === 'explore'
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-black shadow-xs font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                Explore
              </button>
              <button
                type="button"
                onClick={() => setSubTab('my')}
                className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                  subTab === 'my'
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-black shadow-xs font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                My Agents
              </button>
              <button
                type="button"
                onClick={() => setSubTab('shared')}
                className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                  subTab === 'shared'
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-black shadow-xs font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                Shared
              </button>
            </div>
          </div>

          {/* Right: Search & Create Agent */}
          <div className="flex items-center gap-2.5">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search agents..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-full bg-zinc-100 dark:bg-[#141416] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="px-3.5 py-1.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black hover:opacity-90 text-xs font-semibold flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create agent</span>
            </button>
          </div>
        </div>

        {/* Purple Gradient Hero Strip matching AshnaAI */}
        <div className="w-full h-24 sm:h-28 rounded-2xl bg-gradient-to-r from-zinc-900 via-purple-950 to-zinc-900 p-6 flex items-center justify-between shadow-lg border border-purple-500/20 text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-widest text-purple-300 font-bold mb-1">
              HYNEX AGENT ECOSYSTEM
            </p>
            <h2 className="text-lg sm:text-xl font-bold">
              Autonomous Intelligence for Any Domain
            </h2>
          </div>
          <Compass className="w-16 h-16 text-purple-400/20 absolute right-6 -bottom-2" />
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all shrink-0 cursor-pointer ${
                category === cat
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold shadow-xs'
                  : 'bg-zinc-100 dark:bg-[#141416] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200/80 dark:border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Agents Grid (3 columns matching ai2_bc1128f9.png) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredAgents.map((ag) => (
            <div
              key={ag.id}
              onClick={() => onSelectAgent(ag)}
              className="group p-4 rounded-2xl bg-zinc-50/80 dark:bg-[#121214] border border-zinc-200/80 dark:border-white/10 hover:border-purple-500/50 hover:shadow-md transition-all cursor-pointer flex items-center gap-3.5"
            >
              {/* Agent Logo Icon */}
              <div
                className={`w-11 h-11 rounded-xl shrink-0 flex items-center justify-center font-bold text-sm shadow-xs ${ag.iconBg} ${ag.iconColor}`}
              >
                {ag.name.charAt(0)}
              </div>

              {/* Agent Text Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="font-semibold text-sm text-zinc-900 dark:text-white truncate">
                    {ag.name}
                  </h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                  {ag.description}
                </p>
              </div>

              {/* Arrow */}
              <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          ))}

          {filteredAgents.length === 0 && (
            <div className="col-span-full py-16 text-center text-zinc-400">
              <Bot className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">No agents found for this category.</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Agent Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-md p-6 rounded-2xl bg-white dark:bg-[#141416] border border-zinc-200 dark:border-white/10 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/10 pb-3">
              <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                Create New Agent
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAgent} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Agent Name
                </label>
                <input
                  type="text"
                  required
                  value={newAgentName}
                  onChange={(e) => setNewAgentName(e.target.value)}
                  placeholder="e.g. Legal Contract Reviewer"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Category
                </label>
                <select
                  value={newAgentCategory}
                  onChange={(e) => setNewAgentCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                >
                  {categories.filter((c) => c !== 'All').map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  value={newAgentDesc}
                  onChange={(e) => setNewAgentDesc(e.target.value)}
                  placeholder="What does this agent do?"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  System Instructions &amp; Persona
                </label>
                <textarea
                  rows={3}
                  value={newAgentPrompt}
                  onChange={(e) => setNewAgentPrompt(e.target.value)}
                  placeholder="Detailed guidelines, response format, and domain constraints..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-xs cursor-pointer"
                >
                  Save Agent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
