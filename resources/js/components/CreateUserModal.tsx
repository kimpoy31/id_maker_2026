import React from 'react';
import { router } from '@inertiajs/react';

const CreateUserModal = ({ className }: { className?: string }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        router.post('/users', formData, {
            onSuccess: () => {
                (
                    document.getElementById(
                        'create_user_modal',
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
                            'create_user_modal',
                        ) as HTMLDialogElement
                    )?.showModal()
                }
            >
                Create User
            </button>
            <dialog id="create_user_modal" className="modal">
                <div className="modal-box max-w-md">
                    <h3 className="text-lg font-bold">Create User</h3>
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
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                name="username"
                                className="input-bordered input w-full"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="input-bordered input w-full"
                                minLength={8}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Role</span>
                            </label>
                            <select
                                name="role"
                                className="select-bordered select w-full"
                                required
                            >
                                <option value="user">User</option>
                                <option value="editor">Editor</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className="modal-action">
                            <button
                                type="button"
                                className="btn"
                                onClick={() =>
                                    (
                                        document.getElementById(
                                            'create_user_modal',
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

export default CreateUserModal;
