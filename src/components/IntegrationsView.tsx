import React, { useState } from 'react';
import {
  Search,
  Link2,
  Cpu,
  Key,
  Wrench,
  CheckCircle2,
  Clock,
  Info,
  ExternalLink,
  X,
  Check,
} from 'lucide-react';

export interface ConnectorItem {
  id: string;
  name: string;
  category: string;
  badge: 'Connected' | 'Not connected' | 'Desktop App required' | 'Coming soon';
  description: string;
  iconBg: string;
  iconLetter: string;
}

const DEFAULT_CONNECTORS: ConnectorItem[] = [
  {
    id: 'tally',
    name: 'Tally Connector',
    category: 'Finance',
    badge: 'Desktop App required',
    description: 'Control Tally through HYNEX AI to do automated ledger entry, auditing, GST invoicing, balance sheet preparation, and much more.',
    iconBg: 'bg-red-600',
    iconLetter: 'T',
  },
  {
    id: 'bitbucket',
    name: 'Bitbucket',
    category: 'Development',
    badge: 'Not connected',
    description: 'Connect Bitbucket Cloud with HYNEX AI to explore workspaces and repositories, read source files, create branches, and inspect build status.',
    iconBg: 'bg-blue-600',
    iconLetter: 'B',
  },
  {
    id: 'confluence',
    name: 'Confluence',
    category: 'Productivity',
    badge: 'Not connected',
    description: "Connect Confluence with HYNEX AI to securely search and read your organization's wikis, product specs, and internal knowledge bases.",
    iconBg: 'bg-sky-700',
    iconLetter: 'C',
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    category: 'Storage',
    badge: 'Not connected',
    description: 'Programmatically upload, download, and organize files in Dropbox, managing team sharing permissions and cloud backups.',
    iconBg: 'bg-blue-500',
    iconLetter: 'D',
  },
  {
    id: 'dynamodb',
    name: 'DynamoDB',
    category: 'Database',
    badge: 'Not connected',
    description: 'Connect Amazon DynamoDB with read-only table discovery, DescribeTable, GetItem, and bounded Scan operations via secure credentials.',
    iconBg: 'bg-indigo-600',
    iconLetter: 'D',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    category: 'Marketing',
    badge: 'Coming soon',
    description: 'Connect Facebook Pages to list Pages, read profile and posts, publish text, links, photos and videos directly with AI review checkpoints.',
    iconBg: 'bg-blue-700',
    iconLetter: 'F',
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Development',
    badge: 'Connected',
    description: 'Connect GitHub with HYNEX AI to explore repositories, inspect pull requests, commit changes, and debug issues collaboratively.',
    iconBg: 'bg-zinc-900 dark:bg-white/10',
    iconLetter: 'G',
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    category: 'Development',
    badge: 'Not connected',
    description: 'Connect GitLab to explore groups and repositories, analyze merge requests, review pipeline runs, and compare commits.',
    iconBg: 'bg-orange-600',
    iconLetter: 'G',
  },
  {
    id: 'gmail',
    name: 'Gmail',
    category: 'Productivity',
    badge: 'Connected',
    description: 'Streamline your inbox with HYNEX AI—quickly find messages, summarize threads, categorize inquiries, and draft contextual replies.',
    iconBg: 'bg-red-500',
    iconLetter: 'M',
  },
  {
    id: 'adsense',
    name: 'Google AdSense',
    category: 'Marketing',
    badge: 'Not connected',
    description: 'Connect Google AdSense with full API access to view revenue metrics, ad clients, ad units, and CTR analytics over time.',
    iconBg: 'bg-amber-600',
    iconLetter: 'A',
  },
  {
    id: 'gdrive',
    name: 'Google Drive',
    category: 'Storage',
    badge: 'Connected',
    description: 'Search, index, and query documents, Google Docs, spreadsheets, and PDF files stored across your personal or team Google Drive.',
    iconBg: 'bg-emerald-600',
    iconLetter: 'D',
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'Communication',
    badge: 'Not connected',
    description: 'Send notifications, summarize channel discussions, and trigger autonomous agent task executions from designated Slack workspaces.',
    iconBg: 'bg-purple-700',
    iconLetter: 'S',
  },
];

export const IntegrationsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'connectors' | 'mcp' | 'api_keys' | 'custom_tools'>('connectors');
  const [search, setSearch] = useState('');
  const [connectors, setConnectors] = useState<ConnectorItem[]>(DEFAULT_CONNECTORS);
  const [selectedConnector, setSelectedConnector] = useState<ConnectorItem | null>(null);

  const filteredConnectors = connectors.filter((c) => {
    if (!search) return true;
    return (
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
    );
  });

  const toggleConnection = (id: string) => {
    setConnectors((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextBadge = c.badge === 'Connected' ? 'Not connected' : 'Connected';
          return { ...c, badge: nextBadge };
        }
        return c;
      })
    );
    if (selectedConnector?.id === id) {
      setSelectedConnector((prev) =>
        prev
          ? {
              ...prev,
              badge: prev.badge === 'Connected' ? 'Not connected' : 'Connected',
            }
          : null
      );
    }
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 p-4 sm:p-8 transition-colors">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Title matching ai6_4da6b58b.png */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Integrations</h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Connect apps, APIs, and custom tools
            </p>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-[#141416] rounded-full border border-zinc-200 dark:border-white/10 text-xs font-medium">
            <button
              type="button"
              onClick={() => setActiveTab('connectors')}
              className={`px-3.5 py-1 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'connectors'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>Connectors</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('mcp')}
              className={`px-3.5 py-1 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'mcp'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>MCP (Beta)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('api_keys')}
              className={`px-3.5 py-1 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'api_keys'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span>API Keys</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('custom_tools')}
              className={`px-3.5 py-1 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'custom_tools'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Custom Tools</span>
            </button>
          </div>
        </div>

        {/* Search connectors */}
        <div className="flex justify-end">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search connectors..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-full bg-zinc-100 dark:bg-[#141416] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* 2-Column Grid of Connectors matching ai6_4da6b58b.png */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredConnectors.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-2xl bg-zinc-50/80 dark:bg-[#121214] border border-zinc-200/80 dark:border-white/10 hover:border-purple-500/40 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl ${c.iconBg} text-white flex items-center justify-center font-bold text-sm shadow-xs`}
                  >
                    {c.iconLetter}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                      {c.name}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
                      c.badge === 'Connected'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                        : c.badge === 'Desktop App required'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                        : c.badge === 'Coming soon'
                        ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30'
                        : 'bg-zinc-200/60 dark:bg-white/10 text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-white/10'
                    }`}
                  >
                    {c.badge === 'Connected' && <Check className="w-3 h-3" />}
                    <span>{c.badge}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedConnector(c)}
                    className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
                    title="Connector details"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {c.description}
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => toggleConnection(c.id)}
                  className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    c.badge === 'Connected'
                      ? 'bg-zinc-200 dark:bg-white/10 text-zinc-700 dark:text-zinc-300 hover:bg-red-500 hover:text-white'
                      : 'bg-zinc-900 text-white dark:bg-white dark:text-black hover:opacity-90 shadow-xs'
                  }`}
                >
                  {c.badge === 'Connected' ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Modal */}
      {selectedConnector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-md p-6 rounded-2xl bg-white dark:bg-[#141416] border border-zinc-200 dark:border-white/10 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-lg ${selectedConnector.iconBg} text-white flex items-center justify-center text-xs font-bold`}
                >
                  {selectedConnector.iconLetter}
                </div>
                <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                  {selectedConnector.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedConnector(null)}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {selectedConnector.description}
            </p>

            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-white/10 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-400">Current Status:</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {selectedConnector.badge}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Category:</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {selectedConnector.category}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Security Scopes:</span>
                <span className="font-mono text-zinc-800 dark:text-zinc-200">
                  OAuth2 Client PKCE / RBAC
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedConnector(null)}
                className="px-4 py-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => toggleConnection(selectedConnector.id)}
                className="px-4 py-1.5 text-xs font-semibold rounded-xl bg-purple-600 text-white hover:bg-purple-700 cursor-pointer shadow-xs"
              >
                {selectedConnector.badge === 'Connected' ? 'Disconnect Service' : 'Authorize Connection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
