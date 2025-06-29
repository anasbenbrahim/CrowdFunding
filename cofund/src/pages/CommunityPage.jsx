"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Label } from "../components/ui/label"
import {
  ArrowLeft,
  Settings,
  UserPlus,
  Send,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  DollarSign,
} from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { ContributionSystem } from "../components/ContributionSystem"

// Mock data for community details
const mockCommunity = {
  id: "1",
  name: "Développeurs React",
  description:
    "Communauté pour les développeurs React francophones. Partagez vos projets, posez vos questions et apprenez ensemble !",
  category: "Technologie",
  memberCount: 156,
  projectCount: 12,
  image: "/placeholder.svg?height=100&width=100",
  isOwner: true,
  createdAt: "2024-01-15",
}

const mockMembers = [
  {
    id: "1",
    name: "Marie Dubois",
    role: "Propriétaire",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Pierre Martin",
    role: "Modérateur",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "2024-01-20",
  },
  {
    id: "3",
    name: "Sophie Laurent",
    role: "Membre",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "2024-02-01",
  },
  {
    id: "4",
    name: "Thomas Bernard",
    role: "Membre",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "2024-02-05",
  },
]

const mockProjects = [
  {
    id: "1",
    name: "App E-commerce",
    description: "Application de vente en ligne avec React et Node.js",
    author: "Marie Dubois",
    likes: 12,
  },
  {
    id: "2",
    name: "Dashboard Analytics",
    description: "Tableau de bord pour analyser les données",
    author: "Pierre Martin",
    likes: 8,
  },
  {
    id: "3",
    name: "Chat App",
    description: "Application de messagerie en temps réel",
    author: "Sophie Laurent",
    likes: 15,
  },
]

const mockPosts = [
  {
    id: "1",
    author: "Marie Dubois",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Salut tout le monde ! Je viens de publier un nouveau tutoriel sur les hooks React. N'hésitez pas à me faire vos retours !",
    timestamp: "Il y a 2 heures",
    likes: 8,
    comments: 3,
  },
  {
    id: "2",
    author: "Pierre Martin",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Question : quelle est votre approche préférée pour gérer l'état global dans une app React ? Redux, Zustand, Context API ?",
    timestamp: "Il y a 5 heures",
    likes: 12,
    comments: 7,
  },
]

export default function CommunityPage() {
  const { id } = useParams()
  const [newPost, setNewPost] = useState("")
  const [inviteEmail, setInviteEmail] = useState("")
  const [showInviteDialog, setShowInviteDialog] = useState(false)

  const handleSendInvite = () => {
    // Logic to send invitation
    console.log("Invitation envoyée à:", inviteEmail)
    setInviteEmail("")
    setShowInviteDialog(false)
  }

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      // Logic to add new post
      console.log("Nouveau post:", newPost)
      setNewPost("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <Avatar className="h-12 w-12">
                <AvatarImage src={mockCommunity.image || "/placeholder.svg"} alt={mockCommunity.name} />
                <AvatarFallback>{mockCommunity.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{mockCommunity.name}</h1>
                <p className="text-gray-600">{mockCommunity.memberCount} membres</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <UserPlus className="h-4 w-4" />
                    Inviter
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Inviter des membres</DialogTitle>
                    <DialogDescription>Invitez des personnes à rejoindre votre communauté par email.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Adresse email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="exemple@email.com"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleSendInvite}>Envoyer l'invitation</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {mockCommunity.isOwner && (
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="members">Membres</TabsTrigger>
            <TabsTrigger value="projects">Projets</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="contributions">
              <DollarSign className="h-4 w-4 mr-1" />
              Contributions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>À propos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{mockCommunity.description}</p>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">{mockCommunity.category}</Badge>
                  <span className="text-sm text-gray-500">
                    Créée le {new Date(mockCommunity.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Membres récents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockMembers.slice(0, 3).map((member) => (
                      <div key={member.id} className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-gray-500">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Projets populaires</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockProjects.slice(0, 3).map((project) => (
                      <div key={project.id} className="border-l-2 border-blue-500 pl-3">
                        <h4 className="font-medium text-sm">{project.name}</h4>
                        <p className="text-xs text-gray-600">{project.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{project.likes} ❤️</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Membres ({mockMembers.length})</CardTitle>
                <CardDescription>Gérez les membres de votre communauté</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-500">
                            Rejoint le {new Date(member.joinedAt).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            member.role === "Propriétaire"
                              ? "default"
                              : member.role === "Modérateur"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {member.role}
                        </Badge>
                        {mockCommunity.isOwner && member.role !== "Propriétaire" && (
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Projets partagés ({mockProjects.length})</CardTitle>
                    <CardDescription>Découvrez les projets créés par la communauté</CardDescription>
                  </div>
                  {mockCommunity.isOwner && (
                    <Button>
                      Ajouter un projet
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {mockProjects.map((project) => (
                    <Card key={project.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{project.name}</CardTitle>
                            <CardDescription>{project.description}</CardDescription>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600">Par {project.author}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Heart className="h-4 w-4" />
                            <span>{project.likes}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discussions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fil de discussion</CardTitle>
                <CardDescription>Partagez vos idées avec la communauté</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Vous" />
                      <AvatarFallback>V</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Partagez quelque chose avec la communauté..."
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        className="min-h-[80px]"
                      />
                      <div className="flex justify-end mt-2">
                        <Button onClick={handlePostSubmit} disabled={!newPost.trim()}>
                          <Send className="h-4 w-4 mr-2" />
                          Publier
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {mockPosts.map((post) => (
                      <Card key={post.id}>
                        <CardContent className="pt-4">
                          <div className="flex gap-3">
                            <Avatar>
                              <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
                              <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <p className="font-medium">{post.author}</p>
                                <p className="text-sm text-gray-500">{post.timestamp}</p>
                              </div>
                              <p className="text-gray-700 mb-3">{post.content}</p>
                              <div className="flex items-center gap-4">
                                <Button variant="ghost" size="sm" className="text-gray-500">
                                  <Heart className="h-4 w-4 mr-1" />
                                  {post.likes}
                                </Button>
                                <Button variant="ghost" size="sm" className="text-gray-500">
                                  <MessageCircle className="h-4 w-4 mr-1" />
                                  {post.comments}
                                </Button>
                                <Button variant="ghost" size="sm" className="text-gray-500">
                                  <Share2 className="h-4 w-4 mr-1" />
                                  Partager
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contributions" className="space-y-6">
            <ContributionSystem communityId={id} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
