import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const connection = mongoose.createConnection(
  process.env.USER_MONGODB_URI as string,
  {
    retryWrites: true,
  },
);

connection.on("connected", () => {
  console.log("Connected to user database");
});

connection.plugin(autopopulate);

mongoose.set("strictQuery", false);

export { connection };
