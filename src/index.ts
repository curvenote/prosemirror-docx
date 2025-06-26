export type { SectionConfig, SerializationState } from './types';
export type {
  MarkSerializer,
  NodeSerializer,
  NodeSerializerAsync,
  Options,
  OptionsAsync,
} from './serializer';

export {
  DocxSerializerStateAsync,
  DocxSerializerAsync,
  DocxSerializerState,
  DocxSerializer,
  MAX_IMAGE_WIDTH,
} from './serializer';
export {
  defaultDocxSerializer,
  defaultDocxSerializerAsync,
  defaultAsyncNodes,
  defaultNodes,
  defaultMarks,
} from './schema';
export { writeDocx, createDocFromState, buildDoc } from './utils';
