"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { examples, gitHub } from "@/constant";
import { Icon } from "@/components/Icon";
import gradient from "random-gradient";
import { useEffect, useState } from "react";

export default function Layout({ children }: React.PropsWithChildren) {
  const pathname = usePathname();
  const bgGradient = gradient(String("2024"));
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  useEffect(() => {
    setMenuVisible(false);
  }, [pathname]);

  return (
    <div className="flex h-screen">
      <nav
        className={`${
          menuVisible ? "block w-full fixed z-10 bg-white top-16" : "hidden w-0"
        } p-0 md:p-4 md:w-[300px] md:flex md:flex-col md:justify-between`}
      >
        <ul>
          {examples.map(({ icon, name, url }) => (
            <li key={url}>
              <Link
                href={url}
                className={`p-3 rounded-md cursor-pointer hover:bg-gray-100 hover:text-black flex items-center gap-2 ${
                  pathname === url
                    ? "bg-gray-200 font-medium shadow-md"
                    : "text-gray-500"
                } `}
              >
                <Icon
                  name={icon}
                  size={24}
                  min={24}
                  id={icon}
                  color={pathname === url ? "black" : "inherit"}
                />
                <span className="flex-1">{name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href={gitHub} target={"_blank"}>
          <div className="relative hidden p-4 text-white transition duration-500 ease-in-out rounded-md cursor-pointer md:block">
            <div className="relative z-10 flex items-center justify-between">
              <Icon name={"VscGithubAlt"} size={24} min={24} />
              <span>Github</span>
            </div>
            <div
              style={{
                background: bgGradient,
              }}
              className="absolute top-0 bottom-0 left-0 right-0 rounded-md -z-1"
            ></div>
          </div>
        </Link>
      </nav>
      <div className="flex-1 min-h-full max-h-full bg-gray-100 shadow-lg overflow-auto">
        <header className="md:hidden flex justify-between items-center p-4 border-b bg-slate-50 md:rounded-tl-[4rem] sticky top-0 z-20">
          <div>
            {menuVisible === true ? (
              <Icon
                name="HiOutlineX"
                size={32}
                onClick={() => setMenuVisible(!menuVisible)}
              ></Icon>
            ) : (
              <Icon
                name="HiOutlineMenu"
                size={32}
                onClick={() => setMenuVisible(!menuVisible)}
              ></Icon>
            )}
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
