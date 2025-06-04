import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const partialsRoot = path.resolve(__dirname, '../../src/partials');
const pagesDir = path.resolve(__dirname, '../../src/pages');

// Convertir un nom fichier en PascalCase (sans .astro)
function toPascalCase(name) {
  return name
    .replace(/^__/, '')
    .replace('.astro', '')
    .split(/[-_]/)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

// Récupère une map : "partialsPath (sans ext)" => "PascalCase.astro"
function collectPartialFileMap() {
  const map = new Map();

  function walk(dir, relativePath = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const subPath = path.join(relativePath, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath, path.join(relativePath, entry.name));
      } else if (entry.name.endsWith('.astro')) {
        const pascalName = toPascalCase(entry.name);
        const dirPart = relativePath.replace(/\\/g, '/');
        const finalKey = dirPart ? `${dirPart}/${entry.name}` : entry.name;
        const finalValue = dirPart ? `${dirPart}/${pascalName}.astro` : `${pascalName}.astro`;
        map.set(finalKey.replace('.astro', ''), finalValue);
      }
    }
  }

  walk(partialsRoot);
  return map;
}

function updateImportsInPages(partialMap) {
  const importRegex = /from\s+['"]@partials\/([^'"]+)['"]/g;

  fs.readdirSync(pagesDir).forEach(file => {
    if (!file.endsWith('.astro')) return;
    const fullPath = path.join(pagesDir, file);
    let content = fs.readFileSync(fullPath, 'utf-8');
    let modified = false;

    content = content.replace(importRegex, (match, importPath) => {
      const normalized = importPath.replace(/\\/g, '/').replace(/\.astro$/, '');
      const corrected = partialMap.get(normalized);

      if (corrected) {
        modified = true;
        return `from '@partials/${corrected}'`;
      } else {
        return match; // pas touché si pas trouvé
      }
    });

    if (modified) {
      fs.writeFileSync(fullPath, content, 'utf-8');
      console.log(`✏️  Imports corrigés dans : ${file}`);
    }
  });
}

const partialMap = collectPartialFileMap();
updateImportsInPages(partialMap);

console.log('\n✅ Imports @partials/... mis à jour selon la PascalCase réelle des fichiers.');
