"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Progress } from "../components/ui/progress"
import { 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  Target, 
  Calendar,
  Users,
  CheckCircle
} from "lucide-react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"

export default function CreateProjectPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const communityId = searchParams.get('communityId')
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    category: "",
    targetAmount: "",
    duration: "",
    images: [],
    rewards: []
  })

  const steps = [
    { id: 1, name: "Informations de base", icon: Target },
    { id: 2, name: "Description détaillée", icon: Users },
    { id: 3, name: "Objectifs et durée", icon: Calendar },
    { id: 4, name: "Images et médias", icon: Upload },
    { id: 5, name: "Révision finale", icon: CheckCircle }
  ]

  const categories = [
    "Technologie",
    "Créatif",
    "Local",
    "Environnement",
    "Éducation",
    "Santé",
    "Sport",
    "Autre"
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Here you would submit to your backend
    console.log("Project data:", formData)
    navigate("/projects")
  }

  const progressPercentage = (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/projects">
                <Button variant="ghost" size="icon" className="mr-4">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Créer un Projet</h1>
                <p className="text-gray-600">Étape {currentStep} sur {steps.length}</p>
                {communityId && (
                  <p className="text-sm text-blue-600 mt-1">
                    Pour la communauté #{communityId}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Steps Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <nav className="space-y-2">
                  {steps.map((step) => {
                    const Icon = step.icon
                    const isActive = step.id === currentStep
                    const isCompleted = step.id < currentStep
                    
                    return (
                      <div
                        key={step.id}
                        className={`flex items-center p-3 rounded-lg transition-colors ${
                          isActive
                            ? "bg-blue-100 text-blue-700"
                            : isCompleted
                            ? "bg-green-100 text-green-700"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <Icon className="h-5 w-5 mr-3" />
                        <span className="text-sm font-medium">{step.name}</span>
                        {isCompleted && (
                          <CheckCircle className="h-4 w-4 ml-auto text-green-600" />
                        )}
                      </div>
                    )
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>{steps[currentStep - 1].name}</CardTitle>
                <CardDescription>
                  {currentStep === 1 && "Commençons par les informations essentielles de votre projet"}
                  {currentStep === 2 && "Décrivez votre projet en détail pour attirer les contributeurs"}
                  {currentStep === 3 && "Définissez vos objectifs financiers et la durée de campagne"}
                  {currentStep === 4 && "Ajoutez des images et vidéos pour illustrer votre projet"}
                  {currentStep === 5 && "Vérifiez tous les détails avant de publier"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Titre du projet *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        placeholder="Ex: Application mobile révolutionnaire"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description courte *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Décrivez votre projet en quelques phrases..."
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="category">Catégorie *</Label>
                      <Select onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Step 2: Detailed Description */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullDescription">Description complète *</Label>
                      <Textarea
                        id="fullDescription"
                        value={formData.fullDescription}
                        onChange={(e) => handleInputChange("fullDescription", e.target.value)}
                        placeholder="Expliquez en détail votre projet, vos motivations, comment vous comptez utiliser les fonds..."
                        rows={8}
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Une description détaillée augmente vos chances de succès
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 3: Goals and Timeline */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="targetAmount">Objectif de financement (€) *</Label>
                      <Input
                        id="targetAmount"
                        type="number"
                        value={formData.targetAmount}
                        onChange={(e) => handleInputChange("targetAmount", e.target.value)}
                        placeholder="Ex: 10000"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="duration">Durée de la campagne (jours) *</Label>
                      <Select onValueChange={(value) => handleInputChange("duration", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez la durée" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 jours</SelectItem>
                          <SelectItem value="30">30 jours</SelectItem>
                          <SelectItem value="45">45 jours</SelectItem>
                          <SelectItem value="60">60 jours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Step 4: Media Upload */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <div>
                      <Label>Images du projet</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                        <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-2">Glissez-déposez vos images ici</p>
                        <Button variant="outline">
                          Choisir des fichiers
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Ajoutez jusqu'à 5 images (JPG, PNG, max 5MB chacune)
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 5: Review */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-2">Récapitulatif du projet</h3>
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-sm text-blue-700">Titre:</dt>
                          <dd className="text-sm font-medium">{formData.title || "Non renseigné"}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-blue-700">Catégorie:</dt>
                          <dd className="text-sm font-medium">{formData.category || "Non renseignée"}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-blue-700">Objectif:</dt>
                          <dd className="text-sm font-medium">€{formData.targetAmount || "0"}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-blue-700">Durée:</dt>
                          <dd className="text-sm font-medium">{formData.duration || "0"} jours</dd>
                        </div>
                      </dl>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Prêt à publier?</h4>
                      <p className="text-sm text-green-700">
                        Une fois publié, votre projet sera visible par tous les utilisateurs. 
                        Vous pourrez toujours le modifier depuis votre tableau de bord.
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Précédent
                  </Button>
                  
                  {currentStep < steps.length ? (
                    <Button onClick={handleNext}>
                      Suivant
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                      Publier le projet
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}