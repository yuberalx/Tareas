import { router } from "@inertiajs/react";

// Función para crear una nueva tarea
export const crearTarea = (formData, setErrors, onSuccess) => {
    // Limpiar errores previos
    setErrors({});
    validarFormulario(formData);

    if (!validarFormulario(formData).esValido) {
        setErrors(validarFormulario(formData).errores);
        return;
    }

    router.post("/tareas", formData, {
        onSuccess: () => {
            console.log("Tarea creada exitosamente");
            onSuccess();
        },
        onError: (errors) => {
            console.error("Error al crear tarea:", errors);
            setErrors(errors);
        },
        preserveScroll: true,
    });
};

// Función para actualizar una tarea existente
export const actualizarTarea = (id, formData, setErrors, onSuccess) => {
    setErrors({});
    validarFormulario(formData);

    if (!validarFormulario(formData).esValido) {
        setErrors(validarFormulario(formData).errores);
        return;
    }

    router.put(`/tareas/${id}`, formData, {
        onSuccess: () => {
            console.log("Tarea actualizada exitosamente");
            onSuccess();
        },
        onError: (errors) => {
            console.error("Error al actualizar tarea:", errors);
            setErrors(errors);
        },
        preserveScroll: true,
    });
};

// Función para eliminar una tarea
export const eliminarTarea = (id, onSuccess = null) => {
    
    if (confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
        router.delete(`/tareas/${id}`, {
            onSuccess: () => {
                console.log("Tarea eliminada exitosamente");
                if (onSuccess) onSuccess();
            },
            onError: (error) => {
                console.error("Error al eliminar tarea:", error);
                alert("Error al eliminar la tarea");
            },
            preserveScroll: true,
        });
    }
};

// Función para cambiar el estado de completada de una tarea
export const toggleCompletada = (id, completada) => {
    router.patch(
        `/tareas/${id}/toggle`,
        {
            completada: !completada,
        },
        {
            onSuccess: () => {
                console.log("Estado de tarea actualizado");
            },
            onError: (error) => {
                console.error("Error al cambiar estado:", error);
                alert("Error al actualizar el estado de la tarea");
            },
            preserveScroll: true,
        }
    );
};

// Función para validar formularios del lado del cliente
export const validarFormulario = (formData) => {
    const errores = {};

    if (!formData.titulo || formData.titulo.trim() === "") {
        errores.titulo = "El título es requerido";
    }

    if (formData.titulo && formData.titulo.length > 255) {
        errores.titulo = "El título no puede tener más de 255 caracteres";
    }

    if (formData.descripcion && formData.descripcion.length > 1000) {
        errores.descripcion =
            "La descripción no puede tener más de 1000 caracteres";
    }

    if (formData.fecha_vencimiento) {
        const fecha = new Date(formData.fecha_vencimiento);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        if (fecha < hoy) {
            errores.fecha_vencimiento =
                "La fecha de vencimiento no puede ser anterior a hoy";
        }
    }

    return {
        esValido: Object.keys(errores).length === 0,
        errores,
    };
};
