import { Template } from '@/types';
import { convertUnit } from '@/lib/conversion';
import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';

type FitMode = 'fit' | 'width' | 'actual';

const EditorCanvas = ({ template }: { template: Template }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [zoom, setZoom] = useState(100);
    const [fitMode, setFitMode] = useState<FitMode>('fit');

    const pixelWidth = convertUnit(template.width, template.unit, template.dpi);
    const pixelHeight = convertUnit(
        template.height,
        template.unit,
        template.dpi,
    );

    const calculateFitZoom = () => {
        if (!containerRef.current) return 100;
        const containerWidth = containerRef.current.clientWidth - 32; // Account for padding
        const containerHeight = containerRef.current.clientHeight - 32;
        const scaleX = containerWidth / pixelWidth;
        const scaleY = containerHeight / pixelHeight;
        return Math.min(scaleX, scaleY) * 100;
    };

    const calculateFitWidthZoom = () => {
        if (!containerRef.current) return 100;
        const containerWidth = containerRef.current.clientWidth - 32;
        return (containerWidth / pixelWidth) * 100;
    };

    const handleZoom = (newZoom: number) => {
        setZoom(newZoom);
        setFitMode('actual');
    };

    const handleFitMode = (mode: FitMode) => {
        setFitMode(mode);
        if (mode === 'fit') {
            setZoom(calculateFitZoom());
        } else if (mode === 'width') {
            setZoom(calculateFitWidthZoom());
        } else {
            setZoom(100);
        }
    };

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        const canvas = new fabric.Canvas(canvasRef.current, {
            width: pixelWidth,
            height: pixelHeight,
            backgroundColor: '#f5f5f5',
        });

        fabricCanvasRef.current = canvas;

        return () => {
            fabricCanvasRef.current?.dispose();
            fabricCanvasRef.current = null;
        };
    }, [pixelWidth, pixelHeight]);

    useEffect(() => {
        if (!fabricCanvasRef.current) return;

        const zoomLevel = zoom / 100;

        // Apply viewport transform to fabric canvas to keep interactions aligned
        fabricCanvasRef.current.setViewportTransform([
            zoomLevel,
            0,
            0,
            zoomLevel,
            0,
            0,
        ]);
    }, [zoom]);

    useEffect(() => {
        if (fitMode === 'fit') {
            setZoom(calculateFitZoom());
        } else if (fitMode === 'width') {
            setZoom(calculateFitWidthZoom());
        }
    }, [pixelWidth, pixelHeight, fitMode]);

    // Recalculate fit zoom when container resizes
    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver(() => {
            if (fitMode === 'fit') {
                setZoom(calculateFitZoom());
            } else if (fitMode === 'width') {
                setZoom(calculateFitWidthZoom());
            }
        });

        resizeObserver.observe(containerRef.current);

        // Trigger initial fit after container has dimensions
        setTimeout(() => {
            if (fitMode === 'fit') {
                setZoom(calculateFitZoom());
            } else if (fitMode === 'width') {
                setZoom(calculateFitWidthZoom());
            }
        }, 0);

        return () => resizeObserver.disconnect();
    }, [fitMode]);

    return (
        <div className="flex h-full w-full flex-col">
            {/* Zoom Toolbar */}
            <div className="flex items-center gap-2 border-b border-base-300 bg-base-100 p-2">
                <button
                    onClick={() => handleFitMode('fit')}
                    className={`btn btn-xs ${fitMode === 'fit' ? 'btn-active' : ''}`}
                    title="Fit to screen"
                >
                    Fit
                </button>
                <button
                    onClick={() => handleFitMode('width')}
                    className={`btn btn-xs ${fitMode === 'width' ? 'btn-active' : ''}`}
                    title="Fit to width"
                >
                    Fit Width
                </button>
                <button
                    onClick={() => handleFitMode('actual')}
                    className={`btn btn-xs ${fitMode === 'actual' ? 'btn-active' : ''}`}
                    title="Actual size (100%)"
                >
                    100%
                </button>
                <div className="divider mx-0 divider-horizontal" />
                <button
                    onClick={() => handleZoom(Math.max(10, zoom - 10))}
                    className="btn btn-xs"
                    title="Zoom out"
                >
                    -
                </button>
                <span className="min-w-15 text-center text-sm">
                    {Math.round(zoom)}%
                </span>
                <button
                    onClick={() => handleZoom(Math.min(500, zoom + 10))}
                    className="btn btn-xs"
                    title="Zoom in"
                >
                    +
                </button>
            </div>
            {/* Canvas Container */}
            <div
                ref={containerRef}
                className="flex-1 overflow-auto bg-gray-100 p-4"
            >
                <canvas
                    ref={canvasRef}
                    style={{
                        border: '1px solid #ccc',
                        width: `${pixelWidth * (zoom / 100)}px`,
                        height: `${pixelHeight * (zoom / 100)}px`,
                    }}
                />
            </div>
        </div>
    );
};

export default EditorCanvas;
