import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function mergeClassNames(...classNames: ClassValue[]) {
  return twMerge(clsx(classNames))
}
