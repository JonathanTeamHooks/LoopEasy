import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Password protection for pre-launch Vercel deployments
// Password: Cody (case-sensitive)
const SITE_PASSWORD = process.env.SITE_PASSWORD || 'Cody';
const COOKIE_NAME = 'site-auth';

export function middleware(request: NextRequest) {
  // Skip password protection in development
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  // Skip for API routes and static files
  if (
    request.nextUrl.pathname.startsWith('/api/') ||
    request.nextUrl.pathname.startsWith('/_next/') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check for auth cookie
  const authCookie = request.cookies.get(COOKIE_NAME);
  if (authCookie?.value === SITE_PASSWORD) {
    return NextResponse.next();
  }

  // Check for password in query string (login attempt)
  const password = request.nextUrl.searchParams.get('password');
  if (password === SITE_PASSWORD) {
    // Set cookie and redirect to clean URL
    const response = NextResponse.redirect(new URL(request.nextUrl.pathname, request.url));
    response.cookies.set(COOKIE_NAME, SITE_PASSWORD, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return response;
  }

  // Show login page
  return new NextResponse(getLoginHTML(password !== null), {
    status: 200,
    headers: { 'Content-Type': 'text/html' },
  });
}

function getLoginHTML(showError: boolean): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Required</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .card {
      background: white;
      border-radius: 16px;
      padding: 40px;
      width: 100%;
      max-width: 380px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    .icon {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      font-size: 24px;
    }
    h1 {
      text-align: center;
      color: #1a1a2e;
      font-size: 24px;
      margin-bottom: 8px;
    }
    p {
      text-align: center;
      color: #666;
      font-size: 14px;
      margin-bottom: 24px;
    }
    .error {
      background: #fee2e2;
      color: #dc2626;
      padding: 12px;
      border-radius: 8px;
      font-size: 14px;
      margin-bottom: 16px;
      text-align: center;
    }
    input {
      width: 100%;
      padding: 14px 16px;
      border: 2px solid #e5e7eb;
      border-radius: 10px;
      font-size: 16px;
      margin-bottom: 16px;
      transition: border-color 0.2s;
    }
    input:focus {
      outline: none;
      border-color: #667eea;
    }
    button {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }
    .badge {
      text-align: center;
      margin-top: 24px;
      font-size: 12px;
      color: #999;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">🔒</div>
    <h1>Preview Access</h1>
    <p>This site is not yet public. Enter the password to continue.</p>
    ${showError ? '<div class="error">Incorrect password. Please try again.</div>' : ''}
    <form method="GET">
      <input type="password" name="password" placeholder="Enter password" autofocus required />
      <button type="submit">Access Site</button>
    </form>
    <div class="badge">🚧 Pre-launch Preview</div>
  </div>
</body>
</html>`;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
