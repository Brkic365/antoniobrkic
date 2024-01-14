"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/Footer.module.scss";

import { getDictionary } from "../dictionaries";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Dictionary {
  links: {
    about: string;
    my_work: string;
    reviews: string;
    contact: string;
  };
}

function Footer() {
  const pathname = usePathname();

  const [dict, setDict] = useState<Dictionary | null>(null);

  const localize = async () => {
    const dictTemp = await getDictionary(pathname.split("/")[1]);

    setDict(dictTemp);
  };

  useEffect(() => {
    localize();
  }, []);

  if (!dict) return null;

  return (
    <section className={styles.footer}>
      <ul>
        <li className={styles.copyright}>© ANTONIO BRKIC 2023</li>
        <li>
          <Link href="/#about">{dict.links.about}</Link>
        </li>
        <li>
          <Link href="/#my-work">{dict.links.my_work}</Link>
        </li>
        <li>
          <Link href="/#reviews">{dict.links.reviews}</Link>
        </li>
        <li>
          <Link href="/#contact">{dict.links.contact}</Link>
        </li>
      </ul>
    </section>
  );
}

export default Footer;
