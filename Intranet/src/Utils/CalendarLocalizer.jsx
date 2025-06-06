import { dateFnsLocalizer } from 'react-big-calendar';
import { parse, startOfWeek, getDay, format } from 'date-fns';
import pl from 'date-fns/locale/pl'; // lub inny jêzyk

const locales = {
    'pl': pl,
};

export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date()),
    getDay,
    locales,
});

export default localizer;