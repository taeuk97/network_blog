/**
 * Enhances Shiki code blocks inside `.prose`:
 * - wraps each block with a header (title or language + copy button)
 * - marks shell/console blocks as terminal output
 */
const TERMINAL_LANGS = new Set(['console', 'shellsession', 'shell-session', 'terminal', 'output', 'txt-output']);
const LANG_LABEL: Record<string, string> = {
  sh: 'shell',
  bash: 'bash',
  shellsession: 'console',
  console: 'console',
  py: 'python',
  yml: 'yaml',
  plaintext: 'text',
  txt: 'text',
};

export function enhanceCodeBlocks(root: ParentNode = document) {
  for (const pre of root.querySelectorAll<HTMLPreElement>('.prose pre.astro-code')) {
    if (pre.parentElement?.classList.contains('code-block')) continue;

    const lang = pre.dataset.lang || pre.dataset.language || 'text';
    const title = pre.dataset.title;

    const wrap = document.createElement('div');
    wrap.className = 'code-block';
    if (TERMINAL_LANGS.has(lang)) wrap.dataset.kind = 'terminal';

    const head = document.createElement('div');
    head.className = 'code-head';

    const label = document.createElement('span');
    if (title) {
      label.className = 'code-title';
      label.textContent = title;
    } else {
      label.className = 'code-lang';
      label.textContent = LANG_LABEL[lang] ?? lang;
    }

    const copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'code-copy';
    copy.textContent = 'Copy';
    copy.setAttribute('aria-label', 'Copy code to clipboard');
    copy.addEventListener('click', async () => {
      const text = pre.querySelector('code')?.innerText ?? pre.innerText;
      try {
        await navigator.clipboard.writeText(text.replace(/\n$/, ''));
        copy.textContent = 'Copied';
        copy.dataset.copied = '';
      } catch {
        copy.textContent = 'Failed';
      }
      setTimeout(() => {
        copy.textContent = 'Copy';
        delete copy.dataset.copied;
      }, 1800);
    });

    head.append(label, copy);
    pre.replaceWith(wrap);
    wrap.append(head, pre);
  }
}
