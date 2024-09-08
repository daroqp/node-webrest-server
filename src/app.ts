import { envs } from "./config/envs";
import { Server } from "./presentation/server";

(async() => {
	main()
})();

function main() {

	const server = new Server({
		PORT: envs.PORT,
		PUBLIC_PATH: envs.PUBLIC_PATH,
	});

	server.start();
}
