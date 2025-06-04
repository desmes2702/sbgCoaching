import fs from "fs";
import path from "path";
import { glob } from "glob";

const basePath = "./src/scss";

const files = await glob(`${basePath}/**/*.scss`, { nodir: true });

for (const file of files) {
  // ⛔ Skip abstracts dir
  if (file.includes("/abstracts/") || file.includes("\\abstracts\\")) continue;

  const content = fs.readFileSync(file, "utf-8");

  const needsSass = /(\$[a-zA-Z_-]+|@include)/.test(content);
  if (!needsSass) continue;

  const relativeDepth = path.relative(basePath, file).split(path.sep).length - 1;
  const correctPath = `"${"../".repeat(relativeDepth)}abstracts"`;
  const correctUseLine = `@use ${correctPath} as *;`;

  const lines = content.split("\n");

  const existingUseIndex = lines.findIndex(line =>
    line.trim().startsWith("@use") && line.includes("abstracts") && line.includes("as *")
  );

  if (existingUseIndex !== -1) {
    // 🛠️ Update ligne incorrecte
    if (lines[existingUseIndex].trim() !== correctUseLine) {
      lines[existingUseIndex] = correctUseLine;
      console.log(`🔁 Corrigé: ${file}`);
    }
  } else {
    // ➕ Injecter si absent
    lines.unshift(correctUseLine);
    console.log(`✅ Injecté: ${file}`);
  }

  fs.writeFileSync(file, lines.join("\n"), "utf-8");
}

console.log("✅ Tous les fichiers SCSS sont corrigés.");
