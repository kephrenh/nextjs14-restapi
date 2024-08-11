const AuthNavLink = ({ type }: { type: "signup" | "signin" | "logout" }) => {
  const href =
    type === "signup"
      ? "/api/auth/signup"
      : type === "signin"
      ? "/api/auth/login"
      : type === "logout"
      ? "/api/auth/logout"
      : undefined;
  const label =
    type === "signup"
      ? "Sign Up"
      : type === "signin"
      ? "Sign In"
      : type === "logout"
      ? "Logout"
      : undefined;
  return (
    <li>
      <a
        target="_blank"
        className="btn btn-ghost flex items-center hover:bg-base-200 hover:text-neutral"
        href={href}>
        {label}
      </a>
    </li>
  );
};
export default AuthNavLink;
