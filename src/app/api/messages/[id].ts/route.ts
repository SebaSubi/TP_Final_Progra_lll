import { connect } from '@/app/libs/mongodb'
// import UserInstance from '@/app/models/instance';
import { NextRequest, NextResponse } from 'next/server'
import Messages from '@/app/models/messages';

// export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
//   const { id } = params;
//   const { newText: text, newAuthor: author, newSentAt: sentAt, newRecipient: recipient, newAttachments: attachments, newReplies: replies } = await request.json();
//   await connect();
//   await Messages.findByIdAndUpdate(id, { text, author, sentAt, recipient, attachments, replies });
//   return NextResponse.json({ message: "Message updated" }, { status: 200 });
// }
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  await connect();
  const message = await Messages.findOne({ _id: id });
  return NextResponse.json({ message }, { status: 200 });
}