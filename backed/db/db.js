import mongoose from "mongoose";
export default function db(uri) {
  // Set up the MongoDB connection using Mongoose
  console.log(uri)
  mongoose
    .connect(uri) 
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error(err); 
    });

  // Define the MongoDB connection
  const db = mongoose.connection;

  // Handle errors
  db.on("error", (err) => {
    console.error(err);
  });

  // Handle successful connection
  db.once("open", () => {
    console.log("Connected to MongoDB");
  });
}
