import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/user";
import { connect } from "@/app/libs/mongodb";
import { Resend } from "resend";
import EmailTemplate from "@/components/EmailTemplate";
import jwt from "jsonwebtoken";

const resend = new Resend("re_THzsBuHx_P7PFe3rQXT37LXdDppW2StsV");

export async function POST(request: NextRequest) {
  try {
    const body: { email: string } = await request.json();

    const { email } = body;

    await connect();
    const userFind = await User.findOne({ email });

    if (!userFind) {
      return NextResponse.json(
        { message: "error" },
        { status: 400 }
      );
    }

    const tokenData = {
      email: userFind.email,
      userId: userFind._id,
    };

    const secretKey = "secreto";

    const token = jwt.sign({ data: tokenData }, secretKey, {
      expiresIn: 86400,
    });

    const forgetUrl = `/change-password?token=${token}`;

    // @ts-ignore
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Cambio de Contraseña",
      react: EmailTemplate({ buttonUrl: forgetUrl }),
    });

    return NextResponse.json(
      { message: "Send" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "error" },
      { status: 500 }
    );
  }
}