import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import type { Template } from '@/types/template';
import EditorLayout from './layouts/EditorLayout';

const EditorPage = ({ template }: { template: Template }) => {
    console.log(template);

    return (
        <AuthenticatedLayout className="p-0!">
            <EditorLayout>
                <div>{template.name}</div>
            </EditorLayout>
        </AuthenticatedLayout>
    );
};

export default EditorPage;
