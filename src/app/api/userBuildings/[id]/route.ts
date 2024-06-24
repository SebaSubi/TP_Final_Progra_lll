import { connect } from '@/app/libs/mongodb'
import userBuildings from '@/app/models/userBuildings';
import { NextRequest, NextResponse } from 'next/server'
import { Params } from '../../user_instance/route';



export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const {
    prodPerHour,
    lastCollected,
    workers,
    level,
    maxWorkers,
    maxCapacity,
    position,
    capacity
  } = await request.json();

  //   prodPerHour,
  //   lastCollected,
  //   workers,
  //   level,
  //   maxWorkers,
  //   maxCapacity,
  //   position,
  //   capacity
  // });

  await connect();

  const updateData = {
    prod_per_hour: prodPerHour,
    lastCollected,
    workers,
    level,
    maxWorkers,
    maxCapacity,
    position,
    capacity
  };

  try {
    const updatedBuilding = await userBuildings.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    
    if (!updatedBuilding) {
      // console.error("User building not found with id:", id);
      return NextResponse.json({ message: "User building not found" }, { status: 404 });
    }


    return NextResponse.json({ message: "User building updated", updatedBuilding }, { status: 200 });
  } catch (error) {
    console.error("Error updating user building:", error);
    // return NextResponse.json({ message: "Error updating user building", error: error.message }, { status: 500 });
  }
}


export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { id } = params;
  await connect();
  const userBuilding = await userBuildings.findOne({_id: id})
  return NextResponse.json({ userBuilding }, { status: 200 })
}
