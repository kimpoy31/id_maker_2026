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
                        <input
                            type="hidden"
                            name="width"
                            value={template.width}
                        />
                        <input
                            type="hidden"
                            name="height"
                            value={template.height}
                        />
                        <input
                            type="hidden"
                            name="unit"
                            value={template.unit}
                        />
                        <input type="hidden" name="dpi" value={template.dpi} />
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
