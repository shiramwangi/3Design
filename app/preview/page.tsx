'use client';

import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Maximize, 
  Minimize, 
  Download, 
  RotateCcw,
  Play,
  Pause,
  Volume2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';

export default function PreviewPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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
    camera.position.set(8, 6, 8);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced lighting for preview
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Spot lights for dramatic effect
    const spotLight1 = new THREE.SpotLight(0x8B5CF6, 0.5);
    spotLight1.position.set(-5, 8, 5);
    spotLight1.castShadow = true;
    scene.add(spotLight1);

    const spotLight2 = new THREE.SpotLight(0x319795, 0.5);
    spotLight2.position.set(5, 8, -5);
    spotLight2.castShadow = true;
    scene.add(spotLight2);

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Sample event setup
    // Stage
    const stageGeometry = new THREE.BoxGeometry(6, 0.2, 4);
    const stageMaterial = new THREE.MeshLambertMaterial({ color: 0x2D1B69 });
    const stage = new THREE.Mesh(stageGeometry, stageMaterial);
    stage.position.set(0, 0.1, -2);
    stage.castShadow = true;
    scene.add(stage);

    // Tables
    for (let i = 0; i < 6; i++) {
      const tableGeometry = new THREE.CylinderGeometry(1, 1, 0.1, 8);
      const tableMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
      const table = new THREE.Mesh(tableGeometry, tableMaterial);
      
      const angle = (i / 6) * Math.PI * 2;
      table.position.set(
        Math.cos(angle) * 4,
        0.05,
        Math.sin(angle) * 4 + 2
      );
      table.castShadow = true;
      scene.add(table);

      // Chairs around each table
      for (let j = 0; j < 4; j++) {
        const chairGeometry = new THREE.BoxGeometry(0.4, 0.8, 0.4);
        const chairMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
        const chair = new THREE.Mesh(chairGeometry, chairMaterial);
        
        const chairAngle = (j / 4) * Math.PI * 2;
        chair.position.set(
          table.position.x + Math.cos(chairAngle) * 1.5,
          0.4,
          table.position.z + Math.sin(chairAngle) * 1.5
        );
        chair.castShadow = true;
        scene.add(chair);
      }
    }

    // Auto-rotation animation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      if (isPlaying) {
        camera.position.x = Math.cos(Date.now() * 0.0005) * 8;
        camera.position.z = Math.sin(Date.now() * 0.0005) * 8;
        camera.lookAt(0, 0, 0);
      }
      
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
      cancelAnimationFrame(animationId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isPlaying]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mountRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const resetCamera = () => {
    if (cameraRef.current) {
      cameraRef.current.position.set(8, 6, 8);
      cameraRef.current.lookAt(0, 0, 0);
    }
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
      <div className="h-[calc(100vh-73px)] flex flex-col">
        {/* Preview Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-b border-gray-200 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">3D Preview</h1>
              <p className="text-sm text-gray-600">Interactive preview of your event design</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={resetCamera}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <Minimize className="h-4 w-4" />
                ) : (
                  <Maximize className="h-4 w-4" />
                )}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </motion.div>

        {/* 3D Canvas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 relative bg-gray-100"
        >
          <div ref={mountRef} className="w-full h-full" />
          
          {/* Controls Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                  <span>🖱️ Click and drag to orbit</span>
                  <span>🔍 Scroll to zoom</span>
                  <span>⌨️ Use arrow keys to navigate</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}