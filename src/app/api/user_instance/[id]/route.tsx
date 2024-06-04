import { connect } from '@/app/libs/mongodb'
import UserInstance from '@/app/models/userInstance';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest, {params}: { params: { id: string } }) {
  const { id } = params;
  const { name, level, boosts, units, gold, materials } = await request.json();
  await connect();
  await UserInstance.findByIdAndUpdate(id, { name, level, boosts, units, gold, materials });
  return NextResponse.json({ message: "User updated" }, { status: 200 })
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { id } = params;
  await connect();
  const instance = await UserInstance.findOne({_id: id})
  return NextResponse.json({ instance }, { status: 200 })
}

