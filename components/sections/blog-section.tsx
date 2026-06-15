"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ExternalLink, Zap } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"

const workingOnData = [
  {
    id: 1,
    title: "InterviewPrep AI",
    excerpt: "An AI-powered preparation platform featuring mock interview simulations, response evaluation, and behavioral scoring using intelligent Gemini API integrations.",
    status: "Active Development",
    focus: "Gemini API Integration",
    tags: ["React", "Next.js", "Gemini API", "TailwindCSS"],
    image: "/interviewprepai.png",
  },
  {
    id: 2,
    title: "DevTrack",
    excerpt: "Automating developer activity analysis, directory changes, and productivity indexing across multi-tier filesystems.",
    status: "In Progress",
    focus: "File System Indexing",
    tags: ["Laravel", "PHP", "MySQL", "React"],
    image: "/devtrack.png",
  },
]

const openSourceProjects = [
  {
    name: "DevTrack",
    description: "A comprehensive developer activity tracker and project monitoring dashboard.",
    stars: 0,
    language: "PHP (Laravel)",
  },
  {
    name: "printababes",
    description: "High-performance responsive web application built with TypeScript and React.",
    stars: 0,
    language: "TypeScript",
  },
  {
    name: "LocalSearchEngine",
    description: "High-performance index text search engine optimized for rapid local file scanning.",
    stars: 0,
    language: "C++",
  },
]

const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-")
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`
}

export default function BlogSection() {
  const [contributions, setContributions] = useState<{ level: string }[]>([])
  const [totalCount, setTotalCount] = useState<number | null>(null)

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const res = await fetch("https://github-contributions-api.deno.dev/calordddd.json")
        if (!res.ok) throw new Error("Failed to fetch contributions")
        const data = await res.json()
        if (data.contributions) {
          const flattened = data.contributions.flat()
          const lastYear = flattened.slice(-365)
          setContributions(lastYear.map((day: any) => ({ level: day.contributionLevel })))
          setTotalCount(data.totalContributions)
        }
      } catch (err) {
        console.error("Error loading GitHub contributions:", err)
      }
    }
    fetchContributions()
  }, [])

  const daysToRender = contributions.length > 0
    ? contributions
    : Array.from({ length: 365 }).map((_, i) => {
        const val = (i * 17) % 10
        return {
          level:
            val < 3
              ? "FOURTH_QUARTILE"
              : val < 5
                ? "SECOND_QUARTILE"
                : val < 7
                  ? "FIRST_QUARTILE"
                  : "NONE",
        }
      })

  const getBgClass = (level: string) => {
    switch (level) {
      case "FIRST_QUARTILE":
        return "bg-green-400/30"
      case "SECOND_QUARTILE":
        return "bg-green-400/60"
      case "THIRD_QUARTILE":
        return "bg-green-400/80"
      case "FOURTH_QUARTILE":
        return "bg-green-400"
      default:
        return "bg-white/10"
    }
  }

  return (
    <section id="blog" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 liquid-gradient font-sora">Projects & Repositories</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Monitoring active developments and public open-source contributions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Currently Working On */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">🚧 Currently Working On</h3>

            <div className="space-y-6">
              {workingOnData.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="glass-morphism border-white/20 hover:border-cyan-400/50 transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="md:col-span-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <img
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                className="w-full h-32 md:h-full object-cover rounded-l-lg cursor-pointer hover:opacity-85 transition-opacity duration-300"
                              />
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl bg-black/95 border-white/20 p-2 overflow-hidden flex flex-col items-center justify-center rounded-lg shadow-2xl">
                              <DialogTitle className="sr-only">{project.title}</DialogTitle>
                              <DialogDescription className="sr-only">Screenshot of {project.title}</DialogDescription>
                              <img
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                className="w-full h-auto max-h-[80vh] object-contain rounded-md animate-fade-in"
                              />
                            </DialogContent>
                          </Dialog>
                        </div>

                        <div className="md:col-span-2 p-6">
                          <h4 className="text-lg font-bold text-white mb-2 line-clamp-2">{project.title}</h4>

                          <p className="text-white/70 mb-4 line-clamp-2">{project.excerpt}</p>

                          <div className="flex items-center gap-4 mb-4 text-sm text-white/60">
                            <div className="flex items-center gap-1 text-cyan-400">
                              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse mr-1" />
                              {project.status}
                            </div>
                            <div className="flex items-center gap-1 text-purple-400">
                              <Zap className="h-4 w-4" />
                              {project.focus}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="bg-white/10 text-white">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            className="glass-morphism border-cyan-400 text-cyan-400 hover:bg-cyan-400/20 bg-transparent"
                            asChild
                          >
                            <a href="https://github.com/calordddd" target="_blank" rel="noopener noreferrer">
                              View Project
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Open Source Projects */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">🔓 My Public Repositories</h3>

            <div className="space-y-4 mb-8">
              {openSourceProjects.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="glass-morphism border-white/20 hover:border-purple-400/50 transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-lg font-bold text-white">{project.name}</h4>
                        <div className="flex items-center gap-1 text-yellow-400">⭐ {project.stars}</div>
                      </div>

                      <p className="text-white/70 mb-3">{project.description}</p>

                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-white/10 text-white">
                          {project.language}
                        </Badge>
                        <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300" asChild>
                          <a href={`https://github.com/calordddd/${project.name}`} target="_blank" rel="noopener noreferrer">
                            View on GitHub
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* GitHub Contribution Heatmap */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Card className="glass-morphism border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">📊 Contribution Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-12 gap-1">
                    {daysToRender.map((day, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-sm ${getBgClass(day.level)}`}
                      />
                    ))}
                  </div>
                  <p className="text-white/60 text-sm mt-4">
                    {totalCount !== null ? totalCount : "1,247"} contributions in the last year
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
