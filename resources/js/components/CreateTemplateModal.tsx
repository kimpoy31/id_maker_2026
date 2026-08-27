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
                className={`btn ${className}`}
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
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Unit</span>
                            </label>
                            <select
                                name="unit"
                                className="select-bordered select w-full"
                                required
                            >
                                <option value="px">Pixels (px)</option>
                                <option value="in">Inches (in)</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Width</span>
                            </label>
                            <input
                                type="number"
                                name="width"
                                step="0.01"
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
                                className="input-bordered input w-full"
                                min="72"
                                max="600"
                                defaultValue="96"
                                required
                            />
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                <button type="button" className="btn">
                                    Cancel
                                </button>
                            </form>
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
