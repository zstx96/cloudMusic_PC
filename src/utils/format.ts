
export const formatNumber = (value: number) => {
    if (value <= 1e4) {
        return value
    } else if (value <= 1e8) {
        return Number(value / 1e4).toFixed() + '万'
    } else {
        return Number(value / 1e8).toFixed() + '亿'
    }
}