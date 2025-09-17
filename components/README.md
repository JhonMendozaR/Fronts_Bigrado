# Component System Documentation

This document explains how to use the reusable component system for the Bigrado application.

## Components Created

### 1. Topbar Component (`/components/topbar.html`)
Contains the top navigation bar with:
- Bigrado logo and branding
- User dropdown menu with settings and logout options

### 2. Sidebar Component (`/components/sidebar.html`)
Contains the main navigation sidebar with:
- Navigation menu items
- Icons for each section
- Active state support

### 3. Component Loader (`/js/components.js`)
JavaScript utility that automatically loads and inserts components into your pages.

## How to Use Components in Your Pages

### Basic Setup

1. **Add the component containers** to your HTML:
```html
<body data-page="your-page-identifier">
    <!-- Topbar Container -->
    <div id="topbar-container"></div>

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