import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Simple email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.email || typeof body.email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const email = body.email.toLowerCase().trim();
    
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Try to insert (will fail if duplicate due to unique constraint)
    const { error } = await supabase.from("waitlist").insert({
      email,
      source: body.source || "homepage",
    });

    if (error) {
      // Check if it's a duplicate
      if (error.code === "23505") {
        // Email already exists, but that's okay - just confirm success
        return NextResponse.json({ success: true, message: "You're on the list!" });
      }
      console.error("Waitlist insert error:", error);
      return NextResponse.json(
        { error: "Failed to join waitlist" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Welcome to LoopEasy!" });
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
