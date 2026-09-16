import type { TemplateShare } from './template-share';

export type TemplateVisibility = 'private' | 'shared' | 'global';

export type Template = {
    id: number;
    creator_id: number;
    name: string;
    width: number;
    height: number;
    unit: 'in' | 'px';
    dpi: number;
    canvas_json: unknown | null;
    visibility: TemplateVisibility;
    created_at: string;
    updated_at: string;
};

export type TemplateWithRelations = Template & {
    creator: {
        id: number;
        name: string;
        username: string;
    };
    shares: TemplateShare[];
};

export type TemplateFormData = {
    name: string;
    width: number;
    height: number;
    unit: 'in' | 'px';
    dpi: number;
    canvas_json?: unknown;
    visibility?: TemplateVisibility;
};
