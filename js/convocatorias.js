// Función para alternar el menú de acciones
function toggleActions(button) {
    const dropdown = button.nextElementSibling;
    const allDropdowns = document.querySelectorAll('.actions-dropdown');
    
    // Cerrar todos los otros dropdowns
    allDropdowns.forEach(d => {
        if (d !== dropdown) {
            d.classList.remove('show');
        }
    });
    
    dropdown.classList.toggle('show');
    
    // Cerrar el dropdown al hacer clic fuera
    if (dropdown.classList.contains('show')) {
        document.addEventListener('click', function closeDropdown(e) {
            if (!button.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
                document.removeEventListener('click', closeDropdown);
            }
        });
    }
}

// Función para alternar la visibilidad de los filtros
function toggleFilters() {
    const filtersSection = document.getElementById('filtersSection');
    const filterButton = document.querySelector('.filter-toggle-btn');
    
    if (filtersSection.style.display === 'none') {
        filtersSection.style.display = 'block';
        filterButton.classList.add('active');
    } else {
        filtersSection.style.display = 'none';
        filterButton.classList.remove('active');
    }
}

// Función para aplicar filtros
function applyFilters() {
    const nombre = document.getElementById('filterNombre').value;
    const programa = document.getElementById('filterPrograma').value;
    const convenio = document.getElementById('filterConvenio').value;
    const estado = document.getElementById('filterEstado').value;
    
    console.log('Aplicando filtros:', { nombre, programa, convenio, estado });
    
    // Aquí iría la lógica para filtrar las convocatorias
    // Por ahora solo mostramos un mensaje
    alert('Filtros aplicados. Esta funcionalidad se conectará con el backend.');
}

// Función para limpiar filtros
function clearFilters() {
    document.getElementById('filterNombre').value = '';
    document.getElementById('filterPrograma').value = '';
    document.getElementById('filterConvenio').value = '';
    document.getElementById('filterEstado').value = '';
    
    console.log('Filtros limpiados');
    
    // Aquí iría la lógica para recargar todas las convocatorias
    alert('Filtros limpiados');
}

// Funciones placeholder para las acciones (se implementarán con los modales)
function openNewConvocatoriaModal() {
    const modal = document.getElementById('newConvocatoriaModal');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
}

function closeNewConvocatoriaModal() {
    const modal = document.getElementById('newConvocatoriaModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        document.getElementById('newConvocatoriaForm').reset();
    }, 300);
    
    // Restaurar scroll del body
    document.body.style.overflow = '';
}

// Cerrar modal al hacer clic fuera de él
window.onclick = function(event) {
    const newModal = document.getElementById('newConvocatoriaModal');
    const viewModal = document.getElementById('viewConvocatoriaModal');
    const editModal = document.getElementById('editConvocatoriaModal');
    const statusModal = document.getElementById('toggleConvocatoriaStatusModal');
    const deleteModal = document.getElementById('deleteConvocatoriaModal');
    
    if (event.target === newModal) {
        closeNewConvocatoriaModal();
    }
    
    if (event.target === viewModal) {
        closeViewConvocatoriaModal();
    }
    
    if (event.target === editModal) {
        closeEditConvocatoriaModal();
    }
    
    if (event.target === statusModal) {
        closeToggleStatusModal();
    }
    
    if (event.target === deleteModal) {
        closeDeleteConvocatoriaModal();
    }
}

// Manejar el envío del formulario
document.addEventListener('DOMContentLoaded', function() {
    // Formulario de nueva convocatoria
    const newForm = document.getElementById('newConvocatoriaForm');
    if (newForm) {
        newForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los datos del formulario
            const formData = new FormData(newForm);
            const data = {};
            
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            console.log('Datos de la nueva convocatoria:', data);
            
            // Aquí iría la lógica para enviar los datos al backend
            alert('Convocatoria creada exitosamente (Por implementar conexión con backend)');
            closeNewConvocatoriaModal();
        });
    }
    
    // Formulario de editar convocatoria
    const editForm = document.getElementById('editConvocatoriaForm');
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los datos del formulario
            const formData = new FormData(editForm);
            const data = {};
            
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            console.log('Datos actualizados de la convocatoria:', data);
            
            // Aquí iría la lógica para enviar los datos actualizados al backend
            alert('Convocatoria actualizada exitosamente (Por implementar conexión con backend)');
            closeEditConvocatoriaModal();
        });
    }
    
    // Selector de cambio de estado - Mostrar advertencias dinámicas
    const nuevoEstadoSelect = document.getElementById('nuevoEstado');
    if (nuevoEstadoSelect) {
        nuevoEstadoSelect.addEventListener('change', function() {
            const nuevoEstado = this.value;
            const estadoActual = document.getElementById('toggleConvocatoriaEstadoActual').textContent.toLowerCase();
            const warningDiv = document.getElementById('statusWarning');
            const warningTitle = document.getElementById('warningTitle');
            const warningMessage = document.getElementById('warningMessage');
            const confirmBtn = document.getElementById('confirmStatusBtn');
            const statusIcon = document.getElementById('toggleStatusIcon');
            const statusTitle = document.getElementById('toggleStatusTitle');
            const statusFormActions = document.querySelector('.status-form-actions');
            
            if (!nuevoEstado) {
                // Resetear todo cuando se selecciona la opción vacía
                warningDiv.style.display = 'none';
                statusIcon.innerHTML = '<i class="fas fa-exchange-alt"></i>';
                statusIcon.className = 'status-icon';
                statusTitle.textContent = 'Cambiar Estado';
                confirmBtn.className = 'primary-btn';
                confirmBtn.innerHTML = '<i class="fas fa-check"></i><span>Cambiar Estado</span>';
                // Ocultar botones cuando no hay selección
                if (statusFormActions) {
                    statusFormActions.style.display = 'none';
                }
                return;
            }
            
            // Mostrar botones cuando se selecciona un estado
            if (statusFormActions) {
                statusFormActions.style.display = 'flex';
            }
            
            // Configurar advertencias según el nuevo estado
            warningDiv.style.display = 'flex';
            
            if (nuevoEstado === 'Abierta') {
                warningDiv.className = 'status-warning success';
                warningDiv.querySelector('.warning-icon').className = 'warning-icon success';
                warningDiv.querySelector('.warning-content').className = 'warning-content success';
                statusIcon.innerHTML = '<i class="fas fa-exchange-alt"></i>';
                statusIcon.className = 'status-icon activate';
                confirmBtn.className = 'success-btn';
                confirmBtn.innerHTML = '<i class="fas fa-check"></i><span>Abrir Convocatoria</span>';
                warningTitle.textContent = 'Abrir convocatoria';
                warningMessage.textContent = 'La convocatoria estará disponible para que los estudiantes puedan postularse.';
            } else if (nuevoEstado === 'Aplazada') {
                warningDiv.className = 'status-warning';
                warningDiv.querySelector('.warning-icon').className = 'warning-icon';
                warningDiv.querySelector('.warning-content').className = 'warning-content';
                statusIcon.innerHTML = '<i class="fas fa-exchange-alt"></i>';
                statusIcon.className = 'status-icon deactivate';
                confirmBtn.className = 'alternative-btn';
                confirmBtn.innerHTML = '<i class="fas fa-pause"></i><span>Aplazar Convocatoria</span>';
                warningTitle.textContent = '¿Aplazar esta convocatoria?';
                warningMessage.textContent = 'La convocatoria será temporalmente suspendida. Los postulantes actuales mantendrán su estado pero no se aceptarán nuevas postulaciones hasta que sea reabierta.';
            } else if (nuevoEstado === 'Cerrada') {
                warningDiv.className = 'status-warning danger';
                warningDiv.querySelector('.warning-icon').className = 'warning-icon danger';
                warningDiv.querySelector('.warning-content').className = 'warning-content danger';
                statusIcon.innerHTML = '<i class="fas fa-exchange-alt"></i>';
                statusIcon.className = 'status-icon delete';
                confirmBtn.className = 'danger-btn';
                confirmBtn.innerHTML = '<i class="fas fa-lock"></i><span>Cerrar Convocatoria</span>';
                warningTitle.textContent = '¿Cerrar esta convocatoria?';
                warningMessage.textContent = 'Al cerrar la convocatoria, no se podrán recibir más postulaciones. Esta acción finalizará el proceso de selección.';
            }
        });
    }
    
    console.log('Página de convocatorias cargada');
});

function viewConvocatoria(id) {
    console.log('Ver detalles de convocatoria:', id);
    
    // Datos de ejemplo - En producción vendrían del backend
    const convocatoriaData = {
        1: {
            nombre: 'Movilidad Académica Europa 2025-1',
            universidad: 'Universidad de Barcelona',
            convenio: 'Erasmus+',
            programa: 'Ingeniería de Sistemas',
            ciudadPais: 'Barcelona, España',
            descripcion: 'Programa de movilidad académica internacional enfocado en estudiantes de ingeniería que deseen realizar un semestre en la Universidad de Barcelona, fortaleciendo su formación académica y experiencia internacional.',
            inicioConvocatoria: '15/01/2025',
            cierreConvocatoria: '15/06/2025',
            inicioPrograma: '01/09/2025',
            duracion: '1 año',
            diasRestantes: '93 días',
            requisitosGenerales: '• Ser estudiante activo de la universidad\n• Promedio académico mínimo de 3.5\n• No tener sanciones disciplinarias\n• Nivel de idioma intermedio',
            requisitosAcademicos: '• Haber aprobado al menos el 50% de los créditos del programa\n• Certificación de idioma (B2 o superior)\n• Carta de motivación\n• Hoja de vida académica',
            documentosConvocatoria: '• Formulario de inscripción\n• Fotocopia del documento de identidad\n• Certificado de notas\n• Certificación de idiomas\n• Carta de recomendación',
            procesoPreseleccion: 'La preselección se realizará en dos fases:\n1. Evaluación documental (60%)\n2. Entrevista personal (40%)\n\nLos candidatos preseleccionados serán notificados vía correo electrónico.',
            cronograma: '• Apertura: 15 de enero de 2025\n• Cierre de inscripciones: 15 de marzo de 2025\n• Preselección: 20-30 de marzo de 2025\n• Entrevistas: 1-15 de abril de 2025\n• Resultados finales: 30 de abril de 2025',
            aclaracionesReclamaciones: 'Los estudiantes podrán realizar aclaraciones o reclamaciones durante los 5 días hábiles posteriores a la publicación de resultados a través del correo movilidad@universidad.edu',
            financiacion: 'La convocatoria ofrece:\n• Beca completa de matrícula\n• Auxilio de manutención mensual de €800\n• Seguro médico internacional\n• Tiquete aéreo ida y vuelta',
            mayorInformacion: 'Oficina de Relaciones Internacionales\nCorreo: internacional@universidad.edu\nTeléfono: +57 (1) 234 5678\nWhatsApp: +57 300 123 4567\nSitio web: www.universidad.edu/internacional',
            estado: 'Abierta',
            fechaCreacion: '10/12/2024',
            ultimaModificacion: '05/01/2025',
            creadoPor: 'Admin Principal',
            totalPostulantes: '47'
        },
        2: {
            nombre: 'Intercambio Latinoamérica 2025',
            universidad: 'Universidad de Buenos Aires',
            convenio: 'Bilateral',
            programa: 'Administración de Empresas',
            ciudadPais: 'Buenos Aires, Argentina',
            descripcion: 'Programa de intercambio académico con la Universidad de Buenos Aires, permitiendo a estudiantes de administración enriquecer su experiencia académica y cultural.',
            inicioConvocatoria: '01/02/2025',
            cierreConvocatoria: '30/07/2025',
            inicioPrograma: '15/08/2025',
            duracion: '6 meses',
            diasRestantes: '109 días',
            requisitosGenerales: '• Estudiante de pregrado activo\n• Promedio mínimo de 3.8\n• Carta de motivación\n• Nivel de español nativo o avanzado',
            requisitosAcademicos: '• Mínimo 100 créditos aprobados\n• No tener materias pendientes\n• Certificado de buena conducta\n• Referencias académicas',
            documentosConvocatoria: '• Solicitud completa\n• Documento de identidad\n• Certificados académicos\n• Cartas de recomendación (2)\n• Ensayo motivacional',
            procesoPreseleccion: 'Proceso de selección basado en méritos académicos y entrevista. Los mejores puntajes tendrán prioridad en la asignación de cupos.',
            cronograma: '• Apertura: 1 de febrero de 2025\n• Cierre: 30 de mayo de 2025\n• Evaluación: junio 2025\n• Resultados: 15 de julio de 2025',
            aclaracionesReclamaciones: 'Período de reclamaciones: 10 días hábiles después de publicación de resultados. Contacto: reclamaciones@universidad.edu',
            financiacion: 'Financiación parcial:\n• Matrícula cubierta por convenio\n• Apoyo mensual de $1,500 USD\n• Seguro médico incluido',
            mayorInformacion: 'Departamento de Intercambios\nEmail: intercambios@universidad.edu\nTel: +57 (1) 345 6789',
            estado: 'Abierta',
            fechaCreacion: '15/01/2025',
            ultimaModificacion: '20/01/2025',
            creadoPor: 'Coordinador de Intercambios',
            totalPostulantes: '32'
        }
        // Agregar más datos según sea necesario
    };
    
    const data = convocatoriaData[id] || convocatoriaData[1];
    
    // Rellenar el modal con los datos
    document.getElementById('viewConvocatoriaName').textContent = data.nombre;
    document.getElementById('viewConvocatoriaUniversidad').textContent = data.universidad;
    document.getElementById('viewConvocatoriaEstado').textContent = data.estado;
    document.getElementById('viewConvocatoriaEstado').className = `status-badge ${data.estado.toLowerCase() === 'abierta' ? 'active' : data.estado.toLowerCase() === 'cerrada' ? 'inactive' : 'pending'}`;
    
    document.getElementById('detailNombre').textContent = data.nombre;
    document.getElementById('detailConvenio').textContent = data.convenio;
    document.getElementById('detailPrograma').textContent = data.programa;
    document.getElementById('detailCiudadPais').textContent = data.ciudadPais;
    document.getElementById('detailDescripcion').textContent = data.descripcion;
    
    document.getElementById('detailInicioConvocatoria').textContent = data.inicioConvocatoria;
    document.getElementById('detailCierreConvocatoria').textContent = data.cierreConvocatoria;
    document.getElementById('detailInicioPrograma').textContent = data.inicioPrograma;
    document.getElementById('detailDuracion').textContent = data.duracion;
    document.getElementById('detailDiasRestantes').textContent = data.diasRestantes;
    
    document.getElementById('detailRequisitosGenerales').textContent = data.requisitosGenerales;
    document.getElementById('detailRequisitosAcademicos').textContent = data.requisitosAcademicos;
    document.getElementById('detailDocumentosConvocatoria').textContent = data.documentosConvocatoria;
    
    document.getElementById('detailProcesoPreseleccion').textContent = data.procesoPreseleccion;
    document.getElementById('detailCronograma').textContent = data.cronograma;
    document.getElementById('detailAclaracionesReclamaciones').textContent = data.aclaracionesReclamaciones;
    
    document.getElementById('detailFinanciacion').textContent = data.financiacion;
    document.getElementById('detailMayorInformacion').textContent = data.mayorInformacion;
    
    document.getElementById('detailFechaCreacion').textContent = data.fechaCreacion;
    document.getElementById('detailUltimaModificacion').textContent = data.ultimaModificacion;
    document.getElementById('detailCreadoPor').textContent = data.creadoPor;
    document.getElementById('detailTotalPostulantes').textContent = data.totalPostulantes;
    
    // Abrir el modal
    const modal = document.getElementById('viewConvocatoriaModal');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    document.body.style.overflow = 'hidden';
}

function closeViewConvocatoriaModal() {
    const modal = document.getElementById('viewConvocatoriaModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    
    document.body.style.overflow = '';
}

function editConvocatoriaFromModal() {
    const convocatoriaId = document.getElementById('detailNombre').textContent;
    closeViewConvocatoriaModal();
    
    // Determinar el ID de la convocatoria actual
    // En un caso real, guardarías el ID en el modal de visualización
    // Por ahora usaremos el ID 1 como ejemplo
    setTimeout(() => {
        editConvocatoria(1);
    }, 300);
}

function editConvocatoria(id) {
    console.log('Editar convocatoria:', id);
    
    // Datos de ejemplo - En producción vendrían del backend
    const convocatoriaData = {
        1: {
            id: 1,
            nombre: 'Movilidad Académica Europa 2025-1',
            convenio: 'erasmus',
            programa: 'ingenieria-sistemas',
            ciudad: 'Barcelona',
            pais: 'España',
            descripcion: 'Programa de movilidad académica internacional enfocado en estudiantes de ingeniería que deseen realizar un semestre en la Universidad de Barcelona, fortaleciendo su formación académica y experiencia internacional.',
            inicioConvocatoria: '2025-01-15',
            cierreConvocatoria: '2025-06-15',
            inicioPrograma: '2025-09-01',
            duracion: 1,
            requisitosGenerales: '• Ser estudiante activo de la universidad\n• Promedio académico mínimo de 3.5\n• No tener sanciones disciplinarias\n• Nivel de idioma intermedio',
            requisitosAcademicos: '• Haber aprobado al menos el 50% de los créditos del programa\n• Certificación de idioma (B2 o superior)\n• Carta de motivación\n• Hoja de vida académica',
            documentosConvocatoria: '• Formulario de inscripción\n• Fotocopia del documento de identidad\n• Certificado de notas\n• Certificación de idiomas\n• Carta de recomendación',
            procesoPreseleccion: 'La preselección se realizará en dos fases:\n1. Evaluación documental (60%)\n2. Entrevista personal (40%)\n\nLos candidatos preseleccionados serán notificados vía correo electrónico.',
            cronograma: '• Apertura: 15 de enero de 2025\n• Cierre de inscripciones: 15 de marzo de 2025\n• Preselección: 20-30 de marzo de 2025\n• Entrevistas: 1-15 de abril de 2025\n• Resultados finales: 30 de abril de 2025',
            aclaracionesReclamaciones: 'Los estudiantes podrán realizar aclaraciones o reclamaciones durante los 5 días hábiles posteriores a la publicación de resultados a través del correo movilidad@universidad.edu',
            financiacion: 'La convocatoria ofrece:\n• Beca completa de matrícula\n• Auxilio de manutención mensual de €800\n• Seguro médico internacional\n• Tiquete aéreo ida y vuelta',
            mayorInformacion: 'Oficina de Relaciones Internacionales\nCorreo: internacional@universidad.edu\nTeléfono: +57 (1) 234 5678\nWhatsApp: +57 300 123 4567\nSitio web: www.universidad.edu/internacional',
            estado: 'abierta'
        },
        2: {
            id: 2,
            nombre: 'Intercambio Latinoamérica 2025',
            convenio: 'bilateral',
            programa: 'administracion',
            ciudad: 'Buenos Aires',
            pais: 'Argentina',
            descripcion: 'Programa de intercambio académico con la Universidad de Buenos Aires, permitiendo a estudiantes de administración enriquecer su experiencia académica y cultural.',
            inicioConvocatoria: '2025-02-01',
            cierreConvocatoria: '2025-07-30',
            inicioPrograma: '2025-08-15',
            duracion: 0.5,
            requisitosGenerales: '• Estudiante de pregrado activo\n• Promedio mínimo de 3.8\n• Carta de motivación\n• Nivel de español nativo o avanzado',
            requisitosAcademicos: '• Mínimo 100 créditos aprobados\n• No tener materias pendientes\n• Certificado de buena conducta\n• Referencias académicas',
            documentosConvocatoria: '• Solicitud completa\n• Documento de identidad\n• Certificados académicos\n• Cartas de recomendación (2)\n• Ensayo motivacional',
            procesoPreseleccion: 'Proceso de selección basado en méritos académicos y entrevista. Los mejores puntajes tendrán prioridad en la asignación de cupos.',
            cronograma: '• Apertura: 1 de febrero de 2025\n• Cierre: 30 de mayo de 2025\n• Evaluación: junio 2025\n• Resultados: 15 de julio de 2025',
            aclaracionesReclamaciones: 'Período de reclamaciones: 10 días hábiles después de publicación de resultados. Contacto: reclamaciones@universidad.edu',
            financiacion: 'Financiación parcial:\n• Matrícula cubierta por convenio\n• Apoyo mensual de $1,500 USD\n• Seguro médico incluido',
            mayorInformacion: 'Departamento de Intercambios\nEmail: intercambios@universidad.edu\nTel: +57 (1) 345 6789',
            estado: 'abierta'
        }
    };
    
    const data = convocatoriaData[id] || convocatoriaData[1];
    
    // Rellenar el formulario con los datos actuales
    document.getElementById('editConvocatoriaId').value = data.id;
    document.getElementById('editNombreConvocatoria').value = data.nombre;
    document.getElementById('editConvenioUniversitario').value = data.convenio;
    document.getElementById('editProgramaCurricular').value = data.programa;
    document.getElementById('editCiudad').value = data.ciudad;
    document.getElementById('editPais').value = data.pais;
    document.getElementById('editDescripcionOferta').value = data.descripcion;
    document.getElementById('editInicioConvocatoria').value = data.inicioConvocatoria;
    document.getElementById('editCierreConvocatoria').value = data.cierreConvocatoria;
    document.getElementById('editInicioPrograma').value = data.inicioPrograma;
    document.getElementById('editDuracion').value = data.duracion;
    document.getElementById('editRequisitosGenerales').value = data.requisitosGenerales;
    document.getElementById('editRequisitosAcademicos').value = data.requisitosAcademicos;
    document.getElementById('editDocumentosConvocatoria').value = data.documentosConvocatoria;
    document.getElementById('editProcesoPreseleccion').value = data.procesoPreseleccion;
    document.getElementById('editCronograma').value = data.cronograma;
    document.getElementById('editAclaracionesReclamaciones').value = data.aclaracionesReclamaciones;
    document.getElementById('editFinanciacion').value = data.financiacion;
    document.getElementById('editMayorInformacion').value = data.mayorInformacion;
    document.getElementById('editEstado').value = data.estado;
    
    // Abrir el modal
    const modal = document.getElementById('editConvocatoriaModal');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    document.body.style.overflow = 'hidden';
}

function closeEditConvocatoriaModal() {
    const modal = document.getElementById('editConvocatoriaModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        document.getElementById('editConvocatoriaForm').reset();
    }, 300);
    
    document.body.style.overflow = '';
}

function toggleConvocatoriaStatus(id) {
    console.log('Cambiar estado de convocatoria:', id);
    
    // Datos de ejemplo - En producción vendrían del backend
    const convocatoriaData = {
        1: {
            id: 1,
            nombre: 'Movilidad Académica Europa 2025-1',
            universidad: 'Universidad de Barcelona',
            estadoActual: 'abierta'
        }
    };
    
    const data = convocatoriaData[id] || convocatoriaData[1];
    
    // Rellenar el modal con los datos
    document.getElementById('toggleConvocatoriaId').value = data.id;
    document.getElementById('toggleConvocatoriaName').textContent = data.nombre;
    document.getElementById('toggleConvocatoriaUniversidad').textContent = data.universidad;
    
    // Configurar el badge de estado actual
    const estadoActualBadge = document.getElementById('toggleConvocatoriaEstadoActual');
    estadoActualBadge.textContent = data.estadoActual.charAt(0).toUpperCase() + data.estadoActual.slice(1);
    estadoActualBadge.className = `status-badge ${data.estadoActual === 'abierta' ? 'active' : data.estadoActual === 'cerrada' ? 'inactive' : 'pending'}`;
    
    // Resetear el ícono al ícono por defecto
    const statusIcon = document.getElementById('toggleStatusIcon');
    statusIcon.innerHTML = '<i class="fas fa-exchange-alt"></i>';
    statusIcon.className = 'status-icon';
    
    // Resetear el selector y ocultar advertencia
    document.getElementById('nuevoEstado').value = '';
    document.getElementById('statusWarning').style.display = 'none';

    // Ocultar los botones de acción al abrir el modal
    const statusFormActions = document.querySelector('.status-form-actions');
    if (statusFormActions) {
        statusFormActions.style.display = 'none';
    }

    // Abrir el modal
    const modal = document.getElementById('toggleConvocatoriaStatusModal');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    document.body.style.overflow = 'hidden';
}

function closeToggleStatusModal() {
    const modal = document.getElementById('toggleConvocatoriaStatusModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        
        // Resetear el selector
        document.getElementById('nuevoEstado').value = '';
        
        // Ocultar advertencia
        document.getElementById('statusWarning').style.display = 'none';
        
        // Resetear el ícono al estado por defecto
        const statusIcon = document.getElementById('toggleStatusIcon');
        statusIcon.innerHTML = '<i class="fas fa-exchange-alt"></i>';
        statusIcon.className = 'status-icon';
        
        // Resetear el título
        document.getElementById('toggleStatusTitle').textContent = 'Cambiar Estado';
        
        // Resetear el botón de confirmar
        const confirmBtn = document.getElementById('confirmStatusBtn');
        confirmBtn.className = 'primary-btn';
        confirmBtn.innerHTML = '<i class="fas fa-check"></i><span id="confirmStatusText">Cambiar Estado</span>';
        
        // Ocultar los botones de acción
        const statusFormActions = document.querySelector('.status-form-actions');
        if (statusFormActions) {
            statusFormActions.style.display = 'none';
        }
    }, 300);
    
    document.body.style.overflow = '';
}

function confirmStatusChange() {
    const convocatoriaId = document.getElementById('toggleConvocatoriaId').value;
    const nuevoEstado = document.getElementById('nuevoEstado').value;
    
    if (!nuevoEstado) {
        alert('Por favor selecciona el nuevo estado de la convocatoria');
        return;
    }
    
    const data = {
        convocatoriaId: convocatoriaId,
        nuevoEstado: nuevoEstado,
    };
    
    console.log('Cambiar estado de convocatoria:', data);
    
    // Aquí iría la lógica para enviar los datos al backend
    alert(`Estado de la convocatoria cambiado a: ${nuevoEstado.toUpperCase()} (Por implementar conexión con backend)`);
    closeToggleStatusModal();
    
    // Recargar la página o actualizar la tabla
    // location.reload();
}

function deleteConvocatoria(id) {
    console.log('Abrir modal de eliminación para convocatoria:', id);
    
    // Datos de ejemplo - En producción vendrían del backend
    const convocatoriaData = {
        1: {
            id: 1,
            nombre: 'Movilidad Académica Europa 2025-1',
            universidad: 'Universidad de Barcelona',
            estado: 'Abierta'
        },
        2: {
            id: 2,
            nombre: 'Intercambio Latinoamérica 2025',
            universidad: 'Universidad de Buenos Aires',
            estado: 'Abierta'
        }
    };
    
    const data = convocatoriaData[id] || convocatoriaData[1];
    
    // Rellenar el modal con los datos
    document.getElementById('deleteConvocatoriaId').value = data.id;
    document.getElementById('deleteConvocatoriaName').textContent = data.nombre;
    document.getElementById('deleteConvocatoriaUniversidad').textContent = data.universidad;
    
    // Configurar el badge de estado
    const estadoBadge = document.getElementById('deleteConvocatoriaEstado');
    estadoBadge.textContent = data.estado;
    estadoBadge.className = `status-badge ${data.estado.toLowerCase() === 'abierta' ? 'active' : data.estado.toLowerCase() === 'cerrada' ? 'inactive' : 'pending'}`;
    
    // Abrir el modal
    const modal = document.getElementById('deleteConvocatoriaModal');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    document.body.style.overflow = 'hidden';
}

function closeDeleteConvocatoriaModal() {
    const modal = document.getElementById('deleteConvocatoriaModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    
    document.body.style.overflow = '';
}

function changeStatusInsteadOfDelete() {
    // Obtener el ID de la convocatoria desde el modal de eliminación
    const convocatoriaId = document.getElementById('deleteConvocatoriaId').value;
    
    // Cerrar el modal de eliminación
    closeDeleteConvocatoriaModal();
    
    // Esperar a que se cierre completamente y abrir el modal de cambio de estado
    setTimeout(() => {
        toggleConvocatoriaStatus(convocatoriaId);
    }, 300);
}

function confirmDeleteConvocatoria() {
    const convocatoriaId = document.getElementById('deleteConvocatoriaId').value;
    const convocatoriaNombre = document.getElementById('deleteConvocatoriaName').textContent;
    
    // Confirmación adicional del navegador
    if (!confirm(`¿Está completamente seguro de que desea eliminar "${convocatoriaNombre}"?\n\nEsta acción es IRREVERSIBLE y eliminará todos los datos asociados.`)) {
        return;
    }
    
    const data = {
        convocatoriaId: convocatoriaId
    };
    
    console.log('Eliminar convocatoria confirmado:', data);
    
    // Aquí iría la lógica para enviar la solicitud de eliminación al backend
    alert(`Convocatoria "${convocatoriaNombre}" eliminada exitosamente (Por implementar conexión con backend)`);
    closeDeleteConvocatoriaModal();
    
    // Recargar la página o actualizar la tabla
    // location.reload();
}

// Calcular días restantes (función auxiliar)
function calculateDaysRemaining(endDate) {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
        return 'Finalizado';
    } else if (diffDays === 0) {
        return 'Último día';
    } else {
        return `${diffDays} días`;
    }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de convocatorias cargada');
    
    // Aquí se pueden inicializar más funcionalidades
    // como cargar datos desde el backend, etc.
});
