/**
 * Rehype plugin: prefixes root-relative links and image sources written in
 * Markdown (e.g. `[Labs](/labs/)`, `![](/images/a.png)`) with the site's
 * base path, so content works unchanged when deployed under a sub-path.
 */
export function rehypeBaseLinks({ base = '/' } = {}) {
  const prefix = base.replace(/\/$/, '');
  return (tree) => {
    if (!prefix) return;
    const walk = (node) => {
      if (node.type === 'element' && node.properties) {
        for (const attr of ['href', 'src']) {
          const v = node.properties[attr];
          if (typeof v === 'string' && v.startsWith('/') && !v.startsWith('//') && !v.startsWith(`${prefix}/`)) {
            node.properties[attr] = prefix + v;
          }
        }
      }
      if (node.children) node.children.forEach(walk);
    };
    walk(tree);
  };
}
