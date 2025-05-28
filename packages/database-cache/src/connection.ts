import mongoose from "mongoose";

const connection = mongoose.createConnection(
  process.env.CACHE_MONGODB_URI as string,
  {
    retryWrites: true,
  },
);

connection.on("connected", () => {
  console.log("Connected to cache database");
});

mongoose.set("strictQuery", false);

export { connection };
