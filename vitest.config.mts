import { defineConfig } from 'vitest/config';
import { chromaticPlugin } from '@chromatic-com/vitest/plugin';

// The Angular CLI unit-test builder filters out plugins whose names start with 'vitest'.
// Renaming the plugin bypasses this filter so it gets applied to each browser project.
const plugin = chromaticPlugin({
  disableAutoSnapshot: true,
  reporter: {
    enabled: true,
    verbose: true,
  },
});

export default defineConfig({
  plugins: [{ ...plugin, name: 'chromatic-plugin' }],
});
