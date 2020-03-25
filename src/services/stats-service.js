import Big from 'big.js';

const statistics = {
    /**
     * Compute the average
     *
     * @param {Array<number>} metrics
     *
     * @return number
     */
    average: (metrics) => (
        Number(
            metrics
                .reduce((a, b) => a.plus(b), new Big(0))
                .div(metrics.length)
                .toFixed(2)
        )
    ),

    /**
     * Compute the max
     *
     * @param {Array<number>} metrics
     *
     * @return number
     */
    max: (metrics) => Math.max(...metrics),

    /**
     * Compute the min
     *
     * @param {Array<number>} metrics
     *
     * @return number
     */
    min: (metrics) => Math.min(...metrics)
};

/**
 * Compute statistics for given metrics
 *
 * @param {Array<{metric: string, values: Array<number>}>} metrics
 * @param {Array<string>} stats
 *
 * @return {Array<{metric: string, stat: string, value: number}>}
 */
export function computeStats(metrics, stats) {
    return metrics.reduce((acc, {metric, values}) => ([
        ...acc,
        ...stats.map((stat) => ({
            metric,
            stat,
            value: statistics[stat](values)
        }))
    ]), []);
}