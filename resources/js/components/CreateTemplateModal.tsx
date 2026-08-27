import React from 'react';
import { router } from '@inertiajs/react';
import templates from '@/routes/templates';

const CreateTemplateModal = ({ className }: { className?: string }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        router.post(templates.store(), formData, {
            onSuccess: () => {
                (
                    document.getElementById(
                        'create_template_modal',
                    ) as HTMLDialogElement
                )?.close();
                (e.target as HTMLFormElement).reset();
            },
        });
    };

    return (
        <>
            <button
                className={`btn ${className} btn-primary`}
                onClick={() =>
                    (
                        document.getElementById(
                            'create_template_modal',
                        ) as HTMLDialogElement
                    )?.showModal()
                }
            >
                Create Template
            </button>
            <dialog id="create_template_modal" className="modal">
                <div className="modal-box max-w-md">
                    <h3 className="text-lg font-bold">Create Template</h3>
                    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="input-bordered input w-full"
                                required
                            />
                        </div>
                        <input type="hidden" name="width" value="1010" />
                        <input type="hidden" name="height" value="639" />
                        <input type="hidden" name="unit" value="px" />
                        <input type="hidden" name="dpi" value="300" />
                        <div className="modal-action">
                            <button
                                type="button"
                                className="btn"
                                onClick={() =>
                                    (
                                        document.getElementById(
                                            'create_template_modal',
                                        ) as HTMLDialogElement
                                    )?.close()
                                }
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Create
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

export default CreateTemplateModal;
