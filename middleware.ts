// middleware.ts (프로젝트 루트에!)

import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// Next.js 내부 리소스/정적 파일은 건너뛰고,
// 나머지 페이지 + API 에서만 Clerk 미들웨어 실행
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
