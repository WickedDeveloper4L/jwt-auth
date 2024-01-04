const app = require("./app");
const PORT = process.env.PORT;
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
};

startServer();
