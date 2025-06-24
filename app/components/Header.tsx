import { Button, Flex, Text } from "@radix-ui/themes";
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
    <Flex align="center" justify="between" style={{ backgroundColor: "var(--accent-5)" }}>
      {/* Left navigation section */}
      <NavigationMenu.Root>
        <NavigationMenu.List>
          <Flex direction="row" gap="6">
            <NavItem to="/catalog">Sports catalog</NavItem>
            <NavItem to="/configurations">Configurations</NavItem>
          </Flex>
        </NavigationMenu.List>
      </NavigationMenu.Root>
      
      {/* Right user section */}
      <Flex align="center" gap="4" px="4">
        <Text>{email}</Text>
        <Separator.Root
          orientation="vertical"
          className="h-4 bg-stone-900 w-px"
        />
        <Button onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
    </Flex>
  );
}
