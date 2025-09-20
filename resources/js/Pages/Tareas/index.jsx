import React from "react";
import ModalCrearTarea from "./ModalCrearTarea";
import ModalEditarTarea from "./ModalEditarTarea";
import {
    crearTarea,
    actualizarTarea,
    eliminarTarea,
    toggleCompletada,
} from "../../utils/tareasActions";

export default function Index({ tareas }) {
    const [modalCrearAbierto, setModalCrearAbierto] = React.useState(false);
    const [modalEditarAbierto, setModalEditarAbierto] = React.useState(false);
    const [tareaEditando, setTareaEditando] = React.useState(null);

    // Estados para los filtros
    const [filtroTitulo, setFiltroTitulo] = React.useState("");
    const [filtroEstado, setFiltroEstado] = React.useState("todos"); // 'todos', 'completadas', 'pendientes'

    // Función para filtrar tareas
    const tareasFiltradas = React.useMemo(() => {
        if (!tareas) return [];

        return tareas.filter((tarea) => {
            // Filtro por título
            const coincideTitulo = tarea.titulo
                .toLowerCase()
                .includes(filtroTitulo.toLowerCase());

            // Filtro por estado
            let coincideEstado = true;
            if (filtroEstado === "completadas") {
                coincideEstado = tarea.completada;
            } else if (filtroEstado === "pendientes") {
                coincideEstado = !tarea.completada;
            }

            return coincideTitulo && coincideEstado;
        });
    }, [tareas, filtroTitulo, filtroEstado]);

    // Función para limpiar filtros
    const limpiarFiltros = () => {
        setFiltroTitulo("");
        setFiltroEstado("todos");
    };

    // Funciones para manejar modales
    const abrirModalCrear = () => setModalCrearAbierto(true);
    const cerrarModalCrear = () => setModalCrearAbierto(false);

    const abrirModalEditar = (tarea) => {
        setTareaEditando(tarea);
        setModalEditarAbierto(true);
    };

    const cerrarModalEditar = () => {
        setModalEditarAbierto(false);
        setTareaEditando(null);
    };

    // Función para manejar la creación
    const manejarCrearTarea = (formData, setErrors, onSuccess) => {
        crearTarea(formData, setErrors, () => {
            onSuccess();
            cerrarModalCrear();
        });
    };

    // Función para manejar la actualización
    const manejarActualizarTarea = (id, formData, setErrors, onSuccess) => {
        actualizarTarea(id, formData, setErrors, () => {
            onSuccess();
            cerrarModalEditar();
        });
    };

    // Función para manejar eliminación
    const manejarEliminarTarea = (id) => {
        eliminarTarea(id);
    };

    // Función para cambiar estado
    const manejarToggleCompletada = (tarea) => {
        toggleCompletada(tarea.id, tarea.completada);
    };

    return (
        <div className="container mx-auto p-6 max-w-7xl">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                Lista de Tareas
                            </h1>
                            <p className="text-blue-100 mt-1">
                                Gestiona tus tareas diarias
                            </p>
                        </div>
                        <button
                            onClick={abrirModalCrear}
                            className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-blue-50 transition-colors duration-200 flex items-center space-x-2"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            <span>Nueva Tarea</span>
                        </button>
                    </div>
                </div>

                {/* Filtros de búsqueda */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        <div className="flex flex-col sm:flex-row gap-4 flex-1">
                            {/* Filtro por título */}
                            <div className="flex-1 max-w-md">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg
                                            className="h-5 w-5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Buscar por título..."
                                        value={filtroTitulo}
                                        onChange={(e) =>
                                            setFiltroTitulo(e.target.value)
                                        }
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            {/* Filtro por estado */}
                            <div className="min-w-[200px]">
                                <select
                                    value={filtroEstado}
                                    onChange={(e) =>
                                        setFiltroEstado(e.target.value)
                                    }
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                >
                                    <option value="todos">
                                        Todos los estados
                                    </option>
                                    <option value="pendientes">
                                        Solo pendientes
                                    </option>
                                    <option value="completadas">
                                        Solo completadas
                                    </option>
                                </select>
                            </div>
                        </div>

                        {/* Botón limpiar filtros y contador */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">
                                {tareasFiltradas.length} de{" "}
                                {tareas?.length || 0} tareas
                            </span>

                            {(filtroTitulo || filtroEstado !== "todos") && (
                                <button
                                    onClick={limpiarFiltros}
                                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
                                >
                                    Limpiar filtros
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tabla */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Título
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Descripción
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Fecha Vencimiento
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {tareasFiltradas && tareasFiltradas.length > 0 ? (
                                tareasFiltradas.map((tarea) => (
                                    <tr
                                        key={tarea.id}
                                        className="hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            #{tarea.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {tarea.titulo}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-500 max-w-xs truncate">
                                                {tarea.descripcion ||
                                                    "Sin descripción"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {tarea.fecha_vencimiento ||
                                                "Sin fecha"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                    tarea.completada
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                }`}
                                            >
                                                {tarea.completada
                                                    ? "Completada"
                                                    : "Pendiente"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-3">
                                                {/* Botón Editar */}
                                                <button
                                                    onClick={() =>
                                                        abrirModalEditar(tarea)
                                                    }
                                                    className="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-full transition-all duration-200"
                                                    title="Editar tarea"
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                        />
                                                    </svg>
                                                </button>

                                                {/* Botón Eliminar */}
                                                <button
                                                    onClick={() =>
                                                        manejarEliminarTarea(
                                                            tarea.id
                                                        )
                                                    }
                                                    className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-full transition-all duration-200"
                                                    title="Eliminar tarea"
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        />
                                                    </svg>
                                                </button>

                                                {/* Botón Toggle Completada */}
                                                <button
                                                    onClick={() =>
                                                        manejarToggleCompletada(
                                                            tarea
                                                        )
                                                    }
                                                    className={`p-2 rounded-full transition-all duration-200 ${
                                                        tarea.completada
                                                            ? "text-orange-600 hover:text-orange-900 hover:bg-orange-50"
                                                            : "text-green-600 hover:text-green-900 hover:bg-green-50"
                                                    }`}
                                                    title={
                                                        tarea.completada
                                                            ? "Marcar como pendiente"
                                                            : "Marcar como completada"
                                                    }
                                                >
                                                    {tarea.completada ? (
                                                        // Icono para "marcar como pendiente"
                                                        <svg
                                                            className="w-5 h-5"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        // Icono para "completar"
                                                        <svg
                                                            className="w-5 h-5"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-6 py-12 text-center text-gray-500"
                                    >
                                        <div className="flex flex-col items-center">
                                            {tareas && tareas.length > 0 ? (
                                                // Hay tareas pero no coinciden con los filtros
                                                <>
                                                    <svg
                                                        className="w-12 h-12 text-gray-300 mb-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                        />
                                                    </svg>
                                                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                                                        No se encontraron tareas
                                                    </h3>
                                                    <p className="text-gray-500 mb-4">
                                                        No hay tareas que
                                                        coincidan con los
                                                        filtros aplicados.
                                                    </p>
                                                    <button
                                                        onClick={limpiarFiltros}
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                                                    >
                                                        Limpiar filtros
                                                    </button>
                                                </>
                                            ) : (
                                                // No hay tareas en absoluto
                                                <>
                                                    <svg
                                                        className="w-12 h-12 text-gray-300 mb-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                                        />
                                                    </svg>
                                                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                                                        No hay tareas
                                                    </h3>
                                                    <p className="text-gray-500">
                                                        Comienza creando tu
                                                        primera tarea.
                                                    </p>
                                                    <button
                                                        onClick={
                                                            abrirModalCrear
                                                        }
                                                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                                                    >
                                                        Crear Tarea
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer con stats */}
                {tareas && tareas.length > 0 && (
                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                        <div className="flex justify-between items-center text-sm text-gray-600">
                            <span>
                                Mostrando: {tareasFiltradas.length} de{" "}
                                {tareas.length} tareas
                            </span>
                            <div className="flex gap-4">
                                <span>
                                    Completadas:{" "}
                                    {
                                        tareasFiltradas.filter(
                                            (t) => t.completada
                                        ).length
                                    }
                                </span>
                                <span>
                                    Pendientes:{" "}
                                    {
                                        tareasFiltradas.filter(
                                            (t) => !t.completada
                                        ).length
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Modales */}
            <ModalCrearTarea
                isOpen={modalCrearAbierto}
                onClose={cerrarModalCrear}
                onSubmit={manejarCrearTarea}
            />

            <ModalEditarTarea
                isOpen={modalEditarAbierto}
                onClose={cerrarModalEditar}
                onSubmit={manejarActualizarTarea}
                tarea={tareaEditando}
            />
        </div>
    );
}
