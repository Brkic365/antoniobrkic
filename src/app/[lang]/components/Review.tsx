import React from "react";
import styles from "@/styles/Review.module.scss";

import { ReviewType } from "@/types/review";

import { motion } from "framer-motion";

function Review({ review, lang }: { review: ReviewType; lang: string }) {
  return (
    <section className={styles.review}>
      <section className={styles.top}>
        <motion.img
          src={`/images/pfp/${review.pfp}.webp`}
          alt={`${review.name}'s Profile Picture`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          variants={{
            visible: {
              opacity: 1,
            },
            hidden: {
              opacity: 0,
            },
          }}
        />
        <div className={styles.text}>
          <motion.h4
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            variants={{
              visible: {
                opacity: 1,
              },
              hidden: {
                opacity: 0,
              },
            }}
          >
            {review.name}
          </motion.h4>
          <motion.p
            className={styles.position}
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
            {review.position}
          </motion.p>
        </div>
      </section>
      <motion.p
        className={styles.reviewText}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.55 }}
        variants={{
          visible: {
            opacity: 1,
          },
          hidden: {
            opacity: 0,
          },
        }}
      >
        {review.reviews[lang as keyof typeof review.reviews]}
      </motion.p>
    </section>
  );
}

export default Review;
