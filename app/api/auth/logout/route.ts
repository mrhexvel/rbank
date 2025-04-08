import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // Clear the auth cookie
  (await cookies()).set({
    name: "auth_token",
    value: "",
    expires: new Date(0),
    path: "/",
  });

  // Redirect to login page
  return NextResponse.redirect(
    new URL(
      "/login",
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    )
  );
}
