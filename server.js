import "dotenv/config";
import app from "./src/app.js";

const port = process.env.port || 3000;

app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}`);
});