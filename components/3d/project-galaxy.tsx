"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import type * as THREE from "three"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const projectsData = [
  {
    id: 1,
    name: "DevTrack",
    category: "backend",
    position: [2, 1, 0],
    color: "#00ffff",
    description: "A comprehensive developer activity tracker and project monitoring dashboard.",
    technologies: ["Laravel", "PHP", "React", "MySQL"],
    github: "https://github.com/calordddd/DevTrack",
    demo: "https://github.com/calordddd/DevTrack",
    image: "/devtrack.png",
  },
  {
    id: 2,
    name: "Printababes",
    category: "frontend",
    position: [-2, -1, 1],
    color: "#ff00ff",
    description: "High-performance responsive web application built with TypeScript and React.",
    technologies: ["React", "TypeScript", "Next.js", "TailwindCSS"],
    github: "https://github.com/calordddd/printababes",
    demo: "https://github.com/calordddd/printababes",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Local Search Engine",
    category: "backend",
    position: [0, 2, -2],
    color: "#ffff00",
    description: "High-performance index text search engine optimized for rapid local file scanning.",
    technologies: ["C++", "File I/O", "Data Structures", "Algorithms"],
    github: "https://github.com/calordddd/LocalSearchEngine",
    demo: "https://github.com/calordddd/LocalSearchEngine",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "All In One Tool",
    category: "frontend",
    position: [-1, 0, 2],
    color: "#00ff00",
    description: "Cross-platform mobile application featuring administrative controls, budget calculators, and AI integrations.",
    technologies: ["Dart", "Flutter", "Firebase", "AI API"],
    github: "https://github.com/calordddd",
    demo: "https://github.com/calordddd",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    name: "Automated Sorting System",
    category: "backend",
    position: [1.5, -1.5, -1],
    color: "#ff8800",
    description: "Industrial hardware sorting logic module optimized with high-performance C++ structure pipelines.",
    technologies: ["C++", "System Architecture", "Hardware Integration"],
    github: "https://github.com/calordddd",
    demo: "https://github.com/calordddd",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    name: "Adapted",
    category: "backend",
    position: [-1.8, 1.8, -1.2],
    color: "#0088ff",
    description: "Adaptive learning system and tutoring progress tracking platform built in Laravel PHP.",
    technologies: ["Laravel", "PHP", "MySQL", "TailwindCSS"],
    github: "https://github.com/calordddd",
    demo: "https://github.com/calordddd",
    image: "/placeholder.svg?height=200&width=300",
  },
]

function ProjectPlanet({ project, onClick, isSelected }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const textColor = mounted && theme === "light" ? "#0f172a" : "white"

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.05
    }
  })

  return (
    <group position={project.position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto"
        }}
      >
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial
          color={project.color}
          emissive={project.color}
          emissiveIntensity={isSelected ? 0.2 : 0.05}
          transparent
          opacity={0.7}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.6, 16]} />
        <meshBasicMaterial color={project.color} transparent opacity={0.2} />
      </mesh>

      <Text position={[0, -0.8, 0]} fontSize={0.15} color={textColor} anchorX="center" anchorY="middle">
        {project.name}
      </Text>
    </group>
  )
}

// Fallback 2D grid view
function FallbackProjectGrid({ projects, onProjectClick }: any) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project: any) => (
        <motion.div
          key={project.id}
          whileHover={{ scale: 1.05 }}
          onClick={() => onProjectClick(project)}
          className="cursor-pointer"
        >
          <Card className="glass-morphism border-white/20 hover:border-cyan-400/50 transition-all duration-300">
            <CardContent className="p-4">
              <div
                className="w-full h-32 rounded-lg mb-4 flex items-center justify-center text-4xl"
                style={{ backgroundColor: project.color + "20" }}
              >
                🚀
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{project.name}</h3>
              <p className="text-white/70 text-sm line-clamp-2">{project.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

interface ProjectGalaxyProps {
  selectedFilter: string
}

export default function ProjectGalaxy({ selectedFilter }: ProjectGalaxyProps) {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [webglSupported, setWebglSupported] = useState(true)
  const [canvasError, setCanvasError] = useState(false)
  const [cameraZ, setCameraZ] = useState(7)

  const filteredProjects = projectsData.filter(
    (project) => selectedFilter === "all" || project.category === selectedFilter,
  )

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      if (!gl) {
        setWebglSupported(false)
      }
    } catch (e) {
      setWebglSupported(false)
    }

    const handleResize = () => {
      if (window.innerWidth < 480) {
        setCameraZ(11.5)
      } else if (window.innerWidth < 768) {
        setCameraZ(10.0)
      } else {
        setCameraZ(8.0)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleCanvasError = () => {
    setCanvasError(true)
    setWebglSupported(false)
  }

  return (
    <div className="relative w-full h-full">
      {webglSupported && !canvasError ? (
        <Canvas
          key={cameraZ}
          camera={{ position: [0, 0, cameraZ], fov: 60 }}
          onError={handleCanvasError}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, -5, -5]} intensity={0.4} color="#ff00ff" />

          {filteredProjects.map((project) => (
            <ProjectPlanet
              key={project.id}
              project={project}
              isSelected={selectedProject?.id === project.id}
              onClick={() => setSelectedProject(project)}
            />
          ))}

          <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} maxDistance={15} minDistance={3} />
        </Canvas>
      ) : (
        <FallbackProjectGrid projects={filteredProjects} onProjectClick={setSelectedProject} />
      )}

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-10"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-morphism rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedProject.image || "/placeholder.svg?height=200&width=300"}
                    alt={selectedProject.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">{selectedProject.name}</h3>

                  <p className="text-white/80 mb-4">{selectedProject.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.technologies.map((tech: string) => (
                      <span key={tech} className="px-2 py-1 bg-white/10 rounded text-sm text-white">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      className="glass-morphism border-cyan-400 text-cyan-400 hover:bg-cyan-400/20 bg-transparent"
                      asChild
                    >
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>

                    <Button
                      variant="outline"
                      className="glass-morphism border-purple-400 text-purple-400 hover:bg-purple-400/20 bg-transparent"
                      asChild
                    >
                      <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
