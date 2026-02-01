import { createClient } from "@supabase/supabase-js";
import { successResponse, ApiErrors } from "@/lib/api-response";
import { waitlistSchema, safeParseWithError } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validation = safeParseWithError(waitlistSchema, body);
    if (!validation.success) {
      return ApiErrors.validation(validation.error);
    }

    const { email, source } = validation.data;
    const normalizedEmail = email.toLowerCase().trim();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Try to insert (will fail if duplicate due to unique constraint)
    const { error } = await supabase.from("waitlist").insert({
      email: normalizedEmail,
      source,
    });

    if (error) {
      // Check if it's a duplicate
      if (error.code === "23505") {
        // Email already exists, but that's okay - just confirm success
        return successResponse({ message: "You're on the list!" });
      }
      console.error("Waitlist insert error:", error);
      return ApiErrors.internal("Failed to join waitlist");
    }

    return successResponse({ message: "Welcome to LoopEasy!" });
  } catch (error) {
    console.error("Waitlist API error:", error);
    return ApiErrors.internal();
  }
}
