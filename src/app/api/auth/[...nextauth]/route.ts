import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { connect } from "@/app/libs/mongodb";
import User from "@/app/models/user";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*" },
      },
      async authorize(credentials, req) {
        await connect();
        const userFound = await User.findOne({ email: credentials?.email }).select("+password");

        console.log('User found:', userFound);

        if (!userFound) throw new Error("Invalid credentials");
        const passwordMatch = await bcrypt.compare(credentials!.password, userFound.password);

        console.log('Password match:', passwordMatch);

        if (!passwordMatch) throw new Error("Invalid credentials");

        return userFound;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session({ session, token }) {
      session.user = token.user as any;
      console.log(session, token);
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
