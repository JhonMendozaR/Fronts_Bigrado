// ==========================================
// POSTULACIONES - JavaScript
// ==========================================

// Datos de ejemplo de estudiantes (simulación)
const mockStudents = [
    {
        id: 1,
        firstName: 'María',
        lastName: 'García López',
        email: 'maria.garcia@estudiante.edu.co',
        idType: 'CC',
        idNumber: '1234567890',
        phone: '+57 320 123 4567',
        birthDate: '15/03/2000',
        birthPlace: 'Bogotá, Colombia',
        gender: 'Femenino',
        nationality: 'Colombiana',
        address: 'Calle 123 #45-67',
        city: 'Bogotá',
        department: 'Cundinamarca',
        emergencyName: 'Pedro García',
        emergencyRelation: 'Padre',
        emergencyPhone: '+57 310 555 1234',
        status: 'Activo'
    },
    {
        id: 2,
        firstName: 'Carlos',
        lastName: 'Pérez Martínez',
        email: 'carlos.perez@estudiante.edu.co',
        idType: 'TI',
        idNumber: '9876543210',
        phone: '+57 315 987 6543',
        birthDate: '22/08/2001',
        birthPlace: 'Medellín, Colombia',
        gender: 'Masculino',
        nationality: 'Colombiana',
        address: 'Carrera 45 #12-34',
        city: 'Medellín',
        department: 'Antioquia',
        emergencyName: 'Ana Martínez',
        emergencyRelation: 'Madre',
        emergencyPhone: '+57 301 555 5678',
        status: 'Activo'
    },
    {
        id: 3,
        firstName: 'Laura',
        lastName: 'Sánchez Gómez',
        email: 'laura.sanchez@estudiante.edu.co',
        idType: 'CC',
        idNumber: '1122334455',
        phone: '+57 318 456 7890',
        birthDate: '10/05/1999',
        birthPlace: 'Cali, Colombia',
        gender: 'Femenino',
        nationality: 'Colombiana',
        address: 'Avenida 6 #20-30',
        city: 'Cali',
        department: 'Valle del Cauca',
        emergencyName: 'Roberto Sánchez',
        emergencyRelation: 'Padre',
        emergencyPhone: '+57 312 555 9012',
        status: 'Activo'
    },
    {
        id: 4,
        firstName: 'Diego',
        lastName: 'Rodríguez Castro',
        email: 'diego.rodriguez@estudiante.edu.co',
        idType: 'CC',
        idNumber: '5544332211',
        phone: '+57 316 234 5678',
        birthDate: '18/11/2002',
        birthPlace: 'Barranquilla, Colombia',
        gender: 'Masculino',
        nationality: 'Colombiana',
        address: 'Calle 80 #50-25',
        city: 'Barranquilla',
        department: 'Atlántico',
        emergencyName: 'Carmen Castro',
        emergencyRelation: 'Madre',
        emergencyPhone: '+57 305 555 3456',
        status: 'Activo'
    }
];

let selectedStudent = null;

// Toggle filtros
function toggleFilters() {
    const filtersSection = document.getElementById('filtersSection');
    const filterBtn = document.querySelector('.filter-toggle-btn');
    
    if (filtersSection.style.display === 'none') {
        filtersSection.style.display = 'block';
        filterBtn.classList.add('active');
    } else {
        filtersSection.style.display = 'none';
        filterBtn.classList.remove('active');
    }
}

// Aplicar filtros
function applyFilters() {
    const searchStudent = document.getElementById('search-student').value;
    const convocatoriaFilter = document.getElementById('convocatoria-filter').value;
    const statusFilter = document.getElementById('status-filter').value;
    
    console.log('Aplicando filtros:', {
        estudiante: searchStudent,
        convocatoria: convocatoriaFilter,
        estado: statusFilter
    });
    
    alert('Filtros aplicados correctamente');
}

// Limpiar filtros
function clearFilters() {
    document.getElementById('search-student').value = '';
    document.getElementById('convocatoria-filter').value = '';
    document.getElementById('status-filter').value = '';
    
    console.log('Filtros limpiados');
    alert('Filtros limpiados');
}

// Toggle dropdown de acciones
function toggleDropdown(button) {
    const dropdown = button.nextElementSibling;
    const allDropdowns = document.querySelectorAll('.actions-dropdown');
    
    allDropdowns.forEach(d => {
        if (d !== dropdown) {
            d.classList.remove('show');
        }
    });
    
    dropdown.classList.toggle('show');
}

// Cerrar dropdowns al hacer clic fuera
document.addEventListener('click', function(event) {
    if (!event.target.closest('.actions-menu')) {
        const allDropdowns = document.querySelectorAll('.actions-dropdown');
        allDropdowns.forEach(d => d.classList.remove('show'));
    }
});

// ==========================================
// FUNCIONES DEL MODAL DE NUEVA POSTULACIÓN
// ==========================================

// Abrir modal de nueva postulación
function openNewApplicationModal() {
    const modal = document.getElementById('newApplicationModal');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    resetApplicationForm();
    console.log('Modal de nueva postulación abierto');
}

// Cerrar modal de nueva postulación
function closeNewApplicationModal() {
    const modal = document.getElementById('newApplicationModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        resetApplicationForm();
    }, 300);
    console.log('Modal de nueva postulación cerrado');
}

// Resetear formulario
function resetApplicationForm() {
    document.getElementById('newApplicationForm').reset();
    document.getElementById('studentSearch').value = '';
    document.getElementById('studentSearch').disabled = false; // Asegurar que el campo esté habilitado al inicio
    document.getElementById('studentSearchResults').style.display = 'none';
    document.getElementById('selectedStudentCard').style.display = 'none';
    document.getElementById('convocatoria').disabled = true;
    document.getElementById('submitApplicationBtn').disabled = true;
    hideStudentDetails();
    selectedStudent = null;
}

// Buscar estudiantes
function searchStudents(query) {
    const resultsContainer = document.getElementById('studentSearchResults');
    
    if (query.trim().length < 2) {
        resultsContainer.style.display = 'none';
        return;
    }
    
    const searchLower = query.toLowerCase();
    const results = mockStudents.filter(student => 
        student.firstName.toLowerCase().includes(searchLower) ||
        student.lastName.toLowerCase().includes(searchLower) ||
        student.email.toLowerCase().includes(searchLower) ||
        student.idNumber.includes(searchLower)
    );
    
    displaySearchResults(results);
}

// Mostrar resultados de búsqueda
function displaySearchResults(results) {
    const resultsContainer = document.getElementById('studentSearchResults');
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results-message">No se encontraron estudiantes</div>';
        resultsContainer.style.display = 'block';
        return;
    }
    
    let html = '';
    results.forEach(student => {
        const initials = student.firstName.charAt(0) + student.lastName.charAt(0);
        html += `
            <div class="student-result-item" onclick="selectStudent(${student.id})">
                <div class="avatar-small">${initials}</div>
                <div class="student-result-info">
                    <h5>${student.firstName} ${student.lastName}</h5>
                    <p>${student.email} • ${student.idType}. ${student.idNumber}</p>
                </div>
            </div>
        `;
    });
    
    resultsContainer.innerHTML = html;
    resultsContainer.style.display = 'block';
}

// Seleccionar estudiante
function selectStudent(studentId) {
    selectedStudent = mockStudents.find(s => s.id === studentId);
    
    if (!selectedStudent) return;
    
    // Ocultar resultados de búsqueda
    document.getElementById('studentSearchResults').style.display = 'none';
    
    // Mostrar tarjeta de estudiante seleccionado
    const initials = selectedStudent.firstName.charAt(0) + selectedStudent.lastName.charAt(0);
    document.getElementById('selectedStudentAvatar').textContent = initials;
    document.getElementById('selectedStudentName').textContent = `${selectedStudent.firstName} ${selectedStudent.lastName}`;
    document.getElementById('selectedStudentEmail').textContent = selectedStudent.email;
    document.getElementById('selectedStudentCard').style.display = 'flex';
    
    // Guardar ID del estudiante
    document.getElementById('selectedStudentId').value = studentId;
    
    // Deshabilitar campo de búsqueda para evitar seleccionar otro estudiante
    document.getElementById('studentSearch').disabled = true;
    
    // Habilitar select de convocatoria y botón
    document.getElementById('convocatoria').disabled = false;
    document.getElementById('submitApplicationBtn').disabled = false;
    
    console.log('Estudiante seleccionado:', selectedStudent);
}

// Cambiar estudiante
function changeStudent() {
    document.getElementById('selectedStudentCard').style.display = 'none';
    document.getElementById('studentSearch').value = '';
    document.getElementById('studentSearch').disabled = false; // Rehabilitar el campo de búsqueda
    document.getElementById('studentSearch').focus();
    document.getElementById('convocatoria').disabled = true;
    document.getElementById('convocatoria').value = '';
    document.getElementById('submitApplicationBtn').disabled = true;
    hideStudentDetails();
    selectedStudent = null;
}

// Mostrar detalles del estudiante
function showStudentDetails() {
    if (!selectedStudent) return;
    
    // Llenar datos en el panel de detalles
    const initials = selectedStudent.firstName.charAt(0) + selectedStudent.lastName.charAt(0);
    document.getElementById('detailsStudentAvatar').textContent = initials;
    document.getElementById('detailsStudentName').textContent = `${selectedStudent.firstName} ${selectedStudent.lastName}`;
    document.getElementById('detailsStudentEmail').textContent = selectedStudent.email;
    
    document.getElementById('detailsFirstName').textContent = selectedStudent.firstName;
    document.getElementById('detailsLastName').textContent = selectedStudent.lastName;
    document.getElementById('detailsIdType').textContent = selectedStudent.idType;
    document.getElementById('detailsIdNumber').textContent = selectedStudent.idNumber;
    document.getElementById('detailsBirthDate').textContent = selectedStudent.birthDate;
    document.getElementById('detailsBirthPlace').textContent = selectedStudent.birthPlace;
    document.getElementById('detailsGender').textContent = selectedStudent.gender;
    document.getElementById('detailsNationality').textContent = selectedStudent.nationality;
    
    document.getElementById('detailsAddress').textContent = selectedStudent.address;
    document.getElementById('detailsCity').textContent = selectedStudent.city;
    document.getElementById('detailsDepartment').textContent = selectedStudent.department;
    document.getElementById('detailsPhone').textContent = selectedStudent.phone;
    
    document.getElementById('detailsEmergencyName').textContent = selectedStudent.emergencyName;
    document.getElementById('detailsEmergencyRelation').textContent = selectedStudent.emergencyRelation;
    document.getElementById('detailsEmergencyPhone').textContent = selectedStudent.emergencyPhone;
    
    // Mostrar panel deslizable
    const mainPanel = document.getElementById('mainApplicationPanel');
    const detailsPanel = document.getElementById('studentDetailsPanel');
    
    detailsPanel.classList.add('active');
    mainPanel.classList.add('shifted');
}

// Ocultar detalles del estudiante
function hideStudentDetails() {
    const mainPanel = document.getElementById('mainApplicationPanel');
    const detailsPanel = document.getElementById('studentDetailsPanel');
    
    mainPanel.classList.remove('shifted');
    detailsPanel.classList.remove('active');
}

// Manejar envío del formulario
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newApplicationForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!selectedStudent) {
                alert('Por favor, seleccione un estudiante');
                return;
            }
            
            const convocatoria = document.getElementById('convocatoria').value;
            
            if (!convocatoria) {
                alert('Por favor, seleccione una convocatoria');
                return;
            }
            
            const data = {
                studentId: selectedStudent.id,
                studentName: `${selectedStudent.firstName} ${selectedStudent.lastName}`,
                convocatoriaId: convocatoria,
                fecha: new Date().toISOString()
            };
            
            console.log('Datos de la postulación:', data);
            alert('Postulación creada exitosamente (simulación)');
            
            closeNewApplicationModal();
        });
    }
});

// ==========================================
// FUNCIONES DEL MODAL DE VER DETALLES
// ==========================================

// Datos de ejemplo de postulaciones (simulación)
const mockApplications = {
    1: {
        id: 1,
        student: {
            name: 'María García López',
            email: 'maria.garcia@estudiante.edu.co',
            document: '1234567890',
            initials: 'MG',
            universidad: 'Universidad Nacional de Colombia',
            programa: 'Ingeniería de Sistemas',
            semestre: '6º Semestre',
            promedio: '4.5 / 5.0'
        },
        convocatoria: {
            nombre: 'Becas de Excelencia 2025',
            tipo: 'Becas de Excelencia',
            apertura: '01/01/2025',
            cierre: '31/03/2025'
        },
        fechaPostulacion: '15/01/2025',
        fechaActualizacion: '20/01/2025',
        status: 'aprobada',
        statusLabel: 'Aprobada',
        observaciones: 'Cumple con todos los requisitos académicos. Excelente perfil.'
    },
    2: {
        id: 2,
        student: {
            name: 'Carlos Pérez Martínez',
            email: 'carlos.perez@estudiante.edu.co',
            document: '9876543210',
            initials: 'CP',
            universidad: 'Universidad de Antioquia',
            programa: 'Medicina',
            semestre: '8º Semestre',
            promedio: '4.2 / 5.0'
        },
        convocatoria: {
            nombre: 'Movilidad Internacional 2025',
            tipo: 'Movilidad Internacional',
            apertura: '10/01/2025',
            cierre: '30/04/2025'
        },
        fechaPostulacion: '18/01/2025',
        fechaActualizacion: null,
        status: 'pendiente',
        statusLabel: 'Pendiente',
        observaciones: ''
    },
    3: {
        id: 3,
        student: {
            name: 'Laura Sánchez Gómez',
            email: 'laura.sanchez@estudiante.edu.co',
            document: '1122334455',
            initials: 'LS',
            universidad: 'Universidad del Valle',
            programa: 'Derecho',
            semestre: '4º Semestre',
            promedio: '3.8 / 5.0'
        },
        convocatoria: {
            nombre: 'Apoyo Económico 2025',
            tipo: 'Apoyo Económico',
            apertura: '05/01/2025',
            cierre: '15/02/2025'
        },
        fechaPostulacion: '10/01/2025',
        fechaActualizacion: '22/01/2025',
        status: 'rechazada',
        statusLabel: 'Rechazada',
        observaciones: 'No cumple con el promedio mínimo requerido para esta convocatoria.'
    },
    4: {
        id: 4,
        student: {
            name: 'Diego Rodríguez Castro',
            email: 'diego.rodriguez@estudiante.edu.co',
            document: '5544332211',
            initials: 'DR',
            universidad: 'Universidad del Norte',
            programa: 'Administración de Empresas',
            semestre: '5º Semestre',
            promedio: '4.3 / 5.0'
        },
        convocatoria: {
            nombre: 'Investigación Joven 2025',
            tipo: 'Investigación',
            apertura: '20/01/2025',
            cierre: '30/05/2025'
        },
        fechaPostulacion: '25/01/2025',
        fechaActualizacion: null,
        status: 'pendiente',
        statusLabel: 'Pendiente',
        observaciones: ''
    }
};

// Abrir modal de ver detalles
function openViewApplicationModal(applicationId) {
    const modal = document.getElementById('viewApplicationModal');
    const application = mockApplications[applicationId];
    
    if (!application) {
        alert('Postulación no encontrada');
        return;
    }
    
    // Llenar datos del estudiante
    document.getElementById('viewStudentAvatar').textContent = application.student.initials;
    document.getElementById('viewStudentName').textContent = application.student.name;
    document.getElementById('viewStudentEmail').textContent = application.student.email;
    
    // Llenar datos de la convocatoria
    document.getElementById('viewConvocatoriaNombre').textContent = application.convocatoria.nombre;
    document.getElementById('viewConvocatoriaTipo').textContent = application.convocatoria.tipo;
    document.getElementById('viewConvocatoriaApertura').textContent = application.convocatoria.apertura;
    document.getElementById('viewConvocatoriaCierre').textContent = application.convocatoria.cierre;
    
    // Llenar fechas
    document.getElementById('viewFechaPostulacion').textContent = application.fechaPostulacion;
    document.getElementById('viewFechaActualizacion').textContent = application.fechaActualizacion || 'No actualizada';
    
    // Llenar datos del panel de revisión
    document.getElementById('reviewStudentName').textContent = application.student.name;
    document.getElementById('reviewStudentDoc').textContent = application.student.document;
    document.getElementById('reviewConvocatoria').textContent = application.convocatoria.nombre;
    document.getElementById('reviewFecha').textContent = application.fechaPostulacion;
    
    document.getElementById('reviewUniversidad').textContent = application.student.universidad;
    document.getElementById('reviewPrograma').textContent = application.student.programa;
    document.getElementById('reviewSemestre').textContent = application.student.semestre;
    document.getElementById('reviewPromedio').textContent = application.student.promedio;
    
    // Estado actual
    const statusBadge = document.getElementById('currentStatusBadge');
    statusBadge.textContent = application.statusLabel;
    statusBadge.className = 'status-badge';
    
    if (application.status === 'aprobada') {
        statusBadge.classList.add('active');
    } else if (application.status === 'rechazada') {
        statusBadge.classList.add('inactive');
    } else if (application.status === 'pendiente') {
        statusBadge.classList.add('pending');
    }
    
    document.getElementById('currentObservations').textContent = application.observaciones || 'Sin observaciones';
    
    // Mostrar modal
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Resetear panel de revisión
    hideReviewPanel();
    document.getElementById('reviewForm').reset();
    
    console.log('Modal de detalles abierto para postulación:', applicationId);
}

// Cerrar modal de ver detalles
function closeViewApplicationModal() {
    const modal = document.getElementById('viewApplicationModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        hideReviewPanel();
    }, 300);
    console.log('Modal de detalles cerrado');
}

// Mostrar panel de revisión
function showReviewPanel() {
    const mainPanel = document.getElementById('viewMainPanel');
    const reviewPanel = document.getElementById('reviewPanel');
    
    mainPanel.classList.add('shifted');
    reviewPanel.classList.add('active');
    
    console.log('Panel de revisión mostrado');
}

// Ocultar panel de revisión
function hideReviewPanel() {
    const mainPanel = document.getElementById('viewMainPanel');
    const reviewPanel = document.getElementById('reviewPanel');
    
    mainPanel.classList.remove('shifted');
    reviewPanel.classList.remove('active');
    
    console.log('Panel de revisión ocultado');
}

// Ver detalles de postulación
function viewApplication(id) {
    console.log('Ver detalles de postulación:', id);
    openViewApplicationModal(id);
    event.preventDefault();
}

// Cambiar estado de postulación (abrir directamente el panel de revisión)
function changeApplicationStatus(id) {
    console.log('Cambiar estado de postulación:', id);
    openViewApplicationModal(id);
    
    // Esperar a que el modal se abra y luego mostrar el panel de revisión
    setTimeout(() => {
        showReviewPanel();
    }, 350);
    
    event.preventDefault();
}

// ==========================================
// FUNCIONES DEL MODAL DE EDITAR POSTULACIÓN
// ==========================================

let selectedStudentEdit = null;

// Abrir modal de editar postulación
function openEditApplicationModal(applicationId) {
    const modal = document.getElementById('editApplicationModal');
    const application = mockApplications[applicationId];
    
    if (!application) {
        alert('Postulación no encontrada');
        return;
    }
    
    // Guardar ID de la postulación
    document.getElementById('editApplicationId').value = applicationId;
    
    // Buscar el estudiante en mockStudents
    const student = mockStudents.find(s => 
        `${s.firstName} ${s.lastName}` === application.student.name
    );
    
    if (student) {
        // Seleccionar estudiante automáticamente
        selectedStudentEdit = student;
        selectStudentEdit(student.id, true);
    }
    
    // Pre-seleccionar la convocatoria
    // Extraer el ID de la convocatoria del nombre (simplificado)
    const convocatoriaSelect = document.getElementById('editConvocatoria');
    for (let option of convocatoriaSelect.options) {
        if (option.text === application.convocatoria.nombre) {
            convocatoriaSelect.value = option.value;
            break;
        }
    }
    
    // Mostrar modal
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    console.log('Modal de editar postulación abierto para ID:', applicationId);
}

// Cerrar modal de editar postulación
function closeEditApplicationModal() {
    const modal = document.getElementById('editApplicationModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        resetEditApplicationForm();
    }, 300);
    console.log('Modal de editar postulación cerrado');
}

// Resetear formulario de edición
function resetEditApplicationForm() {
    document.getElementById('editApplicationForm').reset();
    document.getElementById('editStudentSearch').value = '';
    document.getElementById('editStudentSearch').disabled = false;
    document.getElementById('editStudentSearchResults').style.display = 'none';
    document.getElementById('editSelectedStudentCard').style.display = 'none';
    document.getElementById('editConvocatoria').value = '';
    document.getElementById('editSubmitApplicationBtn').disabled = false;
    hideStudentDetailsEdit();
    selectedStudentEdit = null;
}

// Buscar estudiantes para edición
function searchStudentsEdit(query) {
    const resultsContainer = document.getElementById('editStudentSearchResults');
    
    if (query.trim().length < 2) {
        resultsContainer.style.display = 'none';
        return;
    }
    
    const searchLower = query.toLowerCase();
    const results = mockStudents.filter(student => 
        student.firstName.toLowerCase().includes(searchLower) ||
        student.lastName.toLowerCase().includes(searchLower) ||
        student.email.toLowerCase().includes(searchLower) ||
        student.idNumber.includes(searchLower)
    );
    
    displaySearchResultsEdit(results);
}

// Mostrar resultados de búsqueda para edición
function displaySearchResultsEdit(results) {
    const resultsContainer = document.getElementById('editStudentSearchResults');
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results-message">No se encontraron estudiantes</div>';
        resultsContainer.style.display = 'block';
        return;
    }
    
    let html = '';
    results.forEach(student => {
        const initials = student.firstName.charAt(0) + student.lastName.charAt(0);
        html += `
            <div class="student-result-item" onclick="selectStudentEdit(${student.id})">
                <div class="avatar-small">${initials}</div>
                <div class="student-result-info">
                    <h5>${student.firstName} ${student.lastName}</h5>
                    <p>${student.email} • ${student.idType}. ${student.idNumber}</p>
                </div>
            </div>
        `;
    });
    
    resultsContainer.innerHTML = html;
    resultsContainer.style.display = 'block';
}

// Seleccionar estudiante para edición
function selectStudentEdit(studentId, autoSelect = false) {
    selectedStudentEdit = mockStudents.find(s => s.id === studentId);
    
    if (!selectedStudentEdit) return;
    
    // Ocultar resultados de búsqueda
    document.getElementById('editStudentSearchResults').style.display = 'none';
    
    // Mostrar tarjeta de estudiante seleccionado
    const initials = selectedStudentEdit.firstName.charAt(0) + selectedStudentEdit.lastName.charAt(0);
    document.getElementById('editSelectedStudentAvatar').textContent = initials;
    document.getElementById('editSelectedStudentName').textContent = `${selectedStudentEdit.firstName} ${selectedStudentEdit.lastName}`;
    document.getElementById('editSelectedStudentEmail').textContent = selectedStudentEdit.email;
    document.getElementById('editSelectedStudentCard').style.display = 'flex';
    
    // Guardar ID del estudiante
    document.getElementById('editSelectedStudentId').value = studentId;
    
    // Deshabilitar campo de búsqueda
    document.getElementById('editStudentSearch').disabled = true;
    
    // Si es auto-selección (carga inicial), llenar el campo de búsqueda
    if (autoSelect) {
        document.getElementById('editStudentSearch').value = `${selectedStudentEdit.firstName} ${selectedStudentEdit.lastName}`;
    }
    
    console.log('Estudiante seleccionado para edición:', selectedStudentEdit);
}

// Cambiar estudiante en edición
function changeStudentEdit() {
    document.getElementById('editSelectedStudentCard').style.display = 'none';
    document.getElementById('editStudentSearch').value = '';
    document.getElementById('editStudentSearch').disabled = false;
    document.getElementById('editStudentSearch').focus();
    hideStudentDetailsEdit();
    selectedStudentEdit = null;
}

// Mostrar detalles del estudiante en edición
function showStudentDetailsEdit() {
    if (!selectedStudentEdit) return;
    
    // Llenar datos en el panel de detalles
    const initials = selectedStudentEdit.firstName.charAt(0) + selectedStudentEdit.lastName.charAt(0);
    document.getElementById('editDetailsStudentAvatar').textContent = initials;
    document.getElementById('editDetailsStudentName').textContent = `${selectedStudentEdit.firstName} ${selectedStudentEdit.lastName}`;
    document.getElementById('editDetailsStudentEmail').textContent = selectedStudentEdit.email;
    
    document.getElementById('editDetailsFirstName').textContent = selectedStudentEdit.firstName;
    document.getElementById('editDetailsLastName').textContent = selectedStudentEdit.lastName;
    document.getElementById('editDetailsIdType').textContent = selectedStudentEdit.idType;
    document.getElementById('editDetailsIdNumber').textContent = selectedStudentEdit.idNumber;
    document.getElementById('editDetailsBirthDate').textContent = selectedStudentEdit.birthDate;
    document.getElementById('editDetailsBirthPlace').textContent = selectedStudentEdit.birthPlace;
    document.getElementById('editDetailsGender').textContent = selectedStudentEdit.gender;
    document.getElementById('editDetailsNationality').textContent = selectedStudentEdit.nationality;
    
    document.getElementById('editDetailsAddress').textContent = selectedStudentEdit.address;
    document.getElementById('editDetailsCity').textContent = selectedStudentEdit.city;
    document.getElementById('editDetailsDepartment').textContent = selectedStudentEdit.department;
    document.getElementById('editDetailsPhone').textContent = selectedStudentEdit.phone;
    
    document.getElementById('editDetailsEmergencyName').textContent = selectedStudentEdit.emergencyName;
    document.getElementById('editDetailsEmergencyRelation').textContent = selectedStudentEdit.emergencyRelation;
    document.getElementById('editDetailsEmergencyPhone').textContent = selectedStudentEdit.emergencyPhone;
    
    // Mostrar panel deslizable
    const mainPanel = document.getElementById('editMainApplicationPanel');
    const detailsPanel = document.getElementById('editStudentDetailsPanel');
    
    detailsPanel.classList.add('active');
    mainPanel.classList.add('shifted');
}

// Ocultar detalles del estudiante en edición
function hideStudentDetailsEdit() {
    const mainPanel = document.getElementById('editMainApplicationPanel');
    const detailsPanel = document.getElementById('editStudentDetailsPanel');
    
    mainPanel.classList.remove('shifted');
    detailsPanel.classList.remove('active');
}

// Manejar envío del formulario de edición
document.addEventListener('DOMContentLoaded', function() {
    const editForm = document.getElementById('editApplicationForm');
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!selectedStudentEdit) {
                alert('Por favor, seleccione un estudiante');
                return;
            }
            
            const convocatoria = document.getElementById('editConvocatoria').value;
            const applicationId = document.getElementById('editApplicationId').value;
            
            if (!convocatoria) {
                alert('Por favor, seleccione una convocatoria');
                return;
            }
            
            const data = {
                applicationId: applicationId,
                studentId: selectedStudentEdit.id,
                studentName: `${selectedStudentEdit.firstName} ${selectedStudentEdit.lastName}`,
                convocatoriaId: convocatoria,
                fechaActualizacion: new Date().toISOString()
            };
            
            console.log('Datos de la postulación actualizada:', data);
            alert('Postulación actualizada exitosamente (simulación)');
            
            closeEditApplicationModal();
        });
    }
});

// Editar postulación
function editApplication(id) {
    console.log('Editar postulación:', id);
    openEditApplicationModal(id);
    event.preventDefault();
}

// Eliminar postulación
function deleteApplication(id) {
    console.log('Abrir modal de eliminar postulación:', id);
    openDeleteApplicationModal(id);
    event.preventDefault();
}

// ==========================================
// FUNCIONES DEL MODAL DE ELIMINAR POSTULACIÓN
// ==========================================

// Abrir modal de eliminar postulación
function openDeleteApplicationModal(applicationId) {
    const modal = document.getElementById('deleteApplicationModal');
    const application = mockApplications[applicationId];
    
    if (!application) {
        alert('Postulación no encontrada');
        return;
    }
    
    // Guardar ID de la postulación
    document.getElementById('deleteApplicationId').value = applicationId;
    
    // Llenar información de la postulación
    document.getElementById('deleteApplicationAvatar').textContent = application.student.initials;
    document.getElementById('deleteApplicationStudentName').textContent = application.student.name;
    document.getElementById('deleteApplicationConvocatoria').textContent = application.convocatoria.nombre;
    
    // Estado
    const statusBadge = document.getElementById('deleteApplicationEstado');
    statusBadge.textContent = application.statusLabel;
    statusBadge.className = 'status-badge';
    
    if (application.status === 'aprobada') {
        statusBadge.classList.add('active');
    } else if (application.status === 'rechazada') {
        statusBadge.classList.add('inactive');
    } else if (application.status === 'pendiente') {
        statusBadge.classList.add('pending');
    }
    
    // Mostrar modal
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    console.log('Modal de eliminar postulación abierto para ID:', applicationId);
}

// Cerrar modal de eliminar postulación
function closeDeleteApplicationModal() {
    const modal = document.getElementById('deleteApplicationModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    console.log('Modal de eliminar postulación cerrado');
}

// Confirmar eliminación de postulación
function confirmDeleteApplication() {
    const applicationId = document.getElementById('deleteApplicationId').value;
    
    if (!applicationId) {
        alert('Error: ID de postulación no encontrado');
        return;
    }
    
    console.log('Eliminando postulación permanentemente:', applicationId);
    
    // Aquí iría la llamada al backend para eliminar la postulación
    // fetch(`/api/postulaciones/${applicationId}`, { method: 'DELETE' })
    
    // Simulación de eliminación exitosa
    alert(`Postulación ${applicationId} eliminada permanentemente`);
    
    // Cerrar modal
    closeDeleteApplicationModal();
    
    // Aquí se debería actualizar la tabla o recargar los datos
    console.log('Postulación eliminada exitosamente');
}

// Cambiar estado en lugar de eliminar
function changeApplicationStatusInsteadOfDelete() {
    const applicationId = document.getElementById('deleteApplicationId').value;
    
    console.log('Redirigiendo a cambio de estado para postulación:', applicationId);
    
    // Cerrar modal de eliminar
    closeDeleteApplicationModal();
    
    // Esperar a que se cierre el modal de eliminar antes de abrir el de vista
    setTimeout(() => {
        // Abrir modal de vista con el panel de revisión
        openViewApplicationModal(applicationId);
        
        // Esperar a que el modal se abra y luego mostrar el panel de revisión
        setTimeout(() => {
            showReviewPanel();
        }, 350);
    }, 350);
}

// ==========================================
// INICIALIZACIÓN
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de Postulaciones cargada');
    
    // Cerrar modal de nueva postulación al hacer clic fuera del contenido
    const newApplicationModal = document.getElementById('newApplicationModal');
    if (newApplicationModal) {
        newApplicationModal.addEventListener('click', function(e) {
            if (e.target === newApplicationModal) {
                closeNewApplicationModal();
            }
        });
    }
    
    // Cerrar modal de ver detalles al hacer clic fuera del contenido
    const viewApplicationModal = document.getElementById('viewApplicationModal');
    if (viewApplicationModal) {
        viewApplicationModal.addEventListener('click', function(e) {
            if (e.target === viewApplicationModal) {
                closeViewApplicationModal();
            }
        });
    }
    
    // Cerrar modal de editar postulación al hacer clic fuera del contenido
    const editApplicationModal = document.getElementById('editApplicationModal');
    if (editApplicationModal) {
        editApplicationModal.addEventListener('click', function(e) {
            if (e.target === editApplicationModal) {
                closeEditApplicationModal();
            }
        });
    }
    
    // Cerrar modal de eliminar postulación al hacer clic fuera del contenido
    const deleteApplicationModal = document.getElementById('deleteApplicationModal');
    if (deleteApplicationModal) {
        deleteApplicationModal.addEventListener('click', function(e) {
            if (e.target === deleteApplicationModal) {
                closeDeleteApplicationModal();
            }
        });
    }
    
    // Manejar envío del formulario de revisión
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const status = document.getElementById('applicationStatus').value;
            const observations = document.getElementById('applicationObservations').value;
            
            if (!status) {
                alert('Por favor, seleccione un estado');
                return;
            }
            
            if (!observations.trim()) {
                alert('Por favor, ingrese las observaciones');
                return;
            }
            
            const data = {
                status: status,
                observations: observations,
                fecha: new Date().toISOString()
            };
            
            console.log('Datos de revisión:', data);
            
            // Simulación de envío exitoso
            alert('Estado actualizado y notificación enviada al estudiante exitosamente');
            
            // Cerrar modal
            closeViewApplicationModal();
        });
    }

    // Cerrar dropdown al hacer clic fuera
    document.addEventListener('click', function(e) {
        const dropdown = document.getElementById('actionsDropdownPostulaciones');
        const button = document.querySelector('.more-actions-btn');
        
        if (dropdown && !dropdown.contains(e.target) && button && !button.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
});

// ============================================
// FUNCIONES PARA DROPDOWN DE MÁS ACCIONES
// ============================================

/**
 * Alterna la visibilidad del dropdown de acciones en postulaciones
 */
function toggleActionsDropdownPostulaciones() {
    const dropdown = document.getElementById('actionsDropdownPostulaciones');
    dropdown.classList.toggle('active');
}

/**
 * Función para importar postulaciones masivamente
 * TODO: Implementar lógica de importación desde archivo (Excel, CSV)
 */
function importarMasivamentePostulaciones() {
    console.log('Importar postulaciones masivamente - Por implementar');
    
    // Cerrar el dropdown
    const dropdown = document.getElementById('actionsDropdownPostulaciones');
    dropdown.classList.remove('active');
    
    // TODO: Abrir modal de importación o selector de archivo
    // Por ahora mostramos un alert como placeholder
    alert('Funcionalidad de Importación Masiva de Postulaciones\n\nEsta función permitirá:\n• Cargar múltiples postulaciones desde un archivo Excel o CSV\n• Validar datos de estudiantes y convocatorias\n• Asociar automáticamente estudiantes existentes\n• Mostrar resumen de importación con errores y éxitos\n\n(Por implementar)');
    
    // Ejemplo de implementación futura:
    // const input = document.createElement('input');
    // input.type = 'file';
    // input.accept = '.xlsx,.xls,.csv';
    // input.onchange = handleFileImportPostulaciones;
    // input.click();
}

/**
 * Función para enviar correo masivo a postulaciones
 * TODO: Implementar modal de envío de correos masivos
 */
function enviarCorreoMasivoPostulaciones() {
    console.log('Enviar correo masivo a postulaciones - Por implementar');
    
    // Cerrar el dropdown
    const dropdown = document.getElementById('actionsDropdownPostulaciones');
    dropdown.classList.remove('active');
    
    // TODO: Abrir modal de envío de correos masivos
    // Por ahora mostramos un alert como placeholder
    alert('Funcionalidad de Envío de Correo Masivo\n\nEsta función permitirá:\n• Filtrar postulaciones por estado (aprobadas, rechazadas, pendientes, etc.)\n• Seleccionar destinatarios específicos o todos\n• Crear plantillas de correo personalizadas con datos dinámicos\n• Programar envío de correos\n• Ver historial de envíos y tasas de apertura\n• Notificar sobre cambios de estado o solicitudes de documentación\n\n(Por implementar)');
    
    // Ejemplo de implementación futura:
    // openEmailMasivoModalPostulaciones();
}

/**
 * Ejemplo de función para manejar la importación de archivos de postulaciones
 * TODO: Implementar completamente
 */
function handleFileImportPostulaciones(event) {
    const file = event.target.files[0];
    
    if (!file) {
        return;
    }
    
    console.log('Archivo de postulaciones seleccionado:', file.name);
    
    // TODO: Leer y procesar el archivo
    // const reader = new FileReader();
    // reader.onload = function(e) {
    //     const data = e.target.result;
    //     processImportDataPostulaciones(data);
    // };
    // reader.readAsArrayBuffer(file);
}

/**
 * Ejemplo de función para procesar datos de importación de postulaciones
 * TODO: Implementar completamente
 */
function processImportDataPostulaciones(data) {
    console.log('Procesando datos de postulaciones importadas...');
    
    // TODO: Parsear datos según formato (Excel/CSV)
    // TODO: Validar campos requeridos (estudiante, convocatoria, fechas)
    // TODO: Verificar existencia de estudiantes en el sistema
    // TODO: Validar que las convocatorias estén activas
    // TODO: Mostrar preview de datos a importar con errores detectados
    // TODO: Enviar al backend para guardado masivo
}
