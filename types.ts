export interface Scale {
  minimum: number
  maximum: number
  factor: number
}

export type Breakpoints = Record<string, number>
