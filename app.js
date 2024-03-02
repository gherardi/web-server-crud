import express from 'express';
import morgan from 'morgan';
import * as controller from './controller.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', controller.read);
app.get("/:id", controller.readById);
app.post('/', controller.create);
app.patch('/:id', controller.update);
app.delete('/:id', controller.destroy);

app.all('*', (req, res) => {
	res.status(404).json({
		status: 'fail',
		message: `Can't find ${req.originalUrl} on this server!`,
	});
});

export default app;
