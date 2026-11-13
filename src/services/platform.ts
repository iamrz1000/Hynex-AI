import { useState, useEffect } from 'react';

export type SupportedPlatform = 'Windows' | 'macOS' | 'iOS' | 'Android' | 'Linux' | 'Web';

export interface PlatformInfo {
  platform: SupportedPlatform;
  isWindows: boolean;
  isMac: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isMobile: boolean;
  isDesktop: boolean;
  isStandalone: boolean;
  modifierKey: string;
  altKey: string;
  supportsPwaInstall: boolean;
}

export function detectPlatform(): PlatformInfo {
  if (typeof window === 'undefined') {
    return {
      platform: 'Web',
      isWindows: false,
      isMac: false,
      isIOS: false,
      isAndroid: false,
      isMobile: false,
      isDesktop: true,
      isStandalone: false,
      modifierKey: 'Ctrl',
      altKey: 'Alt',
      supportsPwaInstall: false,
    };
  }

  const ua = navigator.userAgent.toLowerCase();
  const platformStr = (navigator.platform || '').toLowerCase();

  // iOS detection (including iPadOS 13+ which reports MacIntel with touch points)
  const isIOS =
    /iphone|ipad|ipod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  // Android detection
  const isAndroid = /android/.test(ua);

  // Windows detection
  const isWindows = /win/.test(platformStr) || /windows/.test(ua);

  // macOS detection (excluding iPadOS)
  const isMac = !isIOS && (/mac/.test(platformStr) || /macintosh|mac os x/.test(ua));

  const isLinux = !isWindows && !isMac && !isAndroid && !isIOS && /linux/.test(platformStr);

  const isMobile = isIOS || isAndroid || /mobile|tablet|phone/.test(ua);
  const isDesktop = !isMobile;

  // Standalone mode (already installed as PWA or native app)
  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: window-controls-overlay)').matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true;

  let platform: SupportedPlatform = 'Web';
  if (isWindows) platform = 'Windows';
  else if (isMac) platform = 'macOS';
  else if (isIOS) platform = 'iOS';
  else if (isAndroid) platform = 'Android';
  else if (isLinux) platform = 'Linux';

  const modifierKey = isMac || isIOS ? '⌘' : 'Ctrl';
  const altKey = isMac || isIOS ? '⌥ Option' : 'Alt';

  // Desktop Chromium / Edge and Android Chrome support BeforeInstallPromptEvent
  const supportsPwaInstall = 'BeforeInstallPromptEvent' in window || (isDesktop && !isStandalone);

  return {
    platform,
    isWindows,
    isMac,
    isIOS,
    isAndroid,
    isMobile,
    isDesktop,
    isStandalone,
    modifierKey,
    altKey,
    supportsPwaInstall,
  };
}

export function usePlatform(): PlatformInfo {
  const [info, setInfo] = useState<PlatformInfo>(detectPlatform);

  useEffect(() => {
    setInfo(detectPlatform());

    const mqStandalone = window.matchMedia('(display-mode: standalone)');
    const handleModeChange = () => setInfo(detectPlatform());

    if (mqStandalone.addEventListener) {
      mqStandalone.addEventListener('change', handleModeChange);
      return () => mqStandalone.removeEventListener('change', handleModeChange);
    }
  }, []);

  return info;
}
