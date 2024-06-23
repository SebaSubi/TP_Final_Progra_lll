import { connect } from '@/app/libs/mongodb'
import UserInstance from '@/app/models/userInstances';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextRequest, NextResponse } from 'next/server'

/*
export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { id } = params;
  await connect();
  const instance = await UserInstance.findOne({_id: id})
  return NextResponse.json({ instance }, { status: 200 })
}
*/

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { id } = params;

  try {
      await connect();
      const instance = await UserInstance.findOne({ _id: id });

      if (!instance) {
          return NextResponse.json({ error: 'UserInstance not found' }, { status: 404 });
      }

      const { materials } = instance;
      return NextResponse.json({ materials }, { status: 200 });
  } catch (error) {
      console.error('Error fetching UserInstance:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
