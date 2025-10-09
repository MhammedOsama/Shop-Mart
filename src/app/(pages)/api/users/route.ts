import { NextRequest, NextResponse } from "next/server";

const users = [,];

export async function GET() {
  return NextResponse.json(users);
}
export async function POST(req: NextRequest) {
  const body = await req.json();

  users.push(body);
  return NextResponse.json({
    message: "success",
  });
}
