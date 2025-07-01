"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Progress } from "../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { ContributionModal } from "../components/ContributionModal"
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Bookmark, 
  Calendar, 
  Users, 
  Target,
  DollarSign,
  MessageCircle,
  Clock,
  MapPin,
  Eye,
  Star
} from "lucide-react"

export default function ProjectDetailPage() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showContributionModal, setShowContributionModal] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockProject = {
          id: parseInt(id),
          title: "Application Mobile Révolutionnaire",
          description: "Une application qui va changer la façon dont nous interagissons avec la technologie",
          fullDescription: "Cette application mobile révolutionnaire utilise l'intelligence artificielle pour créer une expérience utilisateur unique et personnalisée. Notre équipe de développeurs expérimentés travaille depuis 8 mois sur ce projet innovant qui promet de transformer le marché des applications mobiles.\n\nFonctionnalités principales :\n- Interface utilisateur intuitive et moderne\n- Intelligence artificielle intégrée\n- Synchronisation cloud automatique\n- Sécurité avancée\n- Support multilingue\n\nNous avons déjà développé un prototype fonctionnel et nous sommes maintenant à la recherche de financement pour finaliser le développement, effectuer les tests complets et lancer l'application sur les stores.",
          category: "Technologie",
          targetAmount: 50000,
          currentAmount: 32500,
          backers: 127,
          daysLeft: 23,
          creator: {
            id: 1,
            name: "Tech Innovators",
            avatar: "/api/placeholder/40/40",
            location: "Paris, France",
            description: "Équipe de développeurs passionnés par l'innovation technologique"
          },
          images: [
            "/api/placeholder/600/400",
            "/api/placeholder/600/400",
            "/api/placeholder/600/400"
          ],
          updates: [
            {
              id: 1,
              title: "Prototype terminé !",
              content: "Nous sommes ravis d'annoncer que notre prototype est maintenant terminé et fonctionnel.",
              date: "2024-01-15",
              likes: 45
            },
            {
              id: 2,
              title: "Tests utilisateurs",
              content: "Nous commençons les tests utilisateurs cette semaine. Les premiers retours sont très positifs !",
              date: "2024-01-10",
              likes: 32
            }
          ],
          comments: [
            {
              id: 1,
              user: "Marie Dubois",
              avatar: "/api/placeholder/32/32",
              content: "Projet très prometteur ! J'ai hâte de voir le résultat final.",
              date: "2024-01-16",
              likes: 8
            },
            {
              id: 2,
              user: "Jean Martin",
              avatar: "/api/placeholder/32/32",
              content: "L'équipe semble très compétente. Bonne chance pour la suite !",
              date: "2024-01-15",
              likes: 5
            }
          ],
          rewards: [
            {
              id: 1,
              amount: 25,
              title: "Accès anticipé",
              description: "Accès à l'application en avant-première",
              backers: 45,
              estimated: "Mars 2024"
            },
            {
              id: 2,
              amount: 50,
              title: "Version Premium",
              description: "Accès à la version premium avec toutes les fonctionnalités",
              backers: 32,
              estimated: "Avril 2024"
            },
            {
              id: 3,
              amount: 100,
              title: "Pack Complet",
              description: "Version premium + consultation personnalisée + support prioritaire",
              backers: 18,
              estimated: "Avril 2024"
            }
          ],
          status: "active"
        }
        
        setProject(mockProject)
      } catch (error) {
        console.error("Error fetching project:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id])

  const handleContributionComplete = (amount) => {
    if (project) {
      setProject(prev => ({
        ...prev,
        currentAmount: prev.currentAmount + amount,
        backers: prev.backers + 1
      }))
    }
    setShowContributionModal(false)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Lien copié dans le presse-papiers !")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du projet...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Projet non trouvé</h1>
          <p className="text-gray-600 mb-4">Le projet que vous recherchez n'existe pas ou a été supprimé.</p>
          <Link to="/projects">
            <Button>Retour aux projets</Button>
          </Link>
        </div>
      </div>
    )
  }

  const progressPercentage = Math.min((project.currentAmount / project.targetAmount) * 100, 100)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/projects">
                <Button variant="ghost" size="icon" className="mr-4">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
                <p className="text-gray-600">par {project.creator.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsBookmarked(!isBookmarked)}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Images */}
            <Card>
              <CardContent className="p-0">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-96 object-cover rounded-t-lg"
                />
              </CardContent>
            </Card>

            {/* Project Tabs */}
            <Tabs defaultValue="description" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="updates">Actualités</TabsTrigger>
                <TabsTrigger value="comments">Commentaires</TabsTrigger>
                <TabsTrigger value="rewards">Récompenses</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>À propos de ce projet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      {project.fullDescription.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Créateur du projet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={project.creator.avatar} />
                        <AvatarFallback>{project.creator.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{project.creator.name}</h3>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <MapPin className="h-4 w-4" />
                          <span>{project.creator.location}</span>
                        </div>
                        <p className="text-gray-700">{project.creator.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="updates" className="space-y-4">
                {project.updates.map((update) => (
                  <Card key={update.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{update.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(update.date).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{update.content}</p>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Heart className="h-4 w-4 mr-1" />
                          {update.likes}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="comments" className="space-y-4">
                {project.comments.map((comment) => (
                  <Card key={comment.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.avatar} />
                          <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{comment.user}</span>
                            <span className="text-sm text-gray-500">
                              {new Date(comment.date).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          <p className="text-gray-700 mb-2">{comment.content}</p>
                          <Button variant="ghost" size="sm">
                            <Heart className="h-4 w-4 mr-1" />
                            {comment.likes}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="rewards" className="space-y-4">
                {project.rewards.map((reward) => (
                  <Card key={reward.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">
                            €{reward.amount} - {reward.title}
                          </h3>
                          <p className="text-gray-600 mb-2">{reward.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{reward.backers} contributeurs</span>
                            <span>Livraison estimée : {reward.estimated}</span>
                          </div>
                        </div>
                        <Button onClick={() => setShowContributionModal(true)}>
                          Sélectionner
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Funding Progress */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">
                      €{project.currentAmount.toLocaleString()}
                    </p>
                    <p className="text-gray-600">collectés sur €{project.targetAmount.toLocaleString()}</p>
                  </div>
                  
                  <Progress value={progressPercentage} className="h-3" />
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{project.backers}</p>
                      <p className="text-sm text-gray-600">contributeurs</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">{project.daysLeft}</p>
                      <p className="text-sm text-gray-600">jours restants</p>
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => setShowContributionModal(true)}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Contribuer au projet
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Vues</span>
                  </div>
                  <span className="font-medium">2,341</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Favoris</span>
                  </div>
                  <span className="font-medium">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Commentaires</span>
                  </div>
                  <span className="font-medium">{project.comments.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Créé</span>
                  </div>
                  <span className="font-medium">Il y a 2 mois</span>
                </div>
              </CardContent>
            </Card>

            {/* Category */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Badge className="mb-2">{project.category}</Badge>
                  <p className="text-sm text-gray-600">
                    Découvrez d'autres projets dans cette catégorie
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Contribution Modal */}
      {showContributionModal && (
        <ContributionModal
          project={project}
          onComplete={handleContributionComplete}
          onClose={() => setShowContributionModal(false)}
        />
      )}
    </div>
  )
}