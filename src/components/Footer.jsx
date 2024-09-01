import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="parentdiv flex border-t-2 border-black bottom-0">
        <div className="left-container w-9/12 pl-3">
          <h1 className="pb-2 text-xl font-semibold">About the developer: </h1>
          <p>
            I'm Mushfiqur Rahman, a passionate software developer with 9+
            full-stack JavaScript projects built and uploaded to GitHub with
            comments explaining every line of code. My journey is driven by my
            curiosity about tech and i enjoy coding.
          </p>
        </div>
        <div className="right-container grid place-items-center w-1/4">
          <h1 className="text-xl font-semibold">Socials: </h1>
          <a
            href={"https://www.linkedin.com/in/mushfiqurrahman03/"}
            target="_blank"
          >
            <i className="fa-brands fa-linkedin fa-xl py-3 hover:shadow-lg hover:shadow-slate-500" />
          </a>
          <a href={"https://www.instagram.com/mushfiqur_3/"} target="_blank">
            <i className="fa-brands fa-instagram fa-xl py-3 hover:shadow-lg hover:shadow-slate-500" />
          </a>
          <a
            href={"https://www.github.com/mushfiqurniazzz/"}
            target="_blank"
          >
            <i className="fa-brands fa-github fa-xl py-3 hover:shadow-lg hover:shadow-slate-500" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
