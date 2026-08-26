import AuthenticatedLayout from '../layouts/AuthenticatedLayout';

const dashboard = () => {
    return (
        <AuthenticatedLayout>
            <h1 className="text-3xl font-bold">Dashboard</h1>
        </AuthenticatedLayout>
    );
};

export default dashboard;
