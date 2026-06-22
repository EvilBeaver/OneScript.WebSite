import { createHighlighter, type Highlighter } from 'shiki'

const LANG = 'bsl'
const THEME = 'github-dark'

let highlighterPromise: Promise<Highlighter> | undefined

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [THEME],
      langs: [LANG],
    })
  }
  return highlighterPromise
}

export async function highlightHeroCode(source: string): Promise<string> {
  const highlighter = await getHighlighter()
  return highlighter.codeToHtml(source.trimEnd(), {
    lang: LANG,
    theme: THEME,
  })
}
