// Reportes JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de reportes cargada');
    
    // Cargar componentes
    loadComponents();

    // Inicializar modales de reportes
    initUsuariosReportModal();
    initProgramasReportModal();
    initConveniosReportModal();
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

function initUsuariosReportModal() {
    const trigger = document.getElementById('usuariosReportCard');
    const modal = document.getElementById('usuariosModal');
    const dialog = modal ? modal.querySelector('.report-modal__dialog') : null;
    const closeButtons = modal ? modal.querySelectorAll('[data-close="usuariosModal"]') : [];
    const overlay = modal ? modal.querySelector('.report-modal__overlay') : null;
    const form = document.getElementById('usuariosReportForm');
    const pdfButton = document.getElementById('usuariosPdfBtn');
    const excelButton = document.getElementById('usuariosExcelBtn');

    if (!trigger || !modal) {
        return;
    }

    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', 'usuariosModal');

    function openUsuariosReportModal() {
        if (form) {
            form.reset();
        }
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        trigger.setAttribute('aria-expanded', 'true');

        window.setTimeout(function focusUsuariosForm() {
            if (dialog) {
                dialog.focus();
            }
        }, 80);

        document.addEventListener('keydown', handleUsuariosEscapeKey);
    }

    function closeUsuariosReportModal() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        trigger.setAttribute('aria-expanded', 'false');
        document.removeEventListener('keydown', handleUsuariosEscapeKey);
        trigger.focus();
    }

    function handleUsuariosEscapeKey(event) {
        if (event.key === 'Escape') {
            closeUsuariosReportModal();
        }
    }

    trigger.addEventListener('click', openUsuariosReportModal);
    trigger.addEventListener('keydown', function handleUsuariosTriggerKey(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openUsuariosReportModal();
        }
    });

    closeButtons.forEach(function assignUsuariosClose(button) {
        button.addEventListener('click', closeUsuariosReportModal);
    });

    if (overlay) {
        overlay.addEventListener('click', closeUsuariosReportModal);
    }

    function generateUsuariosReport(format) {
        if (!form) {
            console.warn('Formulario de filtros de usuarios no disponible');
            return;
        }

        const formData = new FormData(form);
        const filters = {};

        formData.forEach(function assignUsuariosFilter(value, key) {
            filters[key] = value;
        });

        console.log('[Reportes] Generando reporte de usuarios en ' + format, filters);
    }

    if (pdfButton) {
        pdfButton.addEventListener('click', function handleUsuariosPdf() {
            generateUsuariosReport('PDF');
        });
    }

    if (excelButton) {
        excelButton.addEventListener('click', function handleUsuariosExcel() {
            generateUsuariosReport('Excel');
        });
    }
}

function initProgramasReportModal() {
    const trigger = document.getElementById('programasReportCard');
    const modal = document.getElementById('programasModal');
    const dialog = modal ? modal.querySelector('.report-modal__dialog') : null;
    const closeButtons = modal ? modal.querySelectorAll('[data-close="programasModal"]') : [];
    const overlay = modal ? modal.querySelector('.report-modal__overlay') : null;
    const form = document.getElementById('programasReportForm');
    const pdfButton = document.getElementById('programasPdfBtn');
    const excelButton = document.getElementById('programasExcelBtn');

    if (!trigger || !modal) {
        return;
    }

    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', 'programasModal');

    function openProgramasReportModal() {
        if (form) {
            form.reset();
        }
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        trigger.setAttribute('aria-expanded', 'true');

        window.setTimeout(function focusProgramasForm() {
            if (dialog) {
                dialog.focus();
            }
        }, 80);

        document.addEventListener('keydown', handleProgramasEscapeKey);
    }

    function closeProgramasReportModal() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        trigger.setAttribute('aria-expanded', 'false');
        document.removeEventListener('keydown', handleProgramasEscapeKey);
        trigger.focus();
    }

    function handleProgramasEscapeKey(event) {
        if (event.key === 'Escape') {
            closeProgramasReportModal();
        }
    }

    trigger.addEventListener('click', openProgramasReportModal);
    trigger.addEventListener('keydown', function handleProgramasTriggerKey(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openProgramasReportModal();
        }
    });

    closeButtons.forEach(function assignProgramasClose(button) {
        button.addEventListener('click', closeProgramasReportModal);
    });

    if (overlay) {
        overlay.addEventListener('click', closeProgramasReportModal);
    }

    function generateProgramasReport(format) {
        if (!form) {
            console.warn('Formulario de filtros de programas no disponible');
            return;
        }

        const formData = new FormData(form);
        const filters = {};

        formData.forEach(function assignProgramasFilter(value, key) {
            filters[key] = value;
        });

        console.log('[Reportes] Generando reporte de programas en ' + format, filters);
    }

    if (pdfButton) {
        pdfButton.addEventListener('click', function handleProgramasPdf() {
            generateProgramasReport('PDF');
        });
    }

    if (excelButton) {
        excelButton.addEventListener('click', function handleProgramasExcel() {
            generateProgramasReport('Excel');
        });
    }
}

function initConveniosReportModal() {
    const trigger = document.getElementById('conveniosReportCard');
    const modal = document.getElementById('conveniosModal');
    const dialog = modal ? modal.querySelector('.report-modal__dialog') : null;
    const closeButtons = modal ? modal.querySelectorAll('[data-close="conveniosModal"]') : [];
    const overlay = modal ? modal.querySelector('.report-modal__overlay') : null;
    const form = document.getElementById('conveniosReportForm');
    const pdfButton = document.getElementById('conveniosPdfBtn');
    const excelButton = document.getElementById('conveniosExcelBtn');

    if (!trigger || !modal) {
        return;
    }

    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', 'conveniosModal');

    function openConveniosReportModal() {
        if (form) {
            form.reset();
        }
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        trigger.setAttribute('aria-expanded', 'true');

        window.setTimeout(function focusConveniosForm() {
            if (dialog) {
                dialog.focus();
            }
        }, 80);

        document.addEventListener('keydown', handleConveniosEscapeKey);
    }

    function closeConveniosReportModal() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        trigger.setAttribute('aria-expanded', 'false');
        document.removeEventListener('keydown', handleConveniosEscapeKey);
        trigger.focus();
    }

    function handleConveniosEscapeKey(event) {
        if (event.key === 'Escape') {
            closeConveniosReportModal();
        }
    }

    trigger.addEventListener('click', openConveniosReportModal);
    trigger.addEventListener('keydown', function handleConveniosTriggerKey(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openConveniosReportModal();
        }
    });

    closeButtons.forEach(function assignConveniosClose(button) {
        button.addEventListener('click', closeConveniosReportModal);
    });

    if (overlay) {
        overlay.addEventListener('click', closeConveniosReportModal);
    }

    function generateConveniosReport(format) {
        if (!form) {
            console.warn('Formulario de filtros de convenios no disponible');
            return;
        }

        const formData = new FormData(form);
        const filters = {};

        formData.forEach(function assignConveniosFilter(value, key) {
            filters[key] = value;
        });

        console.log('[Reportes] Generando reporte de convenios en ' + format, filters);
    }

    if (pdfButton) {
        pdfButton.addEventListener('click', function handleConveniosPdf() {
            generateConveniosReport('PDF');
        });
    }

    if (excelButton) {
        excelButton.addEventListener('click', function handleConveniosExcel() {
            generateConveniosReport('Excel');
        });
    }
}