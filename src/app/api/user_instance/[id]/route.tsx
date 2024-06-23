import { connect } from '@/app/libs/mongodb'
import UserInstance from '@/app/models/userInstances';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextRequest, NextResponse } from 'next/server'


export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { id } = params;
  await connect();
  const instance = await UserInstance.findOne({_id: id})
  return NextResponse.json({ instance }, { status: 200 })
}

