import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// Inline the main CSS bundle into index.html as a <style> tag so the
// browser doesn't block initial render on the external CSS request.
// PageSpeed flagged the index-*.css <link> as a render-blocking
// resource costing 300ms on Slow 4G; inlining the ~14KB gzipped bundle
// trades the network round-trip for a slightly larger HTML payload
// (still under 30KB gzipped total). Route-specific CSS chunks (e.g.
// HundredPeople-*.css) are NOT inlined — they're already loaded
// lazily by route chunks, not in the critical path.
function inlineMainCssPlugin() {
  return {
    name: 'inline-main-css',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html
        const cssAssets = Object.entries(ctx.bundle).filter(
          ([fileName, asset]) =>
            asset.type === 'asset' &&
            fileName.startsWith('assets/index-') &&
            fileName.endsWith('.css'),
        )
        if (cssAssets.length === 0) return html
        let result = html
        let cssContent = ''
        for (const [fileName, asset] of cssAssets) {
          cssContent += asset.source
          // Strip the auto-injected <link rel="stylesheet"> for this file.
          const linkRegex = new RegExp(
            `<link\\s+rel="stylesheet"[^>]*href="/${fileName}"[^>]*>\\s*`,
            'g',
          )
          result = result.replace(linkRegex, '')
        }
        // Inject the inlined CSS just before </head>.
        result = result.replace(
          '</head>',
          `<style>${cssContent}</style>\n  </head>`,
        )
        return result
      },
    },
  }
}

export default defineConfig({
  plugins: [vue(), inlineMainCssPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{js,vue}'],
      exclude: ['src/main.js']
    }
  }
})
