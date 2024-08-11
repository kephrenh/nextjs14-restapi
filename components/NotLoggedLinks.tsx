import { signInUpLinks } from "@/lib/data";
import Link from "next/link";

export default function NotLoggedLinks() {
  return (
    <>
      {signInUpLinks.map((link) => (
        <li className="hover:bg-base-200 hover:text-neutral flex items-center" key={link.label}>
          <Link href={link.href} title={link.label} />
        </li>
      ))}
    </>
  );
}
