// Variables globales
let currentStep = 1;
const totalSteps = 3;

// Función para mostrar mensajes de error (igual que en login.js)
function showError(message, cardNumber = 1) {
    const errorElement = document.getElementById(`errorMessageCard${cardNumber}`);
    if (errorElement) {
        // Usar innerHTML para preservar los saltos de línea
        errorElement.innerHTML = message.replace(/\n/g, '<br>');
        errorElement.classList.add('show');
    }
}

// Función para ocultar mensajes de error (igual que en login.js)
function hideError(cardNumber = 1) {
    const errorElement = document.getElementById(`errorMessageCard${cardNumber}`);
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

// Función para ocultar todos los errores
function hideAllErrors() {
    for (let i = 1; i <= totalSteps; i++) {
        hideError(i);
    }
}

// Función para ir al siguiente paso
function nextStep(step) {
    if (validateCurrentStep(step)) {
        if (step < totalSteps) {
            showCard(step + 1);
        }
    }
}

// Función para ir al paso anterior
function prevStep(step) {
    if (step > 1) {
        showCard(step - 1);
    }
}

// Función para omitir paso
function skipStep(step) {
    // Para la primera tarjeta (Información Personal), validar campos obligatorios incluso al omitir
    if (step === 1) {
        if (!validateCurrentStep(step)) {
            return; // No permitir omitir si la validación falla
        }
    }
    
    if (step < totalSteps) {
        showCard(step + 1);
    }
}

// Función para mostrar una tarjeta específica
function showCard(cardNumber) {
    console.log('Showing card:', cardNumber); // Debug
    
    // Ocultar todos los errores
    hideAllErrors();
    
    // Ocultar todas las tarjetas
    const cards = document.querySelectorAll('.onboarding-card');
    cards.forEach((card, index) => {
        card.classList.remove('active');
        if (index + 1 === cardNumber) {
            card.classList.add('active');
        }
    });

    // Actualizar indicadores de progreso solo en la tarjeta activa
    const activeCard = document.querySelector('.onboarding-card.active');
    if (activeCard) {
        const dots = activeCard.querySelectorAll('.progress-dot');
        dots.forEach((dot, index) => {
            if (index < cardNumber) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    currentStep = cardNumber;
}

// Función de validación básica
function validateCurrentStep(step) {
    let isValid = true;
    const errorMessages = [];

    // Ocultar error anterior
    hideError(step);

    if (step === 1) {
        const tipoId = document.getElementById('tipoIdentificacion').value;
        const numeroId = document.getElementById('numeroIdentificacion').value;

        if (!tipoId) {
            errorMessages.push('El tipo de identificación es obligatorio');
            isValid = false;
        }

        if (!numeroId.trim()) {
            errorMessages.push('El número de identificación es obligatorio');
            isValid = false;
        }
    }

    if (!isValid) {
        showError(errorMessages.join('\n'), step);
    }

    return isValid;
}

// Función para finalizar el onboarding
function finishOnboarding() {
    // Recopilar todos los datos del formulario
    const onboardingData = {
        // Información personal
        tipoIdentificacion: document.getElementById('tipoIdentificacion').value,
        numeroIdentificacion: document.getElementById('numeroIdentificacion').value,
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        lugarNacimiento: document.getElementById('lugarNacimiento').value,
        genero: document.getElementById('genero').value,
        nacionalidad: document.getElementById('nacionalidad').value,
        
        // Información de contacto
        direccion: document.getElementById('direccion').value,
        ciudad: document.getElementById('ciudad').value,
        departamento: document.getElementById('departamento').value,
        telefono: document.getElementById('telefono').value,
        
        // Contacto de emergencia
        nombreEmergencia: document.getElementById('nombreEmergencia').value,
        parentesco: document.getElementById('parentesco').value,
        telefonoEmergencia: document.getElementById('telefonoEmergencia').value
    };

    // Guardar datos en localStorage (simulación)
    localStorage.setItem('onboardingData', JSON.stringify(onboardingData));

    // Mostrar modal de éxito
    document.getElementById('finalModal').style.display = 'flex';
}

// Función para redirigir al dashboard
function redirectToDashboard() {
    // Redirigir a la página principal de la aplicación
    window.location.href = '/usuarios.html'; // Cambiar esta URL por la página de inicio o dashboard
}

// Navegación con teclado
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft' && currentStep > 1) {
        prevStep(currentStep);
    } else if (event.key === 'ArrowRight' && currentStep < totalSteps) {
        nextStep(currentStep);
    }
});

// Soporte para gestos táctiles (básico)
let startX = 0;
let endX = 0;

document.addEventListener('touchstart', function(event) {
    startX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(event) {
    endX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const threshold = 50; // Distancia mínima para considerar un swipe
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
        if (diff > 0 && currentStep < totalSteps) {
            // Swipe izquierda - siguiente
            nextStep(currentStep);
        } else if (diff < 0 && currentStep > 1) {
            // Swipe derecha - anterior
            prevStep(currentStep);
        }
    }
}

// Inicialización cuando carga la página
window.addEventListener('load', function() {
    // Asegurar que la primera tarjeta esté visible
    showCard(1);

    // Ocultar errores al escribir en los inputs (igual que en login.js)
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            // Determinar en qué tarjeta está el input
            let cardNumber = 1;
            const card = input.closest('.onboarding-card');
            if (card && card.id === 'card2') cardNumber = 2;
            if (card && card.id === 'card3') cardNumber = 3;
            
            hideError(cardNumber);
        });

        input.addEventListener('change', function() {
            // Determinar en qué tarjeta está el select/input
            let cardNumber = 1;
            const card = input.closest('.onboarding-card');
            if (card && card.id === 'card2') cardNumber = 2;
            if (card && card.id === 'card3') cardNumber = 3;
            
            hideError(cardNumber);
        });
    });
});
