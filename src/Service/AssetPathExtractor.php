<?php declare(strict_types=1);

namespace App\Service;

class AssetPathExtractor
{
    private array $javascriptFiles = [];
    private array $cssFiles = [];

    public function __construct(string $indexPath, string $buildDir)
    {
        if (!file_exists($indexPath)) {
            return;
        }

        $content = file_get_contents($indexPath);
        preg_match_all('/<script src="(.+?)" type="module"><\/script>/', $content, $matches);
        foreach ($matches[1] as $path) {
            $baseName = $this->extractBaseName($path, 'js');
            $this->javascriptFiles[$baseName] = $buildDir . $path;
        }

        preg_match_all('/<link rel="stylesheet" href="(.+?)"(\s\/)?>/', $content, $matches);
        foreach ($matches[1] as $path) {
            $baseName = $this->extractBaseName($path, 'css');
            $this->cssFiles[$baseName] = $buildDir . $path;
        }
    }

    /**
     * Returns the base name without the hash which is used for production builds
     */
    private function extractBaseName(string $path, string $suffix): string
    {
        // Assuming file names are in the format 'name.hash.js'
        if (preg_match('/(?<basename>[^"]*?)(?<hash>\.[a-f0-9]*)?\.' . $suffix . '/', $path, $matches)) {
            return $matches[1];
        }

        return basename($path, '.' . $suffix); // Fallback for non-hashed file names
    }

    public function getScriptPath(string $name): ?string
    {
        return $this->javascriptFiles[$name] ?? null;
    }

    public function getCssPath(string $name): ?string
    {
        return $this->cssFiles[$name] ?? null;
    }
}
