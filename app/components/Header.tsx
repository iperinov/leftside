import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Box, Button, Flex, Separator, Text } from "@radix-ui/themes";
import { NavLink, type NavLinkProps, useNavigate } from "react-router";
import { useAuthStore } from "~/stores/useAuthStore";

function NavItem({ to, children, ...props }: NavLinkProps) {
  return (
    <NavigationMenu.Item style={{ listStyle: "none" }}>
      <NavLink
        to={to}
        {...props}
        style={({ isActive }: { isActive: boolean }) => ({
          textDecoration: "none",
          color: isActive ? "var(--accent-a11)" : "var(--accent-a9)",
          fontWeight: isActive ? 500 : 400,
          borderBottom: isActive ? "2px solid var(--accent-a11)" : "2px solid transparent",
          paddingBottom: "10px",
          fontSize: "14px",
          cursor: "pointer",
        })}
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
    <Box
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "var(--accent-3)",
        borderBottom: "1px solid var(--accent-6)",
        padding: "0.25rem 2rem",
      }}
    >
      <Flex align="center" justify="between" style={{ height: "2.25rem" }}>
        <NavigationMenu.Root>
          <NavigationMenu.List
            style={{
              display: "flex",
              gap: "2rem",
              margin: 0,
              padding: 0,
              listStyle: "none",
            }}
          >
            <NavItem to="/catalog">Sports catalog</NavItem>
            <NavItem to="/configurations">Configurations</NavItem>
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <Flex align="center" gap="3">
          <Text size="2" weight="medium" style={{ color: "var(--accent-11)" }}>
            {email}
          </Text>
          <Separator
            orientation="vertical"
            style={{
              height: "1rem",
              backgroundColor: "var(--accent-10)",
              width: 1,
            }}
          />
          <Button
            variant="ghost"
            size="1"
            onClick={handleLogout}
            style={{
              textDecoration: "underline",
              color: "var(--accent-11)",
              padding: 0,
            }}
          >
            Log out
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
