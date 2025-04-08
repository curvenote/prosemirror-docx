# `prosemirror-docx`

[![prosemirror-docx on npm](https://img.shields.io/npm/v/prosemirror-docx.svg)](https://www.npmjs.com/package/prosemirror-docx)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/curvenote/prosemirror-docx/blob/master/LICENSE)
![CI](https://github.com/curvenote/prosemirror-docx/workflows/CI/badge.svg)

Export a [prosemirror](https://prosemirror.net/) document to a Microsoft Word file, using [docx](https://docx.js.org/).

![image](https://user-images.githubusercontent.com/913249/134953610-886047eb-2a21-4929-9a53-9a29d8f6184f.png)

## Overview

`prosemirror-docx` has a similar structure to [prosemirror-markdown](https://github.com/prosemirror/prosemirror-markdown), with a `DocxSerializerState` object that you write to as you walk the document. It is a light wrapper around https://docx.js.org/, which actually does the export. Currently `prosemirror-docx` is write only (i.e. can export to, but can’t read from `*.docx`), and has most of the basic nodes covered (see below).

[Curvenote](https://curvenote.com) uses this to export from [@curvenote/editor](https://github.com/curvenote/editor) to word docs, but this library currently only has dependence on `docx`, `prosemirror-model` and `image-dimensions` - and similar to `prosemirror-markdown`, the serialization schema can be edited externally (see `Extended usage` below).

## Basic usage

```ts
import { defaultDocxSerializer, writeDocx } from 'prosemirror-docx';
import { EditorState } from 'prosemirror-state';
import { writeFileSync } from 'fs'; // Or some other way to write a file

// Set up your prosemirror state/document as you normally do
const state = EditorState.create({ schema: mySchema });

// If there are images, we will need to preload the buffers
const opts = {
  getImageBuffer(src: string) {
    return anImageBuffer;
  },
};

// Create a doc in memory, and then write it to disk
const wordDocument = defaultDocxSerializer.serialize(state.doc, opts);

await writeDocx(wordDocument).then((buffer) => {
  writeFileSync('HelloWorld.docx', buffer);
});
```

## Extended usage

Instead of using the `defaultDocxSerializer` you can override or provide cusome serializers.

```ts
import { DocxSerializer, defaultNodes, defaultMarks } from 'prosemirror-docx';

const nodeSerializer = {
  ...defaultNodes,
  my_paragraph(state, node) {
    state.renderInline(node);
    state.closeBlock(node);
  },
};

export const myDocxSerializer = new DocxSerializer(nodeSerializer, defaultMarks);
```

The `state` is the `DocxSerializerState` and has helper methods to interact with `docx`.

## Supported Nodes

- text
- paragraph
- heading (levels)
  - TODO: Support numbering of headings
- blockquote
- code_block
  - TODO: No styles supported
- horizontal_rule
- hard_break
- ordered_list
- unordered_list
- list_item
- image
- math
- equations (numbered & unnumbered)
- tables

Planned:

- Internal References (e.g. see Table 1)

## Supported Marks

- em
- strong
- link
  - Note: this is actually treated as a node in docx, so ignored as a prosemirror mark, but supported.
- code
- subscript
- superscript
- strikethrough
- underline
- smallcaps
- allcaps

## Resources

- [Prosemirror Docs](https://prosemirror.net/docs/)
- [docx](https://docx.js.org/)
- [prosemirror-markdown](https://github.com/ProseMirror/prosemirror-markdown) - similar implementation for markdown!
