import AuthenticatedLayout from '../layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

const dashboard = () => {
    return (
        <AuthenticatedLayout>
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Dashboard</h1>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Link
                    href="/templates"
                    className="card cursor-pointer bg-base-100 shadow-sm transition-shadow hover:shadow-md"
                >
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Templates</h2>
                        <p className="text-base-content/70">
                            Manage your ID card templates
                        </p>
                    </div>
                </Link>
            </div>
        </AuthenticatedLayout>
    );
};

export default dashboard;
