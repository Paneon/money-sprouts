export function formatCentsToEuro(cents: number): string {
    const euros = cents / 100;
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
    }).format(euros);
}
