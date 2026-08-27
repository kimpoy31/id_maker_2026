import AuthenticatedLayout from '../../layouts/AuthenticatedLayout';
import CreateUserModal from '../../components/CreateUserModal';
import EditUserModal from '../../components/EditUserModal';
import { PageProps } from '@inertiajs/core';

interface User {
    id: number;
    name: string;
    username: string;
    role: string;
    created_at: string;
}

interface IndexProps extends PageProps {
    users: User[];
    auth: {
        user: {
            role: string;
        };
    };
}

const index = ({ users, auth }: IndexProps) => {
    const isAdmin = auth.user.role === 'admin';

    if (!isAdmin) {
        return (
            <AuthenticatedLayout>
                <div className="py-12 text-center text-base-content/50">
                    <p>Access denied. Admin only.</p>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Users</h1>
                <CreateUserModal />
            </div>
            
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="font-medium">{user.name}</td>
                                <td>{user.username}</td>
                                <td>
                                    <span className={`badge ${user.role === 'admin' ? 'badge-primary' : user.role === 'editor' ? 'badge-secondary' : 'badge-neutral'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td>
                                    {new Date(user.created_at).toLocaleDateString()}
                                </td>
                                <td>
                                    <EditUserModal user={user} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {users.length === 0 && (
                <div className="py-12 text-center text-base-content/50">
                    <p>No users yet.</p>
                </div>
            )}
        </AuthenticatedLayout>
    );
};

export default index;
