import React, { useEffect, useRef } from 'react';
import * as fabric from 'fabric';

interface CanvasEditorProps {
    widthPx: number;
    heightPx: number;
    unit: 'px' | 'mm' | 'in';
}

const CanvasEditor: React.FC<CanvasEditorProps> = ({
    widthPx,
    heightPx,
    unit,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        // Unit conversion using 96 DPI
        let convertedWidth = widthPx;
        let convertedHeight = heightPx;

        if (unit !== 'px') {
            const dpi = 96;
            if (unit === 'in') {
                convertedWidth = widthPx * dpi;
                convertedHeight = heightPx * dpi;
            } else if (unit === 'mm') {
                convertedWidth = (widthPx * dpi) / 25.4;
                convertedHeight = (heightPx * dpi) / 25.4;
            }
        }

        const canvas = new fabric.Canvas(canvasRef.current, {
            width: convertedWidth,
            height: convertedHeight,
            backgroundColor: '#f5f5f5',
        });

        fabricCanvasRef.current = canvas;

        return () => {
            fabricCanvasRef.current?.dispose();
            fabricCanvasRef.current = null;
        };
    }, [widthPx, heightPx, unit]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                border: '1px solid #ccc',
                backgroundColor: '#ffffff',
            }}
        />
    );
};

export default CanvasEditor;
