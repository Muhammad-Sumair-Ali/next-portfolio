import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { id } = await req.json();

  // Dummy authentication (Replace with real logic)
  if (id) {
    const response = NextResponse.json({ message: "users get successful" });

    // Set the authentication token as an HttpOnly cookie
    response.cookies.set("token", "your-secure-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return response;
  }

  return NextResponse.json({ error: "ERROR : SOMETHING WENT WRONG" }, { status: 401 });
}
