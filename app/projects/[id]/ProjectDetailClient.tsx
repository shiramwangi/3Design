'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useProjectStore, type Project } from '@/lib/project-store';
import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeamManagement } from "@/components/team/team-management";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  Building,
  Calendar, 
  Edit, 
  Share2, 
  Download,
  Upload,
  MessageSquare,
  Send,
  FileImage,
  Box,
  Clock,
  Users,
  ChevronRight,
  Plus,
  Search,
  FileText,
  Image as ImageIcon,
  Package
} from 'lucide-react';

interface ProjectDetailClientProps {
  params: {
    id: string;
  };
}

export default function ProjectDetailClient({ params }: ProjectDetailClientProps) {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { 
    projects, 
    currentProject, 
    setCurrentProject, 
    assets, 
    comments, 
    addComment
  } = useProjectStore();
  
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [projectDetails, setProjectDetails] = useState<Project | null>(null);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Update project details when the project changes
  const fetchProject = useCallback(async () => {
    try {
      console.log('Fetching project with ID:', params.id);
      console.log('Params object:', params);
      setIsLoading(true);
      setError(null);
      
      // Check if params.id is valid
      if (!params.id || params.id === 'undefined') {
        console.error('Invalid project ID:', params.id);
        setError('Invalid project ID provided');
        return;
      }
      
      // Get fresh state to ensure we have the latest projects
      const currentProjects = useProjectStore.getState().projects;
      console.log('Available project IDs:', currentProjects.map(p => p.id));
      
      const current = currentProjects.find(p => p.id === params.id);
      
      if (!current) {
        console.error('Project not found in store');
        setError(`Project with ID "${params.id}" not found. Available projects: ${currentProjects.map(p => p.id).join(', ')}`);
        return;
      }
      
      console.log('Found project:', current);
      setProjectDetails(current);
      setCurrentProject(current);
    } catch (err) {
      console.error('Error in fetchProject:', err);
      setError('Failed to load project. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [params.id, setCurrentProject]);

  useEffect(() => {
    // Add a small delay to ensure the store is hydrated
    const timer = setTimeout(() => {
      fetchProject().catch(err => {
        console.error('Unhandled error in fetchProject:', err);
        setError('An unexpected error occurred');
      });
    }, 100);
    
    return () => clearTimeout(timer);
  }, [fetchProject]);
  
  const handleTeamUpdate = useCallback(() => {
    try {
      const current = projects.find(p => p.id === params.id);
      if (current) {
        setProjectDetails({...current});
      }
    } catch (err) {
      console.error('Error in handleTeamUpdate:', err);
    }
  }, [params.id, projects]);

  const handleAddComment = useCallback(async () => {
    if (!newComment.trim() || !user?.name) return;
    
    try {
      await addComment(newComment, user.name);
      setNewComment('');
    } catch (err) {
      console.error('Failed to add comment:', err);
      setError('Failed to add comment. Please try again.');
    }
  }, [addComment, newComment, user?.name]);

  // Handle error state
  if (error) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 p-4">
          <div className="text-center space-y-2">
            <p className="text-xl font-medium text-red-600">Error Loading Project</p>
            <p className="text-muted-foreground">{error}</p>
            <p className="text-xs text-muted-foreground">Project ID: {params.id}</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
            <Button 
              variant="ghost"
              onClick={() => router.push('/dashboard')}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  // Show loading state
  if (isLoading || isAuthLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Loading project details...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!projectDetails) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 p-4">
          <p className="text-muted-foreground">Project not found</p>
          <p className="text-xs text-muted-foreground">Project ID: {params.id}</p>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
            <Button 
              variant="ghost"
              onClick={() => router.push('/dashboard')}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                Projects
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{projectDetails.title}</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight mt-1">{projectDetails.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="capitalize">
                {projectDetails.status.replace('-', ' ')}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Created on {new Date(projectDetails.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button 
              size="sm"
              onClick={() => router.push(`/projects/${projectDetails.id}/edit`)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Project
            </Button>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Project Progress</span>
              <span className="text-sm text-muted-foreground">
                {projectDetails.team?.length || 0} team members
              </span>
            </div>
            <div className="space-y-2">
              <Progress 
                value={projectDetails.team?.length 
                  ? (projectDetails.team.filter(m => m.role.toLowerCase() === 'completed').length / projectDetails.team.length) * 100 
                  : 0} 
                className="h-2" 
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs 
          defaultValue="overview" 
          className="space-y-6"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="w-full flex overflow-x-auto">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="inspiration" className="flex-1">Inspiration</TabsTrigger>
            <TabsTrigger value="team" className="flex-1">
              <div className="flex items-center">
                Team & Roles
                {projectDetails.team?.length ? (
                  <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                    {projectDetails.team.length}
                  </span>
                ) : null}
              </div>
            </TabsTrigger>
            <TabsTrigger value="assets" className="flex-1">
              <div className="flex items-center">
                Assets
                {assets?.length ? (
                  <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs">
                    {assets.length}
                  </span>
                ) : null}
              </div>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Project Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Project Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p className="text-foreground">
                      {projectDetails.description || 'No description provided'}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge 
                        variant="outline" 
                        className={`capitalize ${
                          projectDetails.status === 'completed' 
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : projectDetails.status === 'in-progress'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-gray-50 text-gray-700 border-gray-200'
                        }`}
                      >
                        {projectDetails.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Created</p>
                      <p className="font-medium">
                        {new Date(projectDetails.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Updated</p>
                      <p className="font-medium">
                        {new Date(projectDetails.updatedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Team Members</p>
                      <p className="font-medium">{projectDetails.team?.length || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Team Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Team Members
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary"
                      onClick={() => setActiveTab('team')}
                    >
                      View All <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {projectDetails.team?.length ? (
                    <div className="space-y-4">
                      <div className="flex -space-x-2">
                        {projectDetails.team.slice(0, 5).map((member) => (
                          <Avatar key={member.id} className="border-2 border-background">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>
                              {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {projectDetails.team.length > 5 && (
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                            +{projectDetails.team.length - 5}
                          </div>
                        )}
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full mt-2"
                        onClick={() => setActiveTab('team')}
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Team Member
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-6 space-y-4">
                      <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                        <Users className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">No team members added yet</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setActiveTab('team')}
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Team Member
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {comments.length > 0 ? (
                      comments.slice(0, 3).map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <Avatar>
                            <AvatarImage src={comment.avatar} />
                            <AvatarFallback>
                              {comment.author.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{comment.author}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(comment.timestamp).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                            <p className="text-sm mt-1">{comment.content}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">No recent activity</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Team & Roles Tab */}
          <TabsContent value="team" className="space-y-6">
            <TeamManagement 
              projectId={projectDetails.id} 
              team={projectDetails.team || []} 
              onTeamUpdate={handleTeamUpdate} 
            />
          </TabsContent>

          {/* Assets & Files Tab */}
          <TabsContent value="assets" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Assets & Files</h2>
                <p className="text-sm text-muted-foreground">
                  {assets.length} {assets.length === 1 ? 'file' : 'files'} in this project
                </p>
              </div>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Files
              </Button>
            </div>
            
            {assets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {assets.map((asset) => {
                  const fileType = asset.name.split('.').pop()?.toLowerCase();
                  const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileType || '');
                  const is3D = ['glb', 'gltf', 'fbx', 'obj'].includes(fileType || '');
                  const isDocument = ['pdf', 'doc', 'docx', 'txt'].includes(fileType || '');
                  
                  const IconComponent = isImage 
                    ? ImageIcon 
                    : is3D 
                      ? Box 
                      : isDocument 
                        ? FileText 
                        : FileImage;
                  
                  return (
                    <Card key={asset.id} className="group hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="p-2 rounded-lg bg-muted">
                            <IconComponent className="h-6 w-6 text-foreground" />
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Search className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <h3 className="font-medium text-sm truncate">{asset.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {asset.size} • {fileType?.toUpperCase()}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6 border rounded-lg">
                <MessageSquare className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No files uploaded yet</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Comment Section */}
        <div className="mt-12 border-t pt-8">
          <h3 className="text-lg font-medium mb-4">Discussion</h3>
          
          {comments.length > 0 ? (
            <div className="space-y-6 mb-8">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar>
                    <AvatarImage src={comment.avatar} />
                    <AvatarFallback>
                      {comment.author.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{comment.author}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(comment.timestamp).toLocaleString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                      <p className="mt-2">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border rounded-lg mb-8">
              <MessageSquare className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No comments yet. Start the discussion!</p>
            </div>
          )}
          
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>
                {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleAddComment();
                  }
                }}
                className="min-h-[100px]"
              />
              <div className="flex justify-end">
                <Button 
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Post Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
