
import React, { useRef, useEffect } from "react";
import { Video, MessageCircle, FileText, Bookmark, User, BarChart } from "lucide-react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Feature card component
const FeatureCard = ({
  icon: Icon,
  title,
  description,
  className = "",
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/10 hover:shadow-md transition-shadow group ${className}`}>
      <div className="flex flex-col space-y-4">
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-display font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

// 3D Sphere Component
const ThreeDSphere = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Set up scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(300, 300);
    mountRef.current.appendChild(renderer.domElement);

    // Add light
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x6d28d9, 2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create sphere with wireframe
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x6d28d9,
      wireframe: true,
      emissive: 0x6d28d9,
      emissiveIntensity: 0.2,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Add particles around the sphere
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xffffff,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Position camera
    camera.position.z = 5;

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      sphere.rotation.x += 0.002;
      sphere.rotation.y += 0.002;
      
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;
      
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle cleanup
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      sphere.geometry.dispose();
      sphere.material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="mx-auto mt-8 h-[300px] w-[300px]"></div>;
};

export const Features3DSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-indigo-900/10 to-purple-900/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 bg-grid-8"></div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-purple-400 via-primary to-blue-400 text-transparent bg-clip-text">
            Interactive Learning Platform
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Discover how our platform transforms education by combining AI-enhanced content with real-time interactive features.
          </p>
          
          <ThreeDSphere />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon={Video}
            title="AI-Enhanced Videos"
            description="Our platform automatically generates transcripts for all video lectures, making content more accessible and searchable."
            className="animate-fade-in [animation-delay:100ms]"
          />
          
          <FeatureCard 
            icon={FileText}
            title="Smart Transcripts"
            description="Navigate long lectures easily with synchronized transcripts that highlight as the video plays."
            className="animate-fade-in [animation-delay:200ms]"
          />
          
          <FeatureCard 
            icon={MessageCircle}
            title="Real-time Interaction"
            description="Chat with tutors and fellow students in course-specific chat rooms for immediate help and discussion."
            className="animate-fade-in [animation-delay:300ms]"
          />
          
          <FeatureCard 
            icon={User}
            title="Expert Tutors"
            description="Learn from qualified educators who can create engaging courses and provide personalized guidance."
            className="animate-fade-in [animation-delay:400ms]"
          />
          
          <FeatureCard 
            icon={Bookmark}
            title="Organized Content"
            description="Courses are structured with clear sections and lessons to ensure a smooth learning experience."
            className="animate-fade-in [animation-delay:500ms]"
          />
          
          <FeatureCard 
            icon={BarChart}
            title="Track Progress"
            description="Monitor your learning journey with detailed progress tracking and analytics."
            className="animate-fade-in [animation-delay:600ms]"
          />
        </div>
      </div>
    </section>
  );
};
