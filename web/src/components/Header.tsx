'use client'

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";

const Header = () => {
  const { user } = useUser();
  return (
    <header>
      <div>Header</div>

      <SignedIn>
        <UserButton />
      </SignedIn>

      <SignedOut>
        <Button asChild>
            <SignInButton mode="modal"/>
        </Button>
      </SignedOut>
    </header>
  );
};

export default Header;
