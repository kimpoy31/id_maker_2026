import React from 'react';
import { router } from '@inertiajs/react';
import { logout } from '@/actions/App/Http/Controllers/AuthController';
import { Link, usePage } from '@inertiajs/react';

const AuthenticatedLayout = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const { auth } = usePage().props as any;
    const isAdmin = auth.user.role === 'admin';
    return (
        <>
            <div className="drawer lg:drawer-open">
                <input
                    id="my-drawer-3"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <div className="min-h-screen w-full">
                        <div className="navbar bg-base-100 shadow-xs">
                            <div className="flex-none lg:hidden">
                                <label
                                    htmlFor="my-drawer-3"
                                    className="btn btn-square btn-ghost"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="inline-block h-5 w-5 stroke-current"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                </label>
                            </div>
                            <div className="flex-1">
                                <a className="btn btn-ghost text-xl">Lanyard</a>
                            </div>
                            <div className="flex-none">
                                <LogoutModal className="btn-sm" />
                            </div>
                        </div>
                        <div className={`${className} p-6`}>{children}</div>
                    </div>
                </div>
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer-3"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu min-h-full w-64 bg-base-200 p-4">
                        <li>
                            <Link href="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link href="/templates">Templates</Link>
                        </li>
                        {isAdmin && (
                            <li>
                                <Link href="/users">Users</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </>
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
