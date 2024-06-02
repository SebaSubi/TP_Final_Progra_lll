import { connect } from '@/app/libs/mongodb';
import Messages from '@/app/models/messages';
import { NextApiRequest } from 'next';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { text, author, timestamp } =  await request.json(); // Handle text, author, and timestamp

        await connect();

        const newMessage = await Messages.create({ text, author, timestamp }); // Save text, author, and timestamp

        return NextResponse.json({ message: 'Message created' }, {status: 201})
    } catch (error) {
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
