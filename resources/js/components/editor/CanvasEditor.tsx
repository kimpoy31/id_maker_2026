import React, {
    useEffect,
    useRef,
    useImperativeHandle,
    forwardRef,
} from 'react';
import * as fabric from 'fabric';

interface CanvasEditorProps {
    widthPx: number;
    heightPx: number;
    unit: 'px' | 'mm' | 'in';
}

export interface CanvasEditorRef {
    addImage: (imageSrc: string) => void;
}

const CanvasEditor = forwardRef<CanvasEditorRef, CanvasEditorProps>(
    ({ widthPx, heightPx, unit }, ref) => {
        const canvasRef = useRef<HTMLCanvasElement>(null);
        const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

        const addImageToCanvas = (imageSrc: string) => {
            if (!fabricCanvasRef.current) return;

            fabric.Image.fromURL(imageSrc)
                .then((img) => {
                    if (!fabricCanvasRef.current) return;

                    // Scale image to fit within canvas if too large
                    const maxWidth = fabricCanvasRef.current.width * 0.8;
                    const maxHeight = fabricCanvasRef.current.height * 0.8;

                    if (img.width! > maxWidth || img.height! > maxHeight) {
                        const scale = Math.min(
                            maxWidth / img.width!,
                            maxHeight / img.height!,
                        );
                        img.scale(scale);
                    }

                    img.set({
                        left:
                            fabricCanvasRef.current.width / 2 -
                            (img.width! * img.scaleX!) / 2,
                        top:
                            fabricCanvasRef.current.height / 2 -
                            (img.height! * img.scaleY!) / 2,
                    });

                    fabricCanvasRef.current.add(img);
                    fabricCanvasRef.current.setActiveObject(img);
                    fabricCanvasRef.current.renderAll();
                })
                .catch((err) => {
                    console.error('Error loading image:', err);
                });
        };

        useImperativeHandle(ref, () => ({
            addImage: addImageToCanvas,
        }));

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
                viewportTransform: [1, 0, 0, 1, 0, 0],
            });

            // Add keyboard event listener for delete key
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Delete' || e.key === 'Backspace') {
                    const activeObject = canvas.getActiveObject();
                    if (activeObject) {
                        canvas.remove(activeObject);
                        canvas.discardActiveObject();
                        canvas.renderAll();
                    }
                }
            };

            window.addEventListener('keydown', handleKeyDown);

            fabricCanvasRef.current = canvas;

            return () => {
                window.removeEventListener('keydown', handleKeyDown);
                fabricCanvasRef.current?.dispose();
                fabricCanvasRef.current = null;
            };
        }, [widthPx, heightPx, unit]);

        const handleDragOver = (e: React.DragEvent) => {
            e.preventDefault();
        };

        const handleDrop = (e: React.DragEvent) => {
            e.preventDefault();
            const imageData = e.dataTransfer.getData('image');
            console.log('Drop received:', imageData);
            if (imageData) {
                addImageToCanvas(imageData);
            }
        };

        return (
            <canvas
                ref={canvasRef}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{
                    border: '1px solid #ccc',
                }}
            />
        );
    },
);

CanvasEditor.displayName = 'CanvasEditor';

export default CanvasEditor;
