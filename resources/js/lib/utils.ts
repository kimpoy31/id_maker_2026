import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export * from './conversion';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
