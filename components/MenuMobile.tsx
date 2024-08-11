import { menuLinks } from "@/lib/data";
import NavLink from "./NavLink";
import Link from "next/link";

export default function MenuMobile() {
  return (
    <div className="navbar-start lg:hidden">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-xs dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-1">
          {menuLinks.map((link) => (
            <NavLink key={link.label} type="mobile" href={link.href} title={link.label} />
          ))}
        </ul>
      </div>
    </div>
  );
}
