module.exports = {
    root: true,
    plugins: {
      '@angular-eslint': {
        rules: {
          // Add specific rules here if needed
        },
      },
    },
    overrides: [
      {
        files: ['*.ts'],
        parser: '@typescript-eslint/parser',
        parserOptions: {
          project: 'tsconfig.json',
          createDefaultProgram: true,
        },
        extends: [
          'plugin:@angular-eslint/recommended',
          'plugin:@angular-eslint/template/recommended',
          'plugin:@typescript-eslint/recommended',
          'prettier',
        ],
        rules: {
          // Add specific rules here if needed
        },
      },
    ],
  };
  