import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const connection = mongoose.createConnection(
  process.env.FINANCIAL_MONGODB_URI as string,
  {
    retryWrites: true,
  },
);

connection.on("connected", () => {
  console.log("Connected to financial database");
});

connection.plugin(autopopulate);

mongoose.set("strictQuery", false);

export { connection };
