import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { config as loadDotenv } from 'dotenv'
import { defineConfig } from 'vitest/config'

const APP_ENV_KEYS = [
  'VITE_SE_API_URL',
  'VITE_SE_SITE',
  'VITE_SE_API_KEY',
  'VITE_SEARCH_INTITLE',
  'VITE_SEARCH_PAGE_SIZE',
  'VITE_DEFAULT_FROM_DATE',
] as const

const readAppEnv = (): Record<string, string> => {
  const { parsed = {} } = loadDotenv({ path: ['.env.local', '.env'], quiet: true })
  const merged: Record<string, string | undefined> = { ...parsed, ...process.env }

  return Object.fromEntries(
    APP_ENV_KEYS.flatMap((key) => {
      const value = merged[key]?.trim()

      return value ? [[key, value] as const] : []
    }),
  )
}

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_ENV__: JSON.stringify(readAppEnv()),
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.{test,spec}.{ts,tsx}', 'src/test/**', 'src/**/index.ts'],
    },
  },
})
