module.exports = {
  printWidth: 80,
  tabWidth: 2,
  trailingComma: 'all',
  singleQuote: true,
  semi: true,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrder: [
    '^@/models/(.*)$',
    '^@/components/(.*)$',
    '^@/hooks/(.*)$',
    '^@/utils/(.*)$',
    '^@/(.*)$',
    '^\\./(.*)$',
  ],
};
