import React, { useState, useEffect } from 'react';
import {
  Download,
  Smartphone,
  Apple,
  CheckCircle2,
  ExternalLink,
  Share,
  PlusSquare,
  X,
  PackageCheck,
  ShieldCheck,
  Monitor,
  Laptop,
  Command,
  Keyboard,
  Zap,
  Sparkles,
} from 'lucide-react';
import { CoreGptLogo } from './ThinkAiLogo.tsx';
import { detectPlatform, SupportedPlatform } from '../services/platform.ts';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt?: any;
  onInstallSuccess?: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  isOpen,
  onClose,
  deferredPrompt,
  onInstallSuccess,
}) => {
  const [platformInfo, setPlatformInfo] = useState(() => detectPlatform());
  const [activeTab, setActiveTab] = useState<'windows' | 'mac' | 'ios' | 'android'>('windows');
  const [installStatus, setInstallStatus] = useState<'idle' | 'installing' | 'installed'>('idle');

  const githubRepoUrl = 'https://github.com/iamrz1000/Hynex-AI';
  const githubReleasesUrl = 'https://github.com/iamrz1000/Hynex-AI/releases';

  useEffect(() => {
    const info = detectPlatform();
    setPlatformInfo(info);

    if (info.isStandalone) {
      setInstallStatus('installed');
    }

    // Auto-select tab according to detected user platform
    if (info.isWindows) {
      setActiveTab('windows');
    } else if (info.isMac) {
      setActiveTab('mac');
    } else if (info.isIOS) {
      setActiveTab('ios');
    } else if (info.isAndroid) {
      setActiveTab('android');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      setInstallStatus('installing');
      try {
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setInstallStatus('installed');
          onInstallSuccess?.();
        } else {
          setInstallStatus('idle');
        }
      } catch (err) {
        console.error('PWA install error:', err);
        setInstallStatus('idle');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-xl bg-white dark:bg-[#141416] border border-zinc-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-100 dark:border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CoreGptLogo size={36} />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                  HYNEX AI Universal App
                </h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Detected: {platformInfo.platform}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Optimized native-feel performance for Windows, macOS, iOS, and Android
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Platform Tabs */}
        <div className="grid grid-cols-4 border-b border-zinc-200 dark:border-white/[0.08] px-2 sm:px-4 pt-2 gap-1 bg-zinc-50/50 dark:bg-black/20">
          {/* Windows Tab */}
          <button
            type="button"
            onClick={() => setActiveTab('windows')}
            className={`py-2 px-1 text-xs font-semibold border-b-2 -mb-px cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'windows'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>Windows</span>
          </button>

          {/* Mac Tab */}
          <button
            type="button"
            onClick={() => setActiveTab('mac')}
            className={`py-2 px-1 text-xs font-semibold border-b-2 -mb-px cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'mac'
                ? 'border-zinc-900 text-zinc-900 dark:border-white dark:text-white'
                : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            <Laptop className="w-4 h-4" />
            <span>macOS</span>
          </button>

          {/* iOS Tab */}
          <button
            type="button"
            onClick={() => setActiveTab('ios')}
            className={`py-2 px-1 text-xs font-semibold border-b-2 -mb-px cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'ios'
                ? 'border-zinc-900 text-zinc-900 dark:border-white dark:text-white'
                : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            <Apple className="w-4 h-4" />
            <span>iOS / iPad</span>
          </button>

          {/* Android Tab */}
          <button
            type="button"
            onClick={() => setActiveTab('android')}
            className={`py-2 px-1 text-xs font-semibold border-b-2 -mb-px cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'android'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Android</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Running in Standalone Notification */}
          {platformInfo.isStandalone && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2.5 text-xs text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>HYNEX AI is currently running in standalone native application mode!</span>
            </div>
          )}

          {/* ================================= WINDOWS TAB ================================= */}
          {activeTab === 'windows' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400">
                  <Monitor className="w-4 h-4" />
                  <span>Windows 10 / 11 Native PWA Desktop App</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Install HYNEX AI directly into Windows. It runs in its own window without browser tabs, pins to your <strong>Taskbar</strong> and <strong>Start Menu</strong>, supports background notifications, and utilizes GPU acceleration for real-time voice duplex and image generation.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-zinc-600 dark:text-zinc-300">
                  <div className="p-2.5 rounded-lg bg-white/60 dark:bg-white/[0.04] border border-zinc-200/60 dark:border-white/5">
                    <strong className="block text-zinc-900 dark:text-white font-semibold mb-1">
                      Edge / Chrome Install
                    </strong>
                    <span>Click the button below or tap the install icon (⊕) on the right side of the URL address bar.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/60 dark:bg-white/[0.04] border border-zinc-200/60 dark:border-white/5">
                    <strong className="block text-zinc-900 dark:text-white font-semibold mb-1">
                      Keyboard Shortcuts
                    </strong>
                    <span><kbd className="px-1 py-0.5 rounded bg-zinc-200 dark:bg-white/10 font-mono text-[10px]">Ctrl+Enter</kbd> to send, <kbd className="px-1 py-0.5 rounded bg-zinc-200 dark:bg-white/10 font-mono text-[10px]">Ctrl+K</kbd> quick switch.</span>
                  </div>
                </div>
              </div>

              {/* Install Button for Windows */}
              {deferredPrompt ? (
                <button
                  onClick={handleNativeInstall}
                  disabled={installStatus === 'installed'}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>Install HYNEX AI on Windows</span>
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs text-zinc-600 dark:text-zinc-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-500 shrink-0" />
                    <span>In Microsoft Edge or Google Chrome, click the <strong>Install HYNEX AI</strong> button in the browser address bar.</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================================= MAC TAB ================================= */}
          {activeTab === 'mac' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-white">
                  <Laptop className="w-4 h-4" />
                  <span>macOS Native Desktop Optimization</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  HYNEX AI is engineered with sub-pixel typography smoothing, trackpad momentum gestures, and Apple Silicon hardware acceleration. Add it directly to your <strong>Mac Dock</strong> for an instant app experience.
                </p>

                <div className="space-y-2.5 pt-1 text-xs text-zinc-600 dark:text-zinc-300">
                  <div className="p-3 rounded-lg bg-zinc-100 dark:bg-white/[0.04]">
                    <strong className="block text-zinc-900 dark:text-white mb-1">
                      🍏 How to Add to Dock on Safari (macOS Sonoma / Sequoia):
                    </strong>
                    <ol className="list-decimal list-inside space-y-1 text-zinc-600 dark:text-zinc-300">
                      <li>In Safari menu bar, click <strong>File</strong>.</li>
                      <li>Select <strong>Add to Dock...</strong></li>
                      <li>Click <strong>Add</strong> to pin HYNEX AI directly to your macOS Dock.</li>
                    </ol>
                  </div>

                  <div className="p-3 rounded-lg bg-zinc-100 dark:bg-white/[0.04]">
                    <strong className="block text-zinc-900 dark:text-white mb-1">
                      🌐 Chrome / Arc / Brave on macOS:
                    </strong>
                    <span>Click the Install icon in the right side of the address bar or choose <strong>Install HYNEX AI</strong> from the browser menu.</span>
                  </div>
                </div>
              </div>

              {deferredPrompt && (
                <button
                  onClick={handleNativeInstall}
                  disabled={installStatus === 'installed'}
                  className="w-full py-3 px-4 rounded-xl bg-zinc-900 hover:bg-black text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-900 font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>Install HYNEX AI on Mac</span>
                </button>
              )}
            </div>
          )}

          {/* ================================= IOS TAB ================================= */}
          {activeTab === 'ios' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-white">
                  <Apple className="w-4 h-4" />
                  <span>iOS (iPhone & iPad) Safari PWA Installation</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Apple iOS does not support .apk installer packages. The official, highest-performance way to run HYNEX AI on iPhone and iPad is via <strong>Add to Home Screen</strong>, giving you safe-area padding for the Dynamic Island / Notch and full standalone screen space.
                </p>

                <div className="p-3.5 rounded-xl bg-white dark:bg-white/[0.04] border border-zinc-200 dark:border-white/5 space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <div className="text-xs text-zinc-700 dark:text-zinc-300">
                      Open this URL in <strong className="text-zinc-900 dark:text-white">Safari</strong> on your iPhone or iPad.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <div className="text-xs text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 flex-wrap">
                      <span>Tap the</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-200 dark:bg-white/10 font-semibold text-zinc-900 dark:text-white">
                        <Share className="w-3.5 h-3.5 text-blue-500" /> Share
                      </span>
                      <span>button in the Safari bottom toolbar.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <div className="text-xs text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 flex-wrap">
                      <span>Scroll down and select</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-200 dark:bg-white/10 font-semibold text-zinc-900 dark:text-white">
                        <PlusSquare className="w-3.5 h-3.5" /> Add to Home Screen
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      4
                    </span>
                    <div className="text-xs text-zinc-700 dark:text-zinc-300">
                      Tap <strong className="text-zinc-900 dark:text-white">Add</strong> in the top-right corner. HYNEX AI will appear on your home screen with its own HD icon!
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-white/[0.02] text-[11px] text-zinc-500 dark:text-zinc-400">
                  📱 <strong>Optimizations Enabled:</strong> Dynamic Island &amp; Notch safe area insets, no-zoom 16px font scale, instant touch response, and full-height iOS WebKit viewport.
                </div>
              </div>
            </div>
          )}

          {/* ================================= ANDROID TAB ================================= */}
          {activeTab === 'android' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <Smartphone className="w-4 h-4" />
                  <span>Android Native PWA &amp; Direct APK</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  On Android, you have two flexible installation choices: instant 1-Tap PWA installation or downloading the standalone compiled <span className="font-mono">.apk</span> package.
                </p>

                {/* 1-Tap PWA button */}
                <button
                  onClick={handleNativeInstall}
                  disabled={installStatus === 'installed'}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>{deferredPrompt ? '1-Tap Install on Android' : 'Add to Android Home Screen'}</span>
                </button>
              </div>

              {/* APK Package Download Box */}
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-white">
                  <PackageCheck className="w-4 h-4 text-emerald-500" />
                  <span>Download Standalone Android APK Package</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Your repository builds debug APK packages automatically with GitHub Actions:
                </p>

                <div className="space-y-2">
                  <a
                    href={githubReleasesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-black text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-900 font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Latest APK from GitHub Releases</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>

                  <a
                    href={githubRepoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-4 rounded-xl border border-zinc-300 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/5 font-medium text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>View Repository &amp; Actions Runs</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Universal Footer */}
        <div className="px-5 py-3 bg-zinc-50 dark:bg-white/[0.02] border-t border-zinc-100 dark:border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Windows · macOS · iOS · Android Compatible</span>
          </div>
          <span className="font-mono">v1.2 Universal</span>
        </div>
      </div>
    </div>
  );
};
