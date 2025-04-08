import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// JWT secret (in a real app, this would be an environment variable)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function GET() {
  try {
    // Get token from cookies
    const token = (await cookies()).get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    // Verify token
    try {
      const decoded = verify(token, JWT_SECRET) as {
        id: string;
        email: string;
        name: string;
      };

      // Get user data from database
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          name: true,
          email: true,
          accounts: true,
        },
      });

      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      // Return user data
      return NextResponse.json({ user });
    } catch (error) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
  } catch (error) {
    console.error("User fetch error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
