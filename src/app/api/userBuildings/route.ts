import { connect } from '@/app/libs/mongodb'
import userInstanceBuildings from '@/app/models/userInstanceBuildings';
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
    prod_per_hour, // changed from prodPerHour
    lastCollected,
    workers,
    level,
    unlock_level, // changed from unlockLevel
    maxWorkers,
    maxCapacity,
    position
  } = await request.json()
  await connect();
  await userInstanceBuildings.create({
    userId,
    name,
    cost,
    img,
    prod_per_hour, // changed from prodPerHour
    lastCollected,
    workers,
    level,
    unlock_level, // changed from unlockLevel
    maxWorkers,
    maxCapacity,
    position
  });
  return NextResponse.json({message: "Building Instance created"}, { status: 201 })
}

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("userId")
  await connect();
  const buildings = await userInstanceBuildings.find({ userId: id  });
  return NextResponse.json({buildings})
}
