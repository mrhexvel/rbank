import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"

const prisma = new PrismaClient()

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate input
    const validation = userSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: validation.error.errors,
        },
        { status: 400 },
      )
    }

    const { name, email, password } = validation.data

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        accounts: {
          create: [
            {
              name: "Main Account",
              accountNumber: "****4832",
              balance: 8250.0,
              type: "CHECKING",
            },
            {
              name: "Savings Account",
              accountNumber: "****7291",
              balance: 4330.0,
              type: "SAVINGS",
            },
            {
              name: "Investment Portfolio",
              accountNumber: "****9548",
              balance: 6240.0,
              type: "INVESTMENT",
            },
          ],
        },
      },
    })

    // Return success response (without password)
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
