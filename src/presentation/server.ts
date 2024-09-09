import express, { Router } from 'express'
import path from 'path';

interface Options {
	PORT: number;
	PUBLIC_PATH?: string;
	routes: Router;
}

export class Server {

	private app = express();
	private readonly port: number;
	private readonly publicPath: string;
	private readonly routes: Router;

	constructor(options: Options) {
		const { PORT, PUBLIC_PATH = 'public', routes } = options;

		this.port = PORT;
		this.publicPath = PUBLIC_PATH;
		this.routes = routes;
	}

	async start() {

		// Middlewares
		this.app.use( express.json() ); // raw json for body parse
		this.app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded

		// Public Folder
		this.app.use(express.static(this.publicPath));

		// Routes
		this.app.use(this.routes);

		//* Comodin para SPA
		this.app.get('*', (_req, res) => {
			const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
			res.sendFile(indexPath);
		})

		this.app.listen(3000, () => {
			console.log(`Server running on port ${this.port}`);
		});
	}
}
