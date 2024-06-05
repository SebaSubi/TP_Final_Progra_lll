import { connect } from '@/app/libs/mongodb'
import UserInstance from '@/app/models/userInstance';
import { NextRequest, NextResponse } from 'next/server'

export interface Params {
  id: string;
}


export async function POST(request: NextRequest) {
  const {userId, name, level, country, boosts, units, gold, materials} = await request.json()
  await connect();
  await UserInstance.create({userId, name, level, country, boosts, units, gold, materials});
  return NextResponse.json({message: "User Instance created"}, { status: 201 })
}

export async function GETALL() { 
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

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("userId");
  await connect();
  const instance = await UserInstance.findOne({userId: id});
  return NextResponse.json({instance})
}

