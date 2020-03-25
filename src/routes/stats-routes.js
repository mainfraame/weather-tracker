import express from 'express';

import { fetchByDateRange, fetchMetrics } from '../services/measurements-service';
import { computeStats } from '../services/stats-service';

const router = express.Router();

router.get('/', (req, res) => {

    const measurements = fetchByDateRange(
        req.query.fromDateTime,
        req.query.toDateTime
    );

    const metrics = fetchMetrics(
        measurements,
        req.query.metric
    );

    res.json(
        computeStats(
            metrics,
            req.query.stat
        )
    );
});

export default router;