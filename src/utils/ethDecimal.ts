function normalizeEthValue(value: string): string {
  const trimmedValue = value.trim()
  const hasInvalidCharacters = !/^\d+(\.\d+)?$/.test(trimmedValue)

  if (hasInvalidCharacters) {
    throw new Error(`Invalid ETH decimal value: ${value}`)
  }

  return trimmedValue
}

function splitEthParts(value: string): { whole: string; fraction: string } {
  const normalizedValue = normalizeEthValue(value)
  const decimalSeparatorIndex = normalizedValue.indexOf('.')
  const hasFraction = decimalSeparatorIndex >= 0

  if (!hasFraction) {
    return { whole: normalizedValue, fraction: '' }
  }

  const whole = normalizedValue.slice(0, decimalSeparatorIndex)
  const fraction = normalizedValue.slice(decimalSeparatorIndex + 1)

  return { whole, fraction }
}

function padFraction(fraction: string, targetLength: number): string {
  if (fraction.length >= targetLength) {
    return fraction.slice(0, targetLength)
  }

  return fraction.padEnd(targetLength, '0')
}

function trimFraction(fraction: string): string {
  const trimmedFraction = fraction.replace(/0+$/, '')

  return trimmedFraction
}

function toScaledInteger(value: string, scale: number): bigint {
  const { whole, fraction } = splitEthParts(value)
  const paddedFraction = padFraction(fraction, scale)
  const combined = `${whole}${paddedFraction}`

  return BigInt(combined)
}

function fromScaledInteger(scaledValue: bigint, scale: number): string {
  const raw = scaledValue.toString().padStart(scale + 1, '0')
  const wholeLength = raw.length - scale
  const whole = raw.slice(0, wholeLength)
  const fraction = trimFraction(raw.slice(wholeLength))

  if (fraction.length === 0) {
    return whole
  }

  return `${whole}.${fraction}`
}

const ethScale = 6

export function addEth(firstValue: string, secondValue: string): string {
  const firstScaled = toScaledInteger(firstValue, ethScale)
  const secondScaled = toScaledInteger(secondValue, ethScale)
  const sumScaled = firstScaled + secondScaled

  return fromScaledInteger(sumScaled, ethScale)
}

export function multiplyEth(unitPriceEth: string, quantity: number): string {
  const unitScaled = toScaledInteger(unitPriceEth, ethScale)
  const productScaled = unitScaled * BigInt(quantity)

  return fromScaledInteger(productScaled, ethScale)
}

export function compareEth(firstValue: string, secondValue: string): number {
  const firstScaled = toScaledInteger(firstValue, ethScale)
  const secondScaled = toScaledInteger(secondValue, ethScale)

  if (firstScaled === secondScaled) {
    return 0
  }

  if (firstScaled > secondScaled) {
    return 1
  }

  return -1
}

export function subtractEth(minuend: string, subtrahend: string): string {
  const minuendScaled = toScaledInteger(minuend, ethScale)
  const subtrahendScaled = toScaledInteger(subtrahend, ethScale)
  const differenceScaled = minuendScaled - subtrahendScaled

  return fromScaledInteger(differenceScaled, ethScale)
}
