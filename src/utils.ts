import {
  Document,
  INumberingOptions,
  ISectionOptions,
  Packer,
  SectionType,
  Footer,
  Paragraph,
  AlignmentType ,
  TextRun,
  PageNumber,
  TableOfContents,
} from 'docx';
import { Node as ProsemirrorNode } from 'prosemirror-model';
import { IFootnotes } from './types';
import { Options } from './serializer';
export function createShortId() {
  return Math.random().toString(36).substr(2, 9);
}

export function createDocFromState(state: {
  numbering: INumberingOptions['config'];
  children: ISectionOptions['children'];
  footnotes?: IFootnotes;
  options: Options
}) {

  const toc = new TableOfContents("Summary", {
    hyperlink: true,
  });
  const children = [toc].concat(state.children);

  const doc = new Document({
    footnotes: state.footnotes,
    numbering: {
      config: state.numbering,
    },
    features: {
      updateFields: true,
    },
    sections: [
      {
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun(state?.options?.footer || ''),
                  new TextRun({
                    children: [" Page ", PageNumber.CURRENT],
                  }),
                ],
              })],
          }),
        },
        properties: {
          type: SectionType.CONTINUOUS,
        },
        children: children,
      },
    ],
  });
  return doc;
}

export async function writeDocx(
  doc: Document,
  write: ((buffer: Buffer) => void) | ((buffer: Buffer) => Promise<void>),
) {
  const buffer = await Packer.toBuffer(doc);
  return write(buffer);
}

export function getLatexFromNode(node: ProsemirrorNode): string {
  let math = '';
  node.forEach((child) => {
    if (child.isText) math += child.text;
    // TODO: improve this as we may have other things in the future
  });
  return math;
}
