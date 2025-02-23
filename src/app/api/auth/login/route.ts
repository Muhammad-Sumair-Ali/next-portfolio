import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Dummy authentication (Replace with real logic)
  if (email === "admin@example.com" && password === "password") {
    const response = NextResponse.json({ message: "Login successful" });

    // Set the authentication token as an HttpOnly cookie
    response.cookies.set("token", "your-secure-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return response;
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
