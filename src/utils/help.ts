export const notEmptyArray = <T>(arr: T[]): arr is [T, ...T[]] => {
	return !!arr.length
}
