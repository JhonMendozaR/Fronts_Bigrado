// ==========================================
// POSTULACIONES - JavaScript
// ==========================================

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
    
    // Aquí iría la lógica para filtrar la tabla
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
    
    // Cerrar otros dropdowns
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
// FUNCIONES DE POSTULACIONES (Placeholders)
// ==========================================

// Abrir modal de nueva postulación
function openNewApplicationModal() {
    console.log('Abrir modal de nueva postulación');
    alert('Modal de Nueva Postulación (por implementar)');
}

// Ver detalles de postulación
function viewApplication(id) {
    console.log('Ver detalles de postulación:', id);
    alert(`Ver detalles de la postulación ${id} (por implementar)`);
    event.preventDefault();
}

// Editar postulación
function editApplication(id) {
    console.log('Editar postulación:', id);
    alert(`Editar postulación ${id} (por implementar)`);
    event.preventDefault();
}

// Eliminar postulación
function deleteApplication(id) {
    console.log('Eliminar postulación:', id);
    const confirm = window.confirm('¿Estás seguro de eliminar esta postulación?');
    if (confirm) {
        alert(`Postulación ${id} eliminada (por implementar)`);
    }
    event.preventDefault();
}

// ==========================================
// INICIALIZACIÓN
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de Postulaciones cargada');
});
