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

// Funciones para las acciones de universidad
function viewUniversity(universityId) {
    // Datos de ejemplo para las universidades con la nueva estructura
    const universityData = {
        1: {
            id: 1,
            universityName: "Universidad Nacional de Colombia",
            universityCountry: "Colombia",
            universityCity: "Bogotá",
            contactName: "Dr. Carlos Martínez",
            contactPhone: "+57 1 316 5000",
            contactEmail: "carlos.martinez@unal.edu.co",
            agreementName: "Convenio de Intercambio Académico UNAL-Internacional",
            agreementType: "intercambio",
            agreementStatus: "activo",
            agreementStartDate: "2024-01-15",
            agreementEndDate: "2026-01-15",
            agreementDocument: "convenio_unal_2024.pdf",
            originCoordinator: "1",
            destinationCoordinator: "Dr. Carlos Eduardo López",
            registrationDate: "2023-01-15",
            lastUpdate: "2024-01-10"
        },
        2: {
            id: 2,
            universityName: "Universidad del Valle",
            universityCountry: "Colombia",
            universityCity: "Cali",
            contactName: "Dra. Ana María González",
            contactPhone: "+57 2 321 2100",
            contactEmail: "ana.gonzalez@univalle.edu.co",
            agreementName: "Convenio de Movilidad Estudiantil",
            agreementType: "movilidad_estudiantes",
            agreementStatus: "activo",
            agreementStartDate: "2023-08-01",
            agreementEndDate: "2025-08-01",
            agreementDocument: "convenio_univalle_2023.pdf",
            originCoordinator: "2",
            destinationCoordinator: "Dr. Mario Rivera",
            registrationDate: "2023-02-20",
            lastUpdate: "2024-01-08"
        },
        3: {
            id: 3,
            universityName: "Universidad de los Andes",
            universityCountry: "Colombia",
            universityCity: "Bogotá",
            contactName: "Dr. Fernando Vargas",
            contactPhone: "+57 1 339 4949",
            contactEmail: "fernando.vargas@uniandes.edu.co",
            agreementName: "Convenio de Doble Titulación",
            agreementType: "doble_titulacion",
            agreementStatus: "revision",
            agreementStartDate: "2024-03-01",
            agreementEndDate: "2026-03-01",
            agreementDocument: "convenio_uniandes_2024.pdf",
            originCoordinator: "3",
            destinationCoordinator: "Dra. Laura Mendoza",
            registrationDate: "2023-01-10",
            lastUpdate: "2024-01-12"
        },
        4: {
            id: 4,
            universityName: "Instituto Tecnológico de Monterrey",
            universityCountry: "México",
            universityCity: "Monterrey",
            contactName: "Dr. Roberto Hernández",
            contactPhone: "+52 81 8358 2000",
            contactEmail: "roberto.hernandez@tec.mx",
            agreementName: "Convenio de Investigación Conjunta",
            agreementType: "investigacion",
            agreementStatus: "firmado",
            agreementStartDate: "2024-06-01",
            agreementEndDate: "2027-06-01",
            agreementDocument: "convenio_tec_2024.pdf",
            originCoordinator: "4",
            destinationCoordinator: "Dr. Luis García",
            registrationDate: "2023-05-15",
            lastUpdate: "2023-12-20"
        },
        5: {
            id: 5,
            universityName: "Universidad de Buenos Aires",
            universityCountry: "Argentina",
            universityCity: "Buenos Aires",
            contactName: "Dra. Patricia López",
            contactPhone: "+54 11 5285 8900",
            contactEmail: "patricia.lopez@uba.ar",
            agreementName: "Convenio de Movilidad Docente",
            agreementType: "movilidad_docentes",
            agreementStatus: "activo",
            agreementStartDate: "2023-09-01",
            agreementEndDate: "2025-09-01",
            agreementDocument: "convenio_uba_2023.pdf",
            originCoordinator: "5",
            destinationCoordinator: "Dr. Miguel Torres",
            registrationDate: "2023-03-01",
            lastUpdate: "2024-01-05"
        }
    };

    const university = universityData[universityId];
    if (university) {
        populateViewUniversityModal(university);
        openViewUniversityModal();
    } else {
        alert('Universidad no encontrada');
    }
}

function populateViewUniversityModal(university) {
    // Información básica del header
    document.getElementById('viewUniversityTitle').textContent = `Detalles - ${university.universityName}`;
    document.getElementById('viewUniversityName').textContent = university.universityName;
    document.getElementById('viewUniversityEmail').textContent = university.contactEmail;
    
    // Avatar con iniciales
    const avatar = document.getElementById('viewUniversityAvatar');
    const initials = university.universityName.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
    avatar.textContent = initials;
    
    // Badges de tipo y estado del convenio
    const typeElement = document.getElementById('viewAgreementType');
    const statusElement = document.getElementById('viewAgreementStatus');
    
    // Mapear tipos de convenio
    const agreementTypeMap = {
        'intercambio': 'Intercambio académico',
        'doble_titulacion': 'Doble titulación',
        'investigacion': 'Investigación conjunta',
        'movilidad_estudiantes': 'Movilidad de estudiantes',
        'movilidad_docentes': 'Movilidad de docentes',
        'cooperacion_academica': 'Cooperación académica',
        'practicas': 'Prácticas profesionales',
        'otros': 'Otros'
    };
    
    // Mapear estados de convenio
    const agreementStatusMap = {
        'negociacion': 'En negociación',
        'borrador': 'Borrador',
        'revision': 'En revisión',
        'aprobacion': 'Pendiente de aprobación',
        'firmado': 'Firmado',
        'activo': 'Activo',
        'suspendido': 'Suspendido',
        'vencido': 'Vencido',
        'renovacion': 'En renovación'
    };
    
    typeElement.textContent = agreementTypeMap[university.agreementType] || university.agreementType;
    statusElement.textContent = agreementStatusMap[university.agreementStatus] || university.agreementStatus;
    
    // Clases CSS para los badges
    typeElement.className = 'role-badge student';
    statusElement.className = `status-badge ${university.agreementStatus === 'activo' ? 'active' : 
                                              university.agreementStatus === 'revision' ? 'pending' : 
                                              university.agreementStatus === 'vencido' ? 'inactive' : 'pending'}`;
    
    // Información de la Universidad
    document.getElementById('viewUniversityFullName').textContent = university.universityName;
    document.getElementById('viewUniversityCountry').textContent = university.universityCountry;
    document.getElementById('viewUniversityCity').textContent = university.universityCity;
    
    // Contacto en la universidad de destino
    document.getElementById('viewContactName').textContent = university.contactName;
    document.getElementById('viewContactPhone').textContent = university.contactPhone;
    document.getElementById('viewContactEmail').textContent = university.contactEmail;
    
    // Detalles del convenio
    document.getElementById('viewAgreementName').textContent = university.agreementName;
    document.getElementById('viewAgreementTypeDetail').textContent = agreementTypeMap[university.agreementType];
    document.getElementById('viewAgreementStartDate').textContent = university.agreementStartDate;
    document.getElementById('viewAgreementEndDate').textContent = university.agreementEndDate;
    
    // Documento del convenio
    const documentElement = document.getElementById('viewAgreementDocument');
    if (university.agreementDocument) {
        documentElement.innerHTML = `
            <a href="#" onclick="downloadDocument('${university.agreementDocument}')" class="document-link">
                <i class="fas fa-file-pdf"></i> ${university.agreementDocument}
            </a>
        `;
    } else {
        documentElement.textContent = 'Sin documento';
    }
    
    // Coordinadores del Convenio
    const coordinatorMap = {
        '1': 'Dr. Juan Carlos Martínez - Facultad de Ingeniería',
        '2': 'Dra. María Elena García - Facultad de Ciencias',
        '3': 'Dr. Carlos Alberto López - Facultad de Medicina',
        '4': 'Dra. Ana Sofia Rodríguez - Facultad de Humanidades',
        '5': 'Dr. Roberto Hernández - Oficina de Relaciones Internacionales'
    };
    
    document.getElementById('viewOriginCoordinator').textContent = coordinatorMap[university.originCoordinator] || 'No asignado';
    document.getElementById('viewDestinationCoordinator').textContent = university.destinationCoordinator;
    
    // Información adicional
    document.getElementById('viewRegistrationDate').textContent = university.registrationDate;
    document.getElementById('viewLastUpdate').textContent = university.lastUpdate;
    
    // Calcular días restantes
    const endDate = new Date(university.agreementEndDate);
    const today = new Date();
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    document.getElementById('viewDaysRemaining').textContent = diffDays > 0 ? `${diffDays} días` : 'Vencido';
}

function openViewUniversityModal() {
    const modal = document.getElementById('viewUniversityModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeViewUniversityModal() {
    const modal = document.getElementById('viewUniversityModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

function editUniversityFromModal() {
    closeViewUniversityModal();
    // Obtener el ID de la universidad desde el modal de vista
    const universityTitle = document.getElementById('viewUniversityTitle').textContent;
    // Extraer ID de alguna manera o usar un atributo data
    editUniversity(1); // Por simplicidad, usando ID 1
}

function editUniversity(universityId) {
    // Obtener los datos de la universidad (usando los mismos datos de ejemplo)
    const universityData = {
        1: {
            id: 1,
            universityName: "Universidad Nacional de Colombia",
            universityCountry: "colombia",
            universityCity: "Bogotá",
            contactName: "Dr. Carlos Martínez",
            contactPhone: "+57 1 316 5000",
            contactEmail: "carlos.martinez@unal.edu.co",
            agreementName: "Convenio de Intercambio Académico UNAL-Internacional",
            agreementType: "intercambio",
            agreementStatus: "activo",
            agreementStartDate: "2024-01-15",
            agreementEndDate: "2026-01-15",
            agreementDocument: "convenio_unal_2024.pdf",
            originCoordinator: "1",
            destinationCoordinator: "Dr. Carlos Eduardo López"
        },
        2: {
            id: 2,
            universityName: "Universidad del Valle",
            universityCountry: "colombia",
            universityCity: "Cali",
            contactName: "Dra. Ana María González",
            contactPhone: "+57 2 321 2100",
            contactEmail: "ana.gonzalez@univalle.edu.co",
            agreementName: "Convenio de Movilidad Estudiantil",
            agreementType: "movilidad_estudiantes",
            agreementStatus: "activo",
            agreementStartDate: "2023-08-01",
            agreementEndDate: "2025-08-01",
            agreementDocument: "convenio_univalle_2023.pdf",
            originCoordinator: "2",
            destinationCoordinator: "Dr. Mario Rivera"
        },
        3: {
            id: 3,
            universityName: "Universidad de los Andes",
            universityCountry: "colombia",
            universityCity: "Bogotá",
            contactName: "Dr. Fernando Vargas",
            contactPhone: "+57 1 339 4949",
            contactEmail: "fernando.vargas@uniandes.edu.co",
            agreementName: "Convenio de Doble Titulación",
            agreementType: "doble_titulacion",
            agreementStatus: "revision",
            agreementStartDate: "2024-03-01",
            agreementEndDate: "2026-03-01",
            agreementDocument: "convenio_uniandes_2024.pdf",
            originCoordinator: "3",
            destinationCoordinator: "Dra. Laura Mendoza"
        }
    };

    const university = universityData[universityId];
    if (university) {
        populateEditUniversityModal(university);
        openEditUniversityModal();
    } else {
        alert('Universidad no encontrada');
    }
}

function populateEditUniversityModal(university) {
    // Actualizar título
    document.getElementById('editUniversityTitle').textContent = `Editar - ${university.universityName}`;
    
    // Llenar todos los campos con los datos de la universidad
    document.getElementById('editUniversityId').value = university.id;
    
    // Información de la Universidad
    document.getElementById('editUniversityName').value = university.universityName || '';
    document.getElementById('editUniversityCountry').value = university.universityCountry || '';
    document.getElementById('editUniversityCity').value = university.universityCity || '';
    
    // Contacto en la universidad de destino
    document.getElementById('editContactName').value = university.contactName || '';
    document.getElementById('editContactPhone').value = university.contactPhone || '';
    document.getElementById('editContactEmail').value = university.contactEmail || '';
    
    // Detalles del convenio
    document.getElementById('editAgreementName').value = university.agreementName || '';
    document.getElementById('editAgreementType').value = university.agreementType || '';
    document.getElementById('editAgreementStatus').value = university.agreementStatus || '';
    document.getElementById('editAgreementStartDate').value = university.agreementStartDate || '';
    document.getElementById('editAgreementEndDate').value = university.agreementEndDate || '';
    
    // Coordinadores del Convenio
    document.getElementById('editOriginCoordinator').value = university.originCoordinator || '';
    document.getElementById('editDestinationCoordinator').value = university.destinationCoordinator || '';
    
    // Mostrar documento actual
    const currentDocElement = document.getElementById('currentDocumentName');
    if (currentDocElement && university.agreementDocument) {
        currentDocElement.textContent = university.agreementDocument;
    }
}

function openEditUniversityModal() {
    const modal = document.getElementById('editUniversityModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeEditUniversityModal() {
    const modal = document.getElementById('editUniversityModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

function populateToggleStatusModal(university) {
    const isActive = university.status === 'active';
    const action = isActive ? 'deactivate' : 'activate';
    
    // Actualizar título y contenido según el estado actual
    const title = document.getElementById('toggleStatusTitle');
    const icon = document.getElementById('toggleStatusIcon');
    const warning = document.getElementById('statusWarning');
    const warningTitle = document.getElementById('warningTitle');
    const warningMessage = document.getElementById('warningMessage');
    const confirmBtn = document.getElementById('confirmStatusBtn');
    const confirmText = document.getElementById('confirmStatusText');
    
    // Información de la universidad
    document.getElementById('toggleUniversityName').textContent = university.name;
    document.getElementById('toggleUniversityEmail').textContent = university.email;
    
    // Avatar con iniciales
    const avatar = document.getElementById('toggleUniversityAvatar');
    avatar.textContent = university.acronym || university.name.substring(0, 2).toUpperCase();
    
    // Badge de tipo
    const typeElement = document.getElementById('toggleUniversityType');
    typeElement.className = `role-badge ${university.type === 'publica' ? 'student' : 'admin'}`;
    typeElement.textContent = university.type === 'publica' ? 'Pública' : 'Privada';
    
    if (isActive) {
        title.textContent = 'Desactivar Universidad';
        icon.innerHTML = '<i class="fas fa-power-off"></i>';
        icon.className = 'status-icon deactivate';
        warning.className = 'status-warning danger';
        warningTitle.textContent = '¿Estás seguro de desactivar esta universidad?';
        warningMessage.textContent = 'Al desactivar la universidad, no estará disponible para nuevos registros pero mantendrá los datos existentes.';
        confirmBtn.className = 'danger-btn';
        confirmText.textContent = 'Desactivar Universidad';
    } else {
        title.textContent = 'Activar Universidad';
        icon.innerHTML = '<i class="fas fa-check"></i>';
        icon.className = 'status-icon activate';
        warning.className = 'status-warning success';
        warningTitle.textContent = '¿Confirmas la activación de esta universidad?';
        warningMessage.textContent = 'Al activar la universidad, estará disponible para nuevos registros y será visible en el sistema.';
        confirmBtn.className = 'success-btn';
        confirmText.textContent = 'Activar Universidad';
    }
    
    // Limpiar el campo de motivo
    document.getElementById('statusReason').value = '';
    
    // Configurar el evento del botón de confirmación
    confirmBtn.onclick = () => confirmToggleStatus(university.id, action);
}

function confirmToggleStatus(universityId, action) {
    const reason = document.getElementById('statusReason').value;
    const actionText = action === 'activate' ? 'activada' : 'desactivada';
    
    // Aquí puedes agregar la lógica para enviar la petición al servidor
    console.log(`Universidad ${universityId} ${actionText}`, { reason });
    
    alert(`Universidad ${actionText} exitosamente${reason ? '. Motivo: ' + reason : ''}`);
    closeToggleStatusModal();
    
    // Aquí podrías actualizar la tabla o recargar los datos
}

function deleteUniversity(universityId) {
    // Obtener los datos de la universidad
    const universityData = {
        1: {
            id: 1,
            name: "Universidad Nacional de Colombia",
            acronym: "UNAL",
            email: "contacto@unal.edu.co",
            type: "publica",
            status: "active"
        },
        2: {
            id: 2,
            name: "Universidad del Valle",
            acronym: "UV",
            email: "info@univalle.edu.co",
            type: "publica",
            status: "active"
        },
        3: {
            id: 3,
            name: "Universidad de los Andes",
            acronym: "UA",
            email: "admisiones@uniandes.edu.co",
            type: "privada",
            status: "active"
        }
    };

    const university = universityData[universityId];
    if (university) {
        populateDeleteUniversityModal(university);
        openDeleteUniversityModal();
    } else {
        alert('Universidad no encontrada');
    }
}

function populateDeleteUniversityModal(university) {
    // Información de la universidad
    document.getElementById('deleteUniversityName').textContent = university.name;
    document.getElementById('deleteUniversityEmail').textContent = university.email;
    
    // Avatar con iniciales
    const avatar = document.getElementById('deleteUniversityAvatar');
    avatar.textContent = university.acronym || university.name.substring(0, 2).toUpperCase();
    
    // Resetear formulario
    document.getElementById('confirmUnderstand').checked = false;
    document.getElementById('confirmIrreversible').checked = false;
    document.getElementById('deleteConfirmText').value = '';
    document.getElementById('deleteReason').value = '';
    
    // Configurar el botón de confirmación
    const confirmBtn = document.getElementById('confirmDeleteBtn');
    confirmBtn.onclick = () => confirmDeleteUniversity(university.id);
    
    // Configurar validación en tiempo real
    setupDeleteValidation();
}

function setupDeleteValidation() {
    const checkboxes = [
        document.getElementById('confirmUnderstand'),
        document.getElementById('confirmIrreversible')
    ];
    const confirmText = document.getElementById('deleteConfirmText');
    const reasonText = document.getElementById('deleteReason');
    const confirmBtn = document.getElementById('confirmDeleteBtn');
    
    function validateForm() {
        const allChecked = checkboxes.every(cb => cb.checked);
        const textValid = confirmText.value.trim().toUpperCase() === 'ELIMINAR';
        const reasonValid = reasonText.value.trim().length > 10;
        
        const isValid = allChecked && textValid && reasonValid;
        confirmBtn.disabled = !isValid;
        
        // Agregar clases de validación
        confirmText.classList.toggle('valid', textValid);
    }
    
    // Agregar event listeners
    checkboxes.forEach(cb => cb.addEventListener('change', validateForm));
    confirmText.addEventListener('input', validateForm);
    reasonText.addEventListener('input', validateForm);
    
    // Validación inicial
    validateForm();
}

function openDeleteUniversityModal() {
    const modal = document.getElementById('deleteUniversityModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeDeleteUniversityModal() {
    const modal = document.getElementById('deleteUniversityModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

function confirmDeleteUniversity(universityId) {
    const reason = document.getElementById('deleteReason').value;
    
    // Aquí puedes agregar la lógica para enviar la petición al servidor
    console.log(`Universidad ${universityId} eliminada`, { reason });
    
    alert(`Universidad eliminada exitosamente. Motivo: ${reason}`);
    closeDeleteUniversityModal();
    
    // Aquí podrías actualizar la tabla o recargar los datos
}

// Función para abrir modal de nueva universidad
function openNewUniversityModal() {
    const modal = document.getElementById('newUniversityModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Limpiar formulario
        document.getElementById('newUniversityForm').reset();
    }
}

// Función para cerrar modal de nueva universidad
function closeNewUniversityModal() {
    const modal = document.getElementById('newUniversityModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        document.body.style.overflow = '';
    }
}

// Cerrar modal al hacer clic fuera de él
document.addEventListener('click', function(event) {
    const modals = [
        'newUniversityModal',
        'viewUniversityModal', 
        'editUniversityModal',
        'deleteUniversityModal'
    ];
    
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal && event.target === modal) {
            modal.style.display = 'none';
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
});

// Validación del formulario de nueva universidad
document.addEventListener('DOMContentLoaded', function() {
    const newUniversityForm = document.getElementById('newUniversityForm');
    const editUniversityForm = document.getElementById('editUniversityForm');
    
    if (newUniversityForm) {
        newUniversityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(this);
            const universityData = Object.fromEntries(formData);
            
            // Validaciones específicas
            const startDate = new Date(universityData.agreementStartDate);
            const endDate = new Date(universityData.agreementEndDate);
            
            if (startDate >= endDate) {
                alert('La fecha de inicio debe ser anterior a la fecha de finalización');
                return;
            }
            
            // Validar archivo si se seleccionó
            const documentFile = formData.get('agreementDocument');
            if (documentFile && documentFile.size > 0) {
                const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                if (!allowedTypes.includes(documentFile.type)) {
                    alert('Solo se permiten archivos PDF, DOC y DOCX');
                    return;
                }
                if (documentFile.size > 10 * 1024 * 1024) { // 10MB
                    alert('El archivo no puede ser mayor a 10MB');
                    return;
                }
            }
            
            // Aquí puedes agregar validaciones adicionales
            console.log('Nueva universidad con convenio:', universityData);
            
            // Simular guardado exitoso
            alert('Universidad y convenio creados exitosamente');
            closeNewUniversityModal();
            
            // Aquí podrías actualizar la tabla o recargar los datos
        });
    }
    
    if (editUniversityForm) {
        editUniversityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(this);
            const universityData = Object.fromEntries(formData);
            
            // Validaciones específicas
            const startDate = new Date(universityData.agreementStartDate);
            const endDate = new Date(universityData.agreementEndDate);
            
            if (startDate >= endDate) {
                alert('La fecha de inicio debe ser anterior a la fecha de finalización');
                return;
            }
            
            // Validar archivo si se seleccionó uno nuevo
            const documentFile = formData.get('agreementDocument');
            if (documentFile && documentFile.size > 0) {
                const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                if (!allowedTypes.includes(documentFile.type)) {
                    alert('Solo se permiten archivos PDF, DOC y DOCX');
                    return;
                }
                if (documentFile.size > 10 * 1024 * 1024) { // 10MB
                    alert('El archivo no puede ser mayor a 10MB');
                    return;
                }
            }
            
            // Aquí puedes agregar validaciones adicionales
            console.log('Universidad editada:', universityData);
            
            // Simular guardado exitoso
            alert('Universidad y convenio actualizados exitosamente');
            closeEditUniversityModal();
            
            // Aquí podrías actualizar la tabla o recargar los datos
        });
    }
});

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
    const searchTerm = document.getElementById('searchUniversity').value;
    const country = document.getElementById('filterCountry').value;
    const status = document.getElementById('filterStatus').value;
    
    console.log('Aplicando filtros:', { searchTerm, country, status });
    
    // Aquí puedes agregar la lógica para filtrar la tabla
    alert('Filtros aplicados');
}

function clearFilters() {
    document.getElementById('searchUniversity').value = '';
    document.getElementById('filterCountry').value = '';
    document.getElementById('filterStatus').value = '';
    console.log('Filtros limpiados');
}

// Función para descargar documento
function downloadDocument(filename) {
    // Simular descarga de documento
    alert(`Descargando documento: ${filename}`);
    // Aquí podrías implementar la lógica real de descarga
    console.log(`Iniciando descarga de: ${filename}`);
}

// ============================================
// FUNCIONES PARA DROPDOWN DE MÁS ACCIONES
// ============================================

// Cerrar dropdown al hacer clic fuera
document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('actionsDropdownUniversidades');
    const button = document.querySelector('.secondary-btn');
    
    if (dropdown && !dropdown.contains(e.target) && button && !button.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

/**
 * Alterna la visibilidad del dropdown de acciones en universidades
 */
function toggleActionsDropdownUniversidades() {
    const dropdown = document.getElementById('actionsDropdownUniversidades');
    dropdown.classList.toggle('active');
}

/**
 * Función para importar universidades masivamente
 * TODO: Implementar lógica de importación desde archivo (Excel, CSV)
 */
function importarMasivamenteUniversidades() {
    console.log('Importar universidades masivamente - Por implementar');
    
    // Cerrar el dropdown
    const dropdown = document.getElementById('actionsDropdownUniversidades');
    dropdown.classList.remove('active');
    
    // TODO: Abrir modal de importación o selector de archivo
    // Por ahora mostramos un alert como placeholder
    alert('Funcionalidad de Importación Masiva de Universidades\n\nEsta función permitirá:\n• Cargar múltiples universidades desde un archivo Excel o CSV\n• Validar datos (nombres únicos, países, ciudades)\n• Importar información de contacto institucional\n• Cargar convenios asociados automáticamente\n• Validar fechas de vigencia de convenios\n• Asignar coordinadores de convenio\n• Mostrar resumen de importación con errores y éxitos\n\n(Por implementar)');
    
    // Ejemplo de implementación futura:
    // const input = document.createElement('input');
    // input.type = 'file';
    // input.accept = '.xlsx,.xls,.csv';
    // input.onchange = handleFileImportUniversidades;
    // input.click();
}

/**
 * Función para enviar correo masivo a universidades
 * TODO: Implementar modal de envío de correos masivos
 */
function enviarCorreoMasivoUniversidades() {
    console.log('Enviar correo masivo a universidades - Por implementar');
    
    // Cerrar el dropdown
    const dropdown = document.getElementById('actionsDropdownUniversidades');
    dropdown.classList.remove('active');
    
    // TODO: Abrir modal de envío de correos masivos
    // Por ahora mostramos un alert como placeholder
    alert('Funcionalidad de Envío de Correo Masivo\n\nEsta función permitirá:\n• Filtrar universidades por país o región\n• Filtrar por estado de convenio (Activo, Vencido, Por renovar)\n• Enviar a contactos institucionales específicos\n• Notificar sobre vencimiento próximo de convenios\n• Enviar invitaciones para nuevos convenios\n• Compartir información sobre convocatorias disponibles\n• Solicitar documentación o renovación de convenios\n• Crear plantillas de correo institucionales\n• Programar envío de correos\n• Ver historial de comunicaciones\n\n(Por implementar)');
    
    // Ejemplo de implementación futura:
    // openEmailMasivoModalUniversidades();
}

/**
 * Ejemplo de función para manejar la importación de archivos de universidades
 * TODO: Implementar completamente
 */
function handleFileImportUniversidades(event) {
    const file = event.target.files[0];
    
    if (!file) {
        return;
    }
    
    console.log('Archivo de universidades seleccionado:', file.name);
    
    // TODO: Leer y procesar el archivo
    // const reader = new FileReader();
    // reader.onload = function(e) {
    //     const data = e.target.result;
    //     processImportDataUniversidades(data);
    // };
    // reader.readAsArrayBuffer(file);
}

/**
 * Ejemplo de función para procesar datos de importación de universidades
 * TODO: Implementar completamente
 */
function processImportDataUniversidades(data) {
    console.log('Procesando datos de universidades importadas...');
    
    // TODO: Parsear datos según formato (Excel/CSV)
    // TODO: Validar campos requeridos (nombre universidad, país, ciudad, contacto)
    // TODO: Verificar que nombres de universidad sean únicos
    // TODO: Validar formato de contactos (email, teléfono)
    // TODO: Validar datos de convenio si están incluidos
    // TODO: Verificar fechas de vigencia de convenios
    // TODO: Mostrar preview de datos a importar con errores detectados
    // TODO: Enviar al backend para guardado masivo
    // TODO: Generar reporte de importación exitosa
}
