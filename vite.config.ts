import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: [
          'favicon.svg',
          'hynex-logo.jpg',
          'apple-touch-icon.png',
          'pwa-192x192.png',
          'pwa-512x512.png',
          'pwa-maskable-512x512.png',
        ],
        manifest: {
          id: '/',
          name: 'HYNEX AI',
          short_name: 'HYNEX AI',
          description:
            'HYNEX AI is a high-performance conversational AI platform with multi-model intelligence, real-time knowledge synthesis, voice duplex, and creative media generation.',
          theme_color: '#181818',
          background_color: '#181818',
          display: 'standalone',
          display_override: ['window-controls-overlay', 'standalone', 'minimal-ui'],
          start_url: '/',
          scope: '/',
          categories: ['productivity', 'utilities', 'multimedia'],
          shortcuts: [
            {
              name: 'New Chat',
              short_name: 'Chat',
              description: 'Start a new conversation in HYNEX AI',
              url: '/?action=new',
              icons: [{ src: '/pwa-192x192.png', sizes: '192x192' }],
            },
            {
              name: 'Voice Mode',
              short_name: 'Voice',
              description: 'Open real-time duplex voice conversation',
              url: '/?action=voice',
              icons: [{ src: '/pwa-192x192.png', sizes: '192x192' }],
            },
            {
              name: 'Image Studio',
              short_name: 'Images',
              description: 'Generate and edit high-resolution images',
              url: '/?tab=images',
              icons: [{ src: '/pwa-192x192.png', sizes: '192x192' }],
            },
          ],
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
          navigateFallbackDenylist: [/^\/api/],
        },
        devOptions: {
          enabled: true,
          type: 'module',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio container environments to prevent WebSocket errors.
      hmr: false,
      // Disable file watching when DISABLE_HMR is true or in container to save CPU during edits.
      watch: null,
    },
  };
});
