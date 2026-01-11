import { useState, useEffect } from 'react';
import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent, DragMoveEvent } from '@dnd-kit/core';
import { useDashboardStore } from '@shared/store/dashboard-store';
import { WidgetWrapper } from './WidgetWrapper';

const CANVAS_PADDING = 32; // Padding in pixels

export function DashboardCanvas() {
    const allWidgets = useDashboardStore((state) => state.widgets);
    const widgets = allWidgets.filter((w) => w.visible);
    const updateWidget = useDashboardStore((state) => state.updateWidget);
    const isPanelOpen = useDashboardStore(
        (state) => state.widgetDetailSheetOpen
    );

    const [boundaryTouched, setBoundaryTouched] = useState({
        top: false,
        right: false,
        bottom: false,
        left: false,
    });

    // Ensure all widgets are within bounds on mount
    useEffect(() => {
        // Canvas content area (inside the padding)
        const canvasWidth = window.innerWidth - 48 - CANVAS_PADDING * 2;
        const canvasHeight = window.innerHeight - 48 - CANVAS_PADDING * 2;

        widgets.forEach((widget) => {
            const maxX = Math.max(0, canvasWidth - widget.size.width);
            const maxY = Math.max(0, canvasHeight - widget.size.height);

            const clampedX = Math.max(0, Math.min(maxX, widget.position.x));
            const clampedY = Math.max(0, Math.min(maxY, widget.position.y));

            if (
                clampedX !== widget.position.x ||
                clampedY !== widget.position.y
            ) {
                updateWidget(widget.id, {
                    position: { x: clampedX, y: clampedY },
                });
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Run once on mount

    // Configure sensors for drag detection - disabled when settings panel is open
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: isPanelOpen
                ? { distance: 999999 } // Effectively disable when panel is open
                : {
                      distance: 8, // 8px movement required to start drag
                      delay: 50, // 50ms delay to distinguish from click
                      tolerance: 5,
                  },
        })
    );

    const handleDragMove = (event: DragMoveEvent) => {
        const { active, delta } = event;
        const widgetId = active.id as string;
        const widget = widgets.find((w) => w.id === widgetId);

        if (widget) {
            const scale = isPanelOpen ? 0.55 : 1;
            const actualDelta = {
                x: delta.x / scale,
                y: delta.y / scale,
            };

            // Canvas content area (inside the padding)
            const canvasWidth = window.innerWidth - 48 - CANVAS_PADDING * 2;
            const canvasHeight = window.innerHeight - 48 - CANVAS_PADDING * 2;

            const newX = widget.position.x + actualDelta.x;
            const newY = widget.position.y + actualDelta.y;

            const THRESHOLD = 5; // Threshold from content area edge

            // Check which boundaries are touched
            setBoundaryTouched({
                left: newX <= THRESHOLD,
                top: newY <= THRESHOLD,
                right: newX + widget.size.width >= canvasWidth - THRESHOLD,
                bottom: newY + widget.size.height >= canvasHeight - THRESHOLD,
            });
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, delta } = event;
        const widgetId = active.id as string;
        const widget = widgets.find((w) => w.id === widgetId);

        // Reset boundary feedback
        setBoundaryTouched({
            top: false,
            right: false,
            bottom: false,
            left: false,
        });

        if (widget) {
            // Canvas is always 100vw x 100vh, but scaled down when panel is open
            // We need to account for the scale transformation
            const scale = isPanelOpen ? 0.55 : 1;
            const actualDelta = {
                x: delta.x / scale,
                y: delta.y / scale,
            };

            // Canvas content area (inside the padding)
            const canvasWidth = window.innerWidth - 48 - CANVAS_PADDING * 2;
            const canvasHeight = window.innerHeight - 48 - CANVAS_PADDING * 2;

            const maxX = canvasWidth - widget.size.width;
            const maxY = canvasHeight - widget.size.height;

            const newX = Math.max(
                0,
                Math.min(maxX, widget.position.x + actualDelta.x)
            );
            const newY = Math.max(
                0,
                Math.min(maxY, widget.position.y + actualDelta.y)
            );

            updateWidget(widgetId, {
                position: { x: newX, y: newY },
            });
        }
    };

    return (
        <DndContext
            sensors={sensors}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
        >
            <div
                className="relative w-full h-full bg-linear-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden"
                style={{ padding: `${CANVAS_PADDING}px` }}
            >
                {/* Boundary walls with shadow feedback */}
                {boundaryTouched.top && (
                    <>
                        <div
                            className="absolute pointer-events-none z-50"
                            style={{
                                top: `${CANVAS_PADDING}px`,
                                left: `${CANVAS_PADDING}px`,
                                right: `${CANVAS_PADDING}px`,
                                height: '0',
                                borderTop: '2px solid rgba(107, 114, 128, 0.7)',
                            }}
                        />
                        <div
                            className="absolute pointer-events-none z-49"
                            style={{
                                top: `${CANVAS_PADDING - 16}px`,
                                left: `${CANVAS_PADDING}px`,
                                right: `${CANVAS_PADDING}px`,
                                height: '16px',
                                background:
                                    'linear-gradient(to top, transparent, rgba(107, 114, 128, 0.4))',
                                filter: 'blur(6px)',
                            }}
                        />
                    </>
                )}
                {boundaryTouched.bottom && (
                    <>
                        <div
                            className="absolute pointer-events-none z-50"
                            style={{
                                bottom: `${CANVAS_PADDING}px`,
                                left: `${CANVAS_PADDING}px`,
                                right: `${CANVAS_PADDING}px`,
                                height: '0',
                                borderBottom:
                                    '2px solid rgba(107, 114, 128, 0.7)',
                            }}
                        />
                        <div
                            className="absolute pointer-events-none z-49"
                            style={{
                                bottom: `${CANVAS_PADDING - 16}px`,
                                left: `${CANVAS_PADDING}px`,
                                right: `${CANVAS_PADDING}px`,
                                height: '16px',
                                background:
                                    'linear-gradient(to bottom, transparent, rgba(107, 114, 128, 0.4))',
                                filter: 'blur(6px)',
                            }}
                        />
                    </>
                )}
                {boundaryTouched.left && (
                    <>
                        <div
                            className="absolute pointer-events-none z-50"
                            style={{
                                left: `${CANVAS_PADDING}px`,
                                top: `${CANVAS_PADDING}px`,
                                bottom: `${CANVAS_PADDING}px`,
                                width: '0',
                                borderLeft:
                                    '2px solid rgba(107, 114, 128, 0.7)',
                            }}
                        />
                        <div
                            className="absolute pointer-events-none z-49"
                            style={{
                                left: `${CANVAS_PADDING - 16}px`,
                                top: `${CANVAS_PADDING}px`,
                                bottom: `${CANVAS_PADDING}px`,
                                width: '16px',
                                background:
                                    'linear-gradient(to left, transparent, rgba(107, 114, 128, 0.4))',
                                filter: 'blur(6px)',
                            }}
                        />
                    </>
                )}
                {boundaryTouched.right && (
                    <>
                        <div
                            className="absolute pointer-events-none z-50"
                            style={{
                                right: `${CANVAS_PADDING}px`,
                                top: `${CANVAS_PADDING}px`,
                                bottom: `${CANVAS_PADDING}px`,
                                width: '0',
                                borderRight:
                                    '2px solid rgba(107, 114, 128, 0.7)',
                            }}
                        />
                        <div
                            className="absolute pointer-events-none z-49"
                            style={{
                                right: `${CANVAS_PADDING - 16}px`,
                                top: `${CANVAS_PADDING}px`,
                                bottom: `${CANVAS_PADDING}px`,
                                width: '16px',
                                background:
                                    'linear-gradient(to right, transparent, rgba(107, 114, 128, 0.4))',
                                filter: 'blur(6px)',
                            }}
                        />
                    </>
                )}

                {widgets.length === 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                        <p className="text-lg font-medium">No widgets yet</p>
                        <p className="text-sm">
                            Click the + button to add a widget
                        </p>
                    </div>
                )}
                {widgets.map((widget) => (
                    <WidgetWrapper key={widget.id} widget={widget} />
                ))}
            </div>
        </DndContext>
    );
}
