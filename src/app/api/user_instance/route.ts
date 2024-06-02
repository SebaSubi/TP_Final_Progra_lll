import { connect } from '@/app/libs/mongodb'
import UserInstance from '@/app/models/instance';
import { NextRequest, NextResponse } from 'next/server'

export interface Params {
  id: string;
}


export async function POST(request: NextRequest) {
  const {fullname, email, password} = await request.json()
  await connect();
  await UserInstance.create({fullname, email, password});
  return NextResponse.json({message: "User Instance created"}, { status: 201 })
}

export async function GET() {
  await connect();
  const instance = await UserInstance.find();
  return NextResponse.json({instance})
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await connect();
  await UserInstance.findByIdAndDelete(id);
  return NextResponse.json({ message: "instance Deleted"}, { status: 200 })
}

