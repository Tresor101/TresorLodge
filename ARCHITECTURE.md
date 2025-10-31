# TresorLodge Website Architecture Documentation

## Overview
The TresorLodge website has been completely restructured using a modern, section-based architecture that improves maintainability, performance, and developer experience.

## New File Structure

```
TresorLodge/
├── sections/
│   ├── home/
│   │   ├── index.html          # Main landing page
│   │   ├── css/
│   │   │   └── home.css        # Home-specific styles
│   │   ├── js/
│   │   │   └── home.js         # Home page functionality
│   │   ├── images/             # Home section images
│   │   └── videos/
│   │       └── tours.mp4       # Hero video
│   │
│   ├── rooms/
│   │   ├── rooms.html          # Room listings
│   │   ├── room60USD.html      # Standard room details
│   │   ├── room80USD.html      # Deluxe room details
│   │   ├── room100USD.html     # Premium room details
│   │   ├── css/
│   │   │   └── rooms.css       # Room-specific styles
│   │   ├── js/
│   │   │   └── rooms.js        # Booking system & room functionality
│   │   ├── images/             # Room images
│   │   └── videos/
│   │       ├── rooms-tour.mp4  # Room tour video
│   │       ├── rooms1.mp4      # Room showcase videos
│   │       ├── rooms2.mp4
│   │       └── rooms3.mp4
│   │
│   ├── restaurant/
│   │   ├── restaurant.html     # Restaurant page
│   │   ├── css/
│   │   │   └── restaurant.css  # Restaurant-specific styles
│   │   ├── js/
│   │   │   └── restaurant.js   # Menu system & reservations
│   │   ├── images/             # Restaurant images
│   │   └── videos/             # Restaurant videos
│   │
│   ├── contact/
│   │   ├── contact.html        # Contact page
│   │   ├── css/
│   │   │   └── contact.css     # Contact-specific styles
│   │   ├── js/
│   │   │   └── contact.js      # Form handling & validation
│   │   ├── images/             # Contact images
│   │   └── videos/             # Contact videos
│   │
│   └── shared/
│       ├── css/
│       │   └── styles.css      # Global styles & variables
│       └── js/
│           └── scripts.js      # Global functionality
│
├── css/                        # Legacy CSS (Bootstrap, animations)
├── js/                         # Legacy JavaScript libraries
├── fonts/                      # Font assets
├── images/                     # Global images
└── scss/                       # SCSS source files
```

## Key Features of New Architecture

### 1. Section-Based Organization
Each website section (home, rooms, restaurant, contact) has its own dedicated folder containing:
- HTML files specific to that section
- Section-specific CSS for styling
- Section-specific JavaScript for functionality
- Dedicated images and videos folders

### 2. Shared Resources
Common assets and global functionality are centralized in the `shared/` folder:
- Global CSS variables and base styles
- Common JavaScript utilities and navigation
- Shared components and animations

### 3. Enhanced CSS System
- **CSS Custom Properties**: Comprehensive variable system for colors, spacing, typography
- **WCAG AA+ Compliance**: Enhanced color contrast and accessibility
- **Responsive Design**: Mobile-first approach with optimized breakpoints
- **Modular Styles**: Section-specific stylesheets that import shared variables

### 4. Advanced JavaScript Modules
Each section includes sophisticated functionality:

#### HomeManager (home.js)
- Hero video management and autoplay handling
- Animated statistics counters
- Testimonial slider with auto-rotation
- Smooth scrolling navigation
- Service interaction routing

#### RoomManager (rooms.js)
- Advanced booking system with date validation
- Video gallery controls
- Room filtering and search
- Price calculation
- Availability checking

#### RestaurantManager (restaurant.js)
- Interactive menu system with categories
- Image gallery with lightbox
- Reservation form handling
- Chef section management
- Menu item filtering

#### ContactManager (contact.js)
- Form validation with real-time feedback
- Phone number formatting
- Interactive map integration
- Business hours display
- Contact method routing

### 5. Performance Optimizations
- Lazy loading for images
- Critical resource preloading
- Optimized video handling
- Modular CSS/JS loading
- Responsive image delivery

## Benefits of New Architecture

### For Developers
1. **Better Organization**: Clear separation of concerns
2. **Easier Maintenance**: Section-specific files are easier to locate and modify
3. **Scalability**: Easy to add new sections or modify existing ones
4. **Code Reusability**: Shared components and utilities
5. **Modern Development**: ES6 modules and modern CSS features

### For Users
1. **Faster Loading**: Optimized resource loading
2. **Better Accessibility**: WCAG AA+ compliance
3. **Mobile Experience**: Enhanced responsive design
4. **Interactive Features**: Rich functionality without complexity
5. **Visual Consistency**: Unified design system

### For Content Management
1. **Section Independence**: Updates to one section don't affect others
2. **Asset Organization**: Easy to manage images and videos by section
3. **Consistent Styling**: Global variables ensure design consistency
4. **Feature Isolation**: Section-specific features are self-contained

## Navigation Structure
The website maintains intuitive navigation between sections:
- `index.html` serves as the main entry point in `/sections/home/`
- Cross-section links use relative paths (e.g., `../rooms/rooms.html`)
- Global assets use appropriate relative paths (e.g., `../../images/`)

## Color System
Enhanced color palette with improved accessibility:
- **Primary**: Deep Charcoal (#0f1419) for main text
- **Secondary**: Rich Crimson (#c41e3a) for accents and CTAs
- **Background**: Pure White (#ffffff) and Light Gray (#f8fafc)
- **Borders**: Subtle grays for elegant separation
- **Interactive**: Blue accent for links and focus states

## Future Enhancements
The new architecture supports easy addition of:
- New website sections
- Additional interactive features
- Enhanced animations and transitions
- Advanced booking systems
- Content management integration
- Multi-language support

## Getting Started
To work with the new architecture:

1. **Global Changes**: Modify `/sections/shared/css/styles.css` for site-wide updates
2. **Section Changes**: Work within specific section folders for targeted modifications
3. **New Sections**: Copy the structure from existing sections
4. **Navigation**: Update links in shared navigation components
5. **Assets**: Place section-specific assets in appropriate folders

This architecture provides a solid foundation for TresorLodge's continued growth and development while maintaining excellent performance and user experience.