"use client";

import React, { useState, useEffect, useRef } from "react";

import styles from "@/styles/Home.module.scss";

import { getDictionary } from "./dictionaries";

import { HiArrowRight } from "react-icons/hi";

import { EmblaOptionsType } from "embla-carousel";

import Modal from "@mui/material/Modal";

import Carousel from "./components/Carousel";
import Review from "./components/Review";

import PROJECTS from "@/data/projects.json";
import REVIEWS from "@/data/reviews.json";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const OPTIONS: EmblaOptionsType = {
  containScroll: "trimSnaps",
  loop: true,
  align: "center",
};

export default function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const supabase = createClientComponentClient();

  const localeShort = lang.slice(0, 2);

  const [messageSuccess, setMessageSuccess] = useState<boolean | null>(null);
  const [canSubmit, setCanSubmit] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const budgetRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleClose = () => setMessageSuccess(null);

  const [dict, setDict] = useState<any>(null);

  const updateCanSubmit = () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const phone = phoneRef.current?.value;
    const message = messageRef.current?.value;

    if (name && email && phone && message) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  };

  const submitForm = async () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const phone = phoneRef.current?.value;
    const budget = budgetRef.current?.value;
    const message = messageRef.current?.value;

    if (!canSubmit) return;

    const data = {
      name,
      email,
      phone,
      budget,
      message,
    };

    const insertRes = await supabase.from("messages").insert(data);

    console.log(insertRes);

    if (insertRes.error) {
      setMessageSuccess(false);
    } else {
      setMessageSuccess(true);
    }

    nameRef.current!.value = "";
    emailRef.current!.value = "";
    phoneRef.current!.value = "";
    budgetRef.current!.value = "";
    messageRef.current!.value = "";
    setCanSubmit(false);
  };

  const localize = async () => {
    const dictTemp = await getDictionary(lang);

    setDict(dictTemp);
  };

  useEffect(() => {
    localize();
  }, []);

  if (!dict) return null;

  return (
    <main className={styles.main}>
      <Modal
        open={messageSuccess !== null}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <section className={styles.contactModal}>
          <h2>
            {messageSuccess
              ? dict.contact_success_title
              : dict.contact_fail_title}
          </h2>
          <p>
            {messageSuccess
              ? dict.contact_success_message
              : dict.contact_fail_message}
          </p>
          <div className={styles.contactInfo}>
            <p>{dict.inputs.email}: brkicweb@gmail.com</p>
            <p>{dict.inputs.phone}: +385 95 760 2280</p>
          </div>
        </section>
      </Modal>
      <section className={styles.hero}>
        <section className={styles.text}>
          <section className={styles.name}>
            <img
              src={`/images/stickers/available_now.webp`}
              alt="Available now sticker"
            />
            <h1 className={styles.firstName}>ANTONIO</h1>
            <div className={styles.lastName}>
              <h1 className={styles.lastName}>BRKIC</h1>
            </div>
          </section>
          <p className={styles.outsideDesc}>{dict.description}</p>
          <div className={styles.button}>
            <p>{dict.hero_cta}</p> <HiArrowRight />
          </div>
        </section>

        <img
          src={`/images/${dict.hero_image}`}
          alt="Yugioh Graphic"
          className={styles.heroImage}
        />
      </section>

      <section className={styles.about} id="about">
        <div className={styles.title}>
          <h1>{dict.about_title}</h1>
          <h2>{dict.about_title}</h2>
        </div>

        <section className={styles.content}>
          <p className={styles.firstParagraph}>{dict.about_descriptions[0]}</p>
          <img src={`/images/about.webp`} alt="About Me Graphic" />
          <p className={styles.secondParagraph}>{dict.about_descriptions[1]}</p>
        </section>
      </section>

      <div className={styles.seperator} />

      <section className={styles.myWork} id="my-work">
        <h2>{dict.my_work_title}</h2>
        <Carousel
          projects={PROJECTS}
          options={OPTIONS}
          ctaLocale={dict.visit_site}
          lang={localeShort}
        />
      </section>

      <section className={styles.reviews} id="reviews">
        <h2>{dict.reviews_title}</h2>
        <section className={styles.grid}>
          {REVIEWS.map((review, i) => (
            <Review review={review} key={i} lang={localeShort} />
          ))}
        </section>
      </section>

      <section className={styles.contact} id="contact">
        <section className={styles.title}>
          <img
            src={`/images/stickers/antonio_brkic.webp`}
            alt="Antonio Brkic sticker"
          />
          <h2>{dict.contact_title}</h2>
          <div className={styles.contactInfo}>
            <p>{dict.inputs.email}: brkicweb@gmail.com</p>
            <p>{dict.inputs.phone}: +385 95 760 2280</p>
          </div>
        </section>

        <form>
          <div className={styles.inputRow}>
            <input
              type="text"
              placeholder={`${dict.inputs.name.toUpperCase()}*`}
              id="name"
              ref={nameRef}
              onChange={updateCanSubmit}
            />
            <input
              type="email"
              placeholder={`${dict.inputs.email.toUpperCase()}*`}
              ref={emailRef}
              onChange={updateCanSubmit}
            />
          </div>
          <div className={styles.inputRow}>
            <input
              type="tel"
              placeholder={`${dict.inputs.phone.toUpperCase()}*`}
              id="tel"
              ref={phoneRef}
              onChange={updateCanSubmit}
            />
            <input
              type="number"
              placeholder={`${dict.inputs.budget.toUpperCase()}*`}
              ref={budgetRef}
            />
          </div>
          <textarea
            placeholder={`${dict.inputs.message.toUpperCase()}*`}
            rows={10}
            ref={messageRef}
            onChange={updateCanSubmit}
          />
          <div
            className={canSubmit ? styles.button : styles.inactiveButton}
            onClick={submitForm}
          >
            <p>{dict.inputs.submit}</p> <HiArrowRight />
          </div>
        </form>
      </section>
    </main>
  );
}
