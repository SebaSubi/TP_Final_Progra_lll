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
    prod_per_hour, // changed from prodPerHour
    lastCollected,
    workers,
    level,
    unlock_level, // changed from unlockLevel
    maxWorkers,
    capacity,
    maxCapacity,
    position
  } = await request.json()
  await connect();
  const building = await userBuildings.create({
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
    capacity,
    maxCapacity,
    position
  });
  return NextResponse.json({message: "Building Instance created", building}, { status: 201 })
}

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("userId")
  await connect();
  const buildings = await userBuildings.find({ userId: id  });
  return NextResponse.json({buildings})
}
