<?php
// Inclusion sécurisée d’un partial spécifique à une page
function includePartial(string $file, string $folder)
{
  $base = realpath(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'pages' . DIRECTORY_SEPARATOR . $folder);
  $path = $base . DIRECTORY_SEPARATOR . $file . '.php';
  if (file_exists($path)) {
    include $path;
  } else {
    echo "<!-- ❌ Partial '{$file}.php' introuvable dans '{$folder}' -->";
  }
}

// Inclusion sécurisée d’un composant global
function includeComponent(string $file)
{
  $base = realpath(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'pages' . DIRECTORY_SEPARATOR . 'components');
  $path = $base . DIRECTORY_SEPARATOR . $file . '.php';
  if (file_exists($path)) {
    include $path;
  } else {
    echo "<!-- ❌ Component '{$file}.php' introuvable -->";
  }
}
