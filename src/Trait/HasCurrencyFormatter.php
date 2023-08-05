<?php

declare(strict_types=1);

namespace App\Trait;

use NumberFormatter;

trait HasCurrencyFormatter
{
    public function formatCurrency(string|int $value): string
    {
        $value = str_replace(',', '', $value);
        $value = str_replace('.', '', $value);
        $value = intval($value) / 100;
        $nf = new NumberFormatter('de_DE', NumberFormatter::CURRENCY);

        return $nf->format($value);
    }
}
