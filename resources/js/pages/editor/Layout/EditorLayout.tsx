import React, { useState } from 'react';

const EditorLayout = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-[calc(100vh-64px)]">
            {/* Mobile sidebar toggle */}
            <button
                className="btn fixed top-20 left-4 z-50 lg:hidden"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? 'Close' : 'Menu'}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed z-40 h-full w-80 bg-base-200 transition-transform lg:relative ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} `}
            >
                <ul className="menu h-full p-4">
                    {/* Sidebar content here */}
                    <li>
                        <a>Sidebar Item 1</a>
                    </li>
                    <li>
                        <a>Sidebar Item 2</a>
                    </li>
                </ul>
            </aside>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main content */}
            <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
        </div>
    );
};

export default EditorLayout;
