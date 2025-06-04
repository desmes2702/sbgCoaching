import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import chokidar from 'chokidar';
import chalk from 'chalk';

const SCSS_DIR = 'src/scss';
const ABSTRACT_PATH = 'abstracts/globals';
const VARIABLES_PATH = 'abstracts/variables';
const GLOBAL_USE_COMMENT = '// Injected by watchInjectGlobals.ts\n';

const GLOBAL_USE_REGEX = /@use\s+['"](?:\.\.\/|\.\/)?abstracts\/globals['"]\s+as\s+\*;/g;
const VARIABLES_USE_REGEX = /@use\s+['"](?:\.\.\/|\.\/)?abstracts\/variables['"]\s+as\s+\*;/g;

const EXCLUDED_GLOBAL = ['_global.scss', '_variables.scss', '_mixins.scss', '_font.scss'];
const DIRECT_VARIABLES = ['_mixins.scss', '_font.scss'];
const IS_DRY_RUN = process.argv.includes('--dry-run');

function getRelativeUsePath(file: string, target: string): string {
  const from = path.dirname(file);
  const to = path.resolve(SCSS_DIR, target);
  const relative = path.relative(from, to).replace(/\\/g, '/');
  return `@use "${relative}" as *;`;
}

function isGlobalImportPresent(content: string): boolean {
  return GLOBAL_USE_REGEX.test(content);
}

function isVariablesImportPresent(content: string): boolean {
  return VARIABLES_USE_REGEX.test(content);
}

function removeDuplicateUses(content: string): [string, boolean] {
  const lines = content.split('\n');
  const seen = new Set();
  let modified = false;

  const cleanedLines = lines.filter(line => {
    const trimmed = line.trim();
    if (GLOBAL_USE_REGEX.test(trimmed) || VARIABLES_USE_REGEX.test(trimmed)) {
      if (seen.has(trimmed)) {
        modified = true;
        return false;
      }
      seen.add(trimmed);
    }
    return true;
  });

  return [cleanedLines.join('\n'), modified];
}

function warnDeprecatedImport(content: string, file: string): void {
  if (content.includes('@import')) {
    console.log(chalk.redBright(`🚨 [DEPRECATED] @import détecté dans ${file}`));
  }
}

function prependBlock(content: string, block: string): string {
  return block + content;
}

async function processFile(file: string): Promise<boolean> {
  let originalName = path.basename(file);
  const dir = path.dirname(file);
  let actualPath = file;
  let filename = originalName;

  if (originalName.startsWith('__')) {
    const fixedName = originalName.replace(/^__+/, '_');
    const fixedPath = path.join(dir, fixedName);
    if (!IS_DRY_RUN) fs.renameSync(file, fixedPath);
    filename = fixedName;
    actualPath = fixedPath;
    console.log(chalk.green(`├─ ✔ Correction du double underscore : ${fixedName}`));
  } else if (!originalName.startsWith('_')) {
    const newName = `_${originalName}`;
    const newPath = path.join(dir, newName);
    if (!IS_DRY_RUN) fs.renameSync(actualPath, newPath);
    filename = newName;
    actualPath = newPath;
    console.log(chalk.green(`├─ ✔ Renommage en ${newName}`));
  }

  const contentOrig = fs.readFileSync(actualPath, 'utf-8');
  let content = contentOrig;

  warnDeprecatedImport(contentOrig, actualPath);
  let modified = false;

  // Dédoublonnage AVANT injection
  const [dedupedContent, wasDeduped] = removeDuplicateUses(content);
  if (wasDeduped) {
    content = dedupedContent;
    modified = true;
    console.log(chalk.green(`├─ ✔ Suppression des doublons`));
  }

  if (!EXCLUDED_GLOBAL.includes(filename)) {
    if (!isGlobalImportPresent(content)) {
      const relativeUse = getRelativeUsePath(actualPath, ABSTRACT_PATH);
      content = prependBlock(content, `${GLOBAL_USE_COMMENT}${relativeUse}\n\n`);
      modified = true;
      console.log(chalk.green(`├─ ✔ Injection du bloc global relatif`));
    }
  }

  if (DIRECT_VARIABLES.includes(filename) && !isVariablesImportPresent(content)) {
    const relativeUse = getRelativeUsePath(actualPath, VARIABLES_PATH);
    content = prependBlock(content, `${relativeUse}\n\n`);
    modified = true;
    console.log(chalk.green(`├─ ✔ Injection de variables dans ${filename}`));
  }

  if (modified && !IS_DRY_RUN) {
    fs.copyFileSync(actualPath, `${actualPath}.bak`);
    fs.writeFileSync(actualPath, content, 'utf-8');
    console.log(chalk.gray(`💾 Sauvegarde créée : ${path.basename(actualPath)}.bak`));
  } else if (!modified) {
    console.log(chalk.yellow(`⚠️ Aucune modification nécessaire : ${actualPath}`));
  }

  return modified;
}

async function runAll() {
  const files = await glob(`${SCSS_DIR}/**/*.scss`);
  let modifiedCount = 0;
  let unchangedCount = 0;

  for (const file of files) {
    console.log(chalk.cyan(`\n📝 Analyse de : ${file}`));
    const modified = await processFile(file);
    modified ? modifiedCount++ : unchangedCount++;
  }

  console.log(chalk.blueBright(`\n✅ ${modifiedCount} fichier(s) modifié(s) | ${unchangedCount} inchangé(s)`));
}

function initWatcher() {
  const watcher = chokidar.watch(`${SCSS_DIR}/**/*.scss`, { persistent: true });

  watcher.on('change', async (filePath) => {
    console.log(chalk.magenta(`\n🔄 Fichier modifié: ${filePath}`));
    await processFile(filePath);
  });

  setInterval(() => {
    console.log(chalk.gray('\n⏰ Vérification périodique (toutes les 5 min)'));
    runAll();
  }, 5 * 60 * 1000);
}

if (!IS_DRY_RUN) {
  runAll().catch(console.error);
  initWatcher();
} else {
  console.log(chalk.blueBright('🧪 Mode dry-run activé — aucune écriture ne sera faite.'));
  runAll().catch(console.error);
}
