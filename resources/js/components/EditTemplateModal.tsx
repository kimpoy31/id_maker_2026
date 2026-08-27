import React from 'react';
import { router } from '@inertiajs/react';
import templates from '@/routes/templates';
import { SettingsIcon } from '../icons';

interface EditTemplateModalProps {
    template: {
        name: string;
        width: number;
        height: number;
        unit: string;
        dpi: number;
    };
}

const EditTemplateModal = ({ template }: EditTemplateModalProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        router.put(templates.update(template.name), formData, {
            onSuccess: () => {
                (
                    document.getElementById(
                        'edit_template_modal',
                    ) as HTMLDialogElement
                )?.close();
            },
        });
    };

    return (
        <>
            <button
                className="btn btn-ghost btn-sm"
                onClick={() =>
                    (
                        document.getElementById(
                            'edit_template_modal',
                        ) as HTMLDialogElement
                    )?.showModal()
                }
            >
                <SettingsIcon className="h-5 w-5" />
            </button>
            <dialog id="edit_template_modal" className="modal">
                <div className="modal-box max-w-md">
                    <h3 className="text-lg font-bold">Edit Template</h3>
                    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={template.name}
                                className="input-bordered input w-full"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Unit</span>
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={
                                        template.unit === 'px'
                                            ? 'Pixels (px)'
                                            : 'Inches (in)'
                                    }
                                    className="input-bordered input w-full bg-base-200"
                                    disabled
                                />
                                <input
                                    type="hidden"
                                    name="unit"
                                    value={template.unit}
                                />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Width</span>
                            </label>
                            <input
                                type="number"
                                name="width"
                                step="0.01"
                                defaultValue={template.width}
                                className="input-bordered input w-full"
                                min="0.01"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Height</span>
                            </label>
                            <input
                                type="number"
                                name="height"
                                step="0.01"
                                defaultValue={template.height}
                                className="input-bordered input w-full"
                                min="0.01"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">DPI</span>
                            </label>
                            <input
                                type="number"
                                name="dpi"
                                defaultValue={template.dpi}
                                className="input-bordered input w-full"
                                min="72"
                                max="600"
                                required
                            />
                        </div>
                        <div className="modal-action">
                            <button
                                type="button"
                                className="btn"
                                onClick={() =>
                                    (
                                        document.getElementById(
                                            'edit_template_modal',
                                        ) as HTMLDialogElement
                                    )?.close()
                                }
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
};

export default EditTemplateModal;
