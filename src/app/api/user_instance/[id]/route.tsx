import { connect } from '@/app/libs/mongodb'
import UserInstance from '@/app/models/instance';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest, {params}: { params: { id: string } }) {
  const { id } = params;
  const { newName: fullname, newEmail: email, newPassword: password } = await request.json();
  await connect();
  await UserInstance.findByIdAndUpdate(id, { fullname, email });
  return NextResponse.json({ message: "User updated" }, { status: 200 })
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { id } = params;
  await connect();
  const instance = await UserInstance.findOne({_id: id})
  return NextResponse.json({ instance }, { status: 200 })
}

