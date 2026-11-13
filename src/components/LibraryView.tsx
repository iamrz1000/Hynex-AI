import React, { useState, useEffect } from 'react';
import {
  Search,
  FileText,
  Image as ImageIcon,
  Film,
  Download,
  Trash2,
  ExternalLink,
  Sparkles,
  Layers,
  FolderOpen,
} from 'lucide-react';
import { GeneratedImage } from '../types/index.ts';

export interface LibraryItem {
  id: string;
  title: string;
  type: 'infographic' | 'design' | 'image' | 'video' | 'document' | 'prompt';
  url?: string;
  createdAt: string;
  fileFormat?: string;
  fileSize?: string;
  contentSnippet?: string;
}

interface LibraryViewProps {
  onOpenItem?: (item: LibraryItem) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({ onOpenItem }) => {
  const [filter, setFilter] = useState<
    'all' | 'infographics' | 'designs' | 'images' | 'videos' | 'documents' | 'prompts'
  >('all');
  const [search, setSearch] = useState('');
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLibraryItems();
  }, []);

  const fetchLibraryItems = async () => {
    setLoading(true);
    const gathered: LibraryItem[] = [];

    // 1. Fetch generated documents from server
    try {
      const res = await fetch('/api/documents/files');
      if (res.ok) {
        const data = await res.json();
        if (data.files && Array.isArray(data.files)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.files.forEach((f: any) => {
            gathered.push({
              id: f.id,
              title: f.title || f.filename,
              type: 'document',
              url: `/api/documents/files/${f.id}/download`,
              createdAt: f.created_at || new Date().toISOString(),
              fileFormat: f.format?.toUpperCase(),
              fileSize: f.file_size ? `${Math.round(f.file_size / 1024)} KB` : undefined,
            });
          });
        }
      }
    } catch {}

    // 2. Fetch images and videos from localStorage or state
    try {
      const savedVideos = localStorage.getItem('hynex_user_videos');
      if (savedVideos) {
        const videos = JSON.parse(savedVideos);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        videos.forEach((v: any) => {
          gathered.push({
            id: v.id,
            title: v.prompt || 'Generated Veo Video',
            type: 'video',
            url: v.video_url,
            createdAt: v.created_at || new Date().toISOString(),
            fileFormat: 'MP4',
          });
        });
      }
    } catch {}

    // 3. Fallback sample items if fresh install
    if (gathered.length === 0) {
      gathered.push(
        {
          id: 'sample-doc-1',
          title: 'Class 11 Biology: The Living World Assignment',
          type: 'document',
          fileFormat: 'DOCX',
          fileSize: '142 KB',
          createdAt: new Date().toISOString(),
          contentSnippet: 'Academic assignment complete with title page, cellular organization diagrams, and classification keys.',
        },
        {
          id: 'sample-img-1',
          title: 'Hyper-Realistic Cybernetic Tiger in Neon Rainforest',
          type: 'image',
          fileFormat: 'PNG',
          fileSize: '2.4 MB',
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          contentSnippet: 'Nano Banana 2.1 cinematic photorealism render.',
        },
        {
          id: 'sample-infographic-1',
          title: 'Global Renewable Energy Transition Infographic',
          type: 'infographic',
          fileFormat: 'PDF',
          fileSize: '890 KB',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          contentSnippet: 'Solar & Wind adoption trajectory comparison breakdown.',
        }
      );
    }

    setItems(gathered);
    setLoading(false);
  };

  const filteredItems = items.filter((item) => {
    if (filter === 'infographics' && item.type !== 'infographic') return false;
    if (filter === 'designs' && item.type !== 'design') return false;
    if (filter === 'images' && item.type !== 'image') return false;
    if (filter === 'videos' && item.type !== 'video') return false;
    if (filter === 'documents' && item.type !== 'document') return false;
    if (filter === 'prompts' && item.type !== 'prompt') return false;
    if (
      search &&
      !item.title.toLowerCase().includes(search.toLowerCase()) &&
      !item.contentSnippet?.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex-1 h-full overflow-y-auto bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 p-4 sm:p-8 transition-colors">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Row matching ai5_cec24943.png */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Library</h1>

          {/* Search bar on right */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-full bg-zinc-100 dark:bg-[#141416] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Category Pills Bar matching ai5_cec24943.png */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'All', icon: Layers },
            { id: 'infographics', label: 'Infographics', icon: Sparkles },
            { id: 'designs', label: 'Designs', icon: Sparkles },
            { id: 'images', label: 'Images', icon: ImageIcon },
            { id: 'videos', label: 'Videos', icon: Film },
            { id: 'documents', label: 'Documents', icon: FileText },
            { id: 'prompts', label: 'Prompts', icon: FileText },
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilter(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-full font-medium transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  filter === cat.id
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold shadow-xs'
                    : 'bg-zinc-100 dark:bg-[#141416] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="py-24 text-center text-zinc-400 text-sm">
            Loading your digital library...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-24 text-center text-zinc-400 dark:text-zinc-500 text-sm font-medium">
            No items for this filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-zinc-50/80 dark:bg-[#121214] border border-zinc-200/80 dark:border-white/10 hover:border-purple-500/40 hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold">
                      {item.fileFormat || item.type}
                    </span>
                    {item.fileSize && (
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {item.fileSize}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-sm text-zinc-900 dark:text-white line-clamp-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {item.title}
                  </h3>
                  {item.contentSnippet && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                      {item.contentSnippet}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-200/60 dark:border-white/5 text-xs">
                  <span className="text-[11px] text-zinc-400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  {item.url && (
                    <a
                      href={item.url}
                      download
                      className="px-2.5 py-1 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-black hover:opacity-85 text-[11px] font-semibold flex items-center gap-1 transition-all"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
