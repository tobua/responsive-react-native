export interface Scale {
  minimum: number
  maximum: number
  factor: number
}

export type Breakpoints = Record<string, number>

export type Value = (value: number, breakpoint: string) => number

export type StyledComponent = string | string[] | Function
