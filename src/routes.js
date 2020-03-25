import path from 'path';
import express from 'express';
import { OpenApiValidator } from 'express-openapi-validator';
import swaggerUi from 'swagger-ui-express';
import yamlJs from 'yamljs';

import decodeUriMw from './middleware/decode-uri-middleware';
import validationMw from './middleware/validation-middleware';

import measurementRoutes from './routes/measurements-routes';
import statsRoutes from './routes/stats-routes';

const apiSpecPath = path.resolve(__dirname, './swagger.yaml');

const validation = new OpenApiValidator({apiSpecPath});

const app = express();

app.use(express.json());

// open-api does not currently support decoding the request url
// and express-openapi-validator does not implement decodeURIComponent
app.use(decodeUriMw);

// register swagger-ui before applying validation for routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(yamlJs.load(apiSpecPath)));

validation.install(app);

app.use('/measurements', measurementRoutes);
app.use('/stats', statsRoutes);

app.use(validationMw);

export default app;