const server = require("./server");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env["SERVER_PORT"] || 8080;
server.listen(port, () => console.log(`app running on ${port}`));
