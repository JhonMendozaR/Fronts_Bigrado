// Función para alternar el dropdown de acciones
function toggleDropdown(button) {
    // Cerrar todos los dropdowns abiertos
    document.querySelectorAll('.actions-dropdown').forEach(dropdown => {
        dropdown.classList.remove('show');
    });

    // Alternar el dropdown actual
    const dropdown = button.nextElementSibling;
    dropdown.classList.toggle('show');

    // Cerrar dropdown al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (!button.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.remove('show');
        }
    });
}

// Funciones para filtros
function toggleFilters() {
    const filtersSection = document.getElementById('filtersSection');
    const toggleBtn = document.querySelector('.filter-toggle-btn');
    const icon = toggleBtn.querySelector('i');
    
    if (filtersSection.style.display === 'none' || !filtersSection.style.display) {
        // Mostrar filtros
        filtersSection.style.display = 'block';
        toggleBtn.classList.add('active');
        icon.classList.remove('fa-filter');
        icon.classList.add('fa-filter-circle-xmark');
    } else {
        // Ocultar filtros y limpiarlos
        filtersSection.style.display = 'none';
        toggleBtn.classList.remove('active');
        icon.classList.remove('fa-filter-circle-xmark');
        icon.classList.add('fa-filter');
        
        // Limpiar los filtros automáticamente
        clearFilters();
    }
}

function applyFilters() {
    const search = document.getElementById('search').value;
    const level = document.getElementById('level-filter').value;
    const faculty = document.getElementById('faculty-filter').value;
    const sede = document.getElementById('sede-filter').value;
    
    console.log('Aplicar filtros de programas:', { search, level, faculty, sede });
    // Aquí implementarías la lógica de filtrado para programas
}

function clearFilters() {
    document.getElementById('search').value = '';
    document.getElementById('level-filter').value = '';
    document.getElementById('faculty-filter').value = '';
    document.getElementById('sede-filter').value = '';
    console.log('Filtros limpiados');
}

// Función para abrir modal de nuevo programa
function openNewProgramModal() {
    const modal = document.getElementById('newProgramModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        // Limpiar formulario
        const form = document.getElementById('newProgramForm');
        if (form) form.reset();
    }
}

// Función para cerrar modal de nuevo programa
function closeNewProgramModal() {
    const modal = document.getElementById('newProgramModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        document.body.style.overflow = '';
    }
}

// Funciones básicas para acciones de programas
function viewProgram(programId) {
    console.log('Ver programa:', programId);
    
    // Datos de ejemplo - en una aplicación real, estos vendrían de una API
    const programData = {
        1: {
            name: "Ingeniería de Sistemas",
            sede: "Bogotá",
            faculty: "Ingeniería",
            level: "Pregrado",
            status: "Activo",
            coordinatorName: "Dr. Carlos Pérez",
            coordinatorPhone: "+57 300 123 4567",
            coordinatorEmail: "carlos.perez@universidad.edu.co",
            creationDate: "15/01/2020",
            lastUpdate: "10/09/2025",
            id: "PROG-001"
        },
        2: {
            name: "Medicina",
            sede: "Medellín",
            faculty: "Medicina",
            level: "Pregrado",
            status: "Activo",
            coordinatorName: "Dra. Ana López",
            coordinatorPhone: "+57 310 987 6543",
            coordinatorEmail: "ana.lopez@universidad.edu.co",
            creationDate: "10/03/2018",
            lastUpdate: "05/09/2025",
            id: "PROG-002"
        }
    };

    const program = programData[programId] || programData[1]; // Usar datos por defecto

    // Llenar los datos en el modal
    document.getElementById('viewProgramName').textContent = program.name;
    document.getElementById('viewProgramLevel').textContent = program.level;
    document.getElementById('viewProgramStatus').textContent = program.status;
    document.getElementById('viewProgramStatus').className = `status-badge ${program.status.toLowerCase() === 'activo' ? 'active' : 'inactive'}`;

    // Detalles del programa
    document.getElementById('viewProgramNameDetail').textContent = program.name;
    document.getElementById('viewProgramSede').textContent = program.sede;
    document.getElementById('viewProgramFaculty').textContent = program.faculty;
    document.getElementById('viewProgramLevelDetail').textContent = program.level;

    // Coordinador
    document.getElementById('viewCoordinatorName').textContent = program.coordinatorName;
    document.getElementById('viewCoordinatorPhone').textContent = program.coordinatorPhone;
    document.getElementById('viewCoordinatorEmail').textContent = program.coordinatorEmail;

    // Sistema
    document.getElementById('viewProgramCreationDate').textContent = program.creationDate;
    document.getElementById('viewProgramLastUpdate').textContent = program.lastUpdate;
    document.getElementById('viewProgramId').textContent = program.id;

    // Mostrar modal
    const modal = document.getElementById('viewProgramModal');
    modal.style.display = 'flex';
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function editProgram(programId) {
    console.log('Editar programa:', programId);
    
    // Datos de ejemplo - en una aplicación real, estos vendrían de una API
    const programData = {
        1: {
            name: "Ingeniería de Sistemas",
            sede: "bogota",
            faculty: "ingenieria",
            level: "pregrado",
            coordinatorName: "Dr. Carlos Pérez",
            coordinatorPhone: "+57 300 123 4567",
            coordinatorEmail: "carlos.perez@universidad.edu.co"
        },
        2: {
            name: "Medicina",
            sede: "medellin",
            faculty: "medicina",
            level: "pregrado",
            coordinatorName: "Dra. Ana López",
            coordinatorPhone: "+57 310 987 6543",
            coordinatorEmail: "ana.lopez@universidad.edu.co"
        }
    };

    const program = programData[programId] || programData[1];

    // Llenar el formulario de edición
    document.getElementById('editProgramName').value = program.name;
    document.getElementById('editProgramSede').value = program.sede;
    document.getElementById('editProgramFaculty').value = program.faculty;
    document.getElementById('editProgramLevel').value = program.level;
    document.getElementById('editCoordinatorName').value = program.coordinatorName;
    document.getElementById('editCoordinatorPhone').value = program.coordinatorPhone;
    document.getElementById('editCoordinatorEmail').value = program.coordinatorEmail;
    document.getElementById('editProgramId').value = programId;

    // Mostrar modal
    const modal = document.getElementById('editProgramModal');
    modal.style.display = 'flex';
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function deleteProgram(programId) {
    console.log('Eliminar programa:', programId);
    
    // Datos de ejemplo
    const programData = {
        1: {
            name: "Ingeniería de Sistemas",
            sede: "Bogotá",
            faculty: "Ingeniería",
            level: "Pregrado"
        },
        2: {
            name: "Medicina",
            sede: "Medellín",
            faculty: "Medicina",
            level: "Pregrado"
        }
    };

    const program = programData[programId] || programData[1];

    // Llenar datos en el modal de eliminación
    document.getElementById('deleteProgramName').textContent = program.name;
    document.getElementById('deleteProgramDetails').textContent = `${program.sede} - ${program.faculty}`;
    document.getElementById('deleteProgramLevel').textContent = program.level;

    // Resetear confirmaciones
    document.getElementById('confirmProgramUnderstand').checked = false;
    document.getElementById('confirmProgramIrreversible').checked = false;
    document.getElementById('deleteProgramConfirmText').value = '';
    document.getElementById('deleteProgramReason').value = '';
    document.getElementById('confirmDeleteProgramBtn').disabled = true;

    // Mostrar modal
    const modal = document.getElementById('deleteProgramModal');
    modal.style.display = 'flex';
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Funciones para cerrar modales
function closeViewProgramModal() {
    const modal = document.getElementById('viewProgramModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    document.body.style.overflow = '';
}

function closeEditProgramModal() {
    const modal = document.getElementById('editProgramModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    document.body.style.overflow = '';
}

function closeDeleteProgramModal() {
    const modal = document.getElementById('deleteProgramModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    document.body.style.overflow = '';
}

// Función para editar desde el modal de vista
function editProgramFromModal() {
    closeViewProgramModal();
    // Obtener el ID del programa actual (esto debería venir del contexto)
    editProgram(1); // Por ahora usar 1 como ejemplo
}

// Cerrar modal al hacer clic fuera de él
document.addEventListener('click', function(event) {
    const newProgramModal = document.getElementById('newProgramModal');
    const viewProgramModal = document.getElementById('viewProgramModal');
    const editProgramModal = document.getElementById('editProgramModal');
    const deleteProgramModal = document.getElementById('deleteProgramModal');
    
    if (newProgramModal && event.target === newProgramModal) {
        closeNewProgramModal();
    }
    if (viewProgramModal && event.target === viewProgramModal) {
        closeViewProgramModal();
    }
    if (editProgramModal && event.target === editProgramModal) {
        closeEditProgramModal();
    }
    if (deleteProgramModal && event.target === deleteProgramModal) {
        closeDeleteProgramModal();
    }
});

// Validación del formulario de nuevo programa
document.addEventListener('DOMContentLoaded', function() {
    const newProgramForm = document.getElementById('newProgramForm');
    if (newProgramForm) {
        newProgramForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const formData = {
                programName: document.getElementById('programName').value.trim(),
                programSede: document.getElementById('programSede').value,
                programFaculty: document.getElementById('programFaculty').value,
                programLevel: document.getElementById('programLevel').value,
                coordinatorName: document.getElementById('coordinatorName').value.trim(),
                coordinatorPhone: document.getElementById('coordinatorPhone').value.trim(),
                coordinatorEmail: document.getElementById('coordinatorEmail').value.trim()
            };
            
            // Validaciones específicas
            if (!validateProgramForm(formData)) {
                return;
            }
            
            // Simular creación del programa
            console.log('Creando programa curricular:', formData);
            
            // Mostrar mensaje de éxito
            alert('Programa curricular creado exitosamente');
            
            // Cerrar modal y limpiar formulario
            closeNewProgramModal();
            newProgramForm.reset();
        });
    }

    // Formulario de edición de programa
    const editProgramForm = document.getElementById('editProgramForm');
    if (editProgramForm) {
        editProgramForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                programId: document.getElementById('editProgramId').value,
                programName: document.getElementById('editProgramName').value.trim(),
                programSede: document.getElementById('editProgramSede').value,
                programFaculty: document.getElementById('editProgramFaculty').value,
                programLevel: document.getElementById('editProgramLevel').value,
                coordinatorName: document.getElementById('editCoordinatorName').value.trim(),
                coordinatorPhone: document.getElementById('editCoordinatorPhone').value.trim(),
                coordinatorEmail: document.getElementById('editCoordinatorEmail').value.trim()
            };
            
            if (!validateProgramForm(formData)) {
                return;
            }
            
            console.log('Actualizando programa curricular:', formData);
            alert('Programa curricular actualizado exitosamente');
            closeEditProgramModal();
        });
    }

    // Validación del modal de eliminación
    const confirmProgramUnderstand = document.getElementById('confirmProgramUnderstand');
    const confirmProgramIrreversible = document.getElementById('confirmProgramIrreversible');
    const deleteProgramConfirmText = document.getElementById('deleteProgramConfirmText');
    const deleteProgramReason = document.getElementById('deleteProgramReason');
    const confirmDeleteProgramBtn = document.getElementById('confirmDeleteProgramBtn');

    function validateDeleteForm() {
        const isUnderstandChecked = confirmProgramUnderstand?.checked || false;
        const isIrreversibleChecked = confirmProgramIrreversible?.checked || false;
        const isTextConfirmed = deleteProgramConfirmText?.value.toUpperCase() === 'ELIMINAR';
        const hasReason = deleteProgramReason?.value.trim().length > 0;

        const isValid = isUnderstandChecked && isIrreversibleChecked && isTextConfirmed && hasReason;
        
        if (confirmDeleteProgramBtn) {
            confirmDeleteProgramBtn.disabled = !isValid;
        }
    }

    // Event listeners para validación de eliminación
    if (confirmProgramUnderstand) {
        confirmProgramUnderstand.addEventListener('change', validateDeleteForm);
    }
    if (confirmProgramIrreversible) {
        confirmProgramIrreversible.addEventListener('change', validateDeleteForm);
    }
    if (deleteProgramConfirmText) {
        deleteProgramConfirmText.addEventListener('input', validateDeleteForm);
    }
    if (deleteProgramReason) {
        deleteProgramReason.addEventListener('input', validateDeleteForm);
    }

    // Botón de confirmación de eliminación
    if (confirmDeleteProgramBtn) {
        confirmDeleteProgramBtn.addEventListener('click', function() {
            const reason = deleteProgramReason.value.trim();
            console.log('Eliminando programa curricular con motivo:', reason);
            alert('Programa curricular eliminado exitosamente');
            closeDeleteProgramModal();
        });
    }
});

// Función para validar el formulario de programa
function validateProgramForm(data) {
    const errors = [];
    
    // Validar nombre del programa
    if (!data.programName) {
        errors.push('El nombre del programa curricular es obligatorio');
    } else if (data.programName.length < 3) {
        errors.push('El nombre del programa debe tener al menos 3 caracteres');
    }
    
    // Validar sede
    if (!data.programSede) {
        errors.push('La sede del programa es obligatoria');
    }
    
    // Validar facultad
    if (!data.programFaculty) {
        errors.push('La facultad del programa es obligatoria');
    }
    
    // Validar nivel de formación
    if (!data.programLevel) {
        errors.push('El nivel de formación es obligatorio');
    }
    
    // Validar nombre del coordinador
    if (!data.coordinatorName) {
        errors.push('El nombre del coordinador curricular es obligatorio');
    } else if (data.coordinatorName.length < 3) {
        errors.push('El nombre del coordinador debe tener al menos 3 caracteres');
    }
    
    // Validar teléfono del coordinador
    if (!data.coordinatorPhone) {
        errors.push('El teléfono del coordinador es obligatorio');
    } else if (!validatePhone(data.coordinatorPhone)) {
        errors.push('El formato del teléfono no es válido');
    }
    
    // Validar email del coordinador
    if (!data.coordinatorEmail) {
        errors.push('El correo del coordinador es obligatorio');
    } else if (!validateEmail(data.coordinatorEmail)) {
        errors.push('El formato del correo electrónico no es válido');
    }
    
    // Mostrar errores si existen
    if (errors.length > 0) {
        alert('Por favor corrige los siguientes errores:\n\n' + errors.join('\n'));
        return false;
    }
    
    return true;
}

// Función para validar formato de email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para validar formato de teléfono
function validatePhone(phone) {
    // Acepta formatos como: +57 300 123 4567, 300-123-4567, 3001234567, etc.
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,15}$/;
    return phoneRegex.test(phone);
}

// ============================================
// FUNCIONES PARA DROPDOWN DE MÁS ACCIONES
// ============================================

// Cerrar dropdown al hacer clic fuera
document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('actionsDropdownProgramas');
    const button = document.querySelector('.more-actions-btn');
    
    if (dropdown && !dropdown.contains(e.target) && button && !button.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

/**
 * Alterna la visibilidad del dropdown de acciones en programas curriculares
 */
function toggleActionsDropdownProgramas() {
    const dropdown = document.getElementById('actionsDropdownProgramas');
    dropdown.classList.toggle('active');
}

/**
 * Función para importar programas curriculares masivamente
 * TODO: Implementar lógica de importación desde archivo (Excel, CSV)
 */
function importarMasivamenteProgramas() {
    console.log('Importar programas curriculares masivamente - Por implementar');
    
    // Cerrar el dropdown
    const dropdown = document.getElementById('actionsDropdownProgramas');
    dropdown.classList.remove('active');
    
    // TODO: Abrir modal de importación o selector de archivo
    // Por ahora mostramos un alert como placeholder
    alert('Funcionalidad de Importación Masiva de Programas Curriculares\n\nEsta función permitirá:\n• Cargar múltiples programas desde un archivo Excel o CSV\n• Validar datos (nombres únicos, sedes, facultades)\n• Importar información de coordinadores curriculares\n• Asignar automáticamente niveles de formación\n• Validar estructura de facultades y sedes\n• Asociar coordinadores existentes o crear nuevos\n• Mostrar resumen de importación con errores y éxitos\n• Generar códigos de programa automáticamente\n\n(Por implementar)');
    
    // Ejemplo de implementación futura:
    // const input = document.createElement('input');
    // input.type = 'file';
    // input.accept = '.xlsx,.xls,.csv';
    // input.onchange = handleFileImportProgramas;
    // input.click();
}

/**
 * Función para enviar correo masivo a coordinadores de programas
 * TODO: Implementar modal de envío de correos masivos
 */
function enviarCorreoMasivoProgramas() {
    console.log('Enviar correo masivo a programas - Por implementar');
    
    // Cerrar el dropdown
    const dropdown = document.getElementById('actionsDropdownProgramas');
    dropdown.classList.remove('active');
    
    // TODO: Abrir modal de envío de correos masivos
    // Por ahora mostramos un alert como placeholder
    alert('Funcionalidad de Envío de Correo Masivo\n\nEsta función permitirá:\n• Filtrar programas por sede o facultad\n• Filtrar por nivel de formación (Pregrado, Posgrado)\n• Enviar a coordinadores curriculares específicos\n• Notificar sobre actualizaciones académicas\n• Compartir información sobre convocatorias\n• Solicitar información o reportes de programa\n• Enviar recordatorios de fechas importantes\n• Comunicar cambios en políticas académicas\n• Crear plantillas de correo institucionales\n• Programar envío de correos\n• Ver historial de comunicaciones con coordinadores\n\n(Por implementar)');
    
    // Ejemplo de implementación futura:
    // openEmailMasivoModalProgramas();
}

/**
 * Ejemplo de función para manejar la importación de archivos de programas
 * TODO: Implementar completamente
 */
function handleFileImportProgramas(event) {
    const file = event.target.files[0];
    
    if (!file) {
        return;
    }
    
    console.log('Archivo de programas seleccionado:', file.name);
    
    // TODO: Leer y procesar el archivo
    // const reader = new FileReader();
    // reader.onload = function(e) {
    //     const data = e.target.result;
    //     processImportDataProgramas(data);
    // };
    // reader.readAsArrayBuffer(file);
}

/**
 * Ejemplo de función para procesar datos de importación de programas
 * TODO: Implementar completamente
 */
function processImportDataProgramas(data) {
    console.log('Procesando datos de programas curriculares importados...');
    
    // TODO: Parsear datos según formato (Excel/CSV)
    // TODO: Validar campos requeridos (nombre programa, sede, facultad, nivel, coordinador)
    // TODO: Verificar que nombres de programa sean únicos por sede
    // TODO: Validar existencia de sedes y facultades en el sistema
    // TODO: Validar formato de contactos de coordinador (email, teléfono)
    // TODO: Verificar si coordinadores ya existen en el sistema
    // TODO: Generar códigos de programa automáticamente
    // TODO: Mostrar preview de datos a importar con errores detectados
    // TODO: Enviar al backend para guardado masivo
    // TODO: Generar reporte de importación exitosa
    // TODO: Notificar a coordinadores sobre sus programas asignados
}
