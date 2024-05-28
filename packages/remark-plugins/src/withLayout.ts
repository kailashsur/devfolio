import { addContent, addImport, getTableOfContents } from './utils';
import type { Plugin } from 'unified';
import type { Node } from 'unist';
import type { VFile } from 'vfile';

const withLayout: Plugin = () => (tree: Node, file: VFile) => {
  const data = file.data['front-matter'] as { layout?: string } || {};

  // skip adding layout if no front-matter
  if (Object.keys(data).length === 0 || !data.layout) return;

  const { layout, ...frontMatter } = data;
  const tableOfContents = getTableOfContents(tree);

  // import front-matter specified layout
  addImport(tree, layout, `@/contents-layouts/${layout}`);

  // export layout
  addContent(
    tree,
    `export default ({ children }) => (
      <${layout}
        frontMatter={${JSON.stringify(frontMatter)}}
        tableOfContents={${JSON.stringify(tableOfContents)}}
      >
        {children}
      </${layout}>
     )`
  );
};

export default withLayout;
