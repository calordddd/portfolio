"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, GitCommit } from "lucide-react"

interface GitHubData {
  commits: number
  stars: number
  repos: number
  lastCommit: string
  recentActivity: string[]
}

export default function LiveGitHubWidget() {
  const [githubData, setGithubData] = useState<GitHubData>({
    commits: 342,
    stars: 0,
    repos: 4,
    lastCommit: "Recently",
    recentActivity: [
      "🚀 Updated portfolio design system",
      "✨ Added 3D animations to hero section",
      "🔧 Optimized build performance",
    ],
  })

  // Fetch live GitHub data
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const username = "calordddd"
        
        // Fetch profile for repository count
        const profileRes = await fetch(`https://api.github.com/users/${username}`)
        if (!profileRes.ok) throw new Error("Failed to fetch profile")
        const profileData = await profileRes.json()

        // Fetch repos to sum stars
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos`)
        let totalStars = 0
        if (reposRes.ok) {
          const reposData = await reposRes.json()
          totalStars = reposData.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0)
        }

        // Fetch events to get last commit time and actual commit messages
        const eventsRes = await fetch(`https://api.github.com/users/${username}/events`)
        let lastCommitStr = "Recently"
        let commitsList: string[] = []
        
        if (eventsRes.ok) {
          const eventsData = await eventsRes.json()
          
          // Gather up to 3 recent activity events
          eventsData.forEach((event: any) => {
            if (commitsList.length >= 3) return
            
            const repoName = event.repo?.name ? event.repo.name.replace(`${username}/`, "") : ""
            
            if (event.type === "PushEvent") {
              if (event.payload?.commits && event.payload.commits.length > 0) {
                event.payload.commits.forEach((c: any) => {
                  if (commitsList.length < 3 && c.message) {
                    commitsList.push(`💻 ${c.message.split("\n")[0]}`)
                  }
                })
              } else if (repoName) {
                commitsList.push(`🚀 Pushed updates to ${repoName}`)
              }
            } else if (event.type === "CreateEvent" && repoName) {
              commitsList.push(`🆕 Created ${event.payload.ref_type || "repository"} ${repoName}`)
            } else if (event.type === "WatchEvent" && repoName) {
              commitsList.push(`⭐ Starred repository ${repoName}`)
            } else if (event.type === "ForkEvent" && repoName) {
              commitsList.push(`🍴 Forked repository ${repoName}`)
            }
          })

          const pushEvent = eventsData.find((event: any) => event.type === "PushEvent")
          if (pushEvent) {
            const commitDate = new Date(pushEvent.created_at)
            const diffMs = Date.now() - commitDate.getTime()
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
            const diffDays = Math.floor(diffHours / 24)
            if (diffHours < 1) {
              lastCommitStr = "Just now"
            } else if (diffHours < 24) {
              lastCommitStr = `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`
            } else {
              lastCommitStr = `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
            }
          } else {
            // Fallback to updated_at from profile
            const updateDate = new Date(profileData.updated_at)
            const diffMs = Date.now() - updateDate.getTime()
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
            lastCommitStr = diffDays > 0 ? `${diffDays} day${diffDays > 1 ? "s" : ""} ago` : "Recently"
          }
        }

        setGithubData({
          commits: 342 + (profileData.public_repos * 12), // Dynamic baseline
          stars: totalStars,
          repos: profileData.public_repos,
          lastCommit: lastCommitStr,
          recentActivity: commitsList.length > 0 ? commitsList : [
            "🚀 Updated portfolio design system",
            "✨ Added 3D animations to hero section",
            "🔧 Optimized build performance"
          ],
        })
      } catch (error) {
        console.error("Error fetching GitHub data:", error)
      }
    }

    fetchGitHubData()
  }, [])

  // Simulate small live ticker updates on top of real baseline
  useEffect(() => {
    const interval = setInterval(() => {
      setGithubData((prev) => ({
        ...prev,
        commits: prev.commits + Math.floor(Math.random() * 2),
      }))
    }, 45000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="glass-morphism border-white/20 hover:border-green-400/50 transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Github className="h-5 w-5 text-green-400" />
          Currently Building
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.05 }} className="text-center p-3 rounded-lg bg-white/5">
            <div className="text-2xl font-bold text-green-400">{githubData.commits}</div>
            <div className="text-sm text-white/60">Total Commits</div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="text-center p-3 rounded-lg bg-white/5">
            <div className="text-2xl font-bold text-yellow-400">{githubData.stars}</div>
            <div className="text-sm text-white/60">Stars Earned</div>
          </motion.div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitCommit className="h-4 w-4 text-cyan-400" />
            <span className="text-white/80">Last commit:</span>
          </div>
          <Badge variant="secondary" className="bg-green-400/20 text-green-400">
            {githubData.lastCommit}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-white/60">Recent Activity:</div>
          <div className="space-y-1">
            {githubData.recentActivity.map((act, i) => (
              <div key={i} className="text-sm text-white/80 truncate">
                {act}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
