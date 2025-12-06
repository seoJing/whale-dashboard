import { useState, useRef } from 'react';
import type { TouchEvent } from 'react';

export function useSlider(totalSlides: number) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const minSwipeDistance = 50;

    const handleTouchStart = (e: TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe && currentSlide < totalSlides - 1) {
            setCurrentSlide(currentSlide + 1);
        }
        if (isRightSwipe && currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }

        setTouchStart(0);
        setTouchEnd(0);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return {
        currentSlide,
        containerRef,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        goToSlide,
    };
}
