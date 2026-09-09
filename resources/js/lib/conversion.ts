export type TemplateUnit = 'inches' | 'pixels';

/**
 * Converts a template's stored width or height value into real pixels.
 * If the template's unit is 'inches', multiplies by dpi to get pixels.
 * If the unit is 'pixels', returns the value unchanged.
 */
export function convertUnit(
    value: number,
    unit: TemplateUnit,
    dpi: number,
): number {
    return unit === 'inches' ? value * dpi : value;
}
