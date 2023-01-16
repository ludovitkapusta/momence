export const splitByLines = (data: string): Array<string> => data.split(/\r?\n/)
export const splitByPipes = (data: string): Array<string> => data.split(/\|/)
export const getHeaders = (data: string): string => splitByLines(data).slice(1, 2)[0]
export const filterCurrencyList = (data: string[]): Array<string> => data.slice(2).slice(0, -1)
