import mongoose from "mongoose";

const {MONGODB_URI} = process.env;

if (!MONGODB_URI) {
  throw new Error("No MONGODB_URI provided");
}

export const connect = async () => {
  try {
  //Respuesta de conexión a la base de datos
  const {connection} = await mongoose.connect(MONGODB_URI);
  //Veo si está conectado con el valor 1
  if(connection.readyState === 1){
    console.log("Connected to MongoDB")
    return Promise.resolve(true);
  }
 } catch (error){
    console.error("Error connecting to MongoDB", error);
    return Promise.reject(error);
  }
}



