import { formatCentsToEuro } from '@/client/utils/currency';

describe('formatCentsToEuro', () => {
    it('should format 0 cents to "0,00 €"', () => {
        // Given
        const cents = 0;

        // When
        const result = formatCentsToEuro(cents);

        // Then
        expect(result).toBe('0,00 €');
    });

    it('should format 100 cents to "1,00 €"', () => {
        // Given
        const cents = 100;

        // When
        const result = formatCentsToEuro(cents);

        // Then
        expect(result).toBe('1,00 €');
    });

    it('should format 99999 cents to "999,99 €"', () => {
        // Given
        const cents = 99999;

        // When
        const result = formatCentsToEuro(cents);

        // Then
        expect(result).toBe('999,99 €');
    });

    it('should format undefined to throw an error', () => {
        // Given
        const cents = undefined;

        // Then
        expect(() => {
            // When
            formatCentsToEuro(cents as any);
        }).toThrow();
    });

    it('should format null to throw an error', () => {
        // Given
        const cents = null;

        // Then
        expect(() => {
            // When
            formatCentsToEuro(cents as any);
        }).toThrow();
    });

    it('should format NaN to throw an error', () => {
        // Given
        const cents = NaN;

        // Then
        expect(() => {
            // When
            formatCentsToEuro(cents);
        }).toThrow();
    });
});
