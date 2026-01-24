// import MyNavBar from "@/components/MyNavBar";

// export const runtime = "nodejs";

// export default function NavBarServer() {
//   return <MyNavBar />;
// }

// components/NavBarServer.tsx
import { currentUser } from "@clerk/nextjs/server";

import MyNavBar from "./MyNavBar"; // 경로는 네 구조에 맞게 수정

type NavUser = {
  firstName?: string | null;
  fullName?: string | null;
  username?: string | null;
  imageUrl?: string | null;
};

export default async function NavBarServer() {
  const user = await currentUser();

  const navUser: NavUser | null = user
    ? {
        firstName: user.firstName,
        fullName: user.fullName,
        username: user.username,
        imageUrl: user.imageUrl ?? undefined,
      }
    : null;

  return <MyNavBar user={navUser} />;
}
