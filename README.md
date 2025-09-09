Push kitu inawork. And have a calling for those APIs so that all I do is create endpoints# EventScape Frontend

A modern, responsive web application for 3D event design and visualization built with Next.js 15. EventScape empowers event planners and designers to create stunning 3D event layouts with an intuitive interface and advanced design tools.

## 🚀 Overview

EventScape is a comprehensive event design platform that combines 3D visualization, project management, and collaborative features. The application allows users to design event spaces in real-time, manage multiple projects, and preview their creations before implementation.

### Key Features

- **3D Event Design Studio**: Interactive 3D canvas powered by Three.js for real-time event space design
- **Project Management**: Create, organize, and manage multiple event design projects
- **User Authentication**: Secure login/signup system with persistent sessions
- **Real-time Collaboration**: Comment system and project sharing capabilities
- **Advanced Design Tools**: Smart design assistance and optimization suggestions
- **Responsive Design**: Fully responsive interface that works across all devices
- **Modern UI/UX**: Clean, intuitive interface built with Radix UI and Tailwind CSS

## 🛠 Technology Stack

### Core Framework
- **Next.js 15.5.2** - React framework with App Router
- **React 18.2.0** - UI library
- **TypeScript 5.2.2** - Type-safe JavaScript

### 3D Graphics & Visualization
- **Three.js 0.180.0** - 3D graphics library
- **@types/three 0.180.0** - TypeScript definitions

### UI Components & Styling
- **Tailwind CSS 3.3.3** - Utility-first CSS framework
- **Radix UI** - Headless UI components
  - Accordion, Alert Dialog, Avatar, Badge, Button, Card, Dialog, Dropdown Menu
  - Form, Input, Label, Popover, Select, Slider, Tabs, Toast, Tooltip, and more
- **Lucide React 0.446.0** - Icon library
- **Framer Motion 12.23.12** - Animation library

### State Management & Data
- **Zustand 5.0.8** - Lightweight state management
- **React Hook Form 7.53.0** - Form handling
- **Zod 3.23.8** - Schema validation

### Additional Libraries
- **Next Themes 0.3.0** - Theme management
- **Date-fns 3.6.0** - Date utilities
- **Recharts 2.12.7** - Chart library
- **Sonner 1.5.0** - Toast notifications
- **Class Variance Authority** - Component variant management
- **Tailwind Merge** - Utility class merging

## 📁 Project Structure

```
/Users/fatumafarah/Desktop/Eventscape FRontend /
├── app/                          # Next.js App Router pages
│   ├── auth/                     # Authentication pages
│   │   └── page.tsx             # Login/Signup page
│   ├── dashboard/                # Main dashboard
│   │   └── page.tsx             # Dashboard with project overview
│   ├── design/                   # 3D design studio
│   │   └── page.tsx             # Main 3D canvas interface
│   ├── preview/                  # 3D preview mode
│   │   └── page.tsx             # Full-screen preview
│   ├── projects/                 # Project management
│   │   ├── [id]/                # Dynamic project pages
│   │   │   └── page.tsx         # Individual project details
│   │   └── page.tsx             # Projects listing
│   ├── settings/                 # User settings
│   │   └── page.tsx             # Settings page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page (auth redirect)
├── components/                   # Reusable UI components
│   ├── layout/                  # Layout components
│   │   ├── app-layout.tsx       # Main app layout wrapper
│   │   ├── navbar.tsx           # Top navigation bar
│   │   └── sidebar.tsx          # Side navigation
│   ├── theme-provider.tsx       # Theme context provider
│   └── ui/                      # Radix UI components
│       ├── accordion.tsx        # Collapsible content
│       ├── alert-dialog.tsx     # Modal dialogs
│       ├── avatar.tsx           # User avatars
│       ├── badge.tsx            # Status badges
│       ├── button.tsx           # Interactive buttons
│       ├── card.tsx             # Content containers
│       ├── dialog.tsx           # Modal overlays
│       ├── form.tsx             # Form components
│       ├── input.tsx            # Text inputs
│       ├── label.tsx            # Form labels
│       ├── slider.tsx           # Range sliders
│       ├── tabs.tsx             # Tab navigation
│       └── ...                  # Additional UI components
├── hooks/                       # Custom React hooks
│   └── use-toast.ts            # Toast notification hook
├── lib/                         # Core utilities and stores
│   ├── auth-context.tsx         # Authentication context
│   ├── project-store.ts         # Project state management
│   └── utils.ts                 # Utility functions
├── public/                      # Static assets
│   └── Minimalist EventScape Logo with Neutral Color Palette 2.jpg
├── components.json              # Radix UI configuration
├── middleware.ts                # Next.js middleware
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies and scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Eventscape FRontend "
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Design System

### Color Palette
- **Primary**: Purple (#8B5CF6) to Teal (#14B8A6) gradient
- **Background**: Light gray (#F8FAFC)
- **Text**: Dark gray (#1F2937)
- **Accent**: Various status colors (green, blue, red)

### Typography
- **Headings**: Inter font family, various weights (400-700)
- **Body**: System font stack with fallbacks
- **Sizes**: Responsive typography scale

### Components
All UI components follow a consistent design system using:
- Radix UI primitives for accessibility
- Tailwind CSS for styling
- Consistent spacing and sizing scales
- Dark/light theme support

## 🔧 Key Features Implementation

### 3D Design Studio (`/design`)
- **Three.js Integration**: Real-time 3D rendering with WebGL
- **Object Management**: Add, modify, and remove 3D objects
- **Interactive Controls**: Scale, rotate, and position objects
- **Material System**: Color and texture customization
- **Lighting System**: Ambient and directional lighting
- **Grid System**: Visual alignment helpers

### Project Management (`/projects`)
- **Project CRUD**: Create, read, update, delete projects
- **Status Tracking**: Draft, in-progress, completed states
- **Thumbnail System**: Visual project previews
- **Search & Filter**: Find projects quickly
- **Collaboration**: Comments and sharing features

### Authentication System (`/auth`)
- **Context-based Auth**: React Context for state management
- **Persistent Sessions**: LocalStorage-based session persistence
- **Form Validation**: Client-side validation with error handling
- **Loading States**: Smooth user experience during auth operations

### State Management
- **Zustand Store**: Lightweight, type-safe state management
- **Project Store**: Centralized project data management
- **Auth Context**: User authentication state
- **Local Storage**: Persistent data storage

## 🔌 API Integration

The application is currently configured for static export (`output: 'export'` in `next.config.js`). For production deployment, you'll need to:

1. **Remove static export configuration** if using server-side features
2. **Implement backend API endpoints** (see detailed API specification below)
3. **Add environment variables** for API endpoints

## 📡 API Specification

### Base URL
```
https://api.eventscape.com/v1
```

### Authentication Endpoints

#### POST /auth/login
**Purpose**: User login
**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
**Response**:
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "user@example.com",
    "avatar": "https://api.eventscape.com/avatars/user_123.jpg"
  },
  "token": "jwt_token_here"
}
```

#### POST /auth/register
**Purpose**: User registration
**Request Body**:
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```
**Response**: Same as login

#### POST /auth/logout
**Purpose**: User logout
**Headers**: `Authorization: Bearer <token>`
**Response**:
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Project Endpoints

#### GET /projects
**Purpose**: Get all projects for authenticated user
**Headers**: `Authorization: Bearer <token>`
**Response**:
```json
{
  "success": true,
  "projects": [
    {
      "id": "proj_123",
      "title": "Corporate Gala 2024",
      "description": "Elegant corporate event with modern staging",
      "thumbnail": "https://api.eventscape.com/thumbnails/proj_123.jpg",
      "status": "in-progress",
      "team": [...],
      "createdAt": "2024-01-15T00:00:00Z",
      "updatedAt": "2024-01-20T00:00:00Z"
    }
  ]
}
```

#### GET /projects/:id
**Purpose**: Get specific project details
**Headers**: `Authorization: Bearer <token>`
**Response**:
```json
{
  "success": true,
  "project": {
    "id": "proj_123",
    "title": "Corporate Gala 2024",
    "description": "Elegant corporate event with modern staging",
    "thumbnail": "https://api.eventscape.com/thumbnails/proj_123.jpg",
    "status": "in-progress",
    "team": [...],
    "assets": [...],
    "comments": [...],
    "createdAt": "2024-01-15T00:00:00Z",
    "updatedAt": "2024-01-20T00:00:00Z"
  }
}
```

#### POST /projects
**Purpose**: Create new project
**Headers**: `Authorization: Bearer <token>`
**Request Body**:
```json
{
  "title": "New Event Project",
  "description": "Project description",
  "status": "draft"
}
```
**Response**:
```json
{
  "success": true,
  "project": {
    "id": "proj_456",
    "title": "New Event Project",
    "description": "Project description",
    "status": "draft",
    "team": [],
    "createdAt": "2024-01-25T00:00:00Z",
    "updatedAt": "2024-01-25T00:00:00Z"
  }
}
```

#### PUT /projects/:id
**Purpose**: Update project
**Headers**: `Authorization: Bearer <token>`
**Request Body**:
```json
{
  "title": "Updated Project Title",
  "description": "Updated description",
  "status": "in-progress"
}
```
**Response**: Same as GET /projects/:id

#### DELETE /projects/:id
**Purpose**: Delete project
**Headers**: `Authorization: Bearer <token>`
**Response**:
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

### Team Management Endpoints

#### GET /projects/:id/team
**Purpose**: Get project team members
**Headers**: `Authorization: Bearer <token>`
**Response**:
```json
{
  "success": true,
  "team": [
    {
      "id": "member_123",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "Project Manager",
      "avatar": "https://api.eventscape.com/avatars/member_123.jpg",
      "joinDate": "2024-01-15T00:00:00Z"
    }
  ]
}
```

#### POST /projects/:id/team
**Purpose**: Add team member to project
**Headers**: `Authorization: Bearer <token>`
**Request Body**:
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "role": "Designer",
  "avatar": "https://api.eventscape.com/avatars/jane.jpg"
}
```
**Response**:
```json
{
  "success": true,
  "member": {
    "id": "member_456",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "Designer",
    "avatar": "https://api.eventscape.com/avatars/jane.jpg",
    "joinDate": "2024-01-25T00:00:00Z"
  }
}
```

#### PUT /projects/:id/team/:memberId
**Purpose**: Update team member
**Headers**: `Authorization: Bearer <token>`
**Request Body**:
```json
{
  "name": "Jane Smith Updated",
  "role": "Senior Designer"
}
```
**Response**: Same as POST /projects/:id/team

#### DELETE /projects/:id/team/:memberId
**Purpose**: Remove team member
**Headers**: `Authorization: Bearer <token>`
**Response**:
```json
{
  "success": true,
  "message": "Team member removed successfully"
}
```

### Asset Management Endpoints

#### GET /projects/:id/assets
**Purpose**: Get project assets
**Headers**: `Authorization: Bearer <token>`
**Response**:
```json
{
  "success": true,
  "assets": [
    {
      "id": "asset_123",
      "name": "Modern Chair",
      "type": "model",
      "url": "https://api.eventscape.com/assets/asset_123.glb",
      "size": "2.4 MB",
      "uploadedAt": "2024-01-20T00:00:00Z"
    }
  ]
}
```

#### POST /projects/:id/assets
**Purpose**: Upload project asset
**Headers**: `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`
**Request Body**: Form data with file
**Response**:
```json
{
  "success": true,
  "asset": {
    "id": "asset_456",
    "name": "uploaded_file.glb",
    "type": "model",
    "url": "https://api.eventscape.com/assets/asset_456.glb",
    "size": "1.8 MB",
    "uploadedAt": "2024-01-25T00:00:00Z"
  }
}
```

#### DELETE /projects/:id/assets/:assetId
**Purpose**: Delete project asset
**Headers**: `Authorization: Bearer <token>`
**Response**:
```json
{
  "success": true,
  "message": "Asset deleted successfully"
}
```

### Comments Endpoints

#### GET /projects/:id/comments
**Purpose**: Get project comments
**Headers**: `Authorization: Bearer <token>`
**Response**:
```json
{
  "success": true,
  "comments": [
    {
      "id": "comment_123",
      "author": "John Doe",
      "content": "Great work on the lighting setup!",
      "timestamp": "2024-01-20T10:30:00Z",
      "avatar": "https://api.eventscape.com/avatars/john.jpg"
    }
  ]
}
```

#### POST /projects/:id/comments
**Purpose**: Add project comment
**Headers**: `Authorization: Bearer <token>`
**Request Body**:
```json
{
  "content": "This looks amazing! Great work team."
}
```
**Response**:
```json
{
  "success": true,
  "comment": {
    "id": "comment_456",
    "author": "Jane Smith",
    "content": "This looks amazing! Great work team.",
    "timestamp": "2024-01-25T14:30:00Z",
    "avatar": "https://api.eventscape.com/avatars/jane.jpg"
  }
}
```

### 3D Scene Data Endpoints

#### GET /projects/:id/scene
**Purpose**: Get 3D scene data
**Headers**: `Authorization: Bearer <token>`
**Response**:
```json
{
  "success": true,
  "scene": {
    "objects": [
      {
        "id": "obj_123",
        "type": "chair",
        "position": {"x": 0, "y": 0, "z": 0},
        "rotation": {"x": 0, "y": 0, "z": 0},
        "scale": {"x": 1, "y": 1, "z": 1},
        "material": {"color": "#8B5CF6"},
        "createdAt": "2024-01-20T00:00:00Z"
      }
    ],
    "lighting": {
      "ambient": {"color": "#ffffff", "intensity": 0.6},
      "directional": {"color": "#ffffff", "intensity": 0.8, "position": {"x": 10, "y": 10, "z": 5}}
    },
    "camera": {
      "position": {"x": 5, "y": 5, "z": 5},
      "target": {"x": 0, "y": 0, "z": 0}
    }
  }
}
```

#### PUT /projects/:id/scene
**Purpose**: Save 3D scene data
**Headers**: `Authorization: Bearer <token>`
**Request Body**:
```json
{
  "objects": [...],
  "lighting": {...},
  "camera": {...}
}
```
**Response**:
```json
{
  "success": true,
  "message": "Scene saved successfully"
}
```

### Error Responses

All endpoints return consistent error format:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {...}
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR`: Request validation failed
- `UNAUTHORIZED`: Invalid or missing authentication
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `CONFLICT`: Resource already exists
- `INTERNAL_ERROR`: Server error

### Environment Variables

Add these to your `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=https://api.eventscape.com/v1
NEXT_PUBLIC_WS_URL=wss://api.eventscape.com/ws
```

## 🔄 Frontend Integration Guide

### API Service Layer

Create `lib/api.ts` to handle all API calls:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api/v1';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  // Authentication
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(name: string, email: string, password: string) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  }

  // Projects
  async getProjects() {
    return this.request('/projects');
  }

  async getProject(id: string) {
    return this.request(`/projects/${id}`);
  }

  async createProject(project: { title: string; description: string; status: string }) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  }

  async updateProject(id: string, updates: any) {
    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteProject(id: string) {
    return this.request(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Team Management
  async getTeam(projectId: string) {
    return this.request(`/projects/${projectId}/team`);
  }

  async addTeamMember(projectId: string, member: any) {
    return this.request(`/projects/${projectId}/team`, {
      method: 'POST',
      body: JSON.stringify(member),
    });
  }

  async updateTeamMember(projectId: string, memberId: string, updates: any) {
    return this.request(`/projects/${projectId}/team/${memberId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async removeTeamMember(projectId: string, memberId: string) {
    return this.request(`/projects/${projectId}/team/${memberId}`, {
      method: 'DELETE',
    });
  }

  // Assets
  async getAssets(projectId: string) {
    return this.request(`/projects/${projectId}/assets`);
  }

  async uploadAsset(projectId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.request(`/projects/${projectId}/assets`, {
      method: 'POST',
      headers: {}, // Let browser set Content-Type for FormData
      body: formData,
    });
  }

  async deleteAsset(projectId: string, assetId: string) {
    return this.request(`/projects/${projectId}/assets/${assetId}`, {
      method: 'DELETE',
    });
  }

  // Comments
  async getComments(projectId: string) {
    return this.request(`/projects/${projectId}/comments`);
  }

  async addComment(projectId: string, content: string) {
    return this.request(`/projects/${projectId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  }

  // 3D Scene
  async getScene(projectId: string) {
    return this.request(`/projects/${projectId}/scene`);
  }

  async saveScene(projectId: string, sceneData: any) {
    return this.request(`/projects/${projectId}/scene`, {
      method: 'PUT',
      body: JSON.stringify(sceneData),
    });
  }
}

export const apiService = new ApiService();
```

### Update Auth Context

Replace mock authentication in `lib/auth-context.tsx`:

```typescript
import { apiService } from './api';

// In the AuthProvider component:
const login = async (email: string, password: string) => {
  setIsLoading(true);
  try {
    const response = await apiService.login(email, password);
    setUser(response.user);
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('eventscape_user', JSON.stringify(response.user));
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  } finally {
    setIsLoading(false);
  }
};
```

### Update Project Store

Replace mock data in `lib/project-store.ts`:

```typescript
import { apiService } from './api';

// In the store actions:
addProject: async (projectData) => {
  try {
    const response = await apiService.createProject(projectData);
    set((state) => ({
      projects: [...state.projects, response.project],
    }));
    return response.project.id;
  } catch (error) {
    console.error('Failed to create project:', error);
    throw error;
  }
},

updateProject: async (id, updates) => {
  try {
    const response = await apiService.updateProject(id, updates);
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? response.project : p
      ),
    }));
  } catch (error) {
    console.error('Failed to update project:', error);
    throw error;
  }
},
```

### Migration Steps

1. **Remove Static Export**: Update `next.config.js` to remove `output: 'export'`
2. **Add API Service**: Create the `lib/api.ts` file above
3. **Update Auth Context**: Replace mock authentication with real API calls
4. **Update Project Store**: Replace mock data with real API calls
5. **Add Error Handling**: Implement proper error boundaries and user feedback
6. **Add Loading States**: Show loading indicators during API calls
7. **Test Integration**: Verify all endpoints work correctly

### Backend Implementation Priority

1. **Authentication** (login/register/logout)
2. **Project CRUD** (create, read, update, delete)
3. **Team Management** (add/remove team members)
4. **Comments** (add/view comments)
5. **Asset Upload** (file uploads)
6. **3D Scene Data** (save/load scene state)

## 🚀 Deployment

### Static Export (Current Configuration)
```bash
npm run build
# Deploy the 'out' folder to any static hosting service
```

### Vercel Deployment
```bash
npm install -g vercel
vercel
```

### Other Platforms
- **Netlify**: Connect repository and deploy
- **AWS S3 + CloudFront**: Upload static files
- **GitHub Pages**: Enable Pages in repository settings

## 🧪 Development Guidelines

### Code Style
- **TypeScript**: Strict mode enabled
- **ESLint**: Configured with Next.js rules
- **Prettier**: Code formatting (if configured)
- **Component Structure**: Functional components with hooks

### File Naming
- **Components**: PascalCase (e.g., `AppLayout.tsx`)
- **Pages**: lowercase with hyphens (e.g., `project-detail.tsx`)
- **Utilities**: camelCase (e.g., `authContext.tsx`)

### Import Organization
1. React and Next.js imports
2. Third-party libraries
3. Internal components
4. Utilities and hooks
5. Type definitions

## 🔒 Security Considerations

- **Client-side Validation**: All forms include validation
- **XSS Protection**: React's built-in XSS protection
- **CSRF Protection**: Next.js built-in CSRF protection
- **Environment Variables**: Sensitive data in environment variables
- **Content Security Policy**: Configure CSP headers for production

## 📱 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **WebGL Support**: Required for 3D functionality
- **ES6+ Features**: Modern JavaScript features used throughout

## 🐛 Troubleshooting

### Common Issues

1. **Three.js not loading**: Ensure WebGL is supported in browser
2. **Build errors**: Check TypeScript errors with `npm run lint`
3. **Styling issues**: Verify Tailwind CSS is properly configured
4. **Import errors**: Check file paths and export statements

### Development Tools
- **React Developer Tools**: Browser extension for debugging
- **Three.js Inspector**: For 3D scene debugging
- **Next.js DevTools**: Built-in development features

## 📈 Performance Optimization

- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Use `@next/bundle-analyzer`
- **3D Performance**: Optimize Three.js scene complexity
- **Lazy Loading**: Implement for heavy components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 🔍 Code Architecture Deep Dive

### Component Structure
```
components/
├── layout/           # App-wide layout components
│   ├── app-layout.tsx    # Main app wrapper with navbar/sidebar
│   ├── navbar.tsx        # Top navigation with user menu
│   └── sidebar.tsx       # Side navigation with project links
├── ui/               # Reusable UI components (Radix UI based)
└── theme-provider.tsx    # Theme context for dark/light mode
```

### State Management Flow
1. **Authentication**: `lib/auth-context.tsx` - React Context for user state
2. **Projects**: `lib/project-store.ts` - Zustand store for project data
3. **UI State**: Local component state with useState/useReducer

### Key Data Flow
```
User Action → Component → Store/Action → State Update → UI Re-render
```

### 3D Scene Management
- **Scene Setup**: Three.js scene, camera, renderer in `app/design/page.tsx`
- **Object Management**: Add/remove/modify 3D objects dynamically
- **Material System**: Color and texture customization
- **Lighting**: Ambient and directional lighting setup

## 🚀 Quick Start for Developers

### First Time Setup
1. Clone and install dependencies
2. Run `npm run dev` to start development server
3. Navigate to `http://localhost:3000`
4. Use any email/password to login (mock authentication)

### Key Files to Understand
- `app/page.tsx` - Entry point with auth redirect
- `app/dashboard/page.tsx` - Main dashboard with project overview
- `app/design/page.tsx` - 3D design studio (most complex)
- `lib/project-store.ts` - All project data and state management
- `lib/auth-context.tsx` - User authentication logic

### Development Workflow
1. **Adding Features**: Create components in `components/` directory
2. **State Updates**: Modify stores in `lib/` directory
3. **New Pages**: Add to `app/` directory following Next.js App Router
4. **Styling**: Use Tailwind CSS classes, add custom styles to `globals.css`

## 🧪 Testing & Debugging

### Debugging Tools
- **React DevTools**: Component tree and state inspection
- **Three.js Inspector**: 3D scene debugging (add to browser console)
- **Zustand DevTools**: State management debugging
- **Next.js DevTools**: Built-in performance and routing tools

### Common Debug Scenarios
1. **3D Objects Not Rendering**: Check WebGL support and Three.js scene setup
2. **State Not Updating**: Verify Zustand store actions and component subscriptions
3. **Routing Issues**: Check Next.js App Router file structure
4. **Styling Problems**: Verify Tailwind CSS classes and component imports

## 📋 Development Checklist

### Before Starting Work
- [ ] Read the project structure section
- [ ] Understand the state management flow
- [ ] Check existing components for patterns
- [ ] Review the design system guidelines

### When Adding Features
- [ ] Follow TypeScript interfaces
- [ ] Use existing UI components when possible
- [ ] Add proper error handling
- [ ] Include loading states
- [ ] Test responsive design

### Before Committing
- [ ] Run `npm run lint` to check for errors
- [ ] Test the feature thoroughly
- [ ] Update documentation if needed
- [ ] Ensure no console errors

## 🔧 Environment Setup

### Required Software
- Node.js 18.0+ (LTS recommended)
- npm or yarn package manager
- Modern browser with WebGL support
- Code editor with TypeScript support (VS Code recommended)

### VS Code Extensions (Recommended)
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Auto Rename Tag
- Bracket Pair Colorizer

## 📞 Support & Resources

### Documentation Links
- [Next.js Documentation](https://nextjs.org/docs)
- [Three.js Documentation](https://threejs.org/docs)
- [Radix UI Components](https://www.radix-ui.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

### Project-Specific Notes
- All 3D functionality requires WebGL support
- Mock authentication is used for development
- Project data persists in localStorage
- Static export configuration for deployment

## 📄 License

This project is proprietary software. All rights reserved.

---

**EventScape Frontend** - Built with modern web technologies for professional event design and visualization.
