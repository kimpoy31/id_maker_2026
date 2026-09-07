import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import type { Template } from '@/types/template';
import EditorLayout from './Layout/EditorLayout';

const EditorPage = ({ template }: { template: Template }) => {
    return (
        <AuthenticatedLayout className="p-0!">
            <EditorLayout>
                <div>{template.name}</div>
            </EditorLayout>
        </AuthenticatedLayout>
    );
};

export default EditorPage;
