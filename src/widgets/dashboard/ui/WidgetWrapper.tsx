import { useState, useRef } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { WidgetInstance } from '@entities/widget';
import { useDashboardStore } from '@shared/store/dashboard-store';
import { getWidgetConfig } from '@entities/widget';
import { RenderWidget } from '../lib/renderWidget';

interface WidgetWrapperProps {
    widget: WidgetInstance;
}

export function WidgetWrapper({ widget }: WidgetWrapperProps) {
    const bringToFront = useDashboardStore((state) => state.bringToFront);
    const updateWidget = useDashboardStore((state) => state.updateWidget);
    const isPanelOpen = useDashboardStore(
        (state) => state.widgetDetailSheetOpen
    );
    const selectWidget = useDashboardStore((state) => state.selectWidget);
    const selectedWidgetId = useDashboardStore(
        (state) => state.selectedWidgetId
    );

    const [isResizing, setIsResizing] = useState(false);
    const [tempSize, setTempSize] = useState(widget.size);
    const startSizeRef = useRef({ width: 0, height: 0 });
    const startPosRef = useRef({ x: 0, y: 0 });
    const currentSizeRef = useRef(widget.size);

    const config = getWidgetConfig(widget.type);

    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({
            id: widget.id,
            disabled: isPanelOpen || isResizing, // Disable drag when settings panel is open or resizing
        });

    const displaySize = isResizing ? tempSize : widget.size;

    // Clamp transform to respect canvas padding during drag
    const CANVAS_PADDING = 32;
    // Canvas content area (inside the padding)
    const canvasWidth = window.innerWidth - 48 - CANVAS_PADDING * 2;
    const canvasHeight = window.innerHeight - 48 - CANVAS_PADDING * 2;

    let clampedTransform = transform;
    if (transform && isDragging) {
        const newX = widget.position.x + transform.x;
        const newY = widget.position.y + transform.y;

        const maxX = canvasWidth - widget.size.width;
        const maxY = canvasHeight - widget.size.height;

        const clampedX = Math.max(0, Math.min(maxX, newX));
        const clampedY = Math.max(0, Math.min(maxY, newY));

        clampedTransform = {
            ...transform,
            x: clampedX - widget.position.x,
            y: clampedY - widget.position.y,
        };
    }

    const style: React.CSSProperties = {
        position: 'absolute',
        left: widget.position.x,
        top: widget.position.y,
        width: displaySize.width,
        height: displaySize.height,
        transform: CSS.Translate.toString(clampedTransform),
        zIndex: widget.zIndex,
        cursor: isDragging ? 'grabbing' : isResizing ? 'nwse-resize' : 'grab',
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        bringToFront(widget.id);

        // If settings panel is open, select this widget
        if (isPanelOpen) {
            selectWidget(widget.id);
        }
    };

    const handleResizeStart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        startSizeRef.current = {
            width: widget.size.width,
            height: widget.size.height,
        };
        startPosRef.current = { x: e.clientX, y: e.clientY };
        currentSizeRef.current = widget.size;

        const handleResizeMove = (e: MouseEvent) => {
            const deltaX = e.clientX - startPosRef.current.x;
            const deltaY = e.clientY - startPosRef.current.y;

            // Use the larger delta to maintain aspect ratio
            const avgDelta = (deltaX + deltaY) / 2;

            // Calculate new width
            let newWidth = startSizeRef.current.width + avgDelta;

            // Get min/max constraints
            const CANVAS_PADDING = 32;
            const canvasWidth = window.innerWidth - 48 - CANVAS_PADDING * 2;
            const minWidth = config.defaultSize.width;
            // Max width based on current position within content area
            const maxWidth = canvasWidth - widget.position.x;

            // Apply constraints
            newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));

            // Calculate height maintaining aspect ratio
            const newHeight = newWidth / config.aspectRatio;

            const newSize = { width: newWidth, height: newHeight };

            // Update both temporary size and ref for smooth visual feedback
            setTempSize(newSize);
            currentSizeRef.current = newSize;
        };

        const handleResizeEnd = () => {
            // Save final size from ref to store
            updateWidget(widget.id, {
                size: currentSizeRef.current,
            });
            setIsResizing(false);
            document.removeEventListener('mousemove', handleResizeMove);
            document.removeEventListener('mouseup', handleResizeEnd);
        };

        setIsResizing(true);
        document.addEventListener('mousemove', handleResizeMove);
        document.addEventListener('mouseup', handleResizeEnd);
    };

    const isSelected = isPanelOpen && selectedWidgetId === widget.id;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`rounded-xl overflow-visible shadow-lg hover:shadow-xl select-none ${
                isDragging
                    ? 'opacity-70 ring-4 ring-blue-500'
                    : isResizing
                    ? 'ring-4 ring-blue-500'
                    : isSelected
                    ? 'ring-4 ring-blue-500'
                    : 'transition-shadow'
            }`}
        >
            <div
                className="w-full h-full overflow-hidden rounded-xl relative"
                onClick={handleClick}
                {...listeners}
                {...attributes}
            >
                <RenderWidget widget={widget} />

                {/* Resize handle - triangle in bottom right corner */}
                {!isPanelOpen && (
                    <div
                        className="absolute bottom-0 right-0 cursor-nwse-resize z-10"
                        style={{
                            width: '24px',
                            height: '24px',
                        }}
                        onMouseDown={handleResizeStart}
                    >
                        <div
                            className="absolute bottom-0 right-0 w-0 h-0"
                            style={{
                                borderLeft: '20px solid transparent',
                                borderBottom: '20px solid #3b82f6',
                                borderBottomRightRadius: '0.75rem',
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
