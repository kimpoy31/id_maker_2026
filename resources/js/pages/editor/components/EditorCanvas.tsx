import { Template } from '@/types';
import { convertUnit } from '@/lib/conversion';
import React, { useEffect, useRef } from 'react';
import * as fabric from 'fabric';

const EditorCanvas = ({ template }: { template: Template }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

    const pixelWidth = convertUnit(template.width, template.unit, template.dpi);
    const pixelHeight = convertUnit(
        template.height,
        template.unit,
        template.dpi,
    );

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

    return (
        <div className="h-full w-full min-w-0 overflow-auto">
            <canvas
                ref={canvasRef}
                style={{
                    border: '1px solid #ccc',
                }}
            />
        </div>
    );
};

export default EditorCanvas;
