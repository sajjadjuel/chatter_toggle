# Chatter Toggle Module

## Overview

The Chatter Toggle module adds a convenient toggle button to show/hide the chatter section in Odoo form views. This allows users to focus on the main content when needed while still having easy access to the communication features.

## Features

- **🎯 Navbar-Style Toggle**: Modern navbar-inspired toggle with gradient backgrounds and smooth animations
- **🎨 Smart Layout Adaptation**: 
  - **Bottom Chatter**: Horizontal navbar with up/down chevrons
  - **Sidebar Chatter**: Vertical navbar strip with left/right chevrons and vertical text
- **💾 Persistent State**: Toggle state saved in localStorage across sessions
- **✨ Enhanced Animations**: 
  - Gradient transitions and hover effects
  - Pulse animation when collapsed
  - Slide-in animations for mobile
- **📱 Advanced Responsive Design**: 
  - Desktop: 60px vertical navbar for sidebar mode
  - Mobile: Enhanced floating button with ripple effects
- **🎭 Visual Feedback**: 
  - Color-coded states (light/blue gradients)
  - Proper chevron directions (>/< for sidebar, ⬆/⬇ for bottom)
  - Vertical text orientation for collapsed sidebar
- **🖥️ Full Screen Experience**: Form expands to `calc(100% - 60px)` on desktop, 100% on mobile

## Installation

1. Copy the `chatter_toggle` folder to your Odoo addons directory
2. Update the apps list in Odoo
3. Install the "Chatter Toggle" module

## Usage

After installation, you'll see a modern navbar-style toggle at the top/edge of the chatter section in any form view.

### 📋 Bottom Chatter (Normal Layout):
- **Visual**: Horizontal navbar with gradient background
- **Hide**: Click to collapse chatter (blue gradient navbar remains)
- **Show**: Click to expand full chatter content
- **Icons**: ⬆ (hide) / ⬇ (show) chevrons

### 📱 Sidebar Chatter (Right Side Layout):

#### 🖥️ Desktop/Tablet:
- **Hide**: Creates slim 60px vertical navbar with **◀ Hide** button
- **Show**: Click **▶ Show** to restore full sidebar
- **Features**: Vertical text orientation, blue gradient styling, rounded edges
- **Form**: Expands to `calc(100% - 60px)` width

#### 📱 Mobile:
- **Hide**: Completely hidden + floating circular button appears
- **Show**: Click floating button to restore sidebar  
- **Features**: 56px button with ripple animation and gradient shadows

### 🎯 Key Benefits:
- **Always Accessible**: Toggle never disappears completely
- **Visual Clarity**: Color-coded states and proper directional arrows
- **Smooth UX**: All interactions have animations and hover effects
- **Persistent Memory**: Settings saved across forms and sessions

## Technical Details

### Components

- **JavaScript**: Extends the core Chatter component with intelligent toggle functionality that detects sidebar vs normal chatter layouts
- **XML Template**: Adds the adaptive toggle button to the chatter header
- **SCSS**: Provides styling, animations, and full-screen layout adjustments for both chatter modes

### Layout Detection

The module automatically detects whether the chatter is in:
- **Normal Mode**: Chatter appears below the form content
- **Sidebar Mode**: Chatter appears as a sidebar on the right (detected by `.o-aside` class)

### Full Screen Behavior

When hiding a sidebar chatter:
- The entire chatter sidebar is hidden (`display: none`)
- The main form container expands to use 100% width
- Smooth CSS transitions provide a seamless experience
- The form sheet adjusts its maximum width for optimal content display

### Browser Compatibility

- Supports all modern browsers
- Uses localStorage for state persistence
- Responsive design for mobile devices

## Customization

The toggle button appearance and behavior can be customized by modifying the SCSS file:

- Button position and styling
- Animation duration and effects
- Hidden state appearance
- Responsive breakpoints

## Dependencies

- `base`: Core Odoo functionality
- `mail`: Mail/chatter functionality  
- `web`: Web interface components

## License

LGPL-3.0 