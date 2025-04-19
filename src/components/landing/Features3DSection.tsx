
import React, { useRef, useEffect } from "react";
import { Video, MessageCircle, FileText, Bookmark, User, BarChart } from "lucide-react";
import * as THREE from 'three';

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
    <div className={`bg-white rounded-xl p-6 shadow-sm border border-border/40 hover:shadow-md transition-shadow group ${className}`}>
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

// 3D Floating Sphere
const FloatingSphere = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Create sphere geometry
    const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    
    // Create wireframe material
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });
    
    // Create sphere mesh
    const sphere = new THREE.Mesh(sphereGeometry, wireframeMaterial);
    scene.add(sphere);
    
    // Create particles inside the sphere
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Generate points within the sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = Math.random() * 1.4; // Keep particles inside the sphere
      
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i+1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i+2] = radius * Math.cos(phi);
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x60a5fa,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the sphere slowly
      sphere.rotation.y += 0.003;
      sphere.rotation.x += 0.001;
      
      // Rotate particles in opposite direction
      particles.rotation.y -= 0.002;
      particles.rotation.x -= 0.001;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="w-full h-[300px] rounded-lg overflow-hidden"
    />
  );
};

export const Features3DSection = () => {
  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Interactive Learning Platform
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Discover how our platform transforms education by combining AI-enhanced content with real-time interactive features.
          </p>
          
          {/* Add the 3D floating sphere */}
          <div className="mt-8 mb-12 max-w-md mx-auto">
            <FloatingSphere />
          </div>
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
