import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
    text: Number, //para el contenido del mensaje
    author: String, //para saber quien envia el mensaje
    // userId: {type: Schema.Types.ObjectId, ref: 'User'}, //para saber quien envia el mensaje
    recipient: String, //para saber a quien va dirigido el mensaje
    attachments: [String], //para los recursos que se pueden enviar
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