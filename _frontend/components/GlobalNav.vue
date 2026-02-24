<template>
  <div class="relative">
    <!-- Mobile Menu Button -->
    <button
      @click="mobileMenuOpen = !mobileMenuOpen"
      class="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
      aria-label="Toggle menu"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>

    <!-- Desktop Navigation -->
    <nav class="hidden lg:flex items-center gap-1">
      <a
        v-for="item in navItems"
        :key="item.href"
        :href="item.href"
        class="nav-item px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all font-medium"
        :class="{ 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10': isActive(item.href) }"
      >
        {{ item.label }}
      </a>
    </nav>

    <!-- Mobile Menu -->
    <Transition name="slide-down">
      <div
        v-if="mobileMenuOpen"
        class="lg:hidden absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-white/10 overflow-hidden z-50"
      >
        <nav class="p-2">
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            class="block px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
            :class="{ 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10': isActive(item.href) }"
            @click="mobileMenuOpen = false"
          >
            {{ item.label }}
          </a>
        </nav>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const mobileMenuOpen = ref(false)

const navItems = [
  { label: 'Discover', href: '/discover' },
  { label: 'Standards', href: '/standards' },
  { label: 'Participate', href: '/participate' },
  { label: 'Developers', href: '/developers' },
  { label: 'News', href: '/news' },
]

const isActive = (href) => {
  if (typeof window !== 'undefined') {
    return window.location.pathname.startsWith(href)
  }
  return false
}
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
