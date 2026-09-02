import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import TemplateForm from './components/TemplateForm';

const TemplatesPage = () => {
    return (
        <AuthenticatedLayout>
            <TemplateForm />
        </AuthenticatedLayout>
    );
};

export default TemplatesPage;
