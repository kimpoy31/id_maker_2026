import { useForm } from '@inertiajs/react';
import { login as loginAction } from '@/actions/App/Http/Controllers/AuthController';

const Login = () => {
    const form = useForm({
        username: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.submit(loginAction());
    };

    return (
        <div className="flex min-h-screen items-center justify-center gap-24">
            <div className="hover-3d shadow-2xl">
                {/* content */}
                <figure className="max-w-64">
                    <img
                        src="/images/new_office_id_template.png"
                        alt="3D card"
                    />
                </figure>
                {/* 8 empty divs needed for the 3D effect */}
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="w-full max-w-xs">
                <h2 className="text-3xl font-bold">Sign-in</h2>

                {form.errors.username && (
                    <div className="mt-4 alert alert-error">
                        <span>{form.errors.username}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Username</legend>
                        <input
                            type="text"
                            className="input w-full"
                            placeholder="Enter your username"
                            value={form.data.username}
                            onChange={(e) =>
                                form.setData('username', e.target.value)
                            }
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password</legend>
                        <input
                            type="password"
                            className="input w-full"
                            placeholder="Enter your password"
                            value={form.data.password}
                            onChange={(e) =>
                                form.setData('password', e.target.value)
                            }
                        />
                    </fieldset>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="btn btn-block btn-primary"
                            disabled={form.processing}
                        >
                            {form.processing ? 'Signing in...' : 'Sign-in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
