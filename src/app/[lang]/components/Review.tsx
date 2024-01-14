import React from "react";
import styles from "@/styles/Review.module.scss";

import { ReviewType } from "@/types/review";

function Review({ review, lang }: { review: ReviewType; lang: string }) {
  return (
    <section className={styles.review}>
      <section className={styles.top}>
        <img
          src={`/images/pfp/${review.pfp}.webp`}
          alt={`${review.name}'s Profile Picture`}
        />
        <div className={styles.text}>
          <h4>{review.name}</h4>
          <p className={styles.position}>{review.position}</p>
        </div>
      </section>
      <p className={styles.reviewText}>
        {review.reviews[lang as keyof typeof review.reviews]}
      </p>
    </section>
  );
}

export default Review;
