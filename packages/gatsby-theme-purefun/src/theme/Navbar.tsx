import React from "react";
import { Link } from "gatsby";
import "./Navbar.scss";

export default function Navbar() {
  return (
    <div className="nav">
      <Link to="/">
        lin.am
      </Link>
      <div className="desc">Another developer's blog</div>
    </div>
  );
}
