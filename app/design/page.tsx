'use client';

import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Plus, 
  Bot, 
  Layers, 
  Move3D, 
  Palette, 
  RotateCcw,
  Save,
  Eye,
  Lightbulb,
  Armchair,
  Table
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import * as THREE from 'three';

export default function DesignPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const [objectProperties, setObjectProperties] = useState({
    scale: [1],
    rotation: [0],
    color: '#8B5CF6'
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Grid helper
    const gridHelper = new THREE.GridHelper(20, 20, 0xcccccc, 0xcccccc);
    scene.add(gridHelper);

    // Sample objects
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x8B5CF6 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(0, 0.5, 0);
    cube.castShadow = true;
    cube.userData = { name: 'Sample Object', type: 'furniture' };
    scene.add(cube);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const addObject = (type: string) => {
    if (!sceneRef.current) return;

    let geometry: THREE.BufferGeometry;
    let material: THREE.Material;

    switch (type) {
      case 'chair':
        geometry = new THREE.BoxGeometry(0.5, 1, 0.5);
        material = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        break;
      case 'table':
        geometry = new THREE.BoxGeometry(2, 0.1, 1);
        material = new THREE.MeshLambertMaterial({ color: 0x654321 });
        break;
      case 'light':
        geometry = new THREE.SphereGeometry(0.2, 16, 16);
        material = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
        break;
      default:
        geometry = new THREE.BoxGeometry(1, 1, 1);
        material = new THREE.MeshLambertMaterial({ color: 0x8B5CF6 });
    }

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      Math.random() * 4 - 2,
      type === 'table' ? 0.05 : 0.5,
      Math.random() * 4 - 2
    );
    mesh.castShadow = true;
    mesh.userData = { name: `${type} ${Date.now()}`, type };
    
    sceneRef.current.add(mesh);
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Toolbar */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-64 bg-white border-r border-gray-200 p-4 space-y-4"
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Add Objects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => addObject('chair')}
              >
                <Armchair className="mr-2 h-4 w-4" />
                Chair
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => addObject('table')}
              >
                <Table className="mr-2 h-4 w-4" />
                Table
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => addObject('light')}
              >
                <Lightbulb className="mr-2 h-4 w-4" />
                Light
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => addObject('stage')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Stage
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Save className="mr-2 h-4 w-4" />
                Save Scene
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset View
              </Button>
              <Link href="/preview">
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* 3D Canvas */}
        <div className="flex-1 relative">
          <div ref={mountRef} className="w-full h-full" />
          
          {/* AI Copilot Button */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-6 right-6"
          >
            <Button 
              size="lg"
              className="rounded-full bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600 shadow-lg"
            >
              <Bot className="mr-2 h-5 w-5" />
              AI Copilot
            </Button>
          </motion.div>
        </div>

        {/* Right Properties Panel */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-64 bg-white border-l border-gray-200 p-4 space-y-4"
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Layers className="mr-2 h-4 w-4" />
                Layers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">Ground</span>
                <Badge variant="secondary">Base</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-purple-50 rounded border border-purple-200">
                <span className="text-sm">Sample Object</span>
                <Badge className="bg-purple-600">Selected</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Move3D className="mr-2 h-4 w-4" />
                Properties
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Scale</Label>
                <Slider
                  value={objectProperties.scale}
                  onValueChange={(value) => setObjectProperties(prev => ({ ...prev, scale: value }))}
                  max={3}
                  min={0.1}
                  step={0.1}
                  className="w-full"
                />
                <span className="text-xs text-gray-500">{objectProperties.scale[0]}x</span>
              </div>

              <div className="space-y-2">
                <Label>Rotation</Label>
                <Slider
                  value={objectProperties.rotation}
                  onValueChange={(value) => setObjectProperties(prev => ({ ...prev, rotation: value }))}
                  max={360}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <span className="text-xs text-gray-500">{objectProperties.rotation[0]}°</span>
              </div>

              <div className="space-y-2">
                <Label>Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="color"
                    value={objectProperties.color}
                    onChange={(e) => setObjectProperties(prev => ({ ...prev, color: e.target.value }))}
                    className="w-12 h-8 p-0 border-0"
                  />
                  <Input
                    value={objectProperties.color}
                    onChange={(e) => setObjectProperties(prev => ({ ...prev, color: e.target.value }))}
                    className="flex-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
}