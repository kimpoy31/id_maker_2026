import AuthenticatedLayout from '../../../layouts/AuthenticatedLayout';
import CanvasEditor from '../../../components/editor/CanvasEditor';
import { PageProps } from '@inertiajs/core';
import { useState } from 'react';
import { router } from '@inertiajs/react';

interface Template {
    id: number;
    name: string;
    width: number;
    height: number;
    unit: string;
    dpi: number;
    visibility: string;
    canvas_json: any;
    created_at: string;
}

interface EditProps extends PageProps {
    template: Template;
}

const Edit = ({ template }: EditProps) => {
    const [name, setName] = useState(template.name);
    const [images, setImages] = useState<string[]>([]);

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
                            >
                                <img
                                    src={image}
                                    alt={`Image ${index}`}
                                    className="h-24 w-full rounded border border-base-300 object-cover"
                                />
                                <button
                                    onClick={() =>
                                        setImages((prev) =>
                                            prev.filter((_, i) => i !== index),
                                        )
                                    }
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
                        widthPx={template.width}
                        heightPx={template.height}
                        unit={template.unit as 'px' | 'mm' | 'in'}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
