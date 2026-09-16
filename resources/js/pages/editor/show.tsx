import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import type { Template } from '@/types/template';
import EditorLayout from './layouts/EditorLayout';
import { convertUnit } from '@/lib/conversion';
import EditorCanvas from './components/EditorCanvas';

const EditorPage = ({ template }: { template: Template }) => {
    const widthInPixels = convertUnit(
        template.width,
        template.unit,
        template.dpi,
    );
    const heightInPixels = convertUnit(
        template.height,
        template.unit,
        template.dpi,
    );

    return (
        <AuthenticatedLayout className="p-0!">
            <EditorLayout template={template}>
                <EditorCanvas template={template} />
            </EditorLayout>
        </AuthenticatedLayout>
    );
};

export default EditorPage;
