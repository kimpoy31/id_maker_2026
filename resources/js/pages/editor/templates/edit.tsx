import AuthenticatedLayout from '../../../layouts/AuthenticatedLayout';
import CanvasEditor, {
    CanvasEditorRef,
} from '../../../components/editor/CanvasEditor';
import { PageProps } from '@inertiajs/core';
import { useState, useRef, useEffect } from 'react';
import { router } from '@inertiajs/react';
import type { Template } from '@/types/template';

interface TextObject {
    id: string;
    text: string;
    fontSize: number;
    bold: boolean;
    italic: boolean;
}

interface EditProps extends PageProps {
    template: Template;
}

const Edit = ({ template }: EditProps) => {
    const [name, setName] = useState(template.name);
    const [images, setImages] = useState<string[]>([]);
    const [texts, setTexts] = useState<TextObject[]>([]);
    const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
    const canvasRef = useRef<CanvasEditorRef>(null);

    const handleSaveName = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('width', template.width.toString());
        formData.append('height', template.height.toString());
        formData.append('unit', template.unit);
        formData.append('dpi', template.dpi.toString());

        router.put(`/templates/${template.id}`, formData);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            Array.from(files).forEach((file) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (event.target?.result) {
                        setImages((prev) => [
                            ...prev,
                            event.target!.result as string,
                        ]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files) {
            Array.from(files).forEach((file) => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        if (event.target?.result) {
                            setImages((prev) => [
                                ...prev,
                                event.target!.result as string,
                            ]);
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleImageDragStart = (e: React.DragEvent, imageSrc: string) => {
        e.dataTransfer.setData('image', imageSrc);
    };

    const handleImageClick = (imageSrc: string) => {
        canvasRef.current?.addImage(imageSrc);
    };

    const handleAddText = () => {
        const newText: TextObject = {
            id: `text${texts.length + 1}`,
            text: `text${texts.length + 1}`,
            fontSize: 24,
            bold: false,
            italic: false,
        };
        setTexts([...texts, newText]);
        canvasRef.current?.addText(
            newText.text,
            newText.fontSize,
            newText.id,
            newText.bold,
            newText.italic,
        );
    };

    const handleTextChange = (id: string, newText: string) => {
        setTexts(texts.map((t) => (t.id === id ? { ...t, text: newText } : t)));
        canvasRef.current?.updateText(id, newText);
    };

    const handleTextClick = (id: string) => {
        setSelectedTextId(id);
        canvasRef.current?.selectObject(id);
    };

    const handleFontSizeChange = (id: string, delta: number) => {
        setTexts(
            texts.map((t) => {
                if (t.id === id) {
                    const newSize = Math.max(8, t.fontSize + delta);
                    canvasRef.current?.updateFontSize(id, newSize);
                    return { ...t, fontSize: newSize };
                }
                return t;
            }),
        );
    };

    const handleBoldToggle = (id: string) => {
        setTexts(
            texts.map((t) => {
                if (t.id === id) {
                    const newBold = !t.bold;
                    canvasRef.current?.updateBold(id, newBold);
                    return { ...t, bold: newBold };
                }
                return t;
            }),
        );
    };

    const handleItalicToggle = (id: string) => {
        setTexts(
            texts.map((t) => {
                if (t.id === id) {
                    const newItalic = !t.italic;
                    canvasRef.current?.updateItalic(id, newItalic);
                    return { ...t, italic: newItalic };
                }
                return t;
            }),
        );
    };

    useEffect(() => {
        const handleTextSelected = (e: CustomEvent) => {
            setSelectedTextId(e.detail);
        };

        const handleTextDeleted = (e: CustomEvent) => {
            setTexts((prev) => prev.filter((t) => t.id !== e.detail));
            if (selectedTextId === e.detail) {
                setSelectedTextId(null);
            }
        };

        window.addEventListener(
            'textSelected',
            handleTextSelected as EventListener,
        );
        window.addEventListener(
            'textDeleted',
            handleTextDeleted as EventListener,
        );

        return () => {
            window.removeEventListener(
                'textSelected',
                handleTextSelected as EventListener,
            );
            window.removeEventListener(
                'textDeleted',
                handleTextDeleted as EventListener,
            );
        };
    }, [selectedTextId]);

    return (
        <AuthenticatedLayout className="p-0!">
            <div className="flex items-center gap-4 p-6">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-bordered input w-full max-w-md input-lg"
                />
                <button onClick={handleSaveName} className="btn btn-primary">
                    Save Name
                </button>
            </div>

            <div className="flex h-full">
                <div className="w-64 border-r border-base-300 bg-base-300 p-4">
                    <button
                        onClick={handleAddText}
                        className="btn mb-4 w-full btn-primary"
                    >
                        Add Text
                    </button>

                    {texts.length > 0 && (
                        <div className="mb-4 space-y-2">
                            <h2 className="text-lg font-bold">Text layers</h2>
                            {texts.map((textObj) => (
                                <div
                                    key={textObj.id}
                                    className={`rounded border p-2 ${selectedTextId === textObj.id ? 'border-primary bg-primary/10' : 'border-base-300'}`}
                                    onClick={() => handleTextClick(textObj.id)}
                                >
                                    <input
                                        type="text"
                                        value={textObj.text}
                                        onChange={(e) =>
                                            handleTextChange(
                                                textObj.id,
                                                e.target.value,
                                            )
                                        }
                                        onClick={(e) => e.stopPropagation()}
                                        className="input-bordered input mb-2 w-full input-sm"
                                    />
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleFontSizeChange(
                                                    textObj.id,
                                                    -2,
                                                );
                                            }}
                                            className="btn btn-xs"
                                        >
                                            -
                                        </button>
                                        <span className="text-sm">
                                            {textObj.fontSize}px
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleFontSizeChange(
                                                    textObj.id,
                                                    2,
                                                );
                                            }}
                                            className="btn btn-xs"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="mt-2 flex items-center gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleBoldToggle(textObj.id);
                                            }}
                                            className={`btn btn-xs ${textObj.bold ? 'btn-primary' : ''}`}
                                        >
                                            Bold
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleItalicToggle(textObj.id);
                                            }}
                                            className={`btn btn-xs ${textObj.italic ? 'btn-primary' : ''}`}
                                        >
                                            Italic
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <h2 className="mb-4 text-lg font-bold">Images</h2>

                    <div
                        className="mb-4 cursor-pointer rounded-lg border-2 border-dashed border-base-300 p-4 text-center transition-colors hover:border-primary"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                        />
                        <label
                            htmlFor="image-upload"
                            className="cursor-pointer"
                        >
                            <div className="text-sm text-base-content/70">
                                Click or drag images here
                            </div>
                        </label>
                    </div>

                    <div className="space-y-2">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="group relative cursor-move"
                                draggable
                                onDragStart={(e) =>
                                    handleImageDragStart(e, image)
                                }
                                onClick={() => handleImageClick(image)}
                            >
                                <img
                                    src={image}
                                    alt={`Image ${index}`}
                                    className="h-24 w-full rounded border border-base-300 object-cover"
                                />
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setImages((prev) =>
                                            prev.filter((_, i) => i !== index),
                                        );
                                    }}
                                    className="btn absolute top-1 right-1 opacity-0 transition-opacity btn-error btn-xs group-hover:opacity-100"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex w-full flex-1 items-center justify-center bg-base-200 p-6">
                    <CanvasEditor
                        ref={canvasRef}
                        widthPx={template.width}
                        heightPx={template.height}
                        unit={template.unit}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
