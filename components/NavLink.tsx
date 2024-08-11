"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NavLink = ({
  href,
  title,
  type,
}: {
  href: string;
  title: string;
  type: "link" | "profile" | "mobile" | "guest";
}) => {
  const pathname = usePathname();
  const [linkBgColor, setLinkBgColor] = useState<string>("");
  const [linkTextColor, setLinkTextColor] = useState<string>("");

  useEffect(() => {
    if (pathname === href) {
      setLinkBgColor("rgb(67 56 202)");
      setLinkTextColor("#eeeeee");
    } else {
      setLinkBgColor("");
      setLinkTextColor("");
    }
  }, [href, pathname]);

  const className =
    type === "link"
      ? "btn btn-ghost hover:bg-base-100 hover:text-neutral"
      : type === "profile"
      ? "hover:bg-base-100 hover:text-neutral w-full"
      : type === "mobile"
      ? "hover:bg-base-200 hover:text-neutral flex items-center"
      : type === "guest"
      ? "btn btn-ghost hover:bg-base-200 hover:text-neutral flex items-center"
      : "";

  return (
    <li>
      <Link
        className={className}
        style={{ backgroundColor: linkBgColor, color: linkTextColor }}
        href={href}>
        {title}
      </Link>
    </li>
  );
};
export default NavLink;
