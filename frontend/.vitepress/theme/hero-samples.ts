const modules = import.meta.glob('./hero-samples/*.{os,bsl}', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const heroSampleSources = Object.values(modules) as string[]

export function pickRandomHeroSample(): string {
  if (heroSampleSources.length === 0) {
    return ''
  }
  const index = Math.floor(Math.random() * heroSampleSources.length)
  return heroSampleSources[index]!
}
