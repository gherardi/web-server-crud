import express from 'express';
import morgan from 'morgan';
import * as controller from './controller.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/api', controller.read);
app.post('/api', controller.create);
app.patch('/api', controller.update);
app.delete('/api', controller.destroy);

app.all('*', (req, res) => {
	res.status(404).json({
		status: 'fail',
		message: `Can't find ${req.originalUrl} on this server!`,
	});
});

export default app;
