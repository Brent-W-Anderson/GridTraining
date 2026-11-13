export type LegInput = {
 id: number
 label: string
 size: 32 | 64
}

export type LegRange = {
 id: number
 label: string
 firstPort: number
 lastPort: number
 firstStrand: number
}

export function wholeNumber(value: string, minimum = 0): number | null {
 if (!/^\d+$/.test(value.trim())) return null
 const number = Number(value)
 return Number.isSafeInteger(number) && number >= minimum ? number : null
}

export function buildRanges(inputs: readonly LegInput[], startingPort = 1):
 { error: 'invalid' | 'duplicate' | null; ranges: LegRange[] } {
 if (!inputs.length || !Number.isSafeInteger(startingPort) || startingPort < 0) {
  return { error: 'invalid', ranges: [] }
 }
 const ranges: LegRange[] = []
 const labels = new Set<string>()
 let firstPort = startingPort
 for (const input of inputs) {
  const label = input.label.trim()
  if (!label || (input.size !== 32 && input.size !== 64) ||
   !Number.isSafeInteger(firstPort + input.size - 1)) {
   return { error: 'invalid', ranges: [] }
  }
  if (labels.has(label.toLowerCase())) return { error: 'duplicate', ranges: [] }
  labels.add(label.toLowerCase())
  ranges.push({ id: input.id, label, firstPort, lastPort: firstPort + input.size - 1, firstStrand: 1 })
  firstPort += input.size
 }
 return { error: null, ranges }
}

export function locatePort(port: number, ranges: readonly LegRange[]) {
 if (!Number.isSafeInteger(port) || port < 0) return null
 const leg = ranges.find(range => port >= range.firstPort && port <= range.lastPort)
 if (!leg) return null
 const position = port - leg.firstPort + 1
 return { leg, position, strand: position }
}
