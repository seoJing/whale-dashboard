interface SliderDotsProps {
    total: number;
    current: number;
    onDotClick: (index: number) => void;
}

export function SliderDots({ total, current, onDotClick }: SliderDotsProps) {
    return (
        <div className="flex justify-center gap-2">
            {[...Array(total)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => onDotClick(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                        index === current
                            ? 'bg-gray-800 w-6'
                            : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>
    );
}
