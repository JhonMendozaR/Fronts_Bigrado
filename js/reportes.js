// Reportes JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de reportes cargada');
    
    // Cargar componentes
    loadComponents();
});

// Función para cargar componentes (sidebar y topbar)
function loadComponents() {
    // Esta función se ejecuta desde components.js
    if (typeof loadTopbar === 'function') {
        loadTopbar();
    }
    if (typeof loadSidebar === 'function') {
        loadSidebar();
    }
}