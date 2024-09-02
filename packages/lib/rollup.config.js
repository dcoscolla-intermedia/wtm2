import typescript from '@rollup/plugin-typescript';
import fs from 'fs';
import path from 'path';

// Función para obtener los archivos .ts y .tsx dentro de una carpeta específica
const getTSFiles = (dir) => {
  return fs
    .readdirSync('./src/' + dir)
    .filter((file) => ['.ts', '.tsx'].includes(path.extname(file)))
    .map((file) => ({
      input: path.join('./src/' + dir, file),
      output: {
        file: `dist/${path.basename(file, path.extname(file))}.js`,
      },
    }));
};

// Carpetas a incluir
const folders = ['hooks', 'api', 'interfaces'];

// Generar la configuración para cada archivo en cada carpeta
const config = folders
  .flatMap((folder) => getTSFiles(folder))
  .map((entry) => ({
    ...entry,
    plugins: [typescript()],
  }));

export default config;
