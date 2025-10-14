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
    console.log('Abrir modal de nueva convocatoria');
    alert('Modal de Nueva Convocatoria (Por implementar)');
}

function viewConvocatoria(id) {
    console.log('Ver detalles de convocatoria:', id);
    alert(`Ver detalles de la convocatoria ${id} (Por implementar)`);
}

function editConvocatoria(id) {
    console.log('Editar convocatoria:', id);
    alert(`Editar convocatoria ${id} (Por implementar)`);
}

function toggleConvocatoriaStatus(id) {
    console.log('Cambiar estado de convocatoria:', id);
    alert(`Cambiar estado de la convocatoria ${id} (Por implementar)`);
}

function deleteConvocatoria(id) {
    console.log('Eliminar convocatoria:', id);
    alert(`Eliminar convocatoria ${id} (Por implementar)`);
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
