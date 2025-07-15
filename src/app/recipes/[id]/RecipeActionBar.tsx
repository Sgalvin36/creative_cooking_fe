"use client";

import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function RecipeActionBar() {
  const router = useRouter();
  const [inCookbook, setInCookbook] = useState(false);

  useEffect(() => {
    // fetch cookbook status on mount
    // setInCookbook (true false based off user data)
  });

  const toggleCookbook = () => {
    setInCookbook((prev: boolean) => !prev);
    // TODO: call api to add/remove from cookbook
  };

  return (
    <div className="flex flex-row space-x-4 p-4 justify-center bg-grey-50">
      <Button onClick={() => router.back()}>Back</Button>
      <Link href="/recipes" passHref>
        <Button>New Search</Button>
      </Link>
      <Button
        onClick={toggleCookbook}
        variant={inCookbook ? "danger" : "primary"}
      >
        {inCookbook ? "Remove from Cookbook" : "Add to Cookbook"}
      </Button>
    </div>
  );
}
