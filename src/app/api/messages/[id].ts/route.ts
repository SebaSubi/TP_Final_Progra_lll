import { connect } from '@/app/libs/mongodb'
// import UserInstance from '@/app/models/instance';
import { NextRequest, NextResponse } from 'next/server'
import Messages from '@/app/models/messages';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { newText: text, newAuthor: author, newSentAt: sentAt, newRecipient: recipient, newAttachments: attachments, newReplies: replies, newMaterials: materials } = await request.json();
  await connect();

  // Aquí deberías tener lógica para actualizar el mensaje y, si es necesario, los materiales asociados
  await Messages.findByIdAndUpdate(id, { text, author, sentAt, recipient, attachments, replies });

  // Si necesitas actualizar materiales, llama a la función adecuada aquí
  // updateUserMaterials(recipient, materials);

  return NextResponse.json({ message: "Message updated" }, { status: 200 });
}


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  await connect();
  const message = await Messages.findOne({ _id: id });
  return NextResponse.json({ message }, { status: 200 });
}