export const convertUnit = (value: number, unit: string) => {
    switch (unit) {
        case 'inches':
            return value / 96;
        case 'pixels':
            return value;
        default:
            return value;
    }
};
