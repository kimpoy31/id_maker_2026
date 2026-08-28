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

    const handleSaveName = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('width', template.width.toString());
        formData.append('height', template.height.toString());
        formData.append('unit', template.unit);
        formData.append('dpi', template.dpi.toString());

        router.put(`/templates/${template.name}`, formData);
    };

    return (
        <AuthenticatedLayout>
            <div className="mb-6 flex items-center gap-4">
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

            <CanvasEditor
                widthPx={template.width}
                heightPx={template.height}
                unit={template.unit as 'px' | 'mm' | 'in'}
            />
        </AuthenticatedLayout>
    );
};

export default Edit;
