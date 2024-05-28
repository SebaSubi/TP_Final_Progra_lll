import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/app/libs/mongodb";
import { headers } from "next/headers"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/app/models/user";
import { messages } from "@/utils/messages";
import mongoose from "mongoose"; // Import the 'mongoose' package


interface BodyProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: BodyProps = await request.json();

    const { newPassword, confirmPassword, currentPassword } = body;
    

    // Validamos que esten todos los campos
    if (!newPassword || !confirmPassword) {
      return NextResponse.json(
        { message: messages.error.needProps },
        { status: 400 }
      );
    }

    // Validamos que esten todos los campos
    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { message: messages.error.needProps },
        { status: 400 }
      );
    }
    

    await connect();

    const headersList = headers();
    const token = headersList.get("token");

    // Verificar que haya token
    if (!token) {
      return NextResponse.json(
        {
          message: messages.error.notAuthorized,
        },
        {
          status: 401,
        }
      );
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return NextResponse.json(
        { message: 'JWT secret not defined' },
        { status: 500 }
      );
    }

    const decoded = jwt.verify(token, jwtSecret) as Record<string, any>;

    const user = await User.findById(decoded.data.userId).select('+password');

    if (!user) {
      return NextResponse.json(
        {
          message: messages.error.userNotFound,
        },
        { status: 404 }
      );
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Wrong " },
        { status: 400 }
      );
    }
    
    // Validamos que la nueva contraseña sea igual a la confirmacion
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { message: messages.error.passwordsNotMatch },
        { status: 400 }
      );
    }

    //Guardamos la contraseña nueva
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json(
      { message: messages.success.passwordChanged },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default, error },
      { status: 400 }
    );
  }
  finally {
    // Cerrar la conexión a la base de datos
    await mongoose.connection.close();
  }
}

