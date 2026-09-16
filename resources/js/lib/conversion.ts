export type TemplateUnit = 'in' | 'px';

/**
 * Converts a template's stored width or height value into real pixels.
 * If the template's unit is 'in', multiplies by dpi to get pixels.
 * If the unit is 'px', returns the value unchanged.
 */
export function convertUnit(
    value: number,
    unit: TemplateUnit,
    dpi: number,
): number {
    return unit === 'in' ? value * dpi : value;
}
