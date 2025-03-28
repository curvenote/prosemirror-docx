import { INumberingOptions, Paragraph } from 'docx';

export type Mutable<T> = {
  -readonly [k in keyof T]: T[k];
};

export type IFootnotes = Mutable<
  Readonly<
    Record<
      string,
      {
        readonly children: readonly Paragraph[];
      }
    >
  >
>;

export type INumbering = INumberingOptions['config'][0];
