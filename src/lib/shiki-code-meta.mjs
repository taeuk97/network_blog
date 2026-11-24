/**
 * Shiki transformer: reads `title="..."` from a code fence's meta string
 * and exposes it (plus the language) as data attributes on <pre>.
 *
 *   ```cisco title="R1 — running-config"
 *
 * The code-block header (label + copy button) is built client-side
 * from these attributes in src/scripts/code-blocks.ts.
 */
export function shikiCodeMeta() {
  return {
    name: 'taeuk:code-meta',
    pre(node) {
      const raw = this.options.meta?.__raw ?? '';
      const match = raw.match(/title=(?:"([^"]*)"|'([^']*)')/);
      if (match) node.properties['data-title'] = match[1] ?? match[2];
      node.properties['data-lang'] = this.options.lang;
    },
  };
}
