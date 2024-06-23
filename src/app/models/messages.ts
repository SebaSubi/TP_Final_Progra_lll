import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
    text: String, //para el contenido del mensaje
    author: String, //para saber quien envia el mensaje
    // userId: {type: Schema.Types.ObjectId, ref: 'User'}, //para saber quien envia el mensaje
    recipient: String, //para saber a quien va dirigido el mensaje
    sentAt: String, //para saber cuando se envio el mensaje
    attachments: [String], //para los recursos que se pueden enviar
    readed: Boolean, //para saber si el mensaje fue leido
    replies: [{ //para poder responder a un mensaje
        author: String,
        text: String,
        timestamp: Date,
    }],
 },
 {
    timestamps: true, 
 }
);

const Messages = mongoose.models.Messages || mongoose.model("Messages", messageSchema);

export default Messages;