import mongoose from "mongoose";
type connectionType = {
  isConnected?: number;
};
const connection: connectionType = {};

export async function dbconnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI || '', {});
    console.log(db.connections[0].readyState);
    
    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process with failure
  }
}
