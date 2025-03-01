'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Menu, X, Home, Compass, Bell, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link, useLocation } from 'react-router-dom';
// import { AddContentModal } from "@/components/add-content-modal";
// import { ProfileModalDesign1 } from "./profile-modal-design1";

export function TopNavigation() {
  // const pathname = usePathname();

  const pathname = useLocation().pathname;
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAddContentOpen, setIsAddContentOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/');
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-2 md:gap-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="theme-coral">
                  <div className="flex flex-col gap-6 py-6">
                    <Link
                      to="/design2"
                      className="flex items-center gap-2 text-lg font-semibold text-accent"
                    >
                      <div className="rounded-md bg-accent/10 p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6"
                        >
                          <path d="M12 2L2 7l10 5 10-5-10-5z" />
                          <path d="M2 17l10 5 10-5" />
                          <path d="M2 12l10 5 10-5" />
                        </svg>
                      </div>
                      ContentHub
                    </Link>
                    <nav className="flex flex-col gap-4">
                      <Link
                        to="/design2"
                        className={`flex items-center gap-2 text-base ${
                          isActive('/design2') && !isActive('/design2/explore')
                            ? 'font-medium text-accent'
                            : 'text-muted-foreground'
                        }`}
                      >
                        <Home className="h-5 w-5" />
                        Home
                      </Link>
                      <Link
                        to="/design2/explore"
                        className={`flex items-center gap-2 text-base ${
                          isActive('/design2/explore')
                            ? 'font-medium text-accent'
                            : 'text-muted-foreground'
                        }`}
                      >
                        <Compass className="h-5 w-5" />
                        Explore
                      </Link>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>

              <Link to="/design2" className="hidden items-center gap-2 md:flex">
                <div className="rounded-md bg-accent/10 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-accent"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-accent">
                  ContentHub
                </span>
              </Link>

              <nav className="hidden md:flex md:items-center md:gap-6">
                <Link
                  to="/design2"
                  className={`relative flex items-center gap-1 text-sm font-medium ${
                    isActive('/design2') && !isActive('/design2/explore-alt')
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Home className="h-4 w-4" />
                  Home
                  {isActive('/design2') && !isActive('/design2/explore') && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-accent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
                <Link
                  to="/design2/explore-alt"
                  className={`relative flex items-center gap-1 text-sm font-medium ${
                    isActive('/design2/explore')
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Compass className="h-4 w-4" />
                  Explore
                  {isActive('/design2/explore') && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-accent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <div
                className={`relative flex items-center ${
                  isSearchExpanded ? 'w-64' : 'w-9 md:w-64'
                } transition-all duration-300`}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-0 top-0 md:hidden"
                  onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                >
                  {isSearchExpanded ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  <span className="sr-only">Search</span>
                </Button>
                <div
                  className={`flex w-full items-center ${
                    isSearchExpanded
                      ? 'opacity-100'
                      : 'opacity-0 md:opacity-100'
                  } transition-opacity duration-200`}
                >
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground hidden md:block" />
                  <Input
                    type="search"
                    placeholder="Search content..."
                    className={`w-full rounded-full border-accent/20 bg-accent/5 pl-8 pr-4 focus-visible:ring-accent ${
                      isSearchExpanded ? 'block' : 'hidden md:block'
                    }`}
                  />
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex items-center gap-2 border-accent/20"
                onClick={() => setIsAddContentOpen(true)}
              >
                <Plus className="h-4 w-4" />
                Add Content
              </Button>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground"
                >
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground"
                  onClick={() => setIsProfileOpen(true)}
                >
                  <Avatar className="h-8 w-8 border border-border">
                    <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* <ProfileModalDesign1
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
      <AddContentModal
        isOpen={isAddContentOpen}
        onClose={() => setIsAddContentOpen(false)}
      /> */}
    </>
  );
}
