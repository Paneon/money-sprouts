import { differenceInDays, format, parseISO } from 'date-fns';
import { Locale } from '@/client/interfaces/Locale';
import { de, enUS } from 'date-fns/locale';

const locales = {
    [Locale.EN]: enUS,
    [Locale.DE]: de,
};
export const getFormattedNextPayday = (nextPayday: string, locale: Locale) => {
    const date = parseISO(nextPayday);
    const formattedDate = format(date, 'dd. MMMM yyyy', {
        locale: locales[locale],
    });
    const dayName = format(date, 'EEEE', { locale: locales[locale] });
    return `${dayName} (${formattedDate})`;
};

export const getDaysUntilNextPayday = (nextPayday: string) => {
    if (!nextPayday) {
        return 'OVERVIEW.PAYDAY_COUNTER_UNKNOWN';
    }
    const now = new Date();
    const paydayDate = parseISO(nextPayday);
    const dayDifference = differenceInDays(paydayDate, now);
    return `${dayDifference}`;
};
