"use client";

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
import { FileText, Folder, Home, Mail, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: Folder },
  { href: "/resume", label: "Resume", icon: FileText },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function MyNavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/60 border-b backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Image
            src="/images/logo.png"
            alt="icon"
            width={26}
            height={26}
            className="mt-0.5"
          />
          <span className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-[#6D65FF]">
            Sooah · Full-Stack Dev
          </span>
        </Link>

        <div className="hidden min-[700px]:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => {
                const active = isActive(item.href);

                return (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      asChild
                      className={`
                        group/navitem relative px-3 py-1.5 text-sm font-medium
                        !bg-transparent !hover:bg-transparent
                        data-[state=open]:!bg-transparent data-[active]:!bg-transparent
                        focus:!bg-transparent focus-visible:!bg-transparent
                        transition-colors
                        ${
                          active
                            ? "text-[#6D65FF] cursor-default"
                            : "text-gray-700 hover:text-[#6D65FF]"
                        }
                      `}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        tabIndex={active ? -1 : 0}
                        className={active ? "pointer-events-none" : ""}
                      >
                        {item.label}
                        <span
                          className={`
                            pointer-events-none absolute -bottom-0.5 left-1/2
                            h-[2px] -translate-x-1/2 rounded-full
                            bg-gradient-to-r from-transparent via-[#6D65FF] to-transparent
                            transition-all duration-150
                            ${
                              active
                                ? "w-6 opacity-100"
                                : "w-0 opacity-0 group-hover/navitem:w-6 group-hover/navitem:opacity-100"
                            }
                          `}
                        />
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="min-[700px]:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label={
                  open ? "Close navigation menu" : "Open navigation menu"
                }
                className="
                  relative inline-flex h-10 w-10 items-center justify-center rounded-full
                  border border-white/40
                  bg-white/70 backdrop-blur-md
                  shadow-[0_6px_18px_rgba(0,0,0,0.08)]
                  transition-all duration-200
                  hover:scale-105 hover:bg-white
                  active:scale-95
                "
              >
                <span className="relative h-5 w-5">
                  <Menu
                    className={`absolute inset-0 h-5 w-5 text-gray-800 transition-all duration-200 ${
                      open
                        ? "scale-75 rotate-90 opacity-0"
                        : "scale-100 rotate-0 opacity-100"
                    }`}
                  />
                  <X
                    className={`absolute inset-0 h-5 w-5 text-gray-800 transition-all duration-200 ${
                      open
                        ? "scale-100 rotate-0 opacity-100"
                        : "scale-75 -rotate-90 opacity-0"
                    }`}
                  />
                </span>
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="
                w-72
                bg-white/90 backdrop-blur-xl
                border-l border-white/40
                shadow-[0_10px_40px_rgba(0,0,0,0.12)]
                data-[state=open]:animate-in
                data-[state=closed]:animate-out
              "
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation menu</SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex items-center gap-3 border-b border-gray-100 px-4 pb-6">
                <Image
                  src="/images/logo.png"
                  alt="profile"
                  width={32}
                  height={32}
                />

                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">
                    Sooah
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Full-Stack Developer
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2 px-3">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`
                        group relative flex items-center justify-between overflow-hidden
                        rounded-xl px-4 py-3
                        text-sm font-medium
                        transition-all duration-200
                        ${
                          active
                            ? "bg-[#6D65FF]/10 text-[#6D65FF]"
                            : "text-gray-800 hover:bg-[#6D65FF]/5 hover:translate-x-1"
                        }
                      `}
                    >
                      <span
                        className={`
                          absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-[#6D65FF]
                          transition-all duration-200
                          ${
                            active
                              ? "opacity-100 scale-100"
                              : "opacity-0 scale-75 group-hover:opacity-70 group-hover:scale-100"
                          }
                        `}
                      />

                      <div className="flex items-center gap-3 pl-1">
                        <Icon
                          className={`
                            h-4 w-4 transition-colors duration-200
                            ${
                              active
                                ? "text-[#6D65FF]"
                                : "text-[#6D65FF]/70 group-hover:text-[#6D65FF]"
                            }
                          `}
                          strokeWidth={2}
                        />
                        <span>{item.label}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
