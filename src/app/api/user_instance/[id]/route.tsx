import { connect } from '@/app/libs/mongodb'
import UserInstance from '@/app/models/instance';
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest, {params}: { params: { id: string } }) {
  const { id } = params;
  const { newFullName: fullname, newEmail: email, newPassword: password } = await request.json();
  await connect();
  await UserInstance.findByIdAndUpdate(id, { fullname, email, password });
  return NextResponse.json({ message: "User updated" }, { status: 200 })
}