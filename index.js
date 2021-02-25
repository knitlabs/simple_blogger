const dotenv = require("dotenv");
dotenv.config();

const server = require("./server");

const port = process.env.SERVER_PORT || 8080;
server.listen(port, () => console.log(`app running on ${port}`));
