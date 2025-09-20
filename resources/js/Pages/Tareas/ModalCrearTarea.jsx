import React from "react";

export default function ModalCrearTarea({ isOpen, onClose, onSubmit }) {
    const [formData, setFormData] = React.useState({
        titulo: "",
        descripcion: "",
        fecha_vencimiento: "",
    });

    const [errors, setErrors] = React.useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        // Limpiar error cuando el usuario empiece a escribir
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: "",
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData, setErrors, () => {
            // Reset form on success
            setFormData({
                titulo: "",
                descripcion: "",
                fecha_vencimiento: "",
            });
            setErrors({});
        });
    };

    if (!isOpen) return null;

    return (
        // <dialog>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-full">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Crear Nueva Tarea
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="space-y-4">
                            {/* Título */}
                            <div>
                                <label
                                    htmlFor="titulo"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Título *
                                </label>
                                <input
                                    type="text"
                                    id="titulo"
                                    name="titulo"
                                    value={formData.titulo}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                        errors.titulo
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                    placeholder="Ingresa el título de la tarea"
                                />
                                {errors.titulo && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.titulo}
                                    </p>
                                )}
                            </div>

                            {/* Descripción */}
                            <div>
                                <label
                                    htmlFor="descripcion"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Descripción
                                </label>
                                <textarea
                                    id="descripcion"
                                    name="descripcion"
                                    rows="3"
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                        errors.descripcion
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                    placeholder="Describe la tarea (opcional)"
                                />
                                {errors.descripcion && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.descripcion}
                                    </p>
                                )}
                            </div>

                            {/* Fecha de vencimiento */}
                            <div>
                                <label
                                    htmlFor="fecha_vencimiento"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Fecha de vencimiento
                                </label>
                                <input
                                    type="date"
                                    id="fecha_vencimiento"
                                    name="fecha_vencimiento"
                                    value={formData.fecha_vencimiento}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                        errors.fecha_vencimiento
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                />
                                {errors.fecha_vencimiento && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.fecha_vencimiento}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            >
                                Crear Tarea
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        // </dialog>
    );
}
