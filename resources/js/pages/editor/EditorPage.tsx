import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import type { Template } from '@/types/template';
import EditorLayout from './layouts/EditorLayout';
import EditorCanvas from './components/EditorCanvas';

const EditorPage = ({ template }: { template: Template }) => {
    return (
        <AuthenticatedLayout className="p-0!">
            <EditorLayout template={template}>
                <EditorCanvas template={template} />
            </EditorLayout>
        </AuthenticatedLayout>
    );
};

export default EditorPage;
