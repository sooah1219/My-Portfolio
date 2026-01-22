// "use client";

// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";
// import { span } from "framer-motion/client";
// import Image from "next/image";
// import Link from "next/link";

// type AppUser = {
//   name?: string | null;
//   picture?: string | null;
// };

// type MyNavBarProps = {
//   isLoggedIn?: boolean;
//   user?: AppUser | null;
// };

// export default function MyNavBar({
//   isLoggedIn = false,
//   user = null,
// }: MyNavBarProps) {
//   return (
//     <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
//       <nav className="max-w-5xl mx-auto flex items-center justify-between py-4 px-4">
//         {/* Brand */}
//         <Link href="/" className="font-bold text-xl">
//           My Portfolio
//         </Link>

//         {/* Menu */}
//         <NavigationMenu>
//           <NavigationMenuList>
//             <NavigationMenuItem>
//               <NavigationMenuLink asChild>
//                 <Link
//                   href="/"
//                   className="group relative transition-colors hover:text-[#6D65FF]"
//                 >
//                   Home
//                   <span className="pointer-events-none absolute -bottom-0.5 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-[#6D65FF] to-transparent opacity-0 transition-all duration-300 group-hover:w-6 group-hover:opacity-100" />
//                 </Link>
//               </NavigationMenuLink>
//             </NavigationMenuItem>

//             <NavigationMenuItem>
//               <NavigationMenuLink asChild>
//                 <Link href="/projects">Projects</Link>
//               </NavigationMenuLink>
//             </NavigationMenuItem>

//             <NavigationMenuItem>
//               <NavigationMenuLink asChild>
//                 <Link href="/resume">Resume</Link>
//               </NavigationMenuLink>
//             </NavigationMenuItem>

//             <NavigationMenuItem>
//               <NavigationMenuLink asChild>
//                 <Link href="/contact">Contact</Link>
//               </NavigationMenuLink>
//             </NavigationMenuItem>

//             {isLoggedIn ? (
//               <>
//                 <NavigationMenuItem>
//                   <NavigationMenuLink asChild>
//                     <Link href="/dashboard">Dashboard</Link>
//                   </NavigationMenuLink>
//                 </NavigationMenuItem>

//                 <NavigationMenuItem>
//                   <NavigationMenuLink asChild>
//                     <Link href="/auth/logout">Logout</Link>
//                   </NavigationMenuLink>
//                 </NavigationMenuItem>

//                 {user?.picture && (
//                   <NavigationMenuItem>
//                     <div className="flex items-center gap-2 pl-2">
//                       <Image
//                         src={user.picture}
//                         alt={user.name || "User"}
//                         width={28}
//                         height={28}
//                         className="rounded-full"
//                       />
//                       {user?.name && (
//                         <span className="text-sm text-gray-700 max-w-[10rem] truncate">
//                           {user.name}
//                         </span>
//                       )}
//                     </div>
//                   </NavigationMenuItem>
//                 )}
//               </>
//             ) : (
//               <>
//                 <NavigationMenuItem>
//                   <NavigationMenuLink asChild>
//                     <Link href="/auth/login">Login</Link>
//                   </NavigationMenuLink>
//                 </NavigationMenuItem>
//               </>
//             )}
//           </NavigationMenuList>
//         </NavigationMenu>
//       </nav>
//     </header>
//   );
// }
"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type AppUser = {
  name?: string | null;
  picture?: string | null;
};

type MyNavBarProps = {
  isLoggedIn?: boolean;
  user?: AppUser | null;
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export default function MyNavBar({
  isLoggedIn = false,
  user = null,
}: MyNavBarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <nav className="max-w-5xl mx-auto flex items-center justify-between py-4 px-4">
        {/* Brand */}
        <Link href="/" className="font-bold text-xl">
          My Portfolio
        </Link>

        {/* Menu */}
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <NavigationMenuItem key={item.href}>
                  {active ? (
                    // ✅ 현재 페이지: 비클릭 + 보라색 + 밑줄 유지, 회색 배경 제거
                    <NavigationMenuLink
                      asChild
                      aria-disabled="true"
                      className="
                        group/navitem relative px-3 py-1.5 text-sm font-medium
                        text-[#6D65FF] cursor-default
                        !bg-transparent !hover:bg-transparent
                        data-[state=open]:!bg-transparent data-[active]:!bg-transparent
                        focus:!bg-transparent focus-visible:!bg-transparent
                      "
                    >
                      <span>
                        {item.label}
                        <span
                          className="
                            pointer-events-none absolute -bottom-0.5 left-1/2
                            h-[2px] w-6 -translate-x-1/2 rounded-full
                            bg-gradient-to-r from-transparent via-[#6D65FF] to-transparent
                            opacity-100
                          "
                        />
                      </span>
                    </NavigationMenuLink>
                  ) : (
                    // ✅ 다른 페이지: hover 시에만 밑줄 + 색 변경, 회색 배경 제거
                    <NavigationMenuLink
                      asChild
                      className="
                        group/navitem relative px-3 py-1.5 text-sm font-medium
                        text-gray-700
                        !bg-transparent !hover:bg-transparent
                        hover:text-[#6D65FF]
                        data-[state=open]:!bg-transparent data-[active]:!bg-transparent
                        focus:!bg-transparent focus-visible:!bg-transparent
                        transition-colors
                      "
                    >
                      <Link href={item.href}>
                        {item.label}
                        <span
                          className="
                            pointer-events-none absolute -bottom-0.5 left-1/2
                            h-[2px] w-0 -translate-x-1/2 rounded-full
                            bg-gradient-to-r from-transparent via-[#6D65FF] to-transparent
                            opacity-0 transition-all duration-150
                            group-hover/navitem:w-6 group-hover/navitem:opacity-100
                          "
                        />
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              );
            })}

            {isLoggedIn ? (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className="
                      px-3 py-1.5 text-sm font-medium text-gray-700
                      !bg-transparent !hover:bg-transparent
                      hover:text-[#6D65FF]
                      data-[state=open]:!bg-transparent data-[active]:!bg-transparent
                      focus:!bg-transparent focus-visible:!bg-transparent
                      transition-colors
                    "
                  >
                    <Link href="/dashboard">Dashboard</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className="
                      px-3 py-1.5 text-sm font-medium text-gray-700
                      !bg-transparent !hover:bg-transparent
                      hover:text-[#6D65FF]
                      data-[state=open]:!bg-transparent data-[active]:!bg-transparent
                      focus:!bg-transparent focus-visible:!bg-transparent
                      transition-colors
                    "
                  >
                    <Link href="/auth/logout">Logout</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {user?.picture && (
                  <NavigationMenuItem>
                    <div className="flex items-center gap-2 pl-2">
                      <Image
                        src={user.picture}
                        alt={user.name || "User"}
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                      {user?.name && (
                        <span className="text-sm text-gray-700 max-w-[10rem] truncate">
                          {user.name}
                        </span>
                      )}
                    </div>
                  </NavigationMenuItem>
                )}
              </>
            ) : (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className="
                      group/navitem relative px-3 py-1.5 text-sm font-medium
                      text-gray-700
                      !bg-transparent !hover:bg-transparent
                      hover:text-[#6D65FF]
                      data-[state=open]:!bg-transparent data-[active]:!bg-transparent
                      focus:!bg-transparent focus-visible:!bg-transparent
                      transition-colors
                    "
                  >
                    <Link href="/auth/login">
                      Login
                      <span
                        className="
                          pointer-events-none absolute -bottom-0.5 left-1/2
                          h-[2px] w-0 -translate-x-1/2 rounded-full
                          bg-gradient-to-r from-transparent via-[#6D65FF] to-transparent
                          opacity-0 transition-all duration-150
                          group-hover/navitem:w-6 group-hover/navitem:opacity-100
                        "
                      />
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </header>
  );
}
