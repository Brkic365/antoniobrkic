"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/NotFound.module.scss";

import { HiArrowRight } from "react-icons/hi";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import { getDictionary } from "./[lang]/dictionaries";

interface Dictionary {
  not_found: string;
  go_back: string;
}

function NotFound() {
  const router = useRouter();
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
    <main className={styles.notFound}>
      <section className={styles.content}>
        <section className={styles.text}>
          <h1>{dict.not_found}</h1>
          <h2>404</h2>
        </section>

        <div className={styles.button} onClick={() => router.back()}>
          <p>{dict.go_back}</p> <HiArrowRight />
        </div>
      </section>
    </main>
  );
}

export default NotFound;
