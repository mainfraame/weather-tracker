import MeasurementModel from '../models/measurement-model';

const store = new Map();

/**
 * Add new measurement
 *
 * @param {String} timestamp
 * @param {{dewPoint?: number, precipitation?: number, temperature?: number}} metrics
 *
 */
export function addMeasurement(timestamp, metrics) {
    store.set(
        timestamp,
        new MeasurementModel(timestamp, metrics)
    );
}

/**
 * Get a measurement by date
 *
 * @param {String} timestamp - ISO 8601
 *
 * @returns {MeasurementModel}
 */
export function fetchByDate(timestamp) {
    return store.get(timestamp);
}

/**
 * Get measurements by date range
 *
 * @param {String} start - ISO 8601 (inclusive)
 * @param {String} end - ISO 8601 (exclusive)
 *
 * @returns {Array<MeasurementModel>}
 */
export function fetchByDateRange(start, end) {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();

    return Array.from(store.values())
        .filter((measurement) => {
            const timestamp = measurement.getTime();

            return timestamp >= startTime &&
                timestamp < endTime;
        });
}

/**
 * Get metrics within a given date range from measurements
 *
 * @param {Array<MeasurementModel>} measurements
 * @param {Array<string>} metrics - metrics to get
 *
 * @returns {Array<{metric: string, values: Array<number>}>}
 */
export function fetchMetrics(measurements, metrics) {

    // todo:: there is something I'm not seeing here..
    // there HAS to be a better way to structure the measurement > metrics relationship
    // even if I don't make it passed this review, I'd love to see how you could optimize this

    return metrics.reduce((acc, metric) => {

        const values = measurements
            .map((measurement) => measurement.getMetric(metric))
            .filter((value) => !isNaN(value));

        return [
            ...acc,
            ...values.length ? [
                {
                    metric,
                    values
                }
            ] : []
        ];
    }, []);
}
