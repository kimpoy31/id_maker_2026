import templates from '@/routes/templates';
import { useForm } from '@inertiajs/react';

interface TemplateFormData {
    name: string;
    width: string;
    height: string;
    dpi: string;
    unit: 'in' | 'px';
}

// Allows digits and at most one decimal point (e.g. "8.5", "12", "")
const sanitizeDecimal = (value: string): string => {
    let cleaned = value.replace(/[^0-9.]/g, '');
    const firstDot = cleaned.indexOf('.');
    if (firstDot !== -1) {
        cleaned =
            cleaned.slice(0, firstDot + 1) +
            cleaned.slice(firstDot + 1).replace(/\./g, '');
    }
    return cleaned;
};

// Allows digits only, no decimal point (e.g. "300")
const sanitizeInteger = (value: string): string => {
    return value.replace(/[^0-9]/g, '');
};

const TemplateForm = ({ className }: { className?: string }) => {
    const { data, setData, post, reset, errors, processing } =
        useForm<TemplateFormData>({
            name: '',
            width: '',
            height: '',
            dpi: '',
            unit: 'in',
        });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(templates.store().url, {
            onSuccess: () => {
                reset();
                triggerModal(false);
            },
            onError: (errors) => {
                console.error('Template creation failed:', errors);
            },
        });
    };

    const triggerModal = (isOpen: boolean) => {
        const modal = document.getElementById(
            'create_template_modal',
        ) as HTMLDialogElement;

        if (modal) {
            if (isOpen) {
                modal.showModal();
            } else {
                modal.close();
            }
        }
    };

    return (
        <>
            <button
                className={`btn btn-primary btn-sm ${className}`}
                onClick={() => {
                    const modal = document.getElementById(
                        'create_template_modal',
                    ) as HTMLDialogElement;
                    if (modal) {
                        modal.showModal();
                    }
                }}
            >
                Create Template
            </button>
            <dialog id="create_template_modal" className="modal">
                <div className="modal-box max-w-sm">
                    <h3 className="mb-4 text-lg font-bold">Template Form</h3>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Name</legend>
                        <input
                            type="text"
                            className={`input w-full ${errors.name ? 'input-error' : ''}`}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-error">
                                {errors.name}
                            </p>
                        )}
                    </fieldset>
                    <div className="flex gap-4">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Width</legend>
                            <input
                                type="text"
                                inputMode="decimal"
                                className={`input ${errors.width ? 'input-error' : ''}`}
                                value={data.width}
                                onChange={(e) =>
                                    setData(
                                        'width',
                                        sanitizeDecimal(e.target.value),
                                    )
                                }
                            />
                            {errors.width && (
                                <p className="mt-1 text-sm text-error">
                                    {errors.width}
                                </p>
                            )}
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Height</legend>
                            <input
                                type="text"
                                inputMode="decimal"
                                className={`input ${errors.height ? 'input-error' : ''}`}
                                value={data.height}
                                onChange={(e) =>
                                    setData(
                                        'height',
                                        sanitizeDecimal(e.target.value),
                                    )
                                }
                            />
                            {errors.height && (
                                <p className="mt-1 text-sm text-error">
                                    {errors.height}
                                </p>
                            )}
                        </fieldset>
                    </div>
                    <div className="flex gap-4">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">DPI</legend>
                            <input
                                type="text"
                                inputMode="numeric"
                                className={`input max-w-24 ${errors.dpi ? 'input-error' : ''}`}
                                value={data.dpi}
                                onChange={(e) =>
                                    setData(
                                        'dpi',
                                        sanitizeInteger(e.target.value),
                                    )
                                }
                            />
                            {errors.dpi && (
                                <p className="mt-1 text-sm text-error">
                                    {errors.dpi}
                                </p>
                            )}
                        </fieldset>
                        <fieldset className="fieldset flex justify-center">
                            <legend className="fieldset-legend">Unit</legend>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    className={`btn ${data.unit === 'in' ? 'btn-primary' : 'btn-ghost'}`}
                                    onClick={() => {
                                        setData('unit', 'in');
                                    }}
                                >
                                    Inches
                                </button>
                                <button
                                    type="button"
                                    className={`btn ${data.unit === 'px' ? 'btn-primary' : 'btn-ghost'}`}
                                    onClick={() => {
                                        setData('unit', 'px');
                                    }}
                                >
                                    Pixels
                                </button>
                            </div>
                            {errors.unit && (
                                <p className="mt-1 text-sm text-error">
                                    {errors.unit}
                                </p>
                            )}
                        </fieldset>
                    </div>
                    <div className="modal-action">
                        <button
                            type="button"
                            className="btn"
                            onClick={() => {
                                reset();
                                triggerModal(false);
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            disabled={processing}
                        >
                            {processing ? 'Creating...' : 'Create'}
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default TemplateForm;
