import { connect } from '@/app/libs/mongodb';
import Messages from "@/app/models/messages";
import { NextApiRequest } from 'next';
import { NextResponse, NextRequest } from 'next/server';
import User from '@/app/models/user';

export async function POST(request: NextRequest) {
    try {
        const { text, author, sentAt, timestamp, recipient, attachments } =  await request.json();

        await connect();

        // Buscar al destinatario en la base de datos
        console.log('Recipient:', recipient);
        const recipientUser = await User.findOne({ fullname: recipient });
        console.log('Recipient User:', recipientUser);

        // Si el destinatario no existe, devolver un error
        if (!recipientUser) {
            return NextResponse.json({ message: 'Recipient does not exist' }, {status: 400});
        }

        const newMessage = await Messages.create({ text, author, sentAt, timestamp, recipient, attachments });

        return NextResponse.json({ message: 'Message created' }, {status: 201})
    } catch (error) {
        console.error('Error creating message:', error); // Log the actual error
        return NextResponse.json({ message: 'Error creating message' }, {status: 500});
    }
}

export async function GET() {
    await connect();
    const messages = await Messages.find();
    return NextResponse.json(messages);

}

export async function DELETE(request: NextRequest) {
    const id = request.nextUrl.searchParams.get("id");
    await connect();
    await Messages.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Message deleted' }, {status: 200});
}

// import { connect } from '@/app/libs/mongodb';
// import Messages from "@/app/models/messages";
// import { NextApiRequest } from 'next';
// import { NextResponse, NextRequest } from 'next/server';
// import User from '@/app/models/user';

// export async function POST(request: NextRequest) {
//     try {
//         const { text, author, sentAt, timestamp, recipient } =  await request.json();

//         await connect();

//         // Buscar al destinatario en la base de datos
//         console.log('Recipient:', recipient);
//         const recipientUser = await User.findOne({ fullname: recipient });
//         console.log('Recipient User:', recipientUser);

//         // Si el destinatario no existe, devolver un error
//         if (!recipientUser) {
//             return NextResponse.json({ message: 'Recipient does not exist' }, {status: 400});
//         }

//         const newMessage = await Messages.create({ text, author, sentAt, timestamp, recipient });

//         return NextResponse.json({ message: 'Message created' }, {status: 201});
//     } catch (error) {
//         console.error('Error creating message:', error); // Log the actual error
//         return NextResponse.json({ message: 'Error creating message' }, {status: 500});
//     }
// }

// export async function GET(request: NextRequest) {
//     await connect();

//     const { searchParams } = new URL(request.url);
//     const author = searchParams.get('author');
//     const recipient = searchParams.get('recipient');

//     let messages;

//     if (author && recipient) {
//         messages = await Messages.find({
//             $or: [
//                 { author, recipient },
//                 { author: recipient, recipient: author }
//             ]
//         });
//     } else {
//         messages = await Messages.find();
//     }

//     return NextResponse.json(messages);
// }

// export async function DELETE(request: NextRequest) {
//     const id = request.nextUrl.searchParams.get("id");
//     await connect();
//     await Messages.findByIdAndDelete(id);
//     return NextResponse.json({ message: 'Message deleted' }, {status: 200});
// }

