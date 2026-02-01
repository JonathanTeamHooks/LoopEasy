import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";

// Server-side sanitization - extra security layer
function sanitizeServerSide(input: string): string {
  if (typeof input !== "string") return "";
  
  return input
    // Remove all HTML tags aggressively
    .replace(/<[^>]*>?/gm, "")
    // Remove script tags and content
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    // Remove style tags and content
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    // Remove event handlers
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
    .replace(/on\w+\s*=\s*[^\s>]*/gi, "")
    // Remove javascript: URLs
    .replace(/javascript\s*:/gi, "")
    // Remove vbscript: URLs
    .replace(/vbscript\s*:/gi, "")
    // Remove data: URLs (potential XSS vector)
    .replace(/data\s*:/gi, "")
    // Remove expression() (IE CSS expression)
    .replace(/expression\s*\(/gi, "")
    // Remove url() in potential CSS
    .replace(/url\s*\(/gi, "")
    // Remove import
    .replace(/@import/gi, "")
    // Remove null bytes
    .replace(/\0/g, "")
    // Normalize unicode
    .normalize("NFKC")
    // Remove control characters except newlines
    .replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/g, "")
    // Normalize whitespace
    .replace(/\s+/g, " ")
    .trim()
    // Hard limit
    .slice(0, 2000);
}

// Simple rate limiting using IP
// WARNING: In-memory Map doesn't persist across serverless instances
// For production scale, use Redis/Upstash. Current implementation provides
// basic protection but may allow more requests than intended under high load.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 5; // 5 requests per minute

  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= maxRequests) {
    return false;
  }
  
  record.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0] || "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment." },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    // Validate input exists
    if (!body.message || typeof body.message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Server-side sanitization (don't trust client)
    const sanitizedMessage = sanitizeServerSide(body.message);
    const sanitizedPageUrl = sanitizeServerSide(body.pageUrl || "");

    // Validate sanitized content
    if (sanitizedMessage.length < 10) {
      return NextResponse.json(
        { error: "Message too short after sanitization" },
        { status: 400 }
      );
    }

    // Get user agent for context (also sanitized)
    const userAgent = sanitizeServerSide(
      headersList.get("user-agent") || ""
    ).slice(0, 500);

    // Create Supabase client with service role (server-side only)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Insert feedback
    const { error } = await supabase.from("feedback").insert({
      message: sanitizedMessage,
      page_url: sanitizedPageUrl.slice(0, 255),
      user_agent: userAgent,
    });

    if (error) {
      console.error("Feedback insert error:", error);
      return NextResponse.json(
        { error: "Failed to save feedback" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Feedback API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Disable GET to prevent enumeration
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
