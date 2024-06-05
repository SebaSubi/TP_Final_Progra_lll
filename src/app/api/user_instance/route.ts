import { connect } from '@/app/libs/mongodb'
import UserInstances from '@/app/models/userInstances';
import { NextRequest, NextResponse } from 'next/server'

export interface Params {
  id: string;
}


export async function POST(request: NextRequest) {
  const { userId, name, level, country, boosts, units, gold, materials } = await request.json()
  await connect();
  await UserInstances.create({ userId, name, level, country, boosts, units, gold, materials });
  return NextResponse.json({ message: "User Instance created" }, { status: 201 })
}

export async function GETALL() {
  await connect();
  const instance = await UserInstances.find();
  return NextResponse.json({ instance })
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await connect();
  await UserInstances.findByIdAndDelete(id);
  return NextResponse.json({ message: "instance Deleted" }, { status: 200 })
}

export async function GET(request?: NextRequest) {
  await connect();
  //@ts-ignore
  const id = request.nextUrl.searchParams.get("userId");
  let instance;

  if (id) {
    instance = await UserInstances.findOne({ userId: id });
  } else {
    instance = await UserInstances.find();
  }

  return NextResponse.json({ instance });
}

