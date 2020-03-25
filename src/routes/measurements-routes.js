import express from 'express';

import { addMeasurement, fetchByDate } from '../services/measurements-service';

const router = express.Router();

router.post('/', (req, res) => {

    const {timestamp, ...metrics} = req.body;

    addMeasurement(timestamp, metrics);

    res.location(`/measurements/${timestamp}`)
        .sendStatus(201);
});

router.get('/:timestamp', (req, res) => {

    const result = fetchByDate(req.params.timestamp);

    if (result) {
        res.json(result.serialize());
    } else {
        res.sendStatus(404);
    }
});

export default router;