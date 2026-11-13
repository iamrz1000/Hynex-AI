import React, { useState, useEffect } from 'react';
import {
  User as UserIcon,
  Trash2,
  Copy,
  Check,
  Edit2,
  Calendar,
  Phone,
  Mail,
  Building,
  GraduationCap,
  Sparkles,
  Sun,
  Moon,
  Laptop,
} from 'lucide-react';
import { User, UsageState } from '../types/index.ts';

interface AccountProfileViewProps {
  currentUser: User | null;
  usage: UsageState | null;
  theme: 'dark' | 'light';
  onThemeChange: (theme: 'dark' | 'light') => void;
  onOpenUpgrade?: () => void;
  onLogout?: () => void;
}

export const AccountProfileView: React.FC<AccountProfileViewProps> = ({
  currentUser,
  usage,
  theme,
  onThemeChange,
  onOpenUpgrade,
  onLogout,
}) => {
  const [subSection, setSubSection] = useState<'profile' | 'security' | 'memory' | 'subscription' | 'usages'>('profile');
  const [displayName, setDisplayName] = useState(currentUser?.displayName || 'User');
  const [email, setEmail] = useState(currentUser?.email || 'user@hynex.ai');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('US +1');
  const [dob, setDob] = useState('');
  const [profession, setProfession] = useState('Member');
  const [organization, setOrganization] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser?.displayName) setDisplayName(currentUser.displayName);
    if (currentUser?.email) setEmail(currentUser.email);
  }, [currentUser]);

  const referralCode = 'HYNEX790';
  const referralLink = `https://ais-dev-mqjb24gonk6zghybggwc5j-190037377446.asia-east1.run.app/signup?referral_code=${referralCode}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveToast('Profile settings saved successfully.');
    setTimeout(() => setSaveToast(null), 3000);
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 p-4 sm:p-8 transition-colors">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Breadcrumb matching ai8_50cac82f.png */}
        <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          ACCOUNT / PROFILE
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: User Profile Card & Navigation */}
          <aside className="md:col-span-4 lg:col-span-3 space-y-6">
            {/* User Card */}
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#121214] border border-zinc-200/80 dark:border-white/10 text-center space-y-3">
              <div className="relative inline-block">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg mx-auto">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#121214]" />
              </div>

              <div>
                <h2 className="font-bold text-base text-zinc-900 dark:text-white">
                  {displayName}
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                  {email}
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                <Sparkles className="w-3 h-3" />
                <span>{usage?.isAdmin ? 'Admin Unlimited Plan' : 'Free Standard Plan'}</span>
              </div>
            </div>

            {/* Sub-Nav menu matching ai8_50cac82f.png */}
            <div className="space-y-4 text-xs font-medium text-zinc-600 dark:text-zinc-400">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-3 mb-1">
                  ACCOUNT
                </p>
                <div className="space-y-0.5">
                  <button
                    type="button"
                    onClick={() => setSubSection('profile')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all cursor-pointer ${
                      subSection === 'profile'
                        ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold'
                        : 'hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <UserIcon className="w-4 h-4" />
                      <span>Profile</span>
                    </span>
                    {subSection === 'profile' && (
                      <span className="w-1.5 h-4 rounded-full bg-purple-600" />
                    )}
                  </button>
                </div>
              </div>

              {onLogout && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 dark:text-red-400 font-semibold transition-all cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </aside>

          {/* Right Column: Profile Form, Referral & Color Mode Selector */}
          <main className="md:col-span-8 lg:col-span-9 space-y-6">
            {saveToast && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold animate-in fade-in">
                {saveToast}
              </div>
            )}

            {/* Top row: Avatar & Referral Invite Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Photo / Avatar Section */}
              <div className="lg:col-span-5 flex flex-col items-center sm:items-start space-y-3">
                <div className="w-24 h-24 rounded-3xl bg-zinc-100 dark:bg-[#141416] border border-zinc-200 dark:border-white/10 flex items-center justify-center text-3xl font-bold text-zinc-700 dark:text-zinc-300 shadow-xs">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-[#141416] rounded-full border border-zinc-200 dark:border-white/10 text-xs">
                  <span className="px-3 py-1 rounded-full bg-white dark:bg-[#0c0c0e] font-semibold shadow-xs">
                    Photo
                  </span>
                  <span className="px-3 py-1 text-zinc-500 cursor-pointer">Avatar</span>
                </div>
              </div>

              {/* Referral Invite Card matching ai8_50cac82f.png */}
              <div className="lg:col-span-7 p-4 sm:p-5 rounded-2xl bg-zinc-50/90 dark:bg-[#121214] border border-zinc-200/80 dark:border-white/10 space-y-3 shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-zinc-900 dark:text-white">
                      Referral invite
                    </h3>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Share with friends to get extra credit.
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold uppercase text-zinc-400">
                    Your code
                  </label>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-[#0c0c0e] border border-zinc-200 dark:border-white/10 text-xs font-mono font-bold">
                    <span>{referralCode}</span>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="text-zinc-400 hover:text-purple-600 transition-colors p-1 cursor-pointer"
                      title="Copy code"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold uppercase text-zinc-400">
                    Share this link
                  </label>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-[#0c0c0e] border border-zinc-200 dark:border-white/10 text-xs truncate">
                    <span className="truncate text-zinc-500 dark:text-zinc-400 mr-2 text-[11px]">
                      {referralLink}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="text-zinc-400 hover:text-purple-600 transition-colors p-1 shrink-0 cursor-pointer"
                      title="Copy link"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Appearance Section: Choose Your Color Mode matching ai8_50cac82f.png */}
            <div className="p-5 rounded-2xl bg-zinc-50/90 dark:bg-[#121214] border border-zinc-200/80 dark:border-white/10 space-y-3">
              <div>
                <h3 className="text-xs font-bold text-zinc-900 dark:text-white">
                  Appearance
                </h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Choose your color mode
                </p>
              </div>

              {/* The 3 Graphic Illustration Cards: Light, System, Dark */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {/* Light Mode Card */}
                <button
                  type="button"
                  onClick={() => onThemeChange('light')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
                    theme === 'light'
                      ? 'border-purple-600 ring-2 ring-purple-600/20 bg-white shadow-sm'
                      : 'border-zinc-200 dark:border-white/10 hover:border-zinc-400 bg-white/60 dark:bg-black/20'
                  }`}
                >
                  <div className="w-full h-16 rounded-xl bg-white border border-zinc-200 p-2 flex flex-col justify-between shadow-xs">
                    <div className="w-8 h-2 rounded-full bg-zinc-200" />
                    <div className="w-12 h-2 rounded-full bg-zinc-100" />
                    <div className="flex items-center justify-end">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    Light
                  </span>
                </button>

                {/* System Mode Card */}
                <button
                  type="button"
                  onClick={() => onThemeChange(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')}
                  className="p-3 rounded-2xl border border-zinc-200 dark:border-white/10 hover:border-zinc-400 bg-white/60 dark:bg-black/20 text-center transition-all cursor-pointer flex flex-col items-center gap-2"
                >
                  <div className="w-full h-16 rounded-xl border border-zinc-300 dark:border-white/10 overflow-hidden flex shadow-xs">
                    <div className="w-1/2 h-full bg-white p-2 flex flex-col justify-between">
                      <div className="w-6 h-2 rounded-full bg-zinc-200" />
                      <div className="w-4 h-2 rounded-full bg-zinc-100" />
                    </div>
                    <div className="w-1/2 h-full bg-[#0c0c0e] p-2 flex flex-col justify-between">
                      <div className="w-6 h-2 rounded-full bg-zinc-800" />
                      <div className="flex items-center justify-end">
                        <span className="w-2 h-2 rounded-full bg-purple-500" />
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    System
                  </span>
                </button>

                {/* Dark Mode Card */}
                <button
                  type="button"
                  onClick={() => onThemeChange('dark')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
                    theme === 'dark'
                      ? 'border-purple-600 ring-2 ring-purple-600/20 bg-[#141416] shadow-sm'
                      : 'border-zinc-200 dark:border-white/10 hover:border-zinc-400 bg-white/60 dark:bg-black/20'
                  }`}
                >
                  <div className="w-full h-16 rounded-xl bg-[#0c0c0e] border border-white/10 p-2 flex flex-col justify-between shadow-xs">
                    <div className="w-8 h-2 rounded-full bg-zinc-800" />
                    <div className="w-12 h-2 rounded-full bg-zinc-900" />
                    <div className="flex items-center justify-end">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    Dark
                  </span>
                </button>
              </div>
            </div>

            {/* Profile Fields Form matching ai8_50cac82f.png */}
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    DISPLAY NAME
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-[#121214] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                    <Edit2 className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    EMAIL
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-[#121214] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                    <Mail className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    PHONE NUMBER
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="px-2.5 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-[#121214] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 focus:outline-none shrink-0"
                    >
                      <option value="IN +91">IN +91</option>
                      <option value="US +1">US +1</option>
                      <option value="UK +44">UK +44</option>
                      <option value="AE +971">AE +971</option>
                    </select>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Add phone number"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-[#121214] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder:text-zinc-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    DATE OF BIRTH
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-[#121214] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    ROLE / PROFESSION
                  </label>
                  <select
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-[#121214] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="Student">Student</option>
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Researcher">Researcher</option>
                    <option value="Product Designer">Product Designer</option>
                    <option value="Executive">Executive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    ORGANIZATION <span className="text-zinc-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Company, school, or university"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-[#121214] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Areas of Interest matching ai8_50cac82f.png */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    AREAS OF INTEREST
                  </label>
                  <span className="text-[10px] text-zinc-400">4 selected</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-zinc-100 dark:bg-[#141416] border border-zinc-200 dark:border-white/10 text-xs font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                    📄 Projects
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-zinc-100 dark:bg-[#141416] border border-zinc-200 dark:border-white/10 text-xs font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                    💻 Development
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-zinc-100 dark:bg-[#141416] border border-zinc-200 dark:border-white/10 text-xs font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                    🔥 Content
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-zinc-100 dark:bg-[#141416] border border-zinc-200 dark:border-white/10 text-xs font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                    🤖 AI &amp; Auto
                  </span>
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs cursor-pointer transition-all"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};
