"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Bell,
  Menu,
  User,
  Settings,
  LogOut,
  LayoutDashboard,
  GraduationCap,
} from "lucide-react";

// Navbar navigation items and each name is a diffrent service or platform 
// that the user can access. Each item has a name, href, and description.
// // The items are used in both desktop and mobile navigation menus.
// The first 9 items are shown in the desktop navigation menu, and the rest are in the dropdown menu.

const navItems = [
  {
    name: "Students Interlinked",
    href: "/students-interlinked",
    description: "Connect with fellow students",
  },
  {
    name: "Messages",
    href: "/messages",
    description: "Facebook-style messaging",
  },
  {
    name: "EDU Matrix Hub",
    href: "/edu-matrix-hub",
    description: "Institutions management system",
  },
  {
    name: "Courses",
    href: "/courses",
    description: "Browse available courses",
  },
  {
    name: "Jobs",
    href: "/jobs",
    description: "Career opportunities",
  },
  {
    name: "Freelancing",
    href: "/freelancing",
    description: "Find freelance opportunities",
  },
  {
    name: "Edu News",
    href: "/edu-news",
    description: "Latest education news",
  },
  {
    name: "Community Room",
    href: "/community",
    description: "Join discussions",
  },  {
    name: "Stats",
    href: "/stats",
    description: "Platform statistics",
  },
  {
    name: "Feedback",
    href: "/feedback",
    description: "Share your feedback",
  },
  {
    name: "Profile",
    href: "/profile",
    description: "Your profile/resume",
  },
];

// Helper component for NavigationMenu list items
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const isLoading = status === "loading";
  const isLoggedIn = status === "authenticated";
  // Get user info from session
  const user = session?.user;
  const userInitials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "U";

  // Handle protected navigation
  const handleProtectedNavigation = (href: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
    }
    
    if (!isLoggedIn) {
      // Redirect to sign-in with return URL
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(href)}`);
    } else {
      // Navigate directly to the service
      router.push(href);    }
  };
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };
  return (
    <div className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      {/* Main Navbar */}
      <div className="container max-w-screen-2xl mx-auto px-4">        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <GraduationCap className="h-6 w-6 text-primary" />
              <div className="flex flex-col justify-center">
                <span className="font-bold text-base bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent leading-tight">
                  EDU Matrix
                </span>
                <span className="text-xs text-primary/70 font-semibold -mt-0.5 leading-tight tracking-wide">
                  INTERLINKED
                </span>
              </div>
            </Link>
          </div>          {/* Desktop Navigation Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-0.5">
                {navItems.slice(0, 9).map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <button
                      onClick={() => handleProtectedNavigation(item.href)}
                      className={cn(navigationMenuTriggerStyle(), "text-sm font-medium cursor-pointer px-2.5 py-2")}
                    >
                      {item.name}
                    </button>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            
            {/* More Menu using proper DropdownMenu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium px-2.5 py-2 h-auto">
                  More
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[300px]">
                {navItems.slice(9).map((item) => (
                  <DropdownMenuItem
                    key={item.name}
                    onClick={() => handleProtectedNavigation(item.href)}
                    className="cursor-pointer p-3 flex-col items-start"
                  >
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {item.description}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0" asChild>
              <Link href="/notifications" className="relative" title="Notifications">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full"></span>
              </Link>
            </Button>
            
            {/* User Menu or Auth Buttons */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                {isLoading ? (
                  <Button variant="ghost" size="sm" disabled className="text-sm font-medium">
                    Loading...
                  </Button>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" className="text-sm font-medium" asChild>
                      <Link href="/auth/signin">Sign in</Link>
                    </Button>
                    <Button size="sm" className="text-sm font-medium" asChild>
                      <Link href="/auth/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>EDU Matrix Services</SheetTitle>
                  <SheetDescription>
                    Access all our educational services and platforms
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-6 space-y-4">
                  {/* All Services */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground">All Services</h4>                    {navItems.map((item) => {
                      return (
                        <button
                          key={item.name}
                          onClick={() => {
                            setIsOpen(false);
                            handleProtectedNavigation(item.href);
                          }}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors w-full text-left cursor-pointer relative"
                        >
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">{item.name}</p>
                              {!isLoggedIn && (
                                <Badge variant="outline" className="text-xs px-1 py-0 h-5">
                                  Login Required
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* User Section */}
                  {isLoggedIn ? (
                    <div className="space-y-2 pt-4 border-t">
                      <h4 className="font-medium text-sm text-muted-foreground">Account</h4>
                      <div className="flex items-center space-x-3 p-3 bg-accent/50 rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {userInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">                          <p className="text-sm font-medium">{user?.name}</p>
                          <p className="text-xs text-muted-foreground">{user?.email}</p>
                        </div>
                      </div>
                        <div className="space-y-1">
                        <Link
                          href="/notifications"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center space-x-2 p-2 text-sm hover:bg-accent rounded-md relative"
                        >
                          <Bell className="h-4 w-4" />
                          <span>Notifications</span>
                          <span className="absolute top-1 left-6 h-2 w-2 bg-destructive rounded-full"></span>
                        </Link>
                        <Link
                          href="/dashboard"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center space-x-2 p-2 text-sm hover:bg-accent rounded-md"
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          href="/profile"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center space-x-2 p-2 text-sm hover:bg-accent rounded-md"
                        >
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleSignOut}
                          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign out
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 pt-4 border-t">
                      <Button className="w-full" asChild onClick={() => setIsOpen(false)}>
                        <Link href="/auth/register">Get Started</Link>
                      </Button>
                      <Button variant="outline" className="w-full" asChild onClick={() => setIsOpen(false)}>
                        <Link href="/auth/signin">Sign in</Link>
                      </Button>
                    </div>
                  )}                </div>
              </SheetContent>
            </Sheet>        </div>
      </div>
    </div>
    </div>
  );
}
