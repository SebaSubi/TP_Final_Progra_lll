import { connect } from '@/app/libs/mongodb'
import UserInstance from '@/app/models/instance';
import { NextRequest, NextResponse } from 'next/server'


export async function POST(request: NextRequest) {
  const {fullname, email, password} = await request.json()
  await connect();
  await UserInstance.create({fullname, email, password});
  return NextResponse.json({message: "User Instance created"}, { status: 201 })
}