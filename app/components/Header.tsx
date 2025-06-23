import clsx from "clsx";
import { NavigationMenu, Separator } from "radix-ui";
import { NavLink, type NavLinkProps, useNavigate } from "react-router";
import { useAuthStore } from "~/stores/useAuthStore";

function NavItem({ to, children, ...props }: NavLinkProps) {
  return (
    <NavigationMenu.Item>
      <NavLink
        to={to}
        {...props}
        className={({ isActive }: { isActive: boolean }) =>
          clsx("nav-item", isActive && "nav-item-active")
        }
      >
        {children}
      </NavLink>
    </NavigationMenu.Item>
  );
}

export default function Header() {
  const email = useAuthStore((s) => s.auth?.email);
  const navigate = useNavigate();

  const handleLogout = () => {
    useAuthStore.getState().clearAuth();
    navigate("/");
  };

  return (
    <header className="bg-stone-300 px-6 py-2 flex items-center justify-between text-sm select-none">
      {/* Left navigation section */}
      <NavigationMenu.Root className="flex gap-6">
        <NavigationMenu.List className="flex gap-6">
          <NavItem to="/catalog">Sports catalog</NavItem>
          <NavItem to="/configurations">Configurations</NavItem>
        </NavigationMenu.List>
      </NavigationMenu.Root>

      {/* Right user section */}
      <div className="flex items-center gap-4 text-gray-900">
        <span className="font-medium">{email}</span>
        <Separator.Root
          orientation="vertical"
          className="h-4 bg-stone-900 w-px"
        />
        <button
          type="button"
          onClick={handleLogout}
          className="underline text-gray-600 hover:text-gray-800 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
