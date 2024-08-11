import { profileLinks } from "@/lib/data";
import NavLink from "./NavLink";

/* eslint-disable @next/next/no-img-element */
export default function LoggedUserLinks({ user }: { user: any }) {
  return (
    <li className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="avatar  online">
          <div className="w-10 rounded-full">
            <img alt={user.name} src={user.picture} />
          </div>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-36 p-2 shadow">
        {profileLinks.map((link) => (
          <NavLink key={link.label} type="profile" href={link.href} title={link.label} />
        ))}
      </ul>
    </li>
  );
}
