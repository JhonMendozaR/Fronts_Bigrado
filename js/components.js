/**
 * Component Loader Utility
 * Loads HTML components dynamically for reusability across pages
 */

class ComponentLoader {
    constructor() {
        this.loadedComponents = new Map();
    }

    /**
     * Load a component and insert it into the specified element
     * @param {string} componentPath - Path to the component HTML file
     * @param {string} containerId - ID of the element where the component should be inserted
     * @param {function} callback - Optional callback function to execute after loading
     */
    async loadComponent(componentPath, containerId, callback = null) {
        try {
            // Check if component is already loaded
            if (this.loadedComponents.has(componentPath)) {
                const cachedContent = this.loadedComponents.get(componentPath);
                this.insertComponent(containerId, cachedContent);
                if (callback) callback();
                return;
            }

            // Fetch component content
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`Failed to load component: ${componentPath}`);
            }

            const componentHTML = await response.text();
            
            // Cache the component
            this.loadedComponents.set(componentPath, componentHTML);
            
            // Insert component into container
            this.insertComponent(containerId, componentHTML);
            
            // Execute callback if provided
            if (callback) callback();
            
        } catch (error) {
            console.error(`Error loading component ${componentPath}:`, error);
            document.getElementById(containerId).innerHTML = 
                `<div class="component-error">Error loading component: ${componentPath}</div>`;
        }
    }

    /**
     * Insert component HTML into the specified container
     * @param {string} containerId - ID of the container element
     * @param {string} html - HTML content to insert
     */
    insertComponent(containerId, html) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = html;
        } else {
            console.error(`Container with ID '${containerId}' not found`);
        }
    }

    /**
     * Load topbar component
     * @param {string} containerId - ID of the container element (default: 'topbar-container')
     * @param {function} callback - Optional callback function
     */
    async loadTopbar(containerId = 'topbar-container', callback = null) {
        await this.loadComponent('/components/topbar.html', containerId, callback);
    }

    /**
     * Load sidebar component
     * @param {string} containerId - ID of the container element (default: 'sidebar-container')
     * @param {function} callback - Optional callback function
     */
    async loadSidebar(containerId = 'sidebar-container', callback = null) {
        const wrappedCallback = () => {
            if (callback) callback();
            // Apply active state after sidebar is loaded and inserted
            const currentPage = document.body.getAttribute('data-page') || '';
            if (currentPage) {
                this.updateSidebarActiveState(currentPage);
            }
        };
        await this.loadComponent('/components/sidebar.html', containerId, wrappedCallback);
    }

    /**
     * Update sidebar active state based on current page
     * @param {string} currentPage - Current page identifier (e.g., 'usuarios', 'home')
     */
    updateSidebarActiveState(currentPage) {
        // Use setTimeout to ensure the DOM is fully updated
        setTimeout(() => {
            // Remove all active classes
            const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
            sidebarLinks.forEach(link => link.classList.remove('active'));

            // Map page identifiers to exact filenames
            const pageToFile = {
                'usuarios': 'usuarios.html',
                'universidades': 'universidades.html',
                'home': 'home.html'
            };

            const targetFile = pageToFile[currentPage];
            if (targetFile) {
                // Find exact match for the href
                const currentLink = document.querySelector(`.sidebar-menu a[href="${targetFile}"]`);
                if (currentLink) {
                    currentLink.classList.add('active');
                    console.log(`✅ Active state set for: ${currentPage} -> ${targetFile}`);
                } else {
                    console.warn(`❌ Link not found for: ${targetFile}`);
                }
            } else {
                console.warn(`❌ No mapping found for page: ${currentPage}`);
            }
        }, 50);
    }

    /**
     * Load all common components (topbar and sidebar)
     * @param {string} currentPage - Current page identifier for active state
     */
    async loadCommonComponents(currentPage = '') {
        try {
            await Promise.all([
                this.loadTopbar(),
                this.loadSidebar()
            ]);
            
            console.log(`🔄 Components loaded for page: ${currentPage}`);
            
        } catch (error) {
            console.error('Error loading components:', error);
        }
    }
}

// Global instance
const componentLoader = new ComponentLoader();

// Auto-load components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded, checking for component containers...');
    
    // Check if containers exist and load components
    const topbarContainer = document.getElementById('topbar-container');
    const sidebarContainer = document.getElementById('sidebar-container');
    
    if (topbarContainer || sidebarContainer) {
        const currentPage = document.body.getAttribute('data-page') || '';
        console.log(`📄 Current page detected: ${currentPage}`);
        
        componentLoader.loadCommonComponents(currentPage);
    } else {
        console.log('ℹ️ No component containers found on this page');
    }
});

// Utility functions for easier access
window.loadTopbar = (containerId, callback) => componentLoader.loadTopbar(containerId, callback);
window.loadSidebar = (containerId, callback) => componentLoader.loadSidebar(containerId, callback);
window.loadComponents = (currentPage) => componentLoader.loadCommonComponents(currentPage);
window.updateSidebarActive = (currentPage) => componentLoader.updateSidebarActiveState(currentPage);

// Force update active state (useful for debugging)
window.forceUpdateSidebar = (currentPage) => {
    console.log(`🔧 Force updating sidebar for: ${currentPage}`);
    componentLoader.updateSidebarActiveState(currentPage);
};