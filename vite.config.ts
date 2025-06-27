import { readFileSync, renameSync, existsSync } from 'node:fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-extraneous-dependencies
import dts from 'vite-plugin-dts';

/** @type {import("./package.json")} */
const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const external = [...Object.keys(pkg.dependencies), ...Object.keys(pkg.devDependencies)];

const banner = `/*!
 * Name: ${pkg.name}
 * Version: ${pkg.version}
 * Author: ${pkg.author}
 * Homepage: ${pkg.homepage}
 * License: ${pkg.license} © 2021-Present
 */\n`;

export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
      outDir: ['dist/cjs', 'dist/esm'],
      afterBuild: () => {
        // rename .d.cts to .d.mts in dist/esm
        if (existsSync('dist/esm/index.d.cts')) {
          renameSync('dist/esm/index.d.cts', 'dist/esm/index.d.mts');
        }
      },
    }),
  ],
  build: {
    emptyOutDir: true,
    target: 'es2020',
    sourcemap: true,
    minify: false,
    lib: {
      entry: 'src/index.ts',
    },
    rollupOptions: {
      external,
      output: [
        {
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: 'src',
          dir: 'dist/esm',
          entryFileNames: '[name].mjs',
          chunkFileNames: '[name].mjs',
          banner,
        },
        {
          format: 'cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          dir: 'dist/cjs',
          entryFileNames: '[name].cjs',
          chunkFileNames: '[name].cjs',
          banner,
        },
      ],
    },
  },
});
