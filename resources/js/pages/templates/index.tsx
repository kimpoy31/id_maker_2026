import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import TemplateForm from './components/TemplateForm';
import type { Template } from '@/types/template';
import { convertUnit } from '@/lib/conversion';
import { Link } from '@inertiajs/react';
import editor from '@/routes/editor';

const TemplatesPage = ({ templates }: { templates: Template[] }) => {
    return (
        <AuthenticatedLayout>
            <div className="mx-auto w-full max-w-4xl">
                <TemplateForm />
                <div className="mt-4 flex gap-4">
                    {templates.map((template) => (
                        <Link
                            className="card w-full max-w-xs bg-base-100 shadow-sm"
                            key={template.id}
                            href={editor.show(template.id)}
                        >
                            <div className="card-body">
                                <h2 className="card-title">{template.name}</h2>
                                <p>
                                    {template.unit === 'pixels'
                                        ? template.width
                                        : convertUnit(
                                              template.width,
                                              template.unit,
                                              template.dpi,
                                          )}{' '}
                                    x{' '}
                                    {convertUnit(
                                        template.height,
                                        template.unit,
                                        template.dpi,
                                    )}{' '}
                                    {template.unit}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default TemplatesPage;
