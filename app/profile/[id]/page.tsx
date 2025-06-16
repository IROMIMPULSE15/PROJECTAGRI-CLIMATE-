"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Award,
  Briefcase,
  GraduationCap,
  Download,
  MessageSquare,
  Video,
  Heart,
  Share2,
  MoreHorizontal,
  Github,
  Linkedin,
  Globe,
  Clock,
  TrendingUp,
  User,
} from "lucide-react"
import GlobalParticleSystem from "@/components/global-particle-system"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CandidateProfile {
  id: string
  name: string
  title: string
  company: string
  location: string
  email: string
  phone: string
  avatar: string
  coverImage: string
  rating: number
  experience: string
  salary: string
  availability: string
  status: "Available" | "Interviewing" | "Hired" | "Not Available"
  skills: string[]
  languages: string[]
  education: Array<{
    degree: string
    school: string
    year: string
    gpa?: string
  }>
  workExperience: Array<{
    title: string
    company: string
    duration: string
    description: string
    current: boolean
  }>
  projects: Array<{
    name: string
    description: string
    technologies: string[]
    link?: string
  }>
  certifications: Array<{
    name: string
    issuer: string
    date: string
    credentialId?: string
  }>
  socialLinks: {
    linkedin?: string
    github?: string
    website?: string
  }
  stats: {
    profileViews: number
    applications: number
    interviews: number
    offers: number
  }
  personality: {
    traits: string[]
    workStyle: string
    teamFit: number
  }
}

export default function ProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [profile, setProfile] = useState<CandidateProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch profile
    setTimeout(() => {
      setProfile({
        id: params.id as string,
        name: "Sarah Johnson",
        title: "Senior Full Stack Developer",
        company: "Tech Innovations Inc.",
        location: "San Francisco, CA",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 123-4567",
        avatar: "/placeholder.svg?height=200&width=200",
        coverImage: "/placeholder.svg?height=300&width=800",
        rating: 4.8,
        experience: "5+ years",
        salary: "$120,000 - $150,000",
        availability: "Available in 2 weeks",
        status: "Available",
        skills: [
          "React",
          "Node.js",
          "TypeScript",
          "Python",
          "AWS",
          "Docker",
          "GraphQL",
          "MongoDB",
          "PostgreSQL",
          "Redis",
          "Kubernetes",
          "CI/CD",
        ],
        languages: ["English (Native)", "Spanish (Fluent)", "French (Conversational)"],
        education: [
          {
            degree: "Master of Science in Computer Science",
            school: "Stanford University",
            year: "2019",
            gpa: "3.9/4.0",
          },
          {
            degree: "Bachelor of Science in Software Engineering",
            school: "UC Berkeley",
            year: "2017",
            gpa: "3.8/4.0",
          },
        ],
        workExperience: [
          {
            title: "Senior Full Stack Developer",
            company: "Tech Innovations Inc.",
            duration: "2021 - Present",
            description:
              "Lead development of microservices architecture serving 1M+ users. Implemented CI/CD pipelines reducing deployment time by 60%. Mentored junior developers and conducted technical interviews.",
            current: true,
          },
          {
            title: "Full Stack Developer",
            company: "StartupXYZ",
            duration: "2019 - 2021",
            description:
              "Built scalable web applications using React and Node.js. Collaborated with design team to implement responsive UI components. Optimized database queries improving performance by 40%.",
            current: false,
          },
          {
            title: "Software Engineer Intern",
            company: "Google",
            duration: "Summer 2018",
            description:
              "Developed internal tools for the Chrome team. Worked on performance optimization features that improved browser speed by 15%.",
            current: false,
          },
        ],
        projects: [
          {
            name: "E-commerce Platform",
            description:
              "Built a full-stack e-commerce platform with React, Node.js, and PostgreSQL. Features include real-time inventory, payment processing, and admin dashboard.",
            technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
            link: "https://github.com/sarah/ecommerce",
          },
          {
            name: "AI Chat Application",
            description:
              "Developed a real-time chat application with AI-powered responses using OpenAI API. Implemented WebSocket connections and message encryption.",
            technologies: ["React", "Socket.io", "OpenAI API", "MongoDB"],
            link: "https://github.com/sarah/ai-chat",
          },
          {
            name: "Task Management System",
            description:
              "Created a collaborative task management system with drag-and-drop functionality, real-time updates, and team collaboration features.",
            technologies: ["Vue.js", "Express", "MongoDB", "Socket.io"],
          },
        ],
        certifications: [
          {
            name: "AWS Certified Solutions Architect",
            issuer: "Amazon Web Services",
            date: "2023",
            credentialId: "AWS-SA-2023-001",
          },
          {
            name: "Google Cloud Professional Developer",
            issuer: "Google Cloud",
            date: "2022",
            credentialId: "GCP-PD-2022-456",
          },
        ],
        socialLinks: {
          linkedin: "https://linkedin.com/in/sarahjohnson",
          github: "https://github.com/sarahjohnson",
          website: "https://sarahjohnson.dev",
        },
        stats: {
          profileViews: 1247,
          applications: 23,
          interviews: 8,
          offers: 3,
        },
        personality: {
          traits: ["Analytical", "Creative", "Team Player", "Problem Solver", "Detail-Oriented"],
          workStyle: "Collaborative and results-driven with a passion for clean code and innovative solutions.",
          teamFit: 92,
        },
      })
      setIsLoading(false)
    }, 1000)
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <GlobalParticleSystem isActive={true} blastEffect={false} featureMode={false} page="profile" />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white">Loading Profile...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Profile Not Found</h1>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <GlobalParticleSystem isActive={true} blastEffect={false} featureMode={true} page="profile" />

      <div className="relative z-10">
        {/* Header */}
        <div className="relative">
          {/* Cover Image */}
          <div className="h-64 bg-gradient-to-r from-purple-900 via-pink-900 to-cyan-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute top-4 left-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.back()}
                className="bg-black/50 border-white/20 text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFavorited(!isFavorited)}
                className={`bg-black/50 border-white/20 hover:bg-white/10 ${
                  isFavorited ? "text-red-400" : "text-white"
                }`}
              >
                <Heart className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
              </Button>
              <Button variant="outline" size="sm" className="bg-black/50 border-white/20 text-white hover:bg-white/10">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-black/50 border-white/20 text-white hover:bg-white/10">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Profile Info */}
          <div className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
              {/* Avatar */}
              <div className="relative -mt-16">
                <div className="w-32 h-32 rounded-full border-4 border-black bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-4xl font-bold">
                  SJ
                </div>
                <div
                  className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-2 border-black ${
                    profile.status === "Available"
                      ? "bg-green-500"
                      : profile.status === "Interviewing"
                        ? "bg-yellow-500"
                        : profile.status === "Hired"
                          ? "bg-blue-500"
                          : "bg-gray-500"
                  }`}
                ></div>
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="text-white font-medium">{profile.rating}</span>
                  </div>
                </div>
                <p className="text-xl text-gray-300 mb-2">{profile.title}</p>
                <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    {profile.company}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {profile.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {profile.experience}
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      profile.status === "Available"
                        ? "bg-green-500/20 text-green-300"
                        : profile.status === "Interviewing"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : profile.status === "Hired"
                            ? "bg-blue-500/20 text-blue-300"
                            : "bg-gray-500/20 text-gray-300"
                    }`}
                  >
                    {profile.status}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button className="bg-gradient-to-r from-purple-600 to-cyan-400 hover:opacity-90">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-900/20">
                  <Video className="h-4 w-4 mr-2" />
                  Interview
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800/50">
                  <Download className="h-4 w-4 mr-2" />
                  Resume
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{profile.stats.profileViews}</div>
                <div className="text-sm text-gray-400">Profile Views</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400">{profile.stats.applications}</div>
                <div className="text-sm text-gray-400">Applications</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{profile.stats.interviews}</div>
                <div className="text-sm text-gray-400">Interviews</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-400">{profile.stats.offers}</div>
                <div className="text-sm text-gray-400">Offers</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-gray-900/50 border border-gray-800 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="personality">Personality</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Contact Info */}
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-purple-400" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">{profile.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">{profile.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">{profile.location}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">{profile.availability}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Links */}
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="h-5 w-5 mr-2 text-cyan-400" />
                      Social Links
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {profile.socialLinks.linkedin && (
                      <a
                        href={profile.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors"
                      >
                        <Linkedin className="h-4 w-4" />
                        <span>LinkedIn Profile</span>
                      </a>
                    )}
                    {profile.socialLinks.github && (
                      <a
                        href={profile.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 text-gray-300 hover:text-gray-100 transition-colors"
                      >
                        <Github className="h-4 w-4" />
                        <span>GitHub Profile</span>
                      </a>
                    )}
                    {profile.socialLinks.website && (
                      <a
                        href={profile.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 text-gray-300 hover:text-purple-400 transition-colors"
                      >
                        <Globe className="h-4 w-4" />
                        <span>Personal Website</span>
                      </a>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Salary Range</span>
                      <span className="text-white font-medium">{profile.salary}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Experience</span>
                      <span className="text-white font-medium">{profile.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Team Fit</span>
                      <span className="text-green-400 font-medium">{profile.personality.teamFit}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Languages</span>
                      <span className="text-white font-medium">{profile.languages.length}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Education */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-purple-400" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profile.education.map((edu, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-lg">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <GraduationCap className="h-6 w-6 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium">{edu.degree}</h3>
                          <p className="text-gray-400">{edu.school}</p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                            <span>{edu.year}</span>
                            {edu.gpa && <span>GPA: {edu.gpa}</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="space-y-6">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-cyan-400" />
                    Work Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {profile.workExperience.map((exp, index) => (
                      <div key={index} className="relative">
                        {index < profile.workExperience.length - 1 && (
                          <div className="absolute left-6 top-12 w-0.5 h-full bg-gray-700"></div>
                        )}
                        <div className="flex items-start space-x-4">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              exp.current ? "bg-green-500/20" : "bg-cyan-500/20"
                            }`}
                          >
                            <Briefcase className={`h-6 w-6 ${exp.current ? "text-green-400" : "text-cyan-400"}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-white font-medium">{exp.title}</h3>
                              {exp.current && (
                                <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                                  Current
                                </span>
                              )}
                            </div>
                            <p className="text-purple-400 font-medium">{exp.company}</p>
                            <p className="text-gray-400 text-sm mb-3">{exp.duration}</p>
                            <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-orange-400" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profile.certifications.map((cert, index) => (
                      <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                            <Award className="h-5 w-5 text-orange-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white font-medium">{cert.name}</h3>
                            <p className="text-gray-400 text-sm">{cert.issuer}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-gray-500 text-xs">{cert.date}</span>
                              {cert.credentialId && (
                                <span className="text-purple-400 text-xs">ID: {cert.credentialId}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {profile.projects.map((project, index) => (
                  <Card
                    key={index}
                    className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-colors"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="text-white">{project.name}</span>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300"
                          >
                            <Github className="h-5 w-5" />
                          </a>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-6">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-yellow-400" />
                    Technical Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {profile.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-white rounded-lg hover:scale-105 transition-transform cursor-pointer"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-cyan-400" />
                    Languages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {profile.languages.map((language, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-white">{language}</span>
                        <div className="flex items-center space-x-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= (index === 0 ? 5 : index === 1 ? 4 : 3)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="personality" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Star className="h-5 w-5 mr-2 text-pink-400" />
                      Personality Traits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {profile.personality.traits.map((trait, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-white rounded-full"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                      Team Compatibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-400 mb-2">{profile.personality.teamFit}%</div>
                      <p className="text-gray-400 text-sm">Team Fit Score</p>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                        <div
                          className="bg-gradient-to-r from-green-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${profile.personality.teamFit}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-purple-400" />
                    Work Style
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed text-lg">{profile.personality.workStyle}</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
