"use client"

import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { 
  Plus, 
  Users, 
  Calendar, 
  Target,
  TrendingUp,
  Heart,
  Share2,
  Eye
} from "lucide-react"
import { Link } from "react-router-dom"
import { ContributionSystem } from "../components/ContributionSystem"

// Mock data for projects
const mockProjects = [
  {
    id: 1,
    title: "Application Mobile Écologique",
    description: "Développement d'une app mobile pour réduire l'empreinte carbone personnelle",
    creator: "Sophie Martin",
    creatorAvatar: "/placeholder.svg",
    category: "Technologie",
    targetAmount: 15000,
    currentAmount: 8500,
    backers: 125,
    daysLeft: 18,
    image: "/placeholder.svg",
    featured: true,
    status: "active"
  },
  {
    id: 2,
    title: "Café Communautaire",
    description: "Ouverture d'un café communautaire avec espace co-working",
    creator: "Pierre Dubois",
    creatorAvatar: "/placeholder.svg",
    category: "Local",
    targetAmount: 25000,
    currentAmount: 12750,
    backers: 89,
    daysLeft: 25,
    image: "/placeholder.svg",
    featured: false,
    status: "active"
  },
  {
    id: 3,
    title: "Album Musical Indépendant",
    description: "Production d'un album de musique électronique indépendante",
    creator: "Alex Rivera",
    creatorAvatar: "/placeholder.svg",
    category: "Créatif",
    targetAmount: 8000,
    currentAmount: 8200,
    backers: 156,
    daysLeft: 0,
    image: "/placeholder.svg",
    featured: false,
    status: "funded"
  },
  {
    id: 4,
    title: "Jardin Urbain Partagé",
    description: "Création d'un jardin urbain pour la communauté locale",
    creator: "Marie Laurent",
    creatorAvatar: "/placeholder.svg",
    category: "Environnement",
    targetAmount: 5000,
    currentAmount: 3200,
    backers: 67,
    daysLeft: 32,
    image: "/placeholder.svg",
    featured: true,
    status: "active"
  }
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState(mockProjects)
  const [activeTab, setActiveTab] = useState("all")
  const [selectedProject, setSelectedProject] = useState(null)
  const [showContribution, setShowContribution] = useState(false)

  const filteredProjects = projects.filter(project => {
    switch (activeTab) {
      case "active":
        return project.status === "active"
      case "funded":
        return project.status === "funded"
      case "featured":
        return project.featured
      default:
        return true
    }
  })

  const handleContribute = (project) => {
    setSelectedProject(project)
    setShowContribution(true)
  }

  const handleContributionComplete = (amount) => {
    if (selectedProject) {
      setProjects(projects.map(p => 
        p.id === selectedProject.id 
          ? { ...p, currentAmount: p.currentAmount + amount, backers: p.backers + 1 }
          : p
      ))
    }
    setShowContribution(false)
    setSelectedProject(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Projets</h1>
              <p className="text-gray-600 mt-2">Découvrez et soutenez des projets innovants</p>
            </div>
            <Link to="/create-project">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Créer un Projet
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="active">Actifs</TabsTrigger>
            <TabsTrigger value="funded">Financés</TabsTrigger>
            <TabsTrigger value="featured">Favoris</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Target className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Projets</p>
                      <p className="text-2xl font-bold">{projects.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Fonds Collectés</p>
                      <p className="text-2xl font-bold">€{projects.reduce((sum, p) => sum + p.currentAmount, 0).toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Contributeurs</p>
                      <p className="text-2xl font-bold">{projects.reduce((sum, p) => sum + p.backers, 0)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Heart className="h-8 w-8 text-red-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Taux de Succès</p>
                      <p className="text-2xl font-bold">
                        {Math.round((projects.filter(p => p.status === 'funded').length / projects.length) * 100)}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onContribute={handleContribute}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Contribution Modal */}
      {showContribution && selectedProject && (
        <ContributionSystem
          project={selectedProject}
          onComplete={handleContributionComplete}
          onClose={() => setShowContribution(false)}
        />
      )}
    </div>
  )
}

function ProjectCard({ project, onContribute }) {
  const progressPercentage = Math.min((project.currentAmount / project.targetAmount) * 100, 100)
  
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {project.featured && (
          <Badge className="absolute top-2 right-2 bg-yellow-500">
            Favori
          </Badge>
        )}
        <Badge 
          className={`absolute top-2 left-2 ${
            project.status === 'funded' ? 'bg-green-500' : 'bg-blue-500'
          }`}
        >
          {project.status === 'funded' ? 'Financé' : 'Actif'}
        </Badge>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary">{project.category}</Badge>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            {project.daysLeft > 0 ? `${project.daysLeft}j restants` : 'Terminé'}
          </div>
        </div>
        <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Progress */}
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>€{project.currentAmount.toLocaleString()} collectés</span>
              <span>{progressPercentage.toFixed(0)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>Objectif: €{project.targetAmount.toLocaleString()}</span>
              <span>{project.backers} contributeurs</span>
            </div>
          </div>

          {/* Creator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src={project.creatorAvatar} alt={project.creator} />
                <AvatarFallback>{project.creator.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-2">
                <p className="text-sm font-medium">{project.creator}</p>
              </div>
            </div>
            <div className="flex space-x-1">
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action Button */}
          <Button 
            className="w-full" 
            onClick={() => onContribute(project)}
            disabled={project.status === 'funded'}
          >
            {project.status === 'funded' ? 'Projet Financé' : 'Contribuer'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}