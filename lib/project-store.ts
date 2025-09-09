import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  joinDate: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  status: 'draft' | 'in-progress' | 'completed';
  team: TeamMember[];
  createdAt: string;
  updatedAt: string;
}

export interface Asset {
  id: string;
  name: string;
  type: 'model' | 'texture' | 'image';
  url: string;
  size: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  avatar?: string;
}

interface ProjectStore {
  projects: Project[];
  currentProject: Project | null;
  assets: Asset[];
  comments: Comment[];
  setCurrentProject: (project: Project | null) => void;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'team'>) => string;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addComment: (content: string, author: string) => void;
  addTeamMember: (projectId: string, member: Omit<TeamMember, 'id' | 'joinDate'>) => void;
  updateTeamMember: (projectId: string, memberId: string, updates: Partial<TeamMember>) => void;
  removeTeamMember: (projectId: string, memberId: string) => void;
}

// Initial state
const initialState = {
  projects: [
    {
      id: '1',
      title: 'Corporate Gala 2024',
      description: 'Elegant corporate event with modern staging',
      thumbnail:
        'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      status: 'in-progress' as const,
      team: [
        {
          id: 'tm1',
          name: 'Alex Johnson',
          email: 'alex@example.com',
          role: 'Project Manager',
          joinDate: '2024-01-15',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
        {
          id: 'tm2',
          name: 'Sarah Williams',
          email: 'sarah@example.com',
          role: 'Designer',
          joinDate: '2024-01-16',
          avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        },
        {
          id: 'tm3',
          name: 'Michael Chen',
          email: 'michael@example.com',
          role: 'Developer',
          joinDate: '2024-01-17',
          avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        },
      ],
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
    },
    {
      id: '2',
      title: 'Wedding Reception',
      description: 'Romantic outdoor wedding setup',
      thumbnail:
        'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      status: 'completed' as const,
      team: [
        {
          id: 'tm4',
          name: 'Emma Wilson',
          email: 'emma@example.com',
          role: 'Event Planner',
          joinDate: '2024-02-10',
          avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        },
      ],
      createdAt: '2024-02-01',
      updatedAt: '2024-02-15',
    },
    {
      id: '3',
      title: 'Tech Conference',
      description: 'Modern tech conference with interactive displays',
      thumbnail:
        'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      status: 'draft' as const,
      team: [
        {
          id: 'tm5',
          name: 'David Rodriguez',
          email: 'david@example.com',
          role: 'Tech Lead',
          joinDate: '2024-03-01',
          avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        },
      ],
      createdAt: '2024-03-01',
      updatedAt: '2024-03-05',
    },
  ],
  currentProject: null,
  assets: [
    {
      id: '1',
      name: 'Modern Chair',
      type: 'model' as const,
      url: '/assets/chair.glb',
      size: '2.4 MB'
    },
    {
      id: '2',
      name: 'Wood Texture',
      type: 'texture' as const,
      url: '/assets/wood.jpg',
      size: '1.2 MB'
    },
    {
      id: '3',
      name: 'Stage Lighting',
      type: 'model' as const,
      url: '/assets/light.glb',
      size: '800 KB'
    }
  ],
  comments: [
    {
      id: '1',
      author: 'Sarah Johnson',
      content: 'Love the lighting setup! Could we make the stage area a bit larger?',
      timestamp: '2024-01-20T10:30:00Z',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
    },
    {
      id: '2',
      author: 'Mike Chen',
      content: 'The color scheme works perfectly with our brand guidelines.',
      timestamp: '2024-01-20T14:15:00Z',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
    }
  ],
};

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      setCurrentProject: (project) => set({ currentProject: project }),
      addProject: (projectData) => {
        const now = new Date().toISOString();
        const newProject: Project = {
          ...projectData,
          id: Math.random().toString(36).substr(2, 9),
          team: [],
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          projects: [...state.projects, newProject],
        }));
        return newProject.id;
      },
      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id
              ? { ...p, ...updates, updatedAt: new Date().toISOString() }
              : p
          ),
        }));
      },
      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        }));
      },
      addComment: (content, author) => {
        const newComment: Comment = {
          id: Math.random().toString(36).substr(2, 9),
          author,
          content,
          timestamp: new Date().toISOString(),
          avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
        };
        set((state) => ({
          comments: [...state.comments, newComment],
        }));
      },
      addTeamMember: (projectId, member) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  team: [
                    ...project.team,
                    {
                      ...member,
                      id: `tm${Math.random().toString(36).substr(2, 9)}`,
                      joinDate: new Date().toISOString(),
                    },
                  ],
                  updatedAt: new Date().toISOString(),
                }
              : project
          ),
        }));
      },
      updateTeamMember: (projectId, memberId, updates) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  team: project.team.map((member) =>
                    member.id === memberId
                      ? { ...member, ...updates, id: memberId }
                      : member
                  ),
                  updatedAt: new Date().toISOString(),
                }
              : project
          ),
        }));
      },
      removeTeamMember: (projectId, memberId) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  team: project.team.filter(
                    (member) => member.id !== memberId
                  ),
                  updatedAt: new Date().toISOString(),
                }
              : project
          ),
        }));
      },
    }),
    {
      name: 'project-storage',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? localStorage : sessionStorage
      ),
      partialize: (state) => ({
        projects: state.projects,
        currentProject: state.currentProject,
      }),
    }
  )
);
