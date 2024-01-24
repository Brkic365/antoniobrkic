"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Navbar.module.scss";

import { getDictionary } from "../dictionaries";

import { motion } from "framer-motion";

import MobileMenu from "./MobileMenu";

import { useRouter } from "next/navigation";

import { usePathname } from "next/navigation";

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  // State that handles opening and closing of the mobile menu
  const [openMenu, setOpenMenu] = useState(false);

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [links, setLinks] = useState([
    {
      title: "ABOUT",
      href: "#about",
    },
    {
      title: "MY WORK",
      href: "#my-work",
    },
    {
      title: "REVIEWS",
      href: "#reviews",
    },
    {
      title: "CONTACT ME!",
      href: "#contact",
    },
  ]);

  // Values asigned to the top line of the hamburger menu used for rotation
  const topLineVariants = {
    open: { transform: "translateY(350%) rotateZ(45deg)" },
    closed: { transform: "translateY(0%) rotateZ(0deg)" },
  };

  // Values asigned to the bottom line of the hamburger menu used for rotation
  const bottomLineVariants = {
    open: { transform: "translateY(-350%) rotateZ(-45deg)" },
    closed: { transform: "translateY(0%) rotateZ(0deg)" },
  };

  const localizeLinks = async () => {
    const dict = await getDictionary(pathname.split("/")[1]);

    if (dict) {
      setLinks([
        {
          title: dict.links.about,
          href: "#about",
        },
        {
          title: dict.links.my_work,
          href: "#my-work",
        },
        {
          title: dict.links.reviews,
          href: "#reviews",
        },
        {
          title: dict.links.contact,
          href: "#contact",
        },
      ]);
    }
  };

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      // if scroll down hide the navbar
      setShow(false);
    } else {
      // if scroll up show the navbar
      setShow(true);
    }

    // remember current page location to use in the next move
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    localizeLinks();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    // cleanup function
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <motion.nav
      className={styles.nav}
      animate={
        show
          ? { transform: "translateY(0)" }
          : { transform: "translateY(-100%)" }
      }
    >
      <MobileMenu
        open={openMenu}
        links={links}
        setOpen={(open) => setOpenMenu(open)}
      />

      {/* Navbar links */}
      <section className={styles.content}>
        <ul className={styles.links}>
          {links.slice(0, 2).map((link) => {
            // Check if the link is active
            let active =
              link.href === "/"
                ? pathname === link.href
                : pathname.includes(link.href);

            return (
              <li
                key={link.href}
                className={active ? styles.active : styles.unactive}
              >
                <a href={link.href}>{link.title}</a>
              </li>
            );
          })}
        </ul>

        <section className={styles.logoHolder} onClick={() => router.push("/")}>
          <h3>ANTONIO BRKIC</h3>
        </section>

        {/* Navbar links */}
        <ul className={styles.links}>
          {links.slice(2, 4).map((link) => {
            // Check if the link is active
            let active =
              link.href === "/"
                ? pathname === link.href
                : pathname.includes(link.href);

            return (
              <li
                key={link.href}
                className={active ? styles.active : styles.unactive}
              >
                <a href={link.href}>{link.title}</a>
              </li>
            );
          })}
        </ul>

        <div
          className={openMenu ? styles.closeHamburger : styles.hamburger}
          onClick={() => setOpenMenu(!openMenu)}
          id="hamburger"
        >
          <motion.div
            className={styles.line}
            animate={openMenu ? "open" : "closed"}
            transition={{ duration: 0.3, type: "tween" }}
            variants={topLineVariants}
            id="line1"
          />
          <div
            className={styles.line}
            style={openMenu ? { opacity: 0 } : undefined}
            id="line2"
          />
          <motion.div
            className={styles.line}
            animate={openMenu ? "open" : "closed"}
            transition={{ duration: 0.3, type: "tween" }}
            variants={bottomLineVariants}
            id="line3"
          />
        </div>
      </section>
    </motion.nav>
  );
}

export default Navbar;
