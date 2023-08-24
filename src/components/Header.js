import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="fixed z-10 flex w-full px-5 py-3 justify-between">
      <Link href="/">
        <h3 className="text-2xl font-bold">CohesionHub</h3>
      </Link>

      <ul>
        <li className="">
          <Link href="/games">Games</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
