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
    unit: 'pixels' | 'inches';
}

export interface CanvasEditorRef {
    addImage: (imageSrc: string) => void;
    addText: (
        text: string,
        fontSize: number,
        id: string,
        bold: boolean,
        italic: boolean,
    ) => void;
    updateText: (id: string, newText: string) => void;
    selectObject: (id: string) => void;
    updateFontSize: (id: string, newSize: number) => void;
    updateBold: (id: string, bold: boolean) => void;
    updateItalic: (id: string, italic: boolean) => void;
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

        const addTextToCanvas = (
            text: string,
            fontSize: number,
            id: string,
            bold: boolean,
            italic: boolean,
        ) => {
            if (!fabricCanvasRef.current) return;

            const textObj = new fabric.Text(text, {
                left: fabricCanvasRef.current.width / 2,
                top: fabricCanvasRef.current.height / 2,
                originX: 'center',
                originY: 'center',
                fontSize: fontSize,
                fontFamily: 'Arial',
                fill: '#000000',
                fontWeight: bold ? 'bold' : 'normal',
                fontStyle: italic ? 'italic' : 'normal',
            });

            textObj.set('id', id);
            fabricCanvasRef.current.add(textObj);
            fabricCanvasRef.current.setActiveObject(textObj);
            fabricCanvasRef.current.renderAll();
        };

        const updateTextInCanvas = (id: string, newText: string) => {
            if (!fabricCanvasRef.current) return;

            const objects = fabricCanvasRef.current.getObjects();
            const textObj = objects.find(
                (obj) => obj.get('id') === id,
            ) as fabric.Text;

            if (textObj) {
                textObj.set('text', newText);
                fabricCanvasRef.current.renderAll();
            }
        };

        const selectObjectInCanvas = (id: string) => {
            if (!fabricCanvasRef.current) return;

            const objects = fabricCanvasRef.current.getObjects();
            const obj = objects.find((obj) => obj.get('id') === id);

            if (obj) {
                fabricCanvasRef.current.setActiveObject(obj);
                fabricCanvasRef.current.renderAll();
            }
        };

        const updateFontSizeInCanvas = (id: string, newSize: number) => {
            if (!fabricCanvasRef.current) return;

            const objects = fabricCanvasRef.current.getObjects();
            const textObj = objects.find(
                (obj) => obj.get('id') === id,
            ) as fabric.Text;

            if (textObj) {
                textObj.set('fontSize', newSize);
                fabricCanvasRef.current.renderAll();
            }
        };

        const updateBoldInCanvas = (id: string, bold: boolean) => {
            if (!fabricCanvasRef.current) return;

            const objects = fabricCanvasRef.current.getObjects();
            const textObj = objects.find(
                (obj) => obj.get('id') === id,
            ) as fabric.Text;

            if (textObj) {
                textObj.set('fontWeight', bold ? 'bold' : 'normal');
                fabricCanvasRef.current.renderAll();
            }
        };

        const updateItalicInCanvas = (id: string, italic: boolean) => {
            if (!fabricCanvasRef.current) return;

            const objects = fabricCanvasRef.current.getObjects();
            const textObj = objects.find(
                (obj) => obj.get('id') === id,
            ) as fabric.Text;

            if (textObj) {
                textObj.set('fontStyle', italic ? 'italic' : 'normal');
                fabricCanvasRef.current.renderAll();
            }
        };

        useImperativeHandle(ref, () => ({
            addImage: addImageToCanvas,
            addText: addTextToCanvas,
            updateText: updateTextInCanvas,
            selectObject: selectObjectInCanvas,
            updateFontSize: updateFontSizeInCanvas,
            updateBold: updateBoldInCanvas,
            updateItalic: updateItalicInCanvas,
        }));

        useEffect(() => {
            if (!canvasRef.current) {
                return;
            }

            // Unit conversion using 96 DPI
            let convertedWidth = widthPx;
            let convertedHeight = heightPx;

            if (unit !== 'pixels') {
                const dpi = 96;
                if (unit === 'inches') {
                    convertedWidth = widthPx * dpi;
                    convertedHeight = heightPx * dpi;
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
                        const id = activeObject.get('id');
                        canvas.remove(activeObject);
                        canvas.discardActiveObject();
                        canvas.renderAll();
                        // Emit event for parent to remove from state
                        if (id) {
                            window.dispatchEvent(
                                new CustomEvent('textDeleted', { detail: id }),
                            );
                        }
                    }
                }
            };

            // Add selection event listener
            const handleSelectionCreated = (e: any) => {
                const selected = e.selected[0];
                if (selected && selected.get('id')) {
                    // Emit custom event for parent component
                    window.dispatchEvent(
                        new CustomEvent('textSelected', {
                            detail: selected.get('id'),
                        }),
                    );
                }
            };

            const handleSelectionCleared = () => {
                window.dispatchEvent(
                    new CustomEvent('textSelected', { detail: null }),
                );
            };

            canvas.on('selection:created', handleSelectionCreated);
            canvas.on('selection:updated', handleSelectionCreated);
            canvas.on('selection:cleared', handleSelectionCleared);

            window.addEventListener('keydown', handleKeyDown);

            fabricCanvasRef.current = canvas;

            return () => {
                window.removeEventListener('keydown', handleKeyDown);
                canvas.off('selection:created', handleSelectionCreated);
                canvas.off('selection:updated', handleSelectionCreated);
                canvas.off('selection:cleared', handleSelectionCleared);
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
