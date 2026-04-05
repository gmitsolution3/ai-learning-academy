export interface INavItem {
  label: string;
  href?: string;
  items?: { label: string; href: string }[];
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
