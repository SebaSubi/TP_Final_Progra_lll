import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/app/libs/mongodb";
import { messages } from "@/utils/messages";
import User from "@/app/models/user";

//Obtenemos los usuarios
// export async function GET(request: NextRequest) {
//   try {
//     await connect();
//     const users = await User.find();

//     return NextResponse.json({ users }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: messages.error.default, error },
//       { status: 500 }
//     );
//   }
// }

export async function GET(request: NextRequest) {
  try {
    await connect();

    // Obtén el ID del usuario de la cookie o la sesión
    const userId = (request.cookies as any)['userId'];

    // Busca al usuario en la base de datos
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default, error },
      { status: 500 }
    );
  }
}