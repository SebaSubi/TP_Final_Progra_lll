import { connect } from '@/app/libs/mongodb';
import Messages from "@/app/models/messages";
import { NextApiRequest } from 'next';
import { NextResponse, NextRequest } from 'next/server';
import User from '@/app/models/user';

export async function POST(request: NextRequest) {
    try {
        const { text, author, sentAt, timestamp, recipient, readed } =  await request.json();

        // Validación básica de los datos de entrada
        if (!text || !author || !sentAt || !timestamp || !recipient) {
            return NextResponse.json({ message: 'Missing required fields' }, {status: 400});
        }

        await connect();

        // Buscar al destinatario en la base de datos
        const recipientUser = await User.findOne({ fullname: recipient });

        // Si el destinatario no existe, devolver un error
        if (!recipientUser) {
            return NextResponse.json({ message: 'Recipient does not exist' }, {status: 400});
        }

        const newMessage = await Messages.create({ text, author, sentAt, timestamp, recipient, readed });

        return NextResponse.json({ message: 'Message created' }, {status: 201})
    } catch (error) {
        console.error('Error creating message:', error);
        return NextResponse.json({ message: 'Error creating message' }, {status: 500});
    }
}

export async function GET() {
    await connect();
    const messages = await Messages.find();
    return NextResponse.json(messages);
}

// export async function GET() {
//     await connect();
//     const messages = await Messages.find({ readed: false });
//     return NextResponse.json(messages);
// }


export async function DELETE(request: NextRequest) {
    const id = request.nextUrl.searchParams.get("id");
    await connect();
    await Messages.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Message deleted' }, {status: 200});
}

export async function PUT(request: NextRequest) {
    try {
        const { id, readed } = await request.json();

        // Validación básica de los datos de entrada
        if (!id || typeof readed !== 'boolean') {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        await connect();

        // Actualizar el estado de lectura del mensaje
        const updatedMessage = await Messages.findByIdAndUpdate(id, { readed }, { new: true });

        // Si el mensaje no existe, devolver un error
        if (!updatedMessage) {
            return NextResponse.json({ message: 'Message not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Message updated', updatedMessage }, { status: 200 });
    } catch (error) {
        console.error('Error updating message:', error);
        return NextResponse.json({ message: 'Error updating message' }, { status: 500 });
    }
}