module.exports = {
  printWidth: 80,
  tabWidth: 2,
  trailingComma: 'all',
  singleQuote: true,
  semi: true,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^@/models/(.*)$',
    '^@/components/(.*)$',
    '^@/hooks/(.*)$',
    '^@/utils/(.*)$',
    '^@/(.*)$',
    '^\\./(.*)$',
  ],
  plugins: ['@trivago/prettier-plugin-sort-imports'],
};
