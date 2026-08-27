import AuthenticatedLayout from '../layouts/AuthenticatedLayout';
import CreateTemplateModal from '../components/CreateTemplateModal';

const dashboard = () => {
    return (
        <AuthenticatedLayout>
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <CreateTemplateModal />
            </div>
        </AuthenticatedLayout>
    );
};

export default dashboard;
