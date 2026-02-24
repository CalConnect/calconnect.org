// CalConnect Vue Application Entry Point
import { createApp, ref, h } from 'vue'

// News Search Component using render function
const NewsSearch = {
  props: {
    postsData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      query: '',
      results: []
    }
  },
  methods: {
    doSearch() {
      if (!this.query || this.query.length < 2) {
        this.results = []
        return
      }
      const q = this.query.toLowerCase()
      this.results = this.postsData.filter(post => {
        return post.title.toLowerCase().includes(q) ||
               (post.excerpt && post.excerpt.toLowerCase().includes(q)) ||
               (post.categories && post.categories.some(c => c.toLowerCase().includes(q)))
      }).slice(0, 10)
    },
    formatCategory(cat) {
      if (!cat) return ''
      return cat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    },
    truncate(text, length) {
      if (!text) return ''
      if (text.length <= length) return text
      return text.substring(0, length) + '...'
    }
  },
  render() {
    return h('div', { class: 'mb-8' }, [
      h('div', { class: 'relative' }, [
        h('input', {
          type: 'search',
          placeholder: 'Search news...',
          class: 'w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          value: this.query,
          onInput: (e) => { this.query = e.target.value; this.doSearch() }
        }),
        h('svg', { class: 'absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' })
        ])
      ]),
      // Results
      this.results.length > 0 ? h('div', { class: 'mt-4 space-y-4' },
        this.results.map(post =>
          h('a', { href: post.url, class: 'block p-5 rounded-xl bg-gray-50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all group min-h-[100px]' }, [
            h('div', { class: 'flex items-start gap-4' }, [
              h('div', { class: 'flex-shrink-0 text-sm text-gray-500 dark:text-gray-400 font-mono w-28 pt-0.5' }, post.date),
              h('div', { class: 'flex-1 min-w-0' }, [
                h('h3', { class: 'font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-base' }, post.title),
                h('p', { class: 'text-sm text-gray-600 dark:text-gray-400 mt-1.5 line-clamp-2' }, this.truncate(post.excerpt, 100)),
                post.categories && post.categories.length ? h('div', { class: 'flex flex-wrap gap-1.5 mt-2.5' },
                  post.categories.slice(0, 3).map(cat =>
                    h('span', { class: 'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-primary-100 group-hover:dark:bg-primary-900/30 group-hover:text-primary-700 group-hover:dark:text-primary-300 transition-colors' }, this.formatCategory(cat))
                  )
                ) : null
              ]),
              h('svg', { class: 'w-5 h-5 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
                h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 5l7 7-7 7' })
              ])
            ])
          ])
        )
      ) : null,
      this.results.length === 0 && this.query.length >= 2 ? h('div', { class: 'text-center py-8' }, [
        h('p', { class: 'text-gray-500 dark:text-gray-400' }, `No results found for "${this.query}"`)
      ]) : null
    ])
  }
}

// Initialize Vue app
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('vue-news-search')
  const dataEl = document.getElementById('news-posts-data')
  const fallback = document.getElementById('news-search-fallback')
  if (container && dataEl) {
    try {
      const postsData = JSON.parse(dataEl.textContent)
      const app = createApp(NewsSearch, { postsData })
      app.mount(container)
      // Remove fallback after Vue mounts
      if (fallback) fallback.parentElement.remove()
    } catch (e) {
      console.error('Failed to initialize Vue news search:', e)
    }
  }
})
