import { useState, useEffect, useCallback } from 'react';

interface ResizeHandleProps {
    onResize: (deltaX: number, deltaY: number) => void;
    onResizeEnd: () => void;
}

export function ResizeHandle({ onResize, onResizeEnd }: ResizeHandleProps) {
    const [isResizing, setIsResizing] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setIsResizing(true);
        setStartPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!isResizing) return;

            const deltaX = e.clientX - startPos.x;
            const deltaY = e.clientY - startPos.y;

            onResize(deltaX, deltaY);
            setStartPos({ x: e.clientX, y: e.clientY });
        },
        [isResizing, startPos, onResize]
    );

    const handleMouseUp = useCallback(() => {
        if (isResizing) {
            setIsResizing(false);
            onResizeEnd();
        }
    }, [isResizing, onResizeEnd]);

    useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isResizing, handleMouseMove, handleMouseUp]);

    return (
        <div
            className={`absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-10 ${
                isResizing ? 'bg-blue-500' : 'bg-gray-400 hover:bg-blue-400'
            } rounded-tl-full transition-colors`}
            onMouseDown={handleMouseDown}
            style={{
                transform: 'translate(50%, 50%)',
            }}
        />
    );
}
