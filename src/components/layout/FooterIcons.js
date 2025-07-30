import React from "react";

import FaceBook from "../supporting/FaceBook";
import Insta from "../supporting/Insta";
import Twitter from "../supporting/Twitter";

export default function FooterIcons() {
  return (
        <>
      <a  href="/" className="_socialIcon scale-[115%] inline-block hover:rotate-12 dark:invert ">
        <FaceBook />
      </a>
      <a  href="/" className="_socialIcon scale-[115%] inline-block hover:rotate-12 dark:invert ">
        <Insta />
      </a>
      <a  href="/" className="_socialIcon scale-[115%] inline-block hover:rotate-12 dark:invert ">
        <Twitter />
      </a>
        </>
  );
}
