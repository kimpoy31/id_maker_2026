import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import type { Template } from '@/types/template';
import EditorLayout from './layouts/EditorLayout';

const EditorPage = ({ template }: { template: Template }) => {
    return (
        <AuthenticatedLayout className="p-0!">
            <EditorLayout template={template}>
                <div className="flex h-full items-center justify-center">
                    <p className="text-base-content/50">
                        Canvas editor will be rendered here
                    </p>
                </div>
            </EditorLayout>
        </AuthenticatedLayout>
    );
};

export default EditorPage;
