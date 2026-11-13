import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  Check,
  ExternalLink,
  Info,
  Plug,
  Layers,
  Sparkles,
} from 'lucide-react';

export interface ConnectorItem {
  id: string;
  name: string;
  category: 'Connectors' | 'MCP';
  status: 'Not connected' | 'Connected' | 'Desktop App required' | 'Coming soon';
  description: string;
  iconBg: string;
  iconChar: string;
}

const ALL_CONNECTORS: ConnectorItem[] = [
  {
    id: 'tally',
    name: 'Tally Connector',
    category: 'Connectors',
    status: 'Desktop App required',
    description: 'Control Tally through HYNEX AI to do automated entry, auditing, GST invoicing, balance sheet preparation, and much more.',
    iconBg: 'bg-red-500/10 text-red-500 border border-red-500/20',
    iconChar: 'T',
  },
  {
    id: 'bitbucket',
    name: 'Bitbucket',
    category: 'Connectors',
    status: 'Not connected',
    description: 'Connect Bitbucket Cloud with HYNEX AI to explore your workspaces and repositories, read source files, create or update pull requests.',
    iconBg: 'bg-blue-600/10 text-blue-500 border border-blue-500/20',
    iconChar: 'B',
  },
  {
    id: 'confluence',
    name: 'Confluence',
    category: 'Connectors',
    status: 'Not connected',
    description: 'Connect Confluence with HYNEX AI to securely search and read your organization\'s wikis, product specs, and HR policies.',
    iconBg: 'bg-sky-500/10 text-sky-400 border border-sky-500/20',
    iconChar: 'C',
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    category: 'Connectors',
    status: 'Not connected',
    description: 'Programmatically upload, download, and organize files in Dropbox, efficiently manage sharing permissions, and access team collaboration files.',
    iconBg: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
    iconChar: 'D',
  },
  {
    id: 'dynamodb',
    name: 'DynamoDB',
    category: 'Connectors',
    status: 'Not connected',
    description: 'Connect Amazon DynamoDB with read-only table discovery, DescribeTable, GetItem, Query, and bounded Scan operations.',
    iconBg: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    iconChar: '⚡',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    category: 'Connectors',
    status: 'Coming soon',
    description: 'Connect Facebook Pages with HYNEX AI to list Pages, read profile and posts, publish text, photos and videos directly.',
    iconBg: 'bg-blue-600/10 text-blue-500 border border-blue-600/20',
    iconChar: 'f',
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Connectors',
    status: 'Not connected',
    description: 'Connect GitHub with HYNEX AI to explore your repositories and organizations, read code and project files, create pull requests and manage issues.',
    iconBg: 'bg-zinc-800 text-zinc-100 border border-zinc-700',
    iconChar: '🐙',
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    category: 'Connectors',
    status: 'Not connected',
    description: 'Connect GitLab (GitLab.com or your self-managed instance) with HYNEX AI to explore projects, read source files, and review merge requests.',
    iconBg: 'bg-orange-500/10 text-orange-500 border border-orange-500/20',
    iconChar: '🦊',
  },
  {
    id: 'gmail',
    name: 'Gmail',
    category: 'Connectors',
    status: 'Coming soon',
    description: 'Streamline your inbox with HYNEX AI—quickly find, organize, and draft replies to emails to stay productive.',
    iconBg: 'bg-red-500/10 text-red-400 border border-red-500/20',
    iconChar: 'M',
  },
  {
    id: 'google-adsense',
    name: 'Google AdSense',
    category: 'Connectors',
    status: 'Not connected',
    description: 'Connect Google AdSense with full API access to view and manage your account: reports, sites, ad clients, ad units, and channels.',
    iconBg: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    iconChar: 'G',
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    category: 'Connectors',
    status: 'Not connected',
    description: 'Search, index, and query documents, spreadsheets, slides, and files directly stored inside your Google Drive account.',
    iconBg: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    iconChar: '▲',
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'Connectors',
    status: 'Not connected',
    description: 'Send messages, read channels, and automate workflow responses across your team\'s Slack workspaces.',
    iconBg: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
    iconChar: '#',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'Connectors',
    status: 'Not connected',
    description: 'Query customer subscriptions, invoices, payment intents, refunds, and financial metrics in real-time.',
    iconBg: 'bg-violet-500/10 text-violet-400 border border-violet-500/20',
    iconChar: 'S',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    category: 'Connectors',
    status: 'Not connected',
    description: 'Send WhatsApp updates, customer notifications, and automated chat alerts through the WhatsApp Cloud API.',
    iconBg: 'bg-green-500/10 text-green-400 border border-green-500/20',
    iconChar: 'W',
  },
];

interface ConnectorsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect?: (connectorId: string) => void;
}

export const ConnectorsSheet: React.FC<ConnectorsSheetProps> = ({
  isOpen,
  onClose,
  onConnect,
}) => {
  const [activeTab, setActiveTab] = useState<'Connectors' | 'MCP'>('Connectors');
  const [search, setSearch] = useState('');
  const [connectedIds, setConnectedIds] = useState<string[]>([]);
  const [activeInfo, setActiveInfo] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = ALL_CONNECTORS.filter((c) => {
    const matchesTab = c.category === activeTab;
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleToggle = (c: ConnectorItem) => {
    if (c.status === 'Coming soon') return;
    if (connectedIds.includes(c.id)) {
      setConnectedIds((prev) => prev.filter((id) => id !== c.id));
    } else {
      setConnectedIds((prev) => [...prev, c.id]);
      if (onConnect) onConnect(c.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full h-[88vh] max-h-[850px] bg-[#121214] text-zinc-100 rounded-t-3xl border-t border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
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

          {/* Connectors & MCP Tabs */}
          <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-full border border-white/10">
            <button
              type="button"
              onClick={() => setActiveTab('Connectors')}
              className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'Connectors'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Connectors
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('MCP')}
              className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'MCP'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              MCP (Beta)
            </button>
          </div>

          <div className="w-9" />
        </div>

        {/* Content list matching video 00:39 - 00:51 */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {activeTab === 'MCP' && (
            <div className="p-8 text-center space-y-3 rounded-2xl bg-zinc-900/40 border border-white/5">
              <Layers className="w-8 h-8 text-purple-400 mx-auto" />
              <h3 className="text-sm font-semibold text-white">Model Context Protocol (MCP)</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Connect your local or remote MCP servers to bring live database introspection, filesystem tools, and custom execution servers to HYNEX AI.
              </p>
            </div>
          )}

          {activeTab === 'Connectors' && (
            <div className="space-y-2.5">
              {filtered.map((item) => {
                const isConnected = connectedIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className="p-3.5 sm:p-4 rounded-2xl bg-zinc-900/70 border border-white/5 hover:border-white/10 transition-all flex flex-col gap-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${item.iconBg}`}
                        >
                          {item.iconChar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-white">{item.name}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status / Connect Button */}
                      <button
                        type="button"
                        onClick={() => handleToggle(item)}
                        disabled={item.status === 'Coming soon'}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                          item.status === 'Coming soon'
                            ? 'bg-zinc-800 text-zinc-400 border-zinc-700 opacity-60 cursor-not-allowed'
                            : isConnected
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                            : item.status === 'Desktop App required'
                            ? 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                            : 'bg-zinc-800/80 text-zinc-300 border-zinc-700 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {isConnected ? 'Connected' : item.status}
                      </button>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed pl-12">
                      {item.description}
                    </p>
                  </div>
                );
              })}

              {filtered.length === 0 && (
                <div className="py-12 text-center text-xs text-zinc-400">
                  No connectors match your search query.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Search Bar matching video */}
        <div className="p-3 border-t border-white/10 bg-[#0c0c0e] shrink-0">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search connectors..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-full bg-zinc-900 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
