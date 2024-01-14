"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";

import Link from "next/link";

import { ProjectType } from "@/types/project";

import styles from "@/styles/Carousel.module.scss";

import { motion } from "framer-motion";

import {
  HiArrowNarrowRight,
  HiArrowNarrowLeft,
  HiArrowRight,
} from "react-icons/hi";

type PropType = {
  projects: ProjectType[];
  options?: EmblaOptionsType;
  ctaLocale: string;
  lang: string;
};

const Carousel = (props: PropType) => {
  const { projects, options, ctaLocale, lang } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const [changingSlide, setChangingSlide] = useState<boolean>(false);
  const [activeProject, setActiveProject] = useState<ProjectType>(projects[0]);

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  useEffect(() => {
    setChangingSlide(true);
  }, [selectedIndex]);

  useEffect(() => {
    if (changingSlide) {
      const timeoutEdit = setTimeout(() => {
        setActiveProject(projects[selectedIndex]);
      }, 150);

      const timeoutClose = setTimeout(() => {
        setChangingSlide(false);
      }, 400);

      return () => {
        clearTimeout(timeoutEdit);
        clearTimeout(timeoutClose);
      };
    }
  }, [changingSlide]);

  const textVariants = {
    hidden: { opacity: 0, transform: "scale(1.1)" },
    visible: { opacity: 1, transform: "scale(1)" },
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {projects.map((project, i) => (
            <motion.div
              className={styles.slide}
              key={i}
              animate={selectedIndex === i ? { opacity: 1 } : { opacity: 0.5 }}
            >
              <Link
                href={projects[selectedIndex].href}
                target="_blank"
                className={
                  selectedIndex === i ? styles.active : styles.inactive
                }
              >
                <img
                  src={`/images/projects/${project.img}.webp`}
                  alt={project.name}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <section className={styles.projectInfo}>
        <motion.h3
          animate={changingSlide ? "hidden" : "visible"}
          initial="hidden"
          variants={textVariants}
        >
          {activeProject.name}
        </motion.h3>
        <motion.p
          animate={changingSlide ? "hidden" : "visible"}
          initial="hidden"
          variants={textVariants}
          transition={{ delay: 0.1 }}
          className={styles.description}
        >
          {
            activeProject.descriptions[
              lang as keyof typeof activeProject.descriptions
            ]
          }
        </motion.p>
        <Link href={activeProject.href} target="_blank">
          <motion.div
            className={styles.button}
            animate={changingSlide ? "hidden" : "visible"}
            initial="hidden"
            variants={textVariants}
            transition={{ delay: 0.2 }}
          >
            <p>{ctaLocale}</p> <HiArrowRight />
          </motion.div>
        </Link>
      </section>

      <button
        onClick={scrollPrev}
        disabled={prevBtnDisabled}
        className={styles.prev}
      >
        <HiArrowNarrowLeft />
      </button>
      <button
        onClick={scrollNext}
        disabled={nextBtnDisabled}
        className={styles.next}
      >
        <HiArrowNarrowRight />
      </button>
    </div>
  );
};

export default Carousel;
