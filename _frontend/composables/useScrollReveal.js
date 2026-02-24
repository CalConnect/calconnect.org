// ScrollReveal Composable
import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
  } = options

  let observer = null

  const revealElements = (elements) => {
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('revealed')
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, index * 100)
    })
  }

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            entry.target.style.opacity = '1'
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin }
    )

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el)
    })
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return { revealElements }
}
