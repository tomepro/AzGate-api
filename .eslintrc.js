module.exports = {
  parser: '@typescript-eslint/parser', // Define el parser que se utilizará para analizar el código TypeScript.
  parserOptions: {
    project: 'tsconfig.json', // Especifica el archivo de configuración de TypeScript.
    sourceType: 'module', // Define el tipo de módulo como 'module'.
  },
  plugins: ['@typescript-eslint/eslint-plugin'], // Especifica los plugins que se utilizarán, en este caso '@typescript-eslint/eslint-plugin'.
  extends: [
    'plugin:@typescript-eslint/recommended', // Extiende la configuración recomendada de '@typescript-eslint'.
    'plugin:prettier/recommended', // Extiende la configuración recomendada de 'prettier'.
  ],
  root: true, // Indica que esta es la configuración raíz de ESLint.
  env: {
    node: true, // Define el entorno como Node.js.
    jest: true, // Define el entorno como Jest para pruebas.
  },
  ignorePatterns: ['.eslintrc.js'], // Especifica los patrones de archivos que ESLint debe ignorar.
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off', // Desactiva la regla que requiere prefijos en los nombres de las interfaces.
    '@typescript-eslint/explicit-function-return-type': 'off', // Desactiva la regla que requiere tipos de retorno explícitos en las funciones.
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Desactiva la regla que requiere tipos explícitos en los límites de los módulos.
    '@typescript-eslint/no-explicit-any': 'off', // Desactiva la regla que prohíbe el uso del tipo 'any'.
  },
};
