/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import NavLink from "./NavLink";
import { useUser } from "@auth0/nextjs-auth0/client";
import LoggedUserLinks from "./LoggedUserLinks";
import MenuMobile from "./MenuMobile";
import NotLoggedLinks from "./NotLoggedLinks";
import { menuLinks } from "@/lib/data";
import AuthNavLink from "./AuthNavLink";

const Header = () => {
  const { user, error, isLoading } = useUser();
  return (
    <header className="w-full">
      <nav className="navbar bg-neutral text-neutral-content border-none shadow-lg">
        <MenuMobile />
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">
            {menuLinks.map((link) => (
              <NavLink key={link.label} type="link" href={link.href} title={link.label} />
            ))}
          </ul>
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal menu-sm items-center space-x-2">
            {user && !isLoading ? (
              <AuthNavLink type="logout" />
            ) : (
              <>
                <AuthNavLink type="signin" />
                <AuthNavLink type="signup" />
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};
export default Header;
