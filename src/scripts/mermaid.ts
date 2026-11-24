/**
 * Renders ```mermaid code blocks. Mermaid is only downloaded on pages that
 * actually contain a diagram.
 */
export async function renderMermaid() {
  const blocks = [...document.querySelectorAll<HTMLElement>('.prose pre > code.language-mermaid')];
  if (blocks.length === 0) return;

  const { default: mermaid } = await import('mermaid');
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: 'base',
    fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
    themeVariables: {
      darkMode: true,
      background: '#0d1220',
      primaryColor: '#141b2d',
      primaryBorderColor: '#a193ff',
      primaryTextColor: '#e2e8f0',
      secondaryColor: '#101626',
      tertiaryColor: '#101626',
      lineColor: '#61c5ff',
      textColor: '#e2e8f0',
      mainBkg: '#141b2d',
      nodeBorder: '#a193ff',
      clusterBkg: '#0f1525',
      clusterBorder: 'rgba(157,176,216,0.3)',
      edgeLabelBackground: '#0d1220',
      noteBkgColor: '#1a2238',
      noteTextColor: '#e2e8f0',
      actorBkg: '#141b2d',
      actorBorder: '#a193ff',
      actorTextColor: '#e2e8f0',
      signalColor: '#61c5ff',
      signalTextColor: '#e2e8f0',
    },
  });

  let i = 0;
  for (const code of blocks) {
    const pre = code.parentElement as HTMLElement;
    const source = code.textContent ?? '';
    const holder = document.createElement('div');
    holder.className = 'mermaid-diagram';
    try {
      const { svg } = await mermaid.render(`mermaid-${i++}`, source);
      holder.innerHTML = svg;
      holder.setAttribute('role', 'img');
      holder.setAttribute('aria-label', 'Diagram');
      pre.replaceWith(holder);
    } catch (err) {
      pre.classList.add('mermaid-source');
      console.warn('[mermaid] failed to render diagram', err);
    }
  }
}
