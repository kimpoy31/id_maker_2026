import AuthenticatedLayout from '../../layouts/AuthenticatedLayout';
import CreateTemplateModal from '../../components/CreateTemplateModal';
import { PageProps } from '@inertiajs/core';
import templatesRoute from '@/routes/templates';

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

interface IndexProps extends PageProps {
    templates: Template[];
}

const index = ({ templates }: IndexProps) => {
    return (
        <AuthenticatedLayout>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Templates</h1>
                <CreateTemplateModal className="btn-sm" />
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Dimensions</th>
                            <th>DPI</th>
                            <th>Visibility</th>
                            <th>Created</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {templates.map((template) => (
                            <tr key={template.id}>
                                <td className="font-medium">{template.name}</td>
                                <td>
                                    {template.width} × {template.height}{' '}
                                    {template.unit}
                                </td>
                                <td>{template.dpi}</td>
                                <td>
                                    <span className="badge badge-outline">
                                        {template.visibility}
                                    </span>
                                </td>
                                <td>
                                    {new Date(
                                        template.created_at,
                                    ).toLocaleDateString()}
                                </td>
                                <td>
                                    <a
                                        href={`/templates/${template.name}`}
                                        className="btn btn-ghost btn-sm"
                                    >
                                        Edit
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {templates.length === 0 && (
                <div className="py-12 text-center text-base-content/50">
                    <p>No templates yet. Create your first template!</p>
                </div>
            )}
        </AuthenticatedLayout>
    );
};

export default index;
