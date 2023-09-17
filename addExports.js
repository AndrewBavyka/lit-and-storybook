import fs from 'fs';
import path from 'path';

// Получаем текущую директорию проекта
const projectDir = process.cwd();

// Директория, где находятся компоненты
const componentsDir = path.join(projectDir, 'src', 'stories', 'components');

// Функция для рекурсивного сканирования директории и поиска всех файлов, кроме .story.ts
function scanDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  const componentFiles = [];

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // Рекурсивно сканировать подпапку
      componentFiles.push(...scanDirectory(filePath));
    } else if (file.endsWith('.ts') && !file.endsWith('.stories.ts')) {
      // Если это .ts файл и не .stories.ts, добавить его в список
      componentFiles.push(filePath);
    }
  }

  return componentFiles;
}

// Получить список файлов компонентов
const componentFiles = scanDirectory(componentsDir);

// Путь к файлу main.ts
const mainTsPath = path.join(projectDir, 'main.ts');

// Формирование нового содержимого для main.ts
const exportStatements = componentFiles.map(filePath => {
  // Относительный путь от main.ts до компонента
  const relativePath = path.relative(path.dirname(mainTsPath), filePath);
  // Генерируем экспортное выражение
  const exportStatement = `export * from './${relativePath.slice(0, -3).replace(/\\/g, '/')}';`;
  return exportStatement;
}).join('\n');

// Чтение текущего содержимого main.ts
const currentContent = fs.readFileSync(mainTsPath, 'utf-8');

// Проверка, не содержит ли main.ts уже экспорты
if (!currentContent.includes('export {')) {
  // Если экспортов нет, добавить их
  fs.writeFileSync(mainTsPath, exportStatements);
  console.log('Файлы экспорта успешно добавлены в main.ts');
} else {
  const updatedContent = currentContent.replace(/export {(.|\n)*?};/, exportStatements);
  
  // Проверка, были ли изменения
  if (updatedContent !== currentContent) {
    fs.writeFileSync(mainTsPath, updatedContent);
    console.log('Файлы экспорта успешно обновлены в main.ts');
  } else {
    console.log('main.ts уже содержит актуальные экспорты, скрипт не вносил изменений.');
  }
}
