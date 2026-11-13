import React, { useState } from 'react';
import {
  Calendar,
  RefreshCw,
  Plus,
  Clock,
  Play,
  Pause,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  Bot,
} from 'lucide-react';

export interface ScheduledTask {
  id: string;
  title: string;
  instruction: string;
  targetModel: string;
  schedule: string;
  status: 'active' | 'needs_approval' | 'paused' | 'failed' | 'completed';
  lastRun?: string;
  createdAt: string;
}

interface TasksViewProps {
  onRunTaskNow: (task: ScheduledTask) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({ onRunTaskNow }) => {
  const [activeFilter, setActiveFilter] = useState<
    'active' | 'needs_approval' | 'paused' | 'failed' | 'completed' | 'all'
  >('active');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [tasks, setTasks] = useState<ScheduledTask[]>(() => {
    try {
      const saved = localStorage.getItem('hynex_scheduled_tasks');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'task-1',
        title: 'Daily Tech & AI News Digest',
        instruction: 'Search the web for top 5 AI breakthroughs today, summarize in 3 bullet points each with source links.',
        targetModel: 'HYNEX 3.1 Flash',
        schedule: 'Daily at 9:00 AM',
        status: 'active',
        lastRun: 'Today at 9:00 AM',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'task-2',
        title: 'Weekly Competitive Intelligence Summary',
        instruction: 'Review updates to LLM leaderboards, pricing drops, and new SDK releases.',
        targetModel: 'Claude 3.7 Sonnet',
        schedule: 'Every Monday',
        status: 'active',
        lastRun: '3 days ago',
        createdAt: new Date().toISOString(),
      },
    ];
  });

  const [showModal, setShowModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskInstruction, setTaskInstruction] = useState('');
  const [taskModel, setTaskModel] = useState('HYNEX 3.1 Flash');
  const [taskSchedule, setTaskSchedule] = useState('Daily at 9:00 AM');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim() || !taskInstruction.trim()) return;

    const newTask: ScheduledTask = {
      id: `task-${Date.now()}`,
      title: taskTitle.trim(),
      instruction: taskInstruction.trim(),
      targetModel: taskModel,
      schedule: taskSchedule,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    const updated = [newTask, ...tasks];
    setTasks(updated);
    try {
      localStorage.setItem('hynex_scheduled_tasks', JSON.stringify(updated));
    } catch {}

    setShowModal(false);
    setTaskTitle('');
    setTaskInstruction('');
  };

  const handleToggleStatus = (id: string) => {
    const updated = tasks.map((t) => {
      if (t.id === id) {
        return {
          ...t,
          status: (t.status === 'active' ? 'paused' : 'active') as ScheduledTask['status'],
        };
      }
      return t;
    });
    setTasks(updated);
    try {
      localStorage.setItem('hynex_scheduled_tasks', JSON.stringify(updated));
    } catch {}
  };

  const handleDeleteTask = (id: string) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    try {
      localStorage.setItem('hynex_scheduled_tasks', JSON.stringify(updated));
    } catch {}
  };

  const filteredTasks = tasks.filter((t) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'failed') return t.status === 'failed';
    if (activeFilter === 'completed') return t.status === 'completed';
    return t.status === activeFilter;
  });

  return (
    <div className="flex-1 h-full overflow-y-auto bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 p-4 sm:p-8 transition-colors">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header matching ai3_9d82af5f.png */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Tasks</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Scheduled
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Run an agent or model automatically at the time you choose.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRefresh}
              className="px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/5 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 text-zinc-500 ${isRefreshing ? 'animate-spin' : ''}`}
              />
              <span>Refresh</span>
            </button>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="px-4 py-1.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black hover:opacity-90 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New task</span>
            </button>
          </div>
        </div>

        {/* Filter Pills matching AshnaAI */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'active', label: 'Active' },
            { id: 'needs_approval', label: 'Needs approval' },
            { id: 'paused', label: 'Paused' },
            { id: 'failed', label: 'Failed provisioning' },
            { id: 'completed', label: 'Completed one-time' },
            { id: 'all', label: 'All' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveFilter(item.id as any)}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer shrink-0 ${
                activeFilter === item.id
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold shadow-xs'
                  : 'bg-zinc-100 dark:bg-[#141416] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Tasks Container or Empty State matching ai3_9d82af5f.png */}
        {filteredTasks.length === 0 ? (
          <div className="rounded-3xl border border-zinc-200/90 dark:border-white/10 bg-zinc-50/70 dark:bg-[#121214] p-12 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Calendar className="w-7 h-7" />
            </div>
            <div className="space-y-1.5 max-w-md">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                Create a task to run while you're away
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Create a task with an instruction, agent or model target, and run time. HYNEX AI will
                start the chat automatically.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="px-5 py-2 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black hover:opacity-90 text-xs font-semibold shadow-xs cursor-pointer transition-all"
            >
              New task
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#121214] border border-zinc-200/80 dark:border-white/10 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        task.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                    />
                    <h3 className="font-semibold text-sm text-zinc-900 dark:text-white truncate">
                      {task.title}
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-white/10 text-zinc-600 dark:text-zinc-400 font-mono">
                      {task.schedule}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                    {task.instruction}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-zinc-400 pt-1">
                    <span>Target: <strong className="text-zinc-700 dark:text-zinc-300">{task.targetModel}</strong></span>
                    {task.lastRun && <span>· Last run: {task.lastRun}</span>}
                  </div>
                </div>

                {/* Task Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onRunTaskNow(task)}
                    className="px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-500/10 hover:bg-purple-100 text-purple-600 dark:text-purple-400 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run Now</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(task.id)}
                    className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-500 transition-colors cursor-pointer"
                    title={task.status === 'active' ? 'Pause Task' : 'Resume Task'}
                  >
                    {task.status === 'active' ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                    title="Delete Task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Task Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-md p-6 rounded-2xl bg-white dark:bg-[#141416] border border-zinc-200 dark:border-white/10 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/10 pb-3">
              <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                Schedule Autonomous Task
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTask} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Task Name
                </label>
                <input
                  type="text"
                  required
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="e.g. Daily Tech Radar"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Instruction / Prompt
                </label>
                <textarea
                  rows={3}
                  required
                  value={taskInstruction}
                  onChange={(e) => setTaskInstruction(e.target.value)}
                  placeholder="What prompt should HYNEX AI execute at the scheduled time?"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Target Model
                  </label>
                  <select
                    value={taskModel}
                    onChange={(e) => setTaskModel(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="HYNEX 3.1 Flash">HYNEX 3.1 Flash</option>
                    <option value="Claude 3.7 Sonnet">Claude 3.7 Sonnet</option>
                    <option value="GPT 6.1 Sol">GPT 6.1 Sol</option>
                    <option value="Veo 2 Director">Veo 2 Director</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Schedule Frequency
                  </label>
                  <select
                    value={taskSchedule}
                    onChange={(e) => setTaskSchedule(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="Daily at 9:00 AM">Daily at 9:00 AM</option>
                    <option value="Every 4 Hours">Every 4 Hours</option>
                    <option value="Every Monday">Every Monday</option>
                    <option value="One-Time (Run Today)">One-Time (Run Today)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-xs cursor-pointer"
                >
                  Schedule Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
