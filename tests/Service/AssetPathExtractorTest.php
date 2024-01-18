<?php

namespace App\Tests\Service;

use App\Service\AssetPathExtractor;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class AssetPathExtractorTest extends TestCase
{
    private LoggerInterface $loggerMock;
    private string $indexPath = 'tests/mock/index.html';
    private string $buildDir = '/build/';

    protected function setUp(): void
    {
        $this->loggerMock = $this->createMock(LoggerInterface::class);
    }

    public function testGetScriptPath(): void
    {
        $extractor = new AssetPathExtractor($this->indexPath, $this->buildDir, $this->loggerMock);
        $this->assertEquals($this->buildDir . 'runtime.abcdef.js', $extractor->getScriptPath('runtime'));
        $this->assertEquals($this->buildDir . 'main.789012.js', $extractor->getScriptPath('main'));
    }

    public function testGetCssPath(): void
    {
        $extractor = new AssetPathExtractor($this->indexPath, $this->buildDir, $this->loggerMock);
        $this->assertEquals($this->buildDir . 'styles.123456.css', $extractor->getCssPath('styles'));
    }
}
