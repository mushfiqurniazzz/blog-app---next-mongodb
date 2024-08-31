"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const NavBar = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const loadProviders = async () => {
      try {
        const res = await getProviders();
        setProviders(res);
      } finally {
        setLoading(false);
      }
    };
    loadProviders();
  }, []);

  const handleSignIn = async (providerId) => {
    await signIn(providerId, { redirect: false });
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="border-b border-black p-4 flex items-center justify-between bg-white shadow-md">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/assets/logo.png"
          alt="logo"
          width={30}
          height={30}
          className="rounded"
        />
        <p className="font-semibold text-lg">Blog App</p>
      </Link>

      <div className="flex items-center space-x-4 relative">
        {loading ? (
          <div className="flex items-center space-x-2">
            <svg
              className="w-6 h-6  animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M4 12a8 8 0 0 1 16 0" />
            </svg>
            <span className="">Loading...</span>
          </div>
        ) : session?.user ? (
          <div className="relative">
            <button onClick={toggleDropdown} className="focus:outline-none">
              <Image
                src={session?.user.image}
                width={40}
                height={40}
                className="rounded-full border border-green-300"
                alt="profile"
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-md z-10">
                <Link
                  href="/create-post"
                  className="block px-4 py-2  hover:bg-gray-100 hover:underline"
                >
                  Create Post
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="block w-full px-4 py-2  hover:bg-gray-100 hover:underline text-left"
                >
                  Sign Out
                </button>
                <Link
                  href="/profile"
                  className="block px-4 py-2  hover:bg-gray-100 hover:underline"
                >
                  Profile
                </Link>
              </div>
            )}
          </div>
        ) : (
          providers &&
          Object.values(providers).map((provider) => (
            <button
              type="button"
              key={provider.name}
              onClick={() => handleSignIn(provider.id)}
              className=" hover:underline"
            >
              Sign in
            </button>
          ))
        )}
      </div>
    </nav>
  );
};

export default NavBar;
