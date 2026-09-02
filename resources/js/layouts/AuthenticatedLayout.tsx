import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { logout } from '@/actions/App/Http/Controllers/AuthController';
import { dashboard, templates, users } from '@/routes';

const AuthenticatedLayout = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const isCurrentRoute = (route: string) => {
        const { url } = usePage();
        return url === route;
    };

    return (
        <div className={`min-h-screen ${className}`}>
            <div className="navbar justify-between bg-base-100 shadow-xs">
                <div>
                    <a className="btn btn-ghost text-xl">Lanyard</a>
                </div>
                <div className="flex gap-2">
                    <Link
                        href={dashboard()}
                        className={`btn btn-ghost btn-sm ${isCurrentRoute(dashboard().url) ? 'btn-active' : ''}`}
                        prefetch
                    >
                        Dashboard
                    </Link>
                    <Link
                        href={templates()}
                        className={`btn btn-ghost btn-sm ${isCurrentRoute(templates().url) ? 'btn-active' : ''}`}
                        prefetch
                    >
                        Templates
                    </Link>
                    <Link
                        href={users()}
                        className={`btn btn-ghost btn-sm ${isCurrentRoute('/users') ? 'btn-active' : ''}`}
                        prefetch
                    >
                        Users
                    </Link>
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
                    <p className="py-4">Are you sure you want to logout?</p>
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
