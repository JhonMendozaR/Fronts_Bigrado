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

// Funciones para las acciones de usuario
function viewUser(userId) {
    // Datos de ejemplo para el usuario
    const userData = {
        1: {
            id: 1,
            firstName: "María",
            lastName: "García López",
            email: "maria.garcia@estudiante.edu.co",
            phone: "+57 320 123 4567",
            idType: "Cédula de Ciudadanía",
            idNumber: "1234567890",
            role: "student",
            status: "active",
            birthDate: "1995-03-15",
            birthPlace: "Bogotá, Colombia",
            gender: "Femenino",
            nationality: "Colombiana",
            address: "Calle 123 #45-67",
            city: "Bogotá",
            department: "Cundinamarca",
            emergencyName: "Carlos García",
            emergencyRelation: "Padre",
            emergencyPhone: "+57 310 987 6543",
            registrationDate: "2023-01-15",
            lastAccess: "2024-01-10 14:30:00",
            accountStatus: "Verificada"
        },
        2: {
            id: 2,
            firstName: "Juan Carlos",
            lastName: "Rodríguez",
            email: "juan.rodriguez@bigrado.com",
            phone: "+57 310 987 6543",
            idType: "Tarjeta de Identidad",
            idNumber: "9876543210",
            role: "admin",
            status: "active",
            birthDate: "1988-07-22",
            birthPlace: "Medellín, Colombia",
            gender: "Masculino",
            nationality: "Colombiana",
            address: "Carrera 50 #30-20",
            city: "Medellín",
            department: "Antioquia",
            emergencyName: "Ana Rodríguez",
            emergencyRelation: "Esposa",
            emergencyPhone: "+57 315 123 4567",
            registrationDate: "2022-05-10",
            lastAccess: "2024-01-11 09:15:00",
            accountStatus: "Verificada"
        },
        3: {
            id: 3,
            firstName: "Ana Sofía",
            lastName: "Martínez",
            email: "ana.martinez@apoyo.edu.co",
            phone: "+57 315 456 7890",
            idType: "Cédula de Ciudadanía",
            idNumber: "1122334455",
            role: "support",
            status: "inactive",
            birthDate: "1990-11-08",
            birthPlace: "Cali, Colombia",
            gender: "Femenino",
            nationality: "Colombiana",
            address: "Avenida 6 #25-40",
            city: "Cali",
            department: "Valle del Cauca",
            emergencyName: "Pedro Martínez",
            emergencyRelation: "Hermano",
            emergencyPhone: "+57 300 111 2222",
            registrationDate: "2023-08-20",
            lastAccess: "2023-12-15 16:45:00",
            accountStatus: "Pendiente de verificación"
        }
    };

    const user = userData[userId];
    if (user) {
        populateViewUserModal(user);
        openViewUserModal();
    } else {
        alert('Usuario no encontrado');
    }
}

function populateViewUserModal(user) {
    // Información básica
    document.getElementById('viewUserTitle').textContent = `Detalles de ${user.firstName} ${user.lastName}`;
    document.getElementById('viewUserName').textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById('viewUserEmail').textContent = user.email;
    
    // Avatar con iniciales
    const avatar = document.getElementById('viewUserAvatar');
    const initials = user.firstName.charAt(0) + user.lastName.charAt(0);
    avatar.textContent = initials;
    
    // Badges de rol y estado
    const roleElement = document.getElementById('viewUserRole');
    const statusElement = document.getElementById('viewUserStatus');
    
    roleElement.className = `role-badge ${user.role}`;
    statusElement.className = `status-badge ${user.status}`;
    
    switch(user.role) {
        case 'admin':
            roleElement.textContent = 'Administrador';
            break;
        case 'student':
            roleElement.textContent = 'Estudiante';
            break;
        case 'support':
            roleElement.textContent = 'Prof. Apoyo';
            break;
    }
    
    statusElement.textContent = user.status === 'active' ? 'Activo' : 'Inactivo';
    
    // Información personal
    document.getElementById('viewFirstName').textContent = user.firstName;
    document.getElementById('viewLastName').textContent = user.lastName;
    document.getElementById('viewIdType').textContent = user.idType;
    document.getElementById('viewIdNumber').textContent = user.idNumber;
    document.getElementById('viewBirthDate').textContent = user.birthDate;
    document.getElementById('viewBirthPlace').textContent = user.birthPlace;
    document.getElementById('viewGender').textContent = user.gender;
    document.getElementById('viewNationality').textContent = user.nationality;
    
    // Información de contacto
    document.getElementById('viewAddress').textContent = user.address;
    document.getElementById('viewCity').textContent = user.city;
    document.getElementById('viewDepartment').textContent = user.department;
    document.getElementById('viewEmail').textContent = user.email;
    document.getElementById('viewPhone').textContent = user.phone;
    
    // Contacto de emergencia
    document.getElementById('viewEmergencyName').textContent = user.emergencyName;
    document.getElementById('viewEmergencyRelation').textContent = user.emergencyRelation;
    document.getElementById('viewEmergencyPhone').textContent = user.emergencyPhone;
    
    // Información del sistema
    document.getElementById('viewRegistrationDate').textContent = user.registrationDate;
    document.getElementById('viewLastAccess').textContent = user.lastAccess;
    document.getElementById('viewAccountStatus').textContent = user.accountStatus;
    document.getElementById('viewUserId').textContent = `#${user.id.toString().padStart(4, '0')}`;
}

function openViewUserModal() {
    const modal = document.getElementById('viewUserModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeViewUserModal() {
    const modal = document.getElementById('viewUserModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        document.body.style.overflow = '';
    }
}

function editUserFromModal() {
    closeViewUserModal();
    // Obtener el ID del usuario desde el modal de vista
    const userId = document.getElementById('viewUserId').textContent.replace('#', '').replace(/^0+/, '');
    editUser(parseInt(userId));
}

function editUser(userId) {
    // Obtener los datos del usuario (usando los mismos datos de ejemplo)
    const userData = {
        1: {
            id: 1,
            firstName: "María",
            lastName: "García López",
            email: "maria.garcia@estudiante.edu.co",
            phone: "+57 320 123 4567",
            idType: "cc",
            idNumber: "1234567890",
            role: "student",
            status: "active",
            birthDate: "1995-03-15",
            birthPlace: "Bogotá, Colombia",
            gender: "femenino",
            nationality: "Colombiana",
            address: "Calle 123 #45-67",
            city: "Bogotá",
            department: "Cundinamarca",
            emergencyName: "Carlos García",
            emergencyRelation: "Padre",
            emergencyPhone: "+57 310 987 6543"
        },
        2: {
            id: 2,
            firstName: "Juan Carlos",
            lastName: "Rodríguez",
            email: "juan.rodriguez@bigrado.com",
            phone: "+57 310 987 6543",
            idType: "ti",
            idNumber: "9876543210",
            role: "admin",
            status: "active",
            birthDate: "1988-07-22",
            birthPlace: "Medellín, Colombia",
            gender: "masculino",
            nationality: "Colombiana",
            address: "Carrera 50 #30-20",
            city: "Medellín",
            department: "Antioquia",
            emergencyName: "Ana Rodríguez",
            emergencyRelation: "Esposa",
            emergencyPhone: "+57 315 123 4567"
        },
        3: {
            id: 3,
            firstName: "Ana Sofía",
            lastName: "Martínez",
            email: "ana.martinez@apoyo.edu.co",
            phone: "+57 315 456 7890",
            idType: "cc",
            idNumber: "1122334455",
            role: "support",
            status: "inactive",
            birthDate: "1990-11-08",
            birthPlace: "Cali, Colombia",
            gender: "femenino",
            nationality: "Colombiana",
            address: "Avenida 6 #25-40",
            city: "Cali",
            department: "Valle del Cauca",
            emergencyName: "Pedro Martínez",
            emergencyRelation: "Hermano",
            emergencyPhone: "+57 300 111 2222"
        }
    };

    const user = userData[userId];
    if (user) {
        populateEditUserModal(user);
        openEditUserModal();
    } else {
        alert('Usuario no encontrado');
    }
}

function populateEditUserModal(user) {
    // Actualizar título
    document.getElementById('editUserTitle').textContent = `Editar Usuario - ${user.firstName} ${user.lastName}`;
    
    // Llenar todos los campos con los datos del usuario
    document.getElementById('editUserId').value = user.id;
    document.getElementById('editRole').value = user.role;
    document.getElementById('editFirstName').value = user.firstName;
    document.getElementById('editLastName').value = user.lastName;
    document.getElementById('editIdType').value = user.idType;
    document.getElementById('editIdNumber').value = user.idNumber;
    document.getElementById('editBirthDate').value = user.birthDate;
    document.getElementById('editBirthPlace').value = user.birthPlace;
    document.getElementById('editGender').value = user.gender;
    document.getElementById('editNationality').value = user.nationality;
    document.getElementById('editAddress').value = user.address;
    document.getElementById('editCity').value = user.city;
    document.getElementById('editDepartment').value = user.department;
    document.getElementById('editEmail').value = user.email;
    document.getElementById('editPhone').value = user.phone;
    document.getElementById('editEmergencyName').value = user.emergencyName;
    document.getElementById('editEmergencyRelation').value = user.emergencyRelation;
    document.getElementById('editEmergencyPhone').value = user.emergencyPhone;
    
    // Limpiar campos de contraseña
    document.getElementById('editPassword').value = '';
    document.getElementById('editConfirmPassword').value = '';
}

function openEditUserModal() {
    const modal = document.getElementById('editUserModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeEditUserModal() {
    const modal = document.getElementById('editUserModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        document.body.style.overflow = '';
    }
}

// Alternar visibilidad de contraseña en el modal de edición
function toggleEditUserPassword(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (input && icon) {
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
}

function toggleUserStatus(userId) {
    // Obtener los datos del usuario (usando los mismos datos de ejemplo)
    const userData = {
        1: {
            id: 1,
            firstName: "María",
            lastName: "García López",
            email: "maria.garcia@estudiante.edu.co",
            role: "student",
            status: "active"
        },
        2: {
            id: 2,
            firstName: "Juan Carlos",
            lastName: "Rodríguez",
            email: "juan.rodriguez@bigrado.com",
            role: "admin",
            status: "active"
        },
        3: {
            id: 3,
            firstName: "Ana Sofía",
            lastName: "Martínez",
            email: "ana.martinez@apoyo.edu.co",
            role: "support",
            status: "inactive"
        }
    };

    const user = userData[userId];
    if (user) {
        populateToggleStatusModal(user);
        openToggleStatusModal();
    } else {
        alert('Usuario no encontrado');
    }
}

function populateToggleStatusModal(user) {
    const isActive = user.status === 'active';
    const action = isActive ? 'deactivate' : 'activate';
    
    // Actualizar título y contenido según el estado actual
    const title = document.getElementById('toggleStatusTitle');
    const icon = document.getElementById('toggleStatusIcon');
    const warning = document.getElementById('statusWarning');
    const warningTitle = document.getElementById('warningTitle');
    const warningMessage = document.getElementById('warningMessage');
    const warningContent = warning.querySelector('.warning-content');
    const warningIconElement = warning.querySelector('.warning-icon');
    const confirmBtn = document.getElementById('confirmStatusBtn');
    const confirmText = document.getElementById('confirmStatusText');
    
    // Información del usuario
    document.getElementById('toggleUserName').textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById('toggleUserEmail').textContent = user.email;
    
    // Avatar con iniciales
    const avatar = document.getElementById('toggleUserAvatar');
    const initials = user.firstName.charAt(0) + user.lastName.charAt(0);
    avatar.textContent = initials;
    
    // Badge de rol
    const roleElement = document.getElementById('toggleUserRole');
    roleElement.className = `role-badge ${user.role}`;
    switch(user.role) {
        case 'admin':
            roleElement.textContent = 'Administrador';
            break;
        case 'student':
            roleElement.textContent = 'Estudiante';
            break;
        case 'support':
            roleElement.textContent = 'Prof. Apoyo';
            break;
    }
    
    if (isActive) {
        // Configurar para desactivar
        title.textContent = 'Desactivar Usuario';
        icon.innerHTML = '<i class="fas fa-user-slash"></i>';
        icon.className = 'status-icon deactivate';
        
        warning.className = 'status-warning';
        warningIconElement.className = 'warning-icon';
        warningContent.className = 'warning-content';
        warningTitle.textContent = '¿Estás seguro de desactivar este usuario?';
        warningMessage.textContent = 'Al desactivar este usuario, no podrá acceder al sistema hasta que sea activado nuevamente. Todas sus sesiones activas serán cerradas.';
        
        confirmBtn.className = 'alternative-btn';
        confirmBtn.innerHTML = '<i class="fas fa-user-slash"></i><span>Desactivar Usuario</span>';
    } else {
        // Configurar para activar
        title.textContent = 'Activar Usuario';
        icon.innerHTML = '<i class="fas fa-user-check"></i>';
        icon.className = 'status-icon activate';
        
        warning.className = 'status-warning success';
        warningIconElement.className = 'warning-icon success';
        warningContent.className = 'warning-content success';
        warningTitle.textContent = '¿Confirmas la activación de este usuario?';
        warningMessage.textContent = 'Al activar este usuario, podrá acceder al sistema nuevamente y utilizar todas las funcionalidades según su rol asignado.';
        
        confirmBtn.className = 'success-btn';
        confirmBtn.innerHTML = '<i class="fas fa-user-check"></i><span>Activar Usuario</span>';
    }
    
    // Limpiar el campo de motivo
    document.getElementById('statusReason').value = '';
    
    // Configurar el evento del botón de confirmación
    confirmBtn.onclick = () => confirmToggleStatus(user.id, action);
}

function openToggleStatusModal() {
    const modal = document.getElementById('toggleUserStatusModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeToggleStatusModal() {
    const modal = document.getElementById('toggleUserStatusModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        document.body.style.overflow = '';
    }
}

function confirmToggleStatus(userId, action) {
    const reason = document.getElementById('statusReason').value;
    const actionText = action === 'activate' ? 'activado' : 'desactivado';
    
    // Aquí puedes agregar la lógica para enviar la petición al servidor
    console.log(`Usuario ${userId} ${actionText}`, { reason });
    
    alert(`Usuario ${actionText} exitosamente${reason ? '. Motivo: ' + reason : ''}`);
    closeToggleStatusModal();
    
    // Aquí podrías actualizar la tabla o recargar los datos
}

function deleteUser(userId) {
    // Obtener los datos del usuario (usando los mismos datos de ejemplo)
    const userData = {
        1: {
            id: 1,
            firstName: "María",
            lastName: "García López",
            email: "maria.garcia@estudiante.edu.co",
            role: "student",
            status: "active"
        },
        2: {
            id: 2,
            firstName: "Juan Carlos",
            lastName: "Rodríguez",
            email: "juan.rodriguez@bigrado.com",
            role: "admin",
            status: "active"
        },
        3: {
            id: 3,
            firstName: "Ana Sofía",
            lastName: "Martínez",
            email: "ana.martinez@apoyo.edu.co",
            role: "support",
            status: "inactive"
        }
    };

    const user = userData[userId];
    if (user) {
        populateDeleteUserModal(user);
        openDeleteUserModal();
    } else {
        alert('Usuario no encontrado');
    }
}

function populateDeleteUserModal(user) {
    // Información del usuario
    document.getElementById('deleteUserName').textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById('deleteUserEmail').textContent = user.email;
    
    // Avatar con iniciales
    const avatar = document.getElementById('deleteUserAvatar');
    const initials = user.firstName.charAt(0) + user.lastName.charAt(0);
    avatar.textContent = initials;
    
    // Badge de rol
    const roleElement = document.getElementById('deleteUserRole');
    roleElement.className = `role-badge ${user.role}`;
    switch(user.role) {
        case 'admin':
            roleElement.textContent = 'Administrador';
            break;
        case 'student':
            roleElement.textContent = 'Estudiante';
            break;
        case 'support':
            roleElement.textContent = 'Prof. Apoyo';
            break;
    }
    
    // Resetear formulario
    document.getElementById('confirmUnderstand').checked = false;
    document.getElementById('confirmIrreversible').checked = false;
    document.getElementById('deleteConfirmText').value = '';
    document.getElementById('deleteReason').value = '';
    
    // Configurar el botón de confirmación
    const confirmBtn = document.getElementById('confirmDeleteBtn');
    confirmBtn.onclick = () => confirmDeleteUser(user.id);
    
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
        const textMatches = confirmText.value.toUpperCase() === 'ELIMINAR';
        const hasReason = reasonText.value.trim().length >= 10;
        
        // Actualizar estilo del campo de texto
        if (confirmText.value) {
            confirmText.classList.toggle('valid', textMatches);
        } else {
            confirmText.classList.remove('valid');
        }
        
        // Habilitar/deshabilitar botón
        confirmBtn.disabled = !(allChecked && textMatches && hasReason);
    }
    
    // Agregar event listeners
    checkboxes.forEach(cb => cb.addEventListener('change', validateForm));
    confirmText.addEventListener('input', validateForm);
    reasonText.addEventListener('input', validateForm);
    
    // Validación inicial
    validateForm();
}

function openDeleteUserModal() {
    const modal = document.getElementById('deleteUserModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeDeleteUserModal() {
    const modal = document.getElementById('deleteUserModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        document.body.style.overflow = '';
    }
}

function confirmDeleteUser(userId) {
    const reason = document.getElementById('deleteReason').value;
    
    // Confirmación final
    if (confirm('⚠️ ÚLTIMA CONFIRMACIÓN\n\n¿Estás ABSOLUTAMENTE SEGURO de eliminar este usuario?\n\nEsta acción NO SE PUEDE DESHACER.')) {
        // Aquí puedes agregar la lógica para enviar la petición al servidor
        console.log(`Usuario ${userId} eliminado permanentemente`, { reason });
        
        alert(`Usuario eliminado permanentemente.\nMotivo: ${reason}`);
        closeDeleteUserModal();
        
        // Aquí podrías actualizar la tabla o recargar los datos
        // Por ejemplo: removeUserFromTable(userId);
    }
}

function suggestDeactivate() {
    closeDeleteUserModal();
    alert('💡 Recomendación: En lugar de eliminar, considera desactivar el usuario.\n\nEsto preservará los datos pero impedirá el acceso al sistema.');
    // Opcional: abrir directamente el modal de desactivar
    // toggleUserStatus(userId);
}

// Función para abrir modal de nuevo usuario
function openNewUserModal() {
    const modal = document.getElementById('newUserModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        // Limpiar formulario
        const form = document.getElementById('newUserForm');
        if (form) form.reset();
    }
}

// Función para cerrar modal de nuevo usuario
function closeNewUserModal() {
    const modal = document.getElementById('newUserModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        document.body.style.overflow = '';
    }
}

// Alternar visibilidad de contraseña en el modal de nuevo usuario
function toggleNewUserPassword(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (input && icon) {
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
}

// Cerrar modal al hacer clic fuera de él
document.addEventListener('click', function(event) {
    const newUserModal = document.getElementById('newUserModal');
    const viewUserModal = document.getElementById('viewUserModal');
    const editUserModal = document.getElementById('editUserModal');
    const toggleStatusModal = document.getElementById('toggleUserStatusModal');
    const deleteUserModal = document.getElementById('deleteUserModal');
    
    if (newUserModal && event.target === newUserModal) {
        closeNewUserModal();
    }
    
    if (viewUserModal && event.target === viewUserModal) {
        closeViewUserModal();
    }
    
    if (editUserModal && event.target === editUserModal) {
        closeEditUserModal();
    }
    
    if (toggleStatusModal && event.target === toggleStatusModal) {
        closeToggleStatusModal();
    }
    
    if (deleteUserModal && event.target === deleteUserModal) {
        closeDeleteUserModal();
    }
});

// Validación del formulario de nuevo usuario
document.addEventListener('DOMContentLoaded', function() {
    const newUserForm = document.getElementById('newUserForm');
    if (newUserForm) {
        newUserForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden');
                return;
            }
            
            // Aquí puedes agregar más validaciones
            alert('Usuario creado exitosamente');
            closeNewUserModal();
        });
    }

    // Validación del formulario de edición de usuario
    const editUserForm = document.getElementById('editUserForm');
    if (editUserForm) {
        editUserForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('editPassword').value;
            const confirmPassword = document.getElementById('editConfirmPassword').value;
            
            // Solo validar contraseñas si se han ingresado
            if (password || confirmPassword) {
                if (password !== confirmPassword) {
                    alert('Las contraseñas no coinciden');
                    return;
                }
                if (password.length < 6) {
                    alert('La contraseña debe tener al menos 6 caracteres');
                    return;
                }
            }
            
            // Aquí puedes agregar más validaciones y lógica para guardar
            const userId = document.getElementById('editUserId').value;
            alert(`Usuario #${userId} actualizado exitosamente`);
            closeEditUserModal();
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
    const search = document.getElementById('search').value;
    const role = document.getElementById('role-filter').value;
    const status = document.getElementById('status-filter').value;
    
    console.log('Aplicar filtros:', { search, role, status });
    // Aquí implementarías la lógica de filtrado
}

function clearFilters() {
    document.getElementById('search').value = '';
    document.getElementById('role-filter').value = '';
    document.getElementById('status-filter').value = '';
    console.log('Filtros limpiados');
}

// ============================================
// FUNCIONES PARA DROPDOWN DE MÁS ACCIONES
// ============================================

// Cerrar dropdown al hacer clic fuera
document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('actionsDropdownUsuarios');
    const button = document.querySelector('.secondary-btn');
    
    if (dropdown && !dropdown.contains(e.target) && button && !button.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

/**
 * Alterna la visibilidad del dropdown de acciones en usuarios
 */
function toggleActionsDropdownUsuarios() {
    const dropdown = document.getElementById('actionsDropdownUsuarios');
    dropdown.classList.toggle('active');
}

/**
 * Función para importar usuarios masivamente
 * TODO: Implementar lógica de importación desde archivo (Excel, CSV)
 */
function importarMasivamenteUsuarios() {
    console.log('Importar usuarios masivamente - Por implementar');
    
    // Cerrar el dropdown
    const dropdown = document.getElementById('actionsDropdownUsuarios');
    dropdown.classList.remove('active');
    
    // TODO: Abrir modal de importación o selector de archivo
    // Por ahora mostramos un alert como placeholder
    alert('Funcionalidad de Importación Masiva de Usuarios\n\nEsta función permitirá:\n• Cargar múltiples usuarios desde un archivo Excel o CSV\n• Validar datos (correos, documentos únicos, roles válidos)\n• Asignar roles automáticamente (Estudiante, Admin, Apoyo)\n• Generar contraseñas temporales\n• Enviar correos de bienvenida con credenciales\n• Mostrar resumen de importación con errores y éxitos\n\n(Por implementar)');
    
    // Ejemplo de implementación futura:
    // const input = document.createElement('input');
    // input.type = 'file';
    // input.accept = '.xlsx,.xls,.csv';
    // input.onchange = handleFileImportUsuarios;
    // input.click();
}

/**
 * Función para enviar correo masivo a usuarios
 * TODO: Implementar modal de envío de correos masivos
 */
function enviarCorreoMasivoUsuarios() {
    console.log('Enviar correo masivo a usuarios - Por implementar');
    
    // Cerrar el dropdown
    const dropdown = document.getElementById('actionsDropdownUsuarios');
    dropdown.classList.remove('active');
    
    // TODO: Abrir modal de envío de correos masivos
    // Por ahora mostramos un alert como placeholder
    alert('Funcionalidad de Envío de Correo Masivo\n\nEsta función permitirá:\n• Filtrar usuarios por rol (Estudiantes, Admins, Profesionales de Apoyo)\n• Filtrar por estado (Activos, Inactivos, Suspendidos)\n• Seleccionar destinatarios específicos o todos\n• Crear plantillas de correo personalizadas\n• Incluir información de acceso y credenciales\n• Notificar sobre cambios en el sistema\n• Enviar recordatorios de actualización de perfil\n• Programar envío de correos\n• Ver historial de envíos y tasas de apertura\n\n(Por implementar)');
    
    // Ejemplo de implementación futura:
    // openEmailMasivoModalUsuarios();
}

/**
 * Ejemplo de función para manejar la importación de archivos de usuarios
 * TODO: Implementar completamente
 */
function handleFileImportUsuarios(event) {
    const file = event.target.files[0];
    
    if (!file) {
        return;
    }
    
    console.log('Archivo de usuarios seleccionado:', file.name);
    
    // TODO: Leer y procesar el archivo
    // const reader = new FileReader();
    // reader.onload = function(e) {
    //     const data = e.target.result;
    //     processImportDataUsuarios(data);
    // };
    // reader.readAsArrayBuffer(file);
}

/**
 * Ejemplo de función para procesar datos de importación de usuarios
 * TODO: Implementar completamente
 */
function processImportDataUsuarios(data) {
    console.log('Procesando datos de usuarios importados...');
    
    // TODO: Parsear datos según formato (Excel/CSV)
    // TODO: Validar campos requeridos (nombre, email, documento, rol)
    // TODO: Verificar que correos y documentos sean únicos
    // TODO: Validar roles válidos del sistema
    // TODO: Generar contraseñas seguras temporales
    // TODO: Mostrar preview de datos a importar con errores detectados
    // TODO: Enviar al backend para guardado masivo
    // TODO: Enviar correos de bienvenida con credenciales
}
