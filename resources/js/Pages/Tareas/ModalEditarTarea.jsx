import React from "react";

export default function ModalEditarTarea({ isOpen, onClose, onSubmit, tarea }) {
    const [formData, setFormData] = React.useState({
        titulo: "",
        descripcion: "",
        fecha_vencimiento: "",
        completada: false,
    });

    const [errors, setErrors] = React.useState({});

    // Llenar el formulario cuando se abre el modal con una tarea
    React.useEffect(() => {
        if (tarea) {
            setFormData({
                titulo: tarea.titulo || "",
                descripcion: tarea.descripcion || "",
                fecha_vencimiento: tarea.fecha_vencimiento || "",
                completada: tarea.completada || false,
            });
        }
    }, [tarea]);

    const handleChange = (e) => {
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
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
        onSubmit(tarea.id, formData, setErrors, () => {
            setErrors({});
        });
    };

    if (!isOpen || !tarea) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Editar Tarea
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

                        {/* Estado completada */}
                        <div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="completada"
                                    name="completada"
                                    checked={formData.completada}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="completada"
                                    className="ml-2 text-sm font-medium text-gray-700"
                                >
                                    Marcar como completada
                                </label>
                            </div>
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
                            className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                        >
                            Actualizar Tarea
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
