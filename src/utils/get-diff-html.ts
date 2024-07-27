import { diff_match_patch as DiffMatchPatch } from 'diff-match-patch'

export const getDiffAsHtml = (oldText: string, newText: string): string => {
  const dmp = new DiffMatchPatch()
  const diffs = dmp.diff_main(oldText, newText)
  dmp.diff_cleanupSemantic(diffs)

  let html = ''
  for (const diff of diffs) {
    const [operation, text] = diff
    const escapedText = escapeHtml(text)

    if (operation === DiffMatchPatch.DIFF_INSERT) {
      html += `<ins>${escapedText}</ins>`
    } else if (operation === DiffMatchPatch.DIFF_DELETE) {
      html += `<del>${escapedText}</del>`
    } else {
      html += escapedText
    }
  }

  return html
}

const escapeHtml = (text: string): string =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
