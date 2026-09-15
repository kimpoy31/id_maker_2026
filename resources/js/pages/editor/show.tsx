import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import type { Template } from '@/types/template';
import EditorLayout from './layouts/EditorLayout';
import { convertUnit } from '@/lib/conversion';

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
                {/* <h1>Template: {template.name}</h1>
                <h2>unit: {template.unit} </h2>
                <div>Width: {widthInPixels} pixels</div>
                <div>Height: {heightInPixels} pixels</div> */}
                <h1></h1>
            </EditorLayout>
        </AuthenticatedLayout>
    );
};

export default EditorPage;
