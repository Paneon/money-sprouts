import deTranslations from '../../../../translations/de.json';

type DeepKeys<T> = T extends object
    ? {
          [K in keyof T]: `${K & string}${T[K] extends object ? `.${DeepKeys<T[K]>}` : ''}`;
      }[keyof T]
    : never;

export type TranslationKey = DeepKeys<typeof deTranslations>;

export function t(key: TranslationKey): string {
    return key;
}
