import { IRenderNavItem } from "@/types";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export const renderNavItem = ({
  item,
  isMobile,
  pathname,
  isOpen,
  isActive,
  onToggle,
  onOpen,
  onClose,
  closeMobileMenu,
  resetMobileDropdowns,
}: IRenderNavItem) => {
  const hasDropdown = Boolean(item.items);

  const baseClass = isMobile
    ? "rounded-xl px-4 py-3 text-sm"
    : "rounded-full px-5 py-3 text-sm";

  const stateClass = isActive
    ? "bg-white/10 text-white"
    : "text-white/70 hover:bg-white/5 hover:text-white";

  if (!hasDropdown) {
    return (
      <Link
        key={item.key}
        href={item.href!}
        onClick={() => isMobile && closeMobileMenu()}
        className={`${baseClass} ${stateClass}`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div key={item.key} className={isMobile ? "w-full" : "relative"}>
      <button
        onClick={onToggle}
        onMouseEnter={() => !isMobile && onOpen()}
        onMouseLeave={() => !isMobile && onClose()}
        className={`w-full flex items-center justify-between gap-1 ${baseClass} ${stateClass}`}
        aria-expanded={isOpen}
      >
        <span>{item.label}</span>
        <ChevronDown
          className={`size-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          onMouseEnter={() => !isMobile && onOpen()}
          onMouseLeave={() => !isMobile && onClose()}
          className={
            isMobile
              ? "mt-1 ml-4 flex flex-col gap-1"
              : "absolute left-0 mt-0 w-48 rounded-lg border border-white/10 bg-black/80 backdrop-blur-xl shadow-lg overflow-hidden"
          }
        >
          {item.items!.map((subItem) => {
            const isSubActive = pathname === subItem.href;

            return (
              <Link
                key={subItem.href}
                href={subItem.href}
                onClick={() => {
                  if (isMobile) {
                    closeMobileMenu();
                    resetMobileDropdowns();
                  }
                }}
                className={`block ${
                  isMobile
                    ? "rounded-xl px-4 py-3 text-sm"
                    : "px-4 py-3 text-sm"
                } ${
                  isSubActive
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {subItem.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
