import eslintConfig from '@vroskus/eslint-config';

export default eslintConfig.browser({
  rules: {
    complexity: ['warn', 5],
  },
});
