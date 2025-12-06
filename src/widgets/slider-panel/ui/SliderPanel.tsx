import type { ReactNode } from 'react';
import { useSlider } from '../model/useSlider';
import { SliderDots } from './SliderDots';

interface SliderPanelProps {
    children: ReactNode[];
}

export function SliderPanel({ children }: SliderPanelProps) {
    const {
        currentSlide,
        containerRef,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        goToSlide,
    } = useSlider(children.length);

    return (
        <div className="w-full flex flex-col gap-4">
            <div
                ref={containerRef}
                className="relative w-full overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className="flex transition-transform duration-300 ease-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {children.map((child, index) => (
                        <div key={index} className="w-full shrink-0">
                            {child}
                        </div>
                    ))}
                </div>
            </div>
            <SliderDots
                total={children.length}
                current={currentSlide}
                onDotClick={goToSlide}
            />
        </div>
    );
}
