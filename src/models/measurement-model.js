import fromEntries from 'fromentries';

/**
 * @property @private {Date} timestamp
 * @property @private {Map<'depPoint' | 'precipitation' | 'temperature', number>} metrics
 */
export default class MeasurementModel {

    /**
     * @param {String} timestamp
     * @param {{dewPoint?: number, precipitation?: number, temperature?: number}} metrics
     *
     * @return {MeasurementModel}
     */
    constructor(timestamp, metrics) {
        this.metrics = new Map(Object.entries(metrics));
        this.timestamp = new Date(timestamp);
    }

    /**
     * Get a specific metric's value
     *
     * @param {String} metric
     *
     * @return {Number}
     */
    getMetric(metric) {
        return this.metrics.get(metric);
    }

    /**
     * Get the timestamp
     *
     * @return {Number}
     */
    getTime() {
        return this.timestamp.getTime();
    }

    /**
     * Get a serialized copy of the Metrics object
     *
     * @return {{dewPoint?: number, precipitation?: number, temperature?: number, timestamp: string}}
     */
    serialize() {
        return {
            ...fromEntries(this.metrics.entries()),
            timestamp: this.timestamp.toISOString()
        };
    };
}
