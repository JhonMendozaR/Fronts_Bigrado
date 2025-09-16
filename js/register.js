// UI helpers
function setLoading(isLoading) {
    const btn = document.getElementById('registerBtn');
    if (!btn) return;
    const text = btn.querySelector('.btn-text');
    const spinner = btn.querySelector('.loading-spinner');
    if (isLoading) {
        btn.disabled = true;
        if (text) text.style.display = 'none';
        if (spinner) spinner.style.display = 'block';
    } else {
        btn.disabled = false;
        if (text) text.style.display = 'inline';
        if (spinner) spinner.style.display = 'none';
    }
}

function showError(message) {
    const el = document.getElementById('errorMessage');
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
}

function clearError() {
    const el = document.getElementById('errorMessage');
    if (!el) return;
    el.textContent = '';
    el.classList.remove('show');
}

function togglePassword(inputId = 'clave', iconId = 'toggleIcon1') {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (!input) return;
    const showing = input.type === 'text';
    input.type = showing ? 'password' : 'text';
    if (icon) {
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    }
}

function openSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) modal.style.display = 'block';
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) modal.style.display = 'none';
}

function redirectToHome() {
    window.location.href = '/index.html';
}

// Simple validation utilities
function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function validateForm(data) {
    const { nombres, apellidos, correoElectronico, clave, confirmarClave } = data;
    if (!nombres?.trim()) return 'Por favor ingresa tus nombres.';
    if (!apellidos?.trim()) return 'Por favor ingresa tus apellidos.';
    if (!correoElectronico?.trim()) return 'Por favor ingresa tu correo electrónico.';
    if (!isValidEmail(correoElectronico)) return 'El correo electrónico no es válido.';
    if (!clave) return 'Por favor crea una contraseña.';
    if (clave.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
    // At least one letter and one number for basic strength
    if (!(/[A-Za-z]/.test(clave) && /\d/.test(clave))) return 'La contraseña debe incluir letras y números.';
    if (confirmarClave !== clave) return 'Las contraseñas no coinciden.';
    return null;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearError();

        const data = {
            nombres: document.getElementById('nombres')?.value || '',
            apellidos: document.getElementById('apellidos')?.value || '',
            correoElectronico: document.getElementById('correoElectronico')?.value || '',
            clave: document.getElementById('clave')?.value || '',
            confirmarClave: document.getElementById('confirmarClave')?.value || ''
        };

        const error = validateForm(data);
        if (error) {
            showError(error);
            return;
        }

        setLoading(true);
        try {
            // TODO: Replace with real API call
            await new Promise((res) => setTimeout(res, 1200));

            // On success, show modal
            const welcome = document.getElementById('welcomeMessage');
            if (welcome) welcome.textContent = `¡Tu cuenta ha sido creada correctamente, ${data.nombres.split(' ')[0]}!`;
            openSuccessModal();
        } catch (err) {
            showError('Ocurrió un error al registrar. Inténtalo nuevamente.');
        } finally {
            setLoading(false);
        }
    });

    // Close modal on outside click
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('successModal');
        if (event.target === modal) closeSuccessModal();
    });
});
