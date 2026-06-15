"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactSection() {
  const { toast } = useToast()

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 liquid-gradient font-sora">Let's Connect</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's discuss how we can create something amazing together.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6"
          >
            {/* Contact Information */}
            <Card className="glass-morphism border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">📞 Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-cyan-400" />
                  <span className="text-white/80">caloarive@gmail.com</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-green-400" />
                  <span className="text-white/80">+63 961 648 1468</span>
                </div>

                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-indigo-400" />
                  <a 
                    href="viber://chat?number=%2B639278946134" 
                    className="text-white/80 hover:text-indigo-400 transition-colors"
                  >
                    Viber: 09278946134
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-purple-400" />
                  <span className="text-white/80">Mandaluyong City, Metro Manila</span>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="glass-morphism border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">🌐 Connect Online</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "GitHub", icon: "🐙", color: "hover:text-gray-400", href: "https://github.com/calordddd", username: "calordddd" },
                    { name: "LinkedIn", icon: "💼", color: "hover:text-blue-400", href: "https://www.linkedin.com/in/lord-cedric-arive-97a51a381/", username: "Lord Cedric" },
                    { name: "Facebook", icon: "📘", color: "hover:text-blue-500", href: "https://facebook.com/calorddd", username: "calorddd" },
                    { name: "Discord", icon: "🎮", color: "hover:text-purple-400", href: "#", username: "calordddd" },
                  ].map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target={social.href !== "#" ? "_blank" : undefined}
                      rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-3 p-3 rounded-lg glass-morphism border border-white/10 text-white/80 transition-colors ${social.color}`}
                      onClick={(e) => {
                        if (social.name === "Discord") {
                          e.preventDefault()
                          navigator.clipboard.writeText("calordddd")
                          toast({
                            title: "Discord Username Copied! 🎮",
                            description: "calordddd has been copied to your clipboard.",
                          })
                        }
                      }}
                    >
                      <span className="text-2xl">{social.icon}</span>
                      <div className="flex flex-col text-left">
                        <span className="text-sm font-semibold text-white">{social.name}</span>
                        <span className="text-xs text-white/50">{social.username}</span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 pt-8 border-t border-white/10 text-center"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white/60">© 2026 Lord Cedric Arive</div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse" />
              <span className="text-white/40 text-sm">
                Powered by Next.js & Three.js | Template by{" "}
                <a
                  href="https://github.com/senotron/modern-portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 underline transition-colors"
                >
                  senotron
                </a>
              </span>
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  )
}
