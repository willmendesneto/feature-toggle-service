import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    platform: 'neutral',
    target: 'es2020',
    dts: true,
    clean: true,
  },
  {
    // UMD for `<script>` usage, exposed as `window.FeatureToggleService`
    entry: { 'umd/feature-toggle-service': 'src/index.ts' },
    format: 'umd',
    globalName: 'FeatureToggleService',
    platform: 'browser',
    target: 'es2018',
    dts: false,
    clean: false,
    outputOptions: { entryFileNames: '[name].js' },
  },
  {
    entry: { 'umd/feature-toggle-service.min': 'src/index.ts' },
    format: 'umd',
    globalName: 'FeatureToggleService',
    platform: 'browser',
    target: 'es2018',
    dts: false,
    clean: false,
    minify: true,
    outputOptions: { entryFileNames: '[name].js' },
  },
]);
