import React from 'react';
import { router } from '@inertiajs/react';
import { SettingsIcon } from '../icons';

interface EditUserModalProps {
    user: {
        id: number;
        name: string;
        username: string;
        role: string;
    };
}

const EditUserModal = ({ user }: EditUserModalProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        router.put(`/users/${user.id}`, formData, {
            onSuccess: () => {
                (
                    document.getElementById(
                        `edit_user_modal_${user.id}`,
                    ) as HTMLDialogElement
                )?.close();
            },
        });
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(`/users/${user.id}`);
        }
    };

    return (
        <>
            <button
                className="btn btn-ghost btn-sm"
                onClick={() =>
                    (
                        document.getElementById(
                            `edit_user_modal_${user.id}`,
                        ) as HTMLDialogElement
                    )?.showModal()
                }
            >
                <SettingsIcon className="h-5 w-5" />
            </button>
            <dialog id={`edit_user_modal_${user.id}`} className="modal">
                <div className="modal-box max-w-md">
                    <h3 className="text-lg font-bold">Edit User</h3>
                    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={user.name}
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
                                defaultValue={user.username}
                                className="input-bordered input w-full"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">
                                    Password (leave empty to keep current)
                                </span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="input-bordered input w-full"
                                minLength={8}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Role</span>
                            </label>
                            <select
                                name="role"
                                defaultValue={user.role}
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
                                            `edit_user_modal_${user.id}`,
                                        ) as HTMLDialogElement
                                    )?.close()
                                }
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="btn btn-error"
                            >
                                Archive
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

export default EditUserModal;
