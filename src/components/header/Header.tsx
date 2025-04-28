"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton
} from "@clerk/nextjs";
import { ChevronLeftIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import RedEchoLogo from "../../../public/images/RedEcho_full_logo.png";
import RedEchoLogoOnly from "../../../public/images/RedEcho_logo_only.png";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";

const Header = () => {
  const { toggleSidebar, isMobile, open } = useSidebar();
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-50">
      {/* Left Side */}
      <div className="h-10 flex items-center">
      {open && isMobile ? (
        <ChevronLeftIcon className="w-6 h-6" onClick={toggleSidebar} />
      ) : (
        <div className="flex items-center gap-2">
          <MenuIcon className="w-6 h-6" onClick={toggleSidebar} />
          <Image
            src={RedEchoLogo}
            alt="Red Echo Logo"
            width={150}
            height={150}
            className="hidden md:block"
          />

          <Image
            src={RedEchoLogoOnly}
            alt="Red Echo Logo Only"
            width={40}
            height={40}
            className="block md:hidden"
          />
        </div>
      )}
      </div>

      {/* Right Side */}
      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <Button asChild variant={"outline"}>
            <SignInButton mode="modal" />
          </Button>
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
