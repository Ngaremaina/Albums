export type MenuProps = {
    isNavOpen: boolean;
  };

export type ProfileProps = {
    isUserMenuOpen: boolean;
    toggleUserMenu: () => void;
  };

export type LayoutProps = {
    children: React.ReactNode;
  };