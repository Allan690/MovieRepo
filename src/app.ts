import express from 'express';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// set base url for api
import routes from './modules';
routes(app);

app.use('*', (req, res) => res.status(404).json({
  message: 'Not Found. Use /api/v1 to access the api'
}));

export default app;
