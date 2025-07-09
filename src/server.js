const { connectDb } = require("./config/db");
const app = require("./middlewares/app");
connectDb();
app.listen(3000);
