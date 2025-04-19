
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, Brain, Sparkles } from "lucide-react";
import { ThreeDScene } from "../3d/ThreeDScene";

export const Hero3DSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-100 via-white to-blue-50 pt-16 pb-20">
      {/* Gradient orbs */}
      <div className="absolute top-20 left-[20%] h-64 w-64 rounded-full bg-purple-400/20 blur-3xl animate-pulse-gentle"></div>
      <div className="absolute bottom-20 right-[20%] h-72 w-72 rounded-full bg-blue-400/20 blur-3xl animate-pulse-gentle" style={{ animationDelay: "1s" }}></div>
      <div className="absolute top-40 right-[40%] h-40 w-40 rounded-full bg-orange-400/20 blur-3xl animate-pulse-gentle" style={{ animationDelay: "2s" }}></div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full text-primary text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                <span>Next-gen AI-powered EdTech</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-purple-700 via-primary to-blue-600 text-transparent bg-clip-text">
                Learn Anywhere, <br /> Achieve Everywhere
              </h1>
              <p className="text-xl text-foreground/80 max-w-xl mx-auto lg:mx-0">
                Join our revolutionary learning platform with AI-enhanced video lectures, transcripts, and real-time interaction.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" asChild className="rounded-full group overflow-hidden relative">
                <Link to="/courses">
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="relative flex items-center">
                    <Brain className="mr-2 h-5 w-5" />
                    Explore Courses
                  </span>
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full border-primary/50 hover:border-primary">
                <Link to="/signup">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Become a Tutor
                </Link>
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
          
          <div className="relative order-1 lg:order-2">
            {/* 3D Scene */}
            <div className="rounded-2xl overflow-hidden border border-purple-200 shadow-xl">
              <ThreeDScene />
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-accent flex items-center justify-center text-white shadow-lg animate-pulse-slow">
              <div className="text-center">
                <div className="text-lg font-bold">3D</div>
                <div className="text-xs">Interactive</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
