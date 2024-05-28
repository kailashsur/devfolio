/* eslint-disable no-plusplus */

// import { Parser } from 'acorn';
// // import acornJsx from 'acorn-jsx';
// import acornJsx = require('acorn-jsx')
// import fm from 'front-matter';
// // import slug from 'slug';
// import slug = require('slug');

// const ParserWithJSX = Parser.extend(acornJsx());

// const parse = (content) =>
//   ParserWithJSX.parse(content, {
//     ecmaVersion: 2020,
//     sourceType: 'module',
//   });

// export const getFrontMatter = (content) => fm(content).attributes;

// export const addImport = (tree, name, location) => {
//   tree.children.unshift({
//     type: 'mdxjsEsm',
//     data: {
//       estree: parse(`import ${name} from '${location}'`),
//     },
//   });
// };

// export const addContent = (tree, content) => {
//   tree.children.push({
//     type: 'mdxjsEsm',
//     data: {
//       estree: parse(content),
//     },
//   });
// };

// export const getTableOfContents = (tree) => {
//   const contents = [];

//   for (let nodeIndex = 0; nodeIndex < tree.children.length; nodeIndex++) {
//     const node = tree.children[nodeIndex];

//     if (node.type === 'heading' && [2, 3].includes(node.depth)) {
//       const depth = node.depth - 1;
//       const title = node.children
//         .filter((n) => n.type === 'text')
//         .map((n) => n.value)
//         .join('');

//       contents.push({
//         title,
//         slug: slug(title),
//         depth,
//       });
//     }
//   }

//   return contents;
// };



/* eslint-disable no-plusplus */

import { Parser } from 'acorn';
import acornJsx from 'acorn-jsx';  // Use import instead of require
import fm from 'front-matter';
import slug from 'slug';  // Use import instead of require
import type { Node } from 'unist';
import type { MdxJsxFlowElement } from 'mdast-util-mdx-jsx';

const ParserWithJSX = Parser.extend(acornJsx());

const parse = (content: string) =>
  ParserWithJSX.parse(content, {
    ecmaVersion: 2020,
    sourceType: 'module',
  });

export const getFrontMatter = (content: string) => fm(content).attributes;

export const addImport = (tree: Node, name: string, location: string) => {
  (tree as any).children.unshift({
    type: 'mdxjsEsm',
    data: {
      estree: parse(`import ${name} from '${location}'`),
    },
  });
};

export const addContent = (tree: Node, content: string) => {
  (tree as any).children.push({
    type: 'mdxjsEsm',
    data: {
      estree: parse(content),
    },
  });
};

export const getTableOfContents = (tree: Node) => {
  const contents: { title: string; slug: string; depth: number }[] = [];

  for (let nodeIndex = 0; nodeIndex < (tree as any).children.length; nodeIndex++) {
    const node = (tree as any).children[nodeIndex];

    if (node.type === 'heading' && [2, 3].includes(node.depth)) {
      const depth = node.depth - 1;
      const title = node.children
        .filter((n: any) => n.type === 'text')
        .map((n: any) => n.value)
        .join('');

      contents.push({
        title,
        slug: slug(title),
        depth,
      });
    }
  }

  return contents;
};
