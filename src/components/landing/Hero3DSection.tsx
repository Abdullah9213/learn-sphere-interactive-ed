
import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, BookOpen } from "lucide-react";
import Spline from '@splinetool/react-spline';

export const Hero3DSection = () => {
  return (
    <section className="relative overflow-hidden pt-24 pb-32 bg-gradient-to-br from-purple-600/5 via-background to-indigo-500/5">
      {/* 3D Background elements */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/o6TP6hMYQxZbYMDL/scene.splinecode" />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-20 left-[20%] h-64 w-64 rounded-full bg-purple-400/10 blur-3xl animate-pulse-gentle"></div>
      <div className="absolute bottom-20 right-[20%] h-72 w-72 rounded-full bg-blue-400/10 blur-3xl animate-pulse-gentle" style={{ animationDelay: "1s" }}></div>
      <div className="absolute top-40 right-[40%] h-40 w-40 rounded-full bg-orange-400/10 blur-3xl animate-pulse-gentle" style={{ animationDelay: "2s" }}></div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10">
            <div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 bg-gradient-to-r from-purple-500 via-primary to-blue-500 text-transparent bg-clip-text">
                Learn Anywhere, <br /> Achieve Everywhere
              </h1>
              <p className="text-xl text-foreground/80 md:text-2xl max-w-xl mx-auto lg:mx-0">
                Join Professor Chad's revolutionary learning platform with AI-enhanced video lectures and real-time interaction.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" asChild className="rounded-full group relative overflow-hidden">
                <Link to="/courses" className="relative z-10">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-blue-500 group-hover:opacity-90 transition-opacity"></span>
                  <span className="relative z-20">Explore Courses</span>
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20">
                <Link to="/signup">Become a Tutor</Link>
              </Button>
            </div>
            
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-8">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-primary">500+</span>
                <span className="text-sm text-muted-foreground">Courses</span>
              </div>
              <div className="h-10 w-px bg-border"></div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-primary">200+</span>
                <span className="text-sm text-muted-foreground">Tutors</span>
              </div>
              <div className="h-10 w-px bg-border"></div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-primary">50k+</span>
                <span className="text-sm text-muted-foreground">Students</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="backdrop-blur-md bg-white/5 p-2 rounded-2xl border border-white/10 aspect-square">
              <div className="h-full w-full relative rounded-xl overflow-hidden">
                <Spline scene="https://prod.spline.design/6Wq1Q7J9ocM1tlwR/scene.splinecode" />
              </div>
            </div>
            
            <div className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-primary flex items-center justify-center text-white shadow-lg transform rotate-12 animate-pulse-slow">
              <div className="text-center transform -rotate-12">
                <div className="text-lg font-bold">Live</div>
                <div className="text-sm">Chat</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
