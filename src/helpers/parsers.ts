export const splitByLines = (data: string): Array<string> => data.split(/\r?\n/)
export const splitByPipes = (data: string): Array<string> => data.split(/\|/)
export const getFirstLine = (data: string): string => splitByLines(data).slice(1, 2)[0]

export const removeFirstAndLastLine = (data: string[]): Array<string> => data.slice(2).slice(0, -1)
