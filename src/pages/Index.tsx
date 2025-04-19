
import { Layout } from "@/components/layout/Layout";
import { Hero3DSection } from "@/components/landing/Hero3DSection";
import { Features3DSection } from "@/components/landing/Features3DSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CTASection } from "@/components/landing/CTASection";
import { BackgroundScene } from "@/components/landing/BackgroundScene";
import { InteractiveModel } from "@/components/interactive/InteractiveModel";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <Layout>
      <BackgroundScene />
      <Hero3DSection />
      
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 via-background to-purple-900/10"></div>
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              Interactive Experience
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-violet-400 via-primary to-indigo-400 text-transparent bg-clip-text mb-4">
              Play With Our 3D Models
            </h2>
            <p className="text-muted-foreground text-lg">
              Drag, rotate and interact with these 3D objects. Click on them to see what happens!
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <InteractiveModel />
          </motion.div>
        </div>
      </section>
      
      <Features3DSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
