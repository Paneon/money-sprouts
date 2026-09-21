<?php

declare(strict_types=1);

namespace App\Tests\Trait;

use App\Trait\HasCurrencyFormatter;
use PHPUnit\Framework\TestCase;

class HasCurrencyFormatterTest extends TestCase
{
    use HasCurrencyFormatter;

    /**
     * @dataProvider valueProvider
     */
    public function testFormatCurrency(string|int $value, string $expected): void
    {
        $this->assertSame($expected, $this->formatCurrency($value));
    }

    public static function valueProvider(): iterable
    {
        yield 'int cents' => [1250, "12,50\u{a0}€"];
        yield 'negative int cents' => [-500, "-5,00\u{a0}€"];
        yield 'zero' => [0, "0,00\u{a0}€"];
        yield 'string cents' => ['1250', "12,50\u{a0}€"];
        yield 'string with separators' => ['1.250,00', "1.250,00\u{a0}€"];
    }
}
