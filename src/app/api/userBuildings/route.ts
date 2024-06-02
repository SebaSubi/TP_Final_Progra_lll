import { connect } from '@/app/libs/mongodb'
import userBuildings from '@/app/models/userBuildings';
import { NextRequest, NextResponse } from 'next/server'

interface Params {
  id: string;
}

export async function POST(request: NextRequest) {
  const {
    userId,
    name,
    cost,
    img,
    prodPerHour,
    lastCollected,
    workers,
    level,
    unlockLevel,
    maxWorkers,
    maxCapacity,
    position
  } = await request.json()
  await connect();
  await userBuildings.create({
    userId,
    name,
    cost,
    img,
    prodPerHour,
    lastCollected,
    workers,
    level,
    unlockLevel,
    maxWorkers,
    maxCapacity,
    position
  });
  return NextResponse.json({message: "Building Instance created"}, { status: 201 })
}

export async function GET() {
  await connect();
  const buildings = await userBuildings.find();
  return NextResponse.json({buildings})
}
