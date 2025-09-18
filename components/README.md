# Component System Documentation

This document explains how to use the reusable component system for the Bigrado application.

## Features

### 1. Topbar Component (`/components/topbar.html`)
Contains the top navigation bar with:
- Bigrado logo and branding
- User dropdown menu with settings and logout options
- **Hamburger menu button** (visible only on mobile devices)

### 2. Sidebar Component (`/components/sidebar.html`)
Contains the main navigation sidebar with:
- Navigation menu items
- Icons for each section
- Active state support
- **Responsive behavior**: Fixed on desktop, slide-out on mobile

### 3. Component Loader (`/js/components.js`)
JavaScript utility that automatically loads and inserts components into your pages.
- **Mobile sidebar management**: Toggle functionality for mobile devices
- **Responsive detection**: Automatically handles screen size changes

## How to Use Components in Your Pages

### Basic Setup

1. **Add the component containers and overlay** to your HTML:
```html
<body data-page="your-page-identifier">
    <!-- Topbar Container -->
    <div id="topbar-container"></div>

    <!-- Sidebar Overlay para móvil -->
    <div class="sidebar-overlay" id="sidebarOverlay" onclick="toggleSidebar()"></div>

    <!-- Layout principal -->
    <div class="main-layout">
        <!-- Sidebar Container -->
        <div id="sidebar-container"></div>

        <!-- Your page content -->
        <main class="main-content">
            <!-- Page content goes here -->
        </main>
    </div>
</body>
```

2. **Include the component loader script**:
```html
<script src="/js/components.js"></script>
```

3. **Set the data-page attribute** on the body tag to automatically highlight the correct sidebar menu item:
```html
<body data-page="usuarios">  <!-- For usuarios.html -->
<body data-page="home">      <!-- For home.html -->
<body data-page="universidades"> <!-- For universidades.html -->
```

### Automatic Loading

The components will load automatically when the page is ready. The component loader will:
- Load the topbar into `#topbar-container`
- Load the sidebar into `#sidebar-container`
- Set the correct active state in the sidebar based on the `data-page` attribute

### Manual Loading (if needed)

You can also load components manually:

```javascript
// Load all components
loadComponents('current-page-identifier');

// Load individual components
loadTopbar('custom-container-id');
loadSidebar('custom-container-id');

// Update sidebar active state
updateSidebarActive('page-identifier');
```

## File Structure

```
/components/
    ├── topbar.html          # Topbar component
    ├── sidebar.html         # Sidebar component
    └── page-template.html   # Template for new pages

/js/
    └── components.js        # Component loader utility
```

## Benefits

1. **Reusability**: Use the same topbar and sidebar across all pages
2. **Maintainability**: Update navigation in one place
3. **Consistency**: Ensures all pages have the same navigation structure
4. **Performance**: Components are cached after first load
5. **Active State Management**: Automatically highlights the current page in navigation
6. **🆕 Responsive Design**: 
   - **Desktop**: Fixed sidebar always visible
   - **Mobile (≤768px)**: Sidebar hidden by default with hamburger menu toggle
   - **Smooth transitions**: Animated sidebar slide-in/out
   - **Overlay**: Dark overlay when sidebar is open on mobile
   - **Auto-close**: Sidebar automatically closes when resizing to desktop

## Mobile Behavior

### Desktop (>768px)
- Sidebar is always visible and fixed
- Hamburger menu is hidden
- Content has left margin to accommodate sidebar

### Mobile (≤768px)
- Sidebar is hidden by default (slides off-screen)
- Hamburger menu button appears in topbar
- Clicking hamburger toggles sidebar visibility
- Dark overlay appears when sidebar is open
- Clicking overlay closes sidebar
- Body scroll is disabled when sidebar is open
- Sidebar automatically closes when screen size increases

## Creating New Pages

1. Copy the `page-template.html` from the components folder
2. Update the page title and data-page attribute
3. Add your page-specific content
4. Include the component loader script
5. The topbar and sidebar will load automatically

## Updating Components

To update the topbar or sidebar:
1. Edit the respective HTML file in `/components/`
2. Changes will automatically appear on all pages that use the components
3. No need to update individual pages

## Active State Configuration

The sidebar automatically sets the active state based on the `data-page` attribute. Make sure to use the correct identifiers:

- `data-page="home"` for home.html
- `data-page="usuarios"` for usuarios.html
- `data-page="universidades"` for universidades.html
- Add more as needed for new pages

## Browser Compatibility

The component system uses modern JavaScript features:
- Fetch API
- Async/Await
- ES6 Classes
- Map for caching

Ensure your target browsers support these features or include appropriate polyfills.