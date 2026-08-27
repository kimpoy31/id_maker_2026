import templatesRoute from '@/routes/templates';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout';
import CreateTemplateModal from '../components/CreateTemplateModal';
import { PageProps } from '@inertiajs/core';

interface Template {
    id: number;
    name: string;
    width: number;
    height: number;
    unit: string;
    dpi: number;
    visibility: string;
    created_at: string;
}

interface DashboardProps extends PageProps {
    templates: Template[];
}

const dashboard = ({ templates }: DashboardProps) => {
    return (
        <AuthenticatedLayout className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <CreateTemplateModal />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {templates.map((template) => (
                    <a
                        key={template.id}
                        href={templatesRoute.show(template.name).url}
                        className="card cursor-pointer bg-base-100 shadow-sm transition-shadow hover:shadow-md"
                    >
                        <div className="card-body">
                            <h2 className="card-title">{template.name}</h2>
                            <p className="text-sm text-base-content/70">
                                {template.width} × {template.height}{' '}
                                {template.unit}
                            </p>
                            <p className="text-sm text-base-content/70">
                                {template.dpi} DPI
                            </p>
                            <div className="card-actions justify-end">
                                <span className="badge badge-outline">
                                    {template.visibility}
                                </span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            {templates.length === 0 && (
                <div className="py-12 text-center text-base-content/50">
                    <p>No templates yet. Create your first template!</p>
                </div>
            )}
        </AuthenticatedLayout>
    );
};

export default dashboard;
