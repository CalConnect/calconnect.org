<template>
  <div>
    <!-- Search Button -->
    <button
      @click="isOpen = true"
      class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
      aria-label="Open search"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
    </button>

    <!-- Search Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="isOpen"
          class="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4"
          @click.self="isOpen = false"
        >
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="isOpen = false"/>

          <!-- Search Box -->
          <div class="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
            <!-- Search Input -->
            <div class="flex items-center px-4 border-b border-gray-200 dark:border-white/10">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                ref="searchInput"
                v-model="query"
                type="text"
                placeholder="Search CalConnect..."
                class="flex-1 px-4 py-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
                @keydown.escape="isOpen = false"
              />
              <button
                @click="isOpen = false"
                class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <!-- Search Results -->
            <div v-if="query" class="max-h-[60vh] overflow-y-auto p-2">
              <div v-if="filteredResults.length > 0" class="space-y-1">
                <a
                  v-for="result in filteredResults"
                  :key="result.href"
                  :href="result.href"
                  class="block px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                  @click="isOpen = false"
                >
                  <div class="font-medium text-gray-900 dark:text-white">{{ result.title }}</div>
                  <div class="text-sm text-gray-500">{{ result.section }}</div>
                </a>
              </div>
              <div v-else class="px-4 py-8 text-center text-gray-500">
                No results found for "{{ query }}"
              </div>
            </div>

            <!-- Quick Links (when no query) -->
            <div v-else class="p-4">
              <p class="text-sm text-gray-500 mb-3">Quick links</p>
              <div class="space-y-1">
                <a
                  v-for="link in quickLinks"
                  :key="link.href"
                  :href="link.href"
                  class="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                  @click="isOpen = false"
                >
                  <span class="text-indigo-500">{{ link.icon }}</span>
                  <span class="text-gray-700 dark:text-gray-300">{{ link.label }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

const isOpen = ref(false)
const query = ref('')
const searchInput = ref(null)

const searchData = [
  { title: 'Standards', section: 'Resources', href: '/standards' },
  { title: 'iCalendar', section: 'Standards', href: '/standards/icalendar' },
  { title: 'CalDAV', section: 'Standards', href: '/standards/caldav' },
  { title: 'Membership', section: 'Participate', href: '/membership' },
  { title: 'Technical Committees', section: 'Standards', href: '/about/technical-committees' },
  { title: 'Events', section: 'Participate', href: '/events' },
  { title: 'Developer Guide', section: 'Developers', href: 'https://devguide.calconnect.org' },
]

const quickLinks = [
  { icon: '📚', label: 'Browse Standards', href: '/standards' },
  { icon: '👥', label: 'Membership Benefits', href: '/membership/membership-benefits' },
  { icon: '📅', label: 'Upcoming Events', href: '/events' },
  { icon: '💻', label: 'Developer Guide', href: 'https://devguide.calconnect.org' },
]

const filteredResults = computed(() => {
  if (!query.value) return []
  const q = query.value.toLowerCase()
  return searchData.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.section.toLowerCase().includes(q)
  )
})

watch(isOpen, (newVal) => {
  if (newVal) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  } else {
    query.value = ''
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
