export interface INavItem {
  label: string;
  key: string;
  href?: string;
  items?: { label: string; key: string; href: string }[];
}

export interface IRenderNavItem {
  item: INavItem;
  isMobile: boolean;
  pathname: string;

  isOpen: boolean;
  isActive: boolean;

  onToggle: () => void;
  onOpen: () => void;
  onClose: () => void;

  closeMobileMenu: () => void;
  resetMobileDropdowns: () => void;
}
