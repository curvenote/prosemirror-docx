# prosemirror-docx

## 0.5.0

### Minor Changes

- 546a4b7: Add support for docx.js sections, and allow consumers to modify final Document in `serialize`.

## 0.4.1

### Patch Changes

- c91d548: Pass image run opts through to image serializer

## 0.4.0

### Minor Changes

- f007926: Allow users to pass an `imageType` to the `image` serializer, fixes image serializer for dataUrl images

## 0.3.0

### Minor Changes

- 70d6ed2: Calling writeDocx returns the buffer, which allows for await or .then usage

### Patch Changes

- 1f7167b: Replace `buffer-image-size` with `image-dimensions` in prosemirror-docx.

## 0.2.1

### Patch Changes

- fe429e5: Support docx by removing unexported dependency

## 0.2.0

### Minor Changes

- 028f0a9: Add tip tap default marks for bold and italic
- 028f0a9: Upgrade docx to 8.5.0
- 028f0a9: Exposes table row and cell docx run options via the state.table helper
