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

import { motion } from "framer-motion";

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
            <p>{dict.inputs.email}: antonio@brki.cc</p>
            <p>{dict.inputs.phone}: +385 95 760 2280</p>
          </div>
        </section>
      </Modal>
      <section className={styles.hero}>
        <section className={styles.text}>
          <section className={styles.name}>
            <motion.img
              src={`/images/stickers/available_now.webp`}
              alt="Available now sticker"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              variants={{
                visible: {
                  transform: "scale(1) rotate(8.744deg)",
                  filter: "blur(0px)",
                  opacity: 1,
                },
                hidden: {
                  transform: "scale(1.5) rotate(0deg)",
                  filter: "blur(4px)",
                  opacity: 0,
                },
              }}
            />
            <motion.h1
              className={styles.firstName}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              variants={{
                visible: {
                  transform: "scale(1)",
                  filter: "blur(0px)",
                  opacity: 1,
                },
                hidden: {
                  transform: "scale(1.5)",
                  filter: "blur(4px)",
                  opacity: 0,
                },
              }}
            >
              ANTONIO
            </motion.h1>
            <div className={styles.lastName}>
              <motion.p
                className={styles.innerDesc}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                variants={{
                  visible: { transform: "translateX(0)", opacity: 1 },
                  hidden: { transform: "translateX(-100%)", opacity: 0 },
                }}
              >
                {dict.description}
              </motion.p>
              <motion.h1
                className={styles.lastName}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                variants={{
                  visible: {
                    transform: "scale(1)",
                    filter: "blur(0px)",
                    opacity: 1,
                  },
                  hidden: {
                    transform: "scale(1.5)",
                    filter: "blur(4px)",
                    opacity: 0,
                  },
                }}
              >
                BRKIC
              </motion.h1>
            </div>
          </section>
          <motion.p
            className={styles.outsideDesc}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            variants={{
              visible: { transform: "translateX(0)", opacity: 1 },
              hidden: { transform: "translateX(-100%)", opacity: 0 },
            }}
          >
            {dict.description}
          </motion.p>
          <motion.div
            className={styles.button}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            variants={{
              visible: { transform: "translateX(0)", opacity: 1 },
              hidden: { transform: "translateX(-100%)", opacity: 0 },
            }}
          >
            <p>{dict.hero_cta}</p> <HiArrowRight />
          </motion.div>
        </section>

        <motion.img
          src={`/images/${dict.hero_image}`}
          alt="Yugioh Graphic"
          className={styles.heroImage}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          variants={{
            visible: {
              transform: "scale(1) rotate(0deg)",
              filter: "blur(0px)",
              opacity: 1,
            },
            hidden: {
              transform: "scale(1.5) rotate(5deg)",
              filter: "blur(4px)",
              opacity: 0,
            },
          }}
        />
      </section>

      <section className={styles.about} id="about">
        <div className={styles.title}>
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.2 }}
            variants={{
              visible: {
                transform: "scale(1)",
                filter: "blur(0px)",
                opacity: 1,
              },
              hidden: {
                transform: "scale(1.5)",
                filter: "blur(4px)",
                opacity: 0,
              },
            }}
          >
            {dict.about_title}
          </motion.h1>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            variants={{
              visible: {
                opacity: 1,
              },
              hidden: {
                opacity: 0,
              },
            }}
          >
            {dict.about_title}
          </motion.h2>
        </div>

        <section className={styles.content}>
          <motion.p
            className={styles.firstParagraph}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            variants={{
              visible: {
                transform: "scale(1) rotate(0deg)",
                filter: "blur(0px)",
                opacity: 1,
              },
              hidden: {
                transform: "scale(1.5) rotate(3deg)",
                filter: "blur(4px)",
                opacity: 0,
              },
            }}
          >
            {dict.about_descriptions[0]}
          </motion.p>
          <motion.img
            src={`/images/about.webp`}
            alt="About Me Graphic"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={{
              visible: {
                transform: "scale(1) rotate(0deg)",
                filter: "blur(0px)",
                opacity: 0.8,
              },
              hidden: {
                transform: "scale(1.5) rotate(3deg)",
                filter: "blur(4px)",
                opacity: 0,
              },
            }}
          />
          <motion.p
            className={styles.secondParagraph}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            variants={{
              visible: {
                transform: "scale(1) rotate(0deg)",
                filter: "blur(0px)",
                opacity: 1,
              },
              hidden: {
                transform: "scale(1.5) rotate(3deg)",
                filter: "blur(4px)",
                opacity: 0,
              },
            }}
          >
            {dict.about_descriptions[1]}
          </motion.p>
        </section>
      </section>

      <motion.div
        className={styles.seperator}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        variants={{
          visible: {
            opacity: 1,
            width: "80%",
          },
          hidden: {
            opacity: 0,
            width: 0,
          },
        }}
      />

      <section className={styles.myWork} id="my-work">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          variants={{
            visible: {
              opacity: 1,
            },
            hidden: {
              opacity: 0,
            },
          }}
        >
          {dict.my_work_title}
        </motion.h2>
        <Carousel
          projects={PROJECTS}
          options={OPTIONS}
          ctaLocale={dict.visit_site}
          lang={localeShort}
        />
      </section>

      <section className={styles.reviews} id="reviews">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          variants={{
            visible: {
              opacity: 1,
            },
            hidden: {
              opacity: 0,
            },
          }}
        >
          {dict.reviews_title}
        </motion.h2>
        <section className={styles.grid}>
          {REVIEWS.map((review, i) => (
            <Review review={review} key={i} lang={localeShort} />
          ))}
        </section>
      </section>

      <section className={styles.contact} id="contact">
        <section className={styles.title}>
          <motion.img
            src={`/images/stickers/antonio_brkic.webp`}
            alt="Antonio Brkic sticker"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            variants={{
              visible: {
                transform: "scale(1) rotate(8.744deg)",
                filter: "blur(0px)",
                opacity: 1,
              },
              hidden: {
                transform: "scale(1.5) rotate(0deg)",
                filter: "blur(4px)",
                opacity: 0,
              },
            }}
          />
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            variants={{
              visible: {
                opacity: 1,
              },
              hidden: {
                opacity: 0,
              },
            }}
          >
            {dict.contact_title}
          </motion.h2>
          <div className={styles.contactInfo}>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              variants={{
                visible: {
                  opacity: 1,
                },
                hidden: {
                  opacity: 0,
                },
              }}
            >
              {dict.inputs.email}: antonio@brki.cc
            </motion.p>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              variants={{
                visible: {
                  opacity: 1,
                },
                hidden: {
                  opacity: 0,
                },
              }}
            >
              {dict.inputs.phone}: +385 95 760 2280
            </motion.p>
          </div>
        </section>

        <form>
          <div className={styles.inputRow}>
            <motion.input
              type="text"
              placeholder={`${dict.inputs.name.toUpperCase()}*`}
              id="name"
              ref={nameRef}
              onChange={updateCanSubmit}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              variants={{
                visible: {
                  opacity: 1,
                },
                hidden: {
                  opacity: 0,
                },
              }}
            />
            <motion.input
              type="email"
              placeholder={`${dict.inputs.email.toUpperCase()}*`}
              ref={emailRef}
              onChange={updateCanSubmit}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              variants={{
                visible: {
                  opacity: 1,
                },
                hidden: {
                  opacity: 0,
                },
              }}
            />
          </div>
          <div className={styles.inputRow}>
            <motion.input
              type="tel"
              placeholder={`${dict.inputs.phone.toUpperCase()}*`}
              id="tel"
              ref={phoneRef}
              onChange={updateCanSubmit}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              variants={{
                visible: {
                  opacity: 1,
                },
                hidden: {
                  opacity: 0,
                },
              }}
            />
            <motion.input
              type="number"
              placeholder={`${dict.inputs.budget.toUpperCase()}*`}
              ref={budgetRef}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              variants={{
                visible: {
                  opacity: 1,
                },
                hidden: {
                  opacity: 0,
                },
              }}
            />
          </div>
          <motion.textarea
            placeholder={`${dict.inputs.message.toUpperCase()}*`}
            rows={10}
            ref={messageRef}
            onChange={updateCanSubmit}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.9 }}
            variants={{
              visible: {
                opacity: 1,
              },
              hidden: {
                opacity: 0,
              },
            }}
          />
          <motion.div
            className={canSubmit ? styles.button : styles.inactiveButton}
            onClick={submitForm}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            variants={{
              visible: {
                transform: "scale(1)",
              },
              hidden: {
                transform: "scale(0)",
              },
            }}
          >
            <p>{dict.inputs.submit}</p> <HiArrowRight />
          </motion.div>
        </form>
      </section>
    </main>
  );
}
