import React, { useState } from 'react';
import {
  Sparkles,
  FileText,
  Image as ImageIcon,
  Film,
  Dna,
  Smartphone,
  GitFork,
  ArrowRight,
  Plus,
  Link2,
  Mic,
  Lightbulb,
  Clock,
  Zap,
} from 'lucide-react';

interface BuildViewProps {
  onStartWorkflowPrompt: (prompt: string) => void;
  onOpenDocuments: () => void;
  onOpenImages: () => void;
  onOpenVideo: () => void;
  onOpenCreatorDNA: () => void;
  onOpenMiniApps: () => void;
  onOpenWorkflows: () => void;
  onOpenOnePrompt: () => void;
}

export const BuildView: React.FC<BuildViewProps> = ({
  onStartWorkflowPrompt,
  onOpenDocuments,
  onOpenImages,
  onOpenVideo,
  onOpenCreatorDNA,
  onOpenMiniApps,
  onOpenWorkflows,
  onOpenOnePrompt,
}) => {
  const [promptText, setPromptText] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promptText.trim()) return;
    onStartWorkflowPrompt(
      `Build the following project architecture, digital asset, or autonomous workflow in HYNEX AI:\n\n${promptText.trim()}`
    );
  };

  const buildTools = [
    {
      title: 'Document Studio',
      description: 'Generate academic assignments, PDF reports, PPTX decks, and Excel spreadsheets with smart topic visuals.',
      icon: FileText,
      gradient: 'from-blue-500 to-indigo-600',
      action: onOpenDocuments,
      badge: 'Multi-Format',
    },
    {
      title: 'Nano Banana Image Studio',
      description: 'Cinema-grade photorealism, character consistency, and 8K visual design powered by Banana 2.1.',
      icon: ImageIcon,
      gradient: 'from-amber-500 to-orange-600',
      action: onOpenImages,
      badge: 'Nano 2.1',
    },
    {
      title: 'Veo 2 Video Studio',
      description: 'Create HD text-to-video and image-to-video cinematic scenes with dynamic camera controls.',
      icon: Film,
      gradient: 'from-rose-500 to-pink-600',
      action: onOpenVideo,
      badge: 'Veo 2 HD',
    },
    {
      title: 'Mini-App Builder',
      description: 'Spin up functional single-page web applications, calculation tools, and interactive dashboards.',
      icon: Smartphone,
      gradient: 'from-emerald-500 to-teal-600',
      action: onOpenMiniApps,
      badge: 'No-Code',
    },
    {
      title: 'Workflow Automation',
      description: 'Design multi-step AI pipelines linking web search, truth auditing, and multi-channel actions.',
      icon: GitFork,
      gradient: 'from-purple-500 to-indigo-600',
      action: onOpenWorkflows,
      badge: 'Autonomous',
    },
    {
      title: 'Creator DNA Matrix',
      description: 'Define and preserve your unique stylistic persona, brand voice, and domain identity across all outputs.',
      icon: Dna,
      gradient: 'from-violet-500 to-purple-600',
      action: onOpenCreatorDNA,
      badge: 'Identity',
    },
  ];

  return (
    <div className="flex-1 h-full overflow-y-auto bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 p-4 sm:p-8 flex flex-col items-center justify-between transition-colors">
      <div className="w-full max-w-4xl mx-auto space-y-10 my-auto py-6">
        {/* Orbital Glowing Atom Graphic matching ai4_788ce928.png */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* Concentric Rotating Orbital Rings */}
            <div className="absolute inset-0 rounded-full border-2 border-purple-400/40 animate-[spin_12s_linear_infinite]" />
            <div className="absolute inset-2 rounded-full border-2 border-dashed border-indigo-400/30 animate-[spin_8s_linear_infinite_reverse]" />
            <div className="absolute inset-4 rounded-full border-2 border-purple-500/50 rotate-45" />
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-purple-500/30 text-white z-10">
              <Zap className="w-6 h-6 fill-current animate-pulse" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
              What do you want to build?
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
              Say what you want, tweak a few settings, and launch quickly.
            </p>
          </div>
        </div>

        {/* Workflow Prompt Input Capsule matching ai4_788ce928.png */}
        <div className="w-full max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="relative rounded-3xl bg-zinc-50 dark:bg-[#141416] border border-zinc-200 dark:border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] p-3 transition-all focus-within:ring-2 focus-within:ring-purple-500/40"
          >
            {/* Top helper icons */}
            <div className="flex items-center justify-end gap-2 px-2 pb-1 text-zinc-400">
              <button
                type="button"
                onClick={() => setPromptText('Create a complete multi-step automated market intelligence workflow')}
                className="hover:text-amber-500 transition-colors p-1 cursor-pointer"
                title="Workflow Idea"
              >
                <Lightbulb className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onOpenWorkflows}
                className="hover:text-purple-500 transition-colors p-1 cursor-pointer"
                title="Recent Workflows"
              >
                <Clock className="w-4 h-4" />
              </button>
            </div>

            <textarea
              rows={3}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder="Design an intelligent workflow..."
              className="w-full bg-transparent px-3 py-1 text-sm sm:text-base text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none resize-none"
            />

            {/* Bottom Actions Row */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-200/50 dark:border-white/5">
              <div className="flex items-center gap-2 text-zinc-400">
                <button
                  type="button"
                  onClick={() => setPromptText((prev) => `${prev}\nInclude complete architecture spec:`)}
                  className="p-1.5 rounded-full hover:bg-zinc-200/60 dark:hover:bg-white/10 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                  title="Add Attachment or Context"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setPromptText((prev) => `${prev} [Integrated with real-time web & Google knowledge]`)}
                  className="p-1.5 rounded-full hover:bg-zinc-200/60 dark:hover:bg-white/10 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                  title="Connect Integrations"
                >
                  <Link2 className="w-4 h-4" />
                </button>
              </div>

              <button
                type="submit"
                disabled={!promptText.trim()}
                className={`p-2 rounded-full transition-all cursor-pointer ${
                  promptText.trim()
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-black hover:opacity-90 shadow-xs'
                    : 'bg-zinc-200 dark:bg-white/10 text-zinc-400 cursor-not-allowed'
                }`}
                title="Launch Build Engine"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Quick Launch Studio Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
          {buildTools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={tool.action}
                className="group p-4 rounded-2xl bg-zinc-50/80 dark:bg-[#121214] border border-zinc-200/80 dark:border-white/10 hover:border-purple-500/50 hover:shadow-md transition-all text-left cursor-pointer flex flex-col justify-between h-36"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${tool.gradient} text-white flex items-center justify-center shadow-xs`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-200/80 dark:bg-white/10 text-zinc-700 dark:text-zinc-300">
                    {tool.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-semibold text-xs text-zinc-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-0.5 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
