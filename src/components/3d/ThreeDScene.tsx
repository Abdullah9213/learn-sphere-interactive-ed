
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const ThreeDScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f3ff); // Light purple background
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Create 3D educational elements
    
    // Floating book
    const bookGeometry = new THREE.BoxGeometry(1, 0.1, 1.5);
    const bookMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8b5cf6, // Purple
      roughness: 0.3,
      metalness: 0.2
    });
    const book = new THREE.Mesh(bookGeometry, bookMaterial);
    book.position.set(-2, 0, 0);
    scene.add(book);
    
    // Floating graduation cap
    const capBaseGeometry = new THREE.BoxGeometry(1, 0.1, 1);
    const capBase = new THREE.Mesh(capBaseGeometry, new THREE.MeshStandardMaterial({ color: 0x1e293b }));
    capBase.position.set(2, 0, 0);
    
    const capTopGeometry = new THREE.BoxGeometry(1.2, 0.1, 1.2);
    const capTop = new THREE.Mesh(capTopGeometry, new THREE.MeshStandardMaterial({ color: 0x1e293b }));
    capTop.position.set(0, 0.2, 0);
    
    const capButtonGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const capButton = new THREE.Mesh(capButtonGeometry, new THREE.MeshStandardMaterial({ color: 0x8b5cf6 }));
    capButton.position.set(0, 0.3, 0);
    
    const capTasselGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.4, 8);
    const capTassel = new THREE.Mesh(capTasselGeometry, new THREE.MeshStandardMaterial({ color: 0xf59e0b }));
    capTassel.position.set(0.4, 0.1, 0.4);
    capTassel.rotation.set(0, 0, Math.PI / 4);
    
    const graduationCap = new THREE.Group();
    graduationCap.add(capBase, capTop, capButton, capTassel);
    graduationCap.position.set(2, 0, 0);
    scene.add(graduationCap);
    
    // Floating atom (representing science education)
    const nucleusGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const nucleusMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xec4899, // Pink
      roughness: 0.3,
      metalness: 0.5
    });
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    
    const atomGroup = new THREE.Group();
    atomGroup.add(nucleus);
    
    // Create electron orbits
    const orbitMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x60a5fa, // Blue
      roughness: 0.5,
      metalness: 0.5 
    });
    
    for (let i = 0; i < 3; i++) {
      const orbit = new THREE.RingGeometry(0.8 + i * 0.3, 0.82 + i * 0.3, 64);
      const orbitMesh = new THREE.Mesh(orbit, orbitMaterial);
      orbitMesh.rotation.x = Math.PI / 2 + i * (Math.PI / 4);
      atomGroup.add(orbitMesh);
      
      // Add electrons on each orbit
      const electronGeometry = new THREE.SphereGeometry(0.08, 16, 16);
      const electron = new THREE.Mesh(electronGeometry, orbitMaterial);
      const electronAngle = Math.random() * Math.PI * 2;
      electron.position.set(
        Math.cos(electronAngle) * (0.8 + i * 0.3),
        0,
        Math.sin(electronAngle) * (0.8 + i * 0.3)
      );
      orbitMesh.add(electron);
    }
    
    atomGroup.position.set(0, 0, -2);
    scene.add(atomGroup);
    
    // Create floating particles (knowledge particles)
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x8b5cf6,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate objects
      book.rotation.y += 0.005;
      graduationCap.rotation.y += 0.003;
      atomGroup.rotation.y += 0.01;
      
      // Rotate particles for flowing effect
      particles.rotation.x += 0.0005;
      particles.rotation.y += 0.0005;
      
      controls.update();
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
      className="w-full h-[500px] lg:h-[600px] rounded-lg overflow-hidden"
    />
  );
};
