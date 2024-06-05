import { connect } from '@/app/libs/mongodb'
import Buildings from '@/app/models/Buildings';
import { NextRequest, NextResponse } from 'next/server'

interface Params {
  id: string;
}


export async function POST(request: NextRequest) {
  const {
    name,
    cost,
    img,
    prod_per_hour,
    workers,
    level,
    unlock_level,
    maxWorkers,
    maxCapacity
  } = await request.json()
  await connect();
  await Buildings.create({
    name,
    cost,
    img,
    prod_per_hour,
    workers,
    level,
    unlock_level,
    maxWorkers,
    maxCapacity
  });
  return NextResponse.json({message: "User Instance created"}, { status: 201 })
}

export async function GET() {
  await connect();
  const buildings = await Buildings.find();
  return NextResponse.json({buildings})
}

// export async function DELETE(request: NextRequest) {
//   const id = request.nextUrl.searchParams.get("id");
//   await connect();
//   await UserInstance.findByIdAndDelete(id);
//   return NextResponse.json({ message: "instance Deleted"}, { status: 200 })
// }

