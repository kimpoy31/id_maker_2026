import { dashboard } from '@/routes';
import AuthenticatedLayout from '../../layouts/AuthenticatedLayout';
import { PageProps } from '@inertiajs/core';
import { Link } from '@inertiajs/react';
import EditTemplateModal from '../../components/EditTemplateModal';

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

interface ShowProps extends PageProps {
    template: Template;
}

const show = ({ template }: ShowProps) => {
    return (
        <AuthenticatedLayout>
            <div className="mb-6">
                <Link href={dashboard()} className="btn btn-ghost btn-sm">
                    ← Back to Dashboard
                </Link>
            </div>

            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-3xl font-bold">{template.name}</h1>
                <EditTemplateModal template={template} />
            </div>

            <div className="card bg-base-100 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title">Template Details</h2>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-base-content/70">
                                Width
                            </p>
                            <p className="text-lg font-semibold">
                                {template.width} {template.unit}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-base-content/70">
                                Height
                            </p>
                            <p className="text-lg font-semibold">
                                {template.height} {template.unit}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-base-content/70">DPI</p>
                            <p className="text-lg font-semibold">
                                {template.dpi}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-base-content/70">
                                Visibility
                            </p>
                            <p className="text-lg font-semibold">
                                {template.visibility}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default show;
