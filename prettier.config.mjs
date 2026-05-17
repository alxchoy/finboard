export default {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  bracketSameLine: false,
  arrowParens: 'always',
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['^react$', '^react-dom', '<THIRD_PARTY_MODULES>', '^@finboard/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
