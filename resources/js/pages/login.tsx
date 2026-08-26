const login = () => {
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

                <div className="flex flex-col gap-2">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Username</legend>
                        <input
                            type="text"
                            className="input w-full"
                            placeholder="Enter your username"
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password</legend>
                        <input
                            type="password"
                            className="input w-full"
                            placeholder="Enter your password"
                        />
                    </fieldset>
                </div>

                <div className="mt-6">
                    <button className="btn btn-block btn-primary">
                        Sign-in
                    </button>
                </div>
            </div>
        </div>
    );
};

export default login;
