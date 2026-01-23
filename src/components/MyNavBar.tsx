"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDown, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <nav className="max-w-5xl mx-auto flex items-center justify-between py-4 px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Image
            src="/images/logo.png"
            alt="icon"
            width={26}
            height={26}
            className="mt-0.5"
          />
          <span className="text-base sm:text-xl">My Portfolio</span>
        </Link>

        <div className="hidden min-[700px]:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => {
                const active = isActive(item.href);

                return (
                  <NavigationMenuItem key={item.href}>
                    {active ? (
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
            </NavigationMenuList>
          </NavigationMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="
                  flex items-center gap-2 rounded-full border border-gray-200
                  bg-white px-3 py-1.5 text-sm font-medium text-gray-800
                  hover:bg-[#6D65FF]/5 hover:text-[#6D65FF]
                  transition-colors
                "
              >
                {isLoggedIn && user?.picture && (
                  <Image
                    src={user.picture}
                    alt={user.name || "User"}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                )}

                <span className="max-w-[9rem] truncate">
                  {isLoggedIn && user?.name ? user.name : "Login"}
                </span>

                <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="min-w-[190px] rounded-xl border bg-white p-2 shadow-lg"
            >
              {isLoggedIn && user?.name && (
                <>
                  <DropdownMenuLabel className="text-xs text-gray-500">
                    Signed in as
                    <br />
                    <span className="font-medium text-gray-800">
                      {user.name}
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                </>
              )}

              {isLoggedIn ? (
                <DropdownMenuItem asChild>
                  <Link
                    href="/auth/logout"
                    className="w-full rounded-md px-2 py-1.5 text-sm text-gray-800 hover:bg-[#6D65FF]/5 hover:text-[#6D65FF] transition-colors"
                  >
                    Logout
                  </Link>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem asChild>
                  <Link
                    href="/auth/login"
                    className="w-full rounded-md px-2 py-1.5 text-sm text-gray-800 hover:bg-[#6D65FF]/5 hover:text-[#6D65FF] transition-colors"
                  >
                    Login
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* hamburger */}
        <div className="min-[700px]:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open navigation menu"
                className="inline-flex items-center justify-center rounded-md p-2 border border-gray-200 bg-white/80 shadow-sm"
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 backdrop-blur bg-white/90"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation menu</SheetTitle>
              </SheetHeader>

              <div className="mt-8 flex flex-col gap-4">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        text-sm font-medium px-4
                        hover:text-[#6D65FF] hover:bg-[#6D65FF]/5 hover:translate-x-1
                        transition-all
                        ${active ? "text-[#6D65FF]" : "text-gray-800"}
                      `}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                <div className="h-px bg-gray-200 my-2" />

                {isLoggedIn ? (
                  <>
                    <Link
                      href="/auth/logout"
                      className="
                        text-sm font-medium text-gray-800 px-4
                        hover:text-[#6D65FF] hover:bg-[#6D65FF]/5 hover:translate-x-1
                        transition-all
                      "
                      onClick={() => setOpen(false)}
                    >
                      Logout
                    </Link>

                    {user?.picture && (
                      <div className="mt-4 flex items-center gap-2 px-4">
                        <Image
                          src={user.picture}
                          alt={user.name || "User"}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        {user?.name && (
                          <span className="text-sm text-gray-700 max-w-[9rem] truncate">
                            {user.name}
                          </span>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href="/auth/login"
                    className="
                      text-sm font-medium text-gray-800 px-4
                      hover:text-[#6D65FF] hover:bg-[#6D65FF]/5 hover:translate-x-1
                      transition-all
                    "
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
