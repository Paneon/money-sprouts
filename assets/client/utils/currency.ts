export function formatCentsToEuro(cents: number): string {
    const euros = cents / 100;
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
    }).format(euros);
}

export function parseFormattedCurrencyToCents(stringNumber: string): number {
    const thousandSeparator = Intl.NumberFormat('de-DE')
        .format(11111)
        .replace(/\p{Number}/gu, '');
    const decimalSeparator = Intl.NumberFormat('de-DE')
        .format(1.1)
        .replace(/\p{Number}/gu, '');

    return (
        parseFloat(
            stringNumber
                .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
                .replace(new RegExp('\\' + decimalSeparator), '.')
        ) * 100
    );
}
