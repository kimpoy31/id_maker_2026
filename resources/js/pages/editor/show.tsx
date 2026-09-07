import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import type { Template } from '@/types/template';

const EditorPage = ({ template }: { template: Template }) => {
    return (
        <AuthenticatedLayout>
            <div className="mx-auto w-full max-w-4xl">
                <div>{template.name}</div>
            </div>
        </AuthenticatedLayout>
    );
};

export default EditorPage;
