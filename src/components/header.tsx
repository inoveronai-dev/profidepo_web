"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/logo";
import { FacebookIcon, HeaderSocialLinks, InstagramIcon } from "@/components/social";
import { nav, phone, social } from "@/lib/site";

const sectionIds = nav
  .filter((item) => item.href.startsWith("#"))
  .map((item) => item.href.slice(1));

function headerOffset() {
  return window.matchMedia("(min-width: 1024px)").matches ? 81 : 65;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const menuId = useId();
  const pathname = usePathname();
  const logoHref = pathname === "/" ? "#uvod" : "/";
  const linkActive = (href: string) => {
    if (pathname === "/o-nas") return href === "#o-nas";
    if (pathname === "/cennik") return href === "/cennik";
    if (pathname.startsWith("/sluzby/")) return href === "#sluzby";
    return activeId === href.slice(1);
  };

  useEffect(() => {
    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    const update = () => {
      let current = "";
      for (const node of nodes) {
        const margin = Number.parseFloat(getComputedStyle(node).scrollMarginTop) || headerOffset();
        if (node.getBoundingClientRect().top <= margin + 4) current = node.id;
      }
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
      if (atBottom && nodes.length > 0) current = nodes[nodes.length - 1].id;
      setActiveId(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-[#42634C]/10 bg-[#FFFFFF]">
      <style>{`
        .nav-underline {
          position: absolute;
          right: 0;
          bottom: -4px;
          left: 0;
          height: 1px;
          background: #42634c;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 200ms ease-out;
          pointer-events: none;
        }
        a.group:hover .nav-underline,
        a.group:focus-visible .nav-underline,
        .nav-underline.is-on {
          transform: scaleX(1);
        }
        a.group {
          transition: color 200ms ease-out;
        }
        a.group:hover,
        a.group:focus-visible,
        a.group[aria-current="location"] {
          color: #42634c;
        }
        a.social-link {
          transition: background-color 200ms ease-out, color 200ms ease-out;
        }
        a.social-link:hover,
        a.social-link:focus-visible {
          background: rgba(66, 99, 76, 0.08);
          color: #2f4a38;
        }
        a.social-link:focus-visible {
          outline: 2px solid #42634c;
          outline-offset: 2px;
        }
      `}</style>
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-6 lg:h-[80px] lg:px-[72px]">
        {pathname === "/" ? (
          <a href={logoHref} className="flex items-center gap-2.5 text-[#2A2E2C]">
            <LogoMark className="size-6" />
            <span className="text-[26px] leading-none font-bold tracking-tight">
              ProfiDepo
            </span>
          </a>
        ) : (
          <Link href={logoHref} className="flex items-center gap-2.5 text-[#2A2E2C]">
            <LogoMark className="size-6" />
            <span className="text-[26px] leading-none font-bold tracking-tight">
              ProfiDepo
            </span>
          </Link>
        )}

        <nav className="hidden items-center gap-5 xl:gap-8 lg:flex" aria-label="Hlavné">
          {nav.map((item) => (
            <SectionLink
              key={item.href}
              href={item.href}
              label={item.label}
              active={linkActive(item.href)}
              className="group text-[16px] leading-normal font-semibold text-[#2A2E2C] transition-colors duration-200 ease-out hover:text-[#42634C] focus-visible:text-[#42634C]"
            />
          ))}
          <HeaderSocialLinks />
          <a
            href={phone.href}
            className="inline-flex items-center gap-2 rounded-full border border-[#42634C]/35 px-4 py-2 text-sm font-medium text-[#42634C] transition-colors hover:bg-white"
          >
            <Phone className="size-4" strokeWidth={1.75} />
            {phone.display}
          </a>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={phone.href}
            aria-label={`Zavolať ${phone.display}`}
            className="inline-flex size-11 items-center justify-center rounded-full border border-[#42634C]/35 text-[#42634C]"
          >
            <Phone className="size-4" strokeWidth={1.75} />
          </a>
          <Button
            variant="outline"
            size="icon"
            className="size-11 rounded-full border-[#42634C]/30 bg-transparent text-[#2A2E2C] hover:bg-white"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
            <span className="sr-only">
              {open ? "Zavrieť menu" : "Otvoriť menu"}
            </span>
          </Button>
        </div>
      </div>

      {open ? (
        <nav
          id={menuId}
          className="border-t border-[#42634C]/10 bg-[#FFFFFF] px-5 py-2 shadow-sm lg:hidden"
          aria-label="Mobilné"
        >
          {nav.map((item) => (
            <SectionLink
              key={item.href}
              href={item.href}
              label={item.label}
              active={linkActive(item.href)}
              onClick={() => setOpen(false)}
              className="group block border-b border-[#42634C]/10 py-3.5 text-lg font-semibold text-[#2A2E2C] transition-colors duration-200 ease-out hover:text-[#42634C] focus-visible:text-[#42634C]"
            />
          ))}
          <a
            href={social.facebook.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.facebook.name}
            className="social-link flex items-center gap-3 border-b border-[#42634C]/10 py-3.5 text-lg font-semibold text-[#42634C]"
          >
            <FacebookIcon className="size-[22px]" />
            {social.facebook.label}
          </a>
          <a
            href={social.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.instagram.name}
            className="social-link flex items-center gap-3 border-b border-[#42634C]/10 py-3.5 text-lg font-semibold text-[#42634C]"
          >
            <InstagramIcon className="size-[22px]" />
            {social.instagram.label}
          </a>
          <a
            href={phone.href}
            className="flex items-center gap-2 py-4 text-lg font-medium text-[#42634C]"
          >
            <Phone className="size-4" strokeWidth={1.75} />
            {phone.display}
          </a>
        </nav>
      ) : null}
    </header>
  );
}

function SectionLink({
  href,
  label,
  active,
  className,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  className: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const pageLink = href.startsWith("/");
  const resolved = pageLink ? href : pathname === "/" ? href : `/${href}`;
  const inner = (
    <span className="relative inline-block">
      {label}
      <span
        aria-hidden="true"
        className={active ? "nav-underline is-on" : "nav-underline"}
      />
    </span>
  );
  if (!pageLink && pathname === "/") {
    return (
      <a
        href={href}
        aria-current={active ? "location" : undefined}
        onClick={onClick}
        className={className}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link
      href={resolved}
      aria-current={active ? "location" : undefined}
      onClick={onClick}
      className={className}
    >
      {inner}
    </Link>
  );
}
