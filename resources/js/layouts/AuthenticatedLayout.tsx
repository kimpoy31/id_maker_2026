import React from 'react';
import { router } from '@inertiajs/react';
import { logout } from '@/actions/App/Http/Controllers/AuthController';

const AuthenticatedLayout = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={`min-h-screen ${className}`}>
            <div className="navbar bg-base-100 shadow-xs">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Lanyard</a>
                </div>
                <div className="flex-none">
                    <LogoutModal className="btn-sm" />
                </div>
            </div>
            {children}
        </div>
    );
};

export default AuthenticatedLayout;

const LogoutModal = ({ className }: { className?: string }) => {
    const handleLogout = () => {
        router.post(logout().url);
        (document.getElementById('logout_modal') as HTMLDialogElement)?.close();
    };

    return (
        <>
            <button
                className={`btn ${className}`}
                onClick={() =>
                    (
                        document.getElementById(
                            'logout_modal',
                        ) as HTMLDialogElement
                    )?.showModal()
                }
            >
                Logout
            </button>
            <dialog id="logout_modal" className="modal">
                <div className="modal-box max-w-sm">
                    <h3 className="text-lg font-bold">Logout!</h3>
                    <p className="pt-4">Are you sure you want to logout?</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Cancel</button>
                        </form>
                        <button
                            onClick={handleLogout}
                            className="btn btn-error"
                        >
                            Logout
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
};
