import { connect } from '@/app/libs/mongodb'
import userBuildings from '@/app/models/userBuildings';
import { NextRequest, NextResponse } from 'next/server'
import { Params } from '../../user_instance/route';



export async function PUT(request: NextRequest, params: Params) {
  const { id } = params;
  const {
    newProdPerHour: prodPerHour,
    newLastCollected: lastCollected,
    newWorkers: workers,
    newLevel: level,
    newMaxWorkers: maxWorkers,
    newMaxCapacity: maxCapacity,
    newPosition: position
  } = await request.json()
  await connect();
  await userBuildings.findByIdAndUpdate(id,
    {
      prodPerHour,
      lastCollected,
      workers,
      level,
      maxWorkers,
      maxCapacity,
      position
    }
  )
  return NextResponse.json({message: "user building Uodated"}, {status: 200})
}


export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { id } = params;
  await connect();
  const userBuilding = await userBuildings.findOne({_id: id})
  return NextResponse.json({ userBuilding }, { status: 200 })
}