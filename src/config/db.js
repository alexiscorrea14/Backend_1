import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Base de datos conectada");
  } catch (error) {
    console.error("Error en la conexión a la base de datos", error);
    process.exit(1);
  }
};

export default connectDB;
