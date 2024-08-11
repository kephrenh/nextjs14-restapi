const profileLinks = [
  { href: "/profile", label: "Profile" },
  { href: "/settings", label: "Settings" },
  { href: "/api/auth/logout", label: "Logout" },
];

const signInUpLinks = [
  { href: "/api/auth/login", label: "Sign In" },
  { href: "/api/auth/signup", label: "Sign Up" },
];

const menuLinks = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "Server Protected" },
  { href: "/middleware-protected", label: "Middleware Protected" },
  { href: "/auth-protected", label: "Auth Protected" },
  { href: "/api/data", label: "Protected Api" },
];

export { profileLinks, signInUpLinks, menuLinks };
