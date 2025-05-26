import mongoose from "mongoose";
type connectionType = {
  isConnected?: number | null;
};
const connection: connectionType = {};

export async function dbconnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI as string, {});
    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to the database");
    
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process with failure
  }
}
