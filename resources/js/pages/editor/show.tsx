import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import type { Template } from '@/types/template';
import EditorLayout from './layouts/EditorLayout';
import CanvasEditor from '@/components/editor/CanvasEditor';
import { useRef } from 'react';
import { router } from '@inertiajs/react';

const EditorPage = ({ template }: { template: Template }) => {
    const canvasRef = useRef<any>(null);

    const handleSave = (canvasJson: unknown) => {
        router.put(`/templates/${template.id}`, {
            canvas_json: JSON.stringify(canvasJson),
        });
    };

    const pixelWidth =
        template.unit === 'in' ? template.width * template.dpi : template.width;
    const pixelHeight =
        template.unit === 'in'
            ? template.height * template.dpi
            : template.height;

    return (
        <AuthenticatedLayout className="p-0!">
            <EditorLayout template={template}>
                <div className="flex h-full flex-col">
                    <div className="border-b p-4">
                        <button
                            onClick={() => canvasRef.current?.save()}
                            className="btn btn-primary btn-sm"
                        >
                            Save
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center bg-base-200 p-6">
                        <CanvasEditor
                            ref={canvasRef}
                            widthPx={pixelWidth}
                            heightPx={pixelHeight}
                            unit={template.unit}
                            canvasJson={template.canvas_json}
                            onSave={handleSave}
                            imageUploadUrl="/upload"
                        />
                    </div>
                </div>
            </EditorLayout>
        </AuthenticatedLayout>
    );
};

export default EditorPage;
