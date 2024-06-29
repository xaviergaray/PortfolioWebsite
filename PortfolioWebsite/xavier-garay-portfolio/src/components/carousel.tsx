'use client'
import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import styles from "@/app/ui/carousel.module.css";
import Navbar from "./navbar";

type EmblaCarouselProps = {
    children: React.ReactNode;
    navbarButtons?: string[];
};

export default function EmblaCarousel({ children, navbarButtons = []}: Readonly<EmblaCarouselProps>) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
    const [activeIndex, setActiveIndex] = useState(0)

    const scrollPrev = useCallback(() => {
        if (emblaApi) {
            emblaApi.scrollPrev()
            setActiveIndex(emblaApi.selectedScrollSnap())
        }
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) {
            emblaApi.scrollNext()
            setActiveIndex(emblaApi.selectedScrollSnap())
        }
    }, [emblaApi])

    const scrollTo = useCallback((index: number) => {
        if (emblaApi) {
            emblaApi.scrollTo(index)
            setActiveIndex(index)
        }
    }, [emblaApi])

    const handleNavigate = (index: number) => {
        if (emblaApi) {
            emblaApi.scrollTo(index)
            setActiveIndex(index)
        }
    };

    useEffect(() => {
        if (emblaApi) {
            setScrollSnaps(emblaApi.scrollSnapList())
            emblaApi.on('init', () => setActiveIndex(emblaApi.selectedScrollSnap()))
            emblaApi.on('scroll', () => setActiveIndex(emblaApi.selectedScrollSnap()))
        }
    }, [emblaApi])

    return (
        <main className={styles.main}>
            <div className={styles.embla}>
                <div className={styles.embla__viewport}>
                    {navbarButtons.length > 0 && (
                        <Navbar
                            onNavigate={handleNavigate}
                            buttons={navbarButtons}
                            className={styles.nav}
                        />
                    )}
                    <div className={styles.embla__viewport} ref={emblaRef}>
                        <div className={styles.embla__container}>
                            {React.Children.map(children, (child) => (
                                <div className={styles.embla__slide}>
                                    {child}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.slides_buttons}>
                    <button className={styles.embla__prev} onClick={scrollPrev}>
                        <p>‹</p>
                    </button>
                    {scrollSnaps.map((snap, index) => (
                        <button
                            key={index}
                            className={index === activeIndex ? styles.emlba__dot_active : styles.emlba__dot}
                            onClick={() => scrollTo(index)}
                        >
                        </button>
                    ))}
                    <button className={styles.embla__next} onClick={scrollNext}>
                        <p>›</p>
                    </button>
                </div>
            </div>
        </main>
    )
}
