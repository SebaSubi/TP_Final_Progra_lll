import { connect } from '@/app/libs/mongodb';
import Messages from "@/app/models/messages";
import { NextApiRequest } from 'next';
import { NextResponse, NextRequest } from 'next/server';
import User from '@/app/models/user';

export async function POST(request: NextRequest) {
    try {
        const { text, author, sentAt, timestamp, recipient, materials } = await request.json();

        await connect();

        // Find recipient user
        const recipientUser = await User.findOne({ fullname: recipient });
        if (!recipientUser) {
            return NextResponse.json({ message: 'Recipient does not exist' }, { status: 400 });
        }

        // Create message with materials
        const newMessage = await Messages.create({ text, author, sentAt, timestamp, recipient, materials });

        return NextResponse.json({ message: 'Message created', newMessage }, { status: 201 });
    } catch (error) {
        console.error('Error creating message:', error);
        return NextResponse.json({ message: 'Error creating message' }, { status: 500 });
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
    return NextResponse.json({ message: 'Message deleted' }, { status: 200 });
}
