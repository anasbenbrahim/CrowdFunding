"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Progress } from "./ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { CreditCard, DollarSign, Users, Target, Heart, Loader2, CheckCircle, AlertCircle } from "lucide-react"



const contributionTiers = [
  {
    id: "supporter",
    name: "Supporter",
    amount: 10,
    description: "Soutenez la communauté",
    benefits: ["Badge Supporter", "Remerciements publics"],
  },
  {
    id: "contributor",
    name: "Contributeur",
    amount: 25,
    description: "Contribuez activement",
    benefits: ["Badge Contributeur", "Accès prioritaire aux événements", "Remerciements publics"],
  },
  {
    id: "sponsor",
    name: "Sponsor",
    amount: 50,
    description: "Sponsorisez nos projets",
    benefits: ["Badge Sponsor", "Logo dans les remerciements", "Accès VIP aux événements"],
  },
  {
    id: "patron",
    name: "Mécène",
    amount: 100,
    description: "Devenez mécène",
    benefits: ["Badge Mécène", "Mention spéciale", "Consultation sur les projets", "Accès exclusif"],
  },
]

export function ContributionSystem({ communityId }) {
  const [contributions, setContributions] = useState([])
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [selectedTier, setSelectedTier] = useState(null)
  const [customAmount, setCustomAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("stripe")
  const [contributionMessage, setContributionMessage] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState(null)

  // Calculate statistics
  const totalRaised = contributions.reduce((sum, contrib) => sum + contrib.amount, 0)
  const contributorCount = contributions.filter((c) => !c.isAnonymous).length
  const goalAmount = 1000 // Example goal
  const progressPercentage = (totalRaised / goalAmount) * 100

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch("/api/contributions")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setContributions(data)
      } catch (error) {
        console.error("Error fetching contributions:", error)
      }
    }

    fetchContributions()

    // Optional: Set up an interval to refetch data periodically
    const interval = setInterval(fetchContributions, 30000) // Refetch every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const handleContribute = async () => {
    setIsProcessing(true)
    setPaymentStatus(null)

    try {
      const amount = selectedTier ? selectedTier.amount : Number.parseInt(customAmount)
      const newContribution = {
        contributor: isAnonymous ? "Anonyme" : "Vous", // In a real app, this would come from user auth
        amount: amount,
        message: contributionMessage,
        isAnonymous: isAnonymous,
        paymentMethod: paymentMethod, // Send payment method to backend
      }

      const response = await fetch("/api/contributions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContribution),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const addedContribution = await response.json()
      setContributions((prev) => [addedContribution, ...prev])
      setPaymentStatus("success")

      // Reset form
      setTimeout(() => {
        setShowPaymentDialog(false)
        setSelectedTier(null)
        setCustomAmount("")
        setContributionMessage("")
        setIsAnonymous(false)
        setPaymentStatus(null)
      }, 2000)
    } catch (error) {
      console.error("Error submitting contribution:", error)
      setPaymentStatus("error")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Contribution Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{totalRaised}€</p>
                <p className="text-sm text-gray-600">Total collecté</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{contributorCount}</p>
                <p className="text-sm text-gray-600">Contributeurs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{Math.round(progressPercentage)}%</p>
                <p className="text-sm text-gray-600">Objectif atteint</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progression vers l'objectif</span>
              <span>
                {totalRaised}€ / {goalAmount}€
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="contribute" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contribute">Contribuer</TabsTrigger>
          <TabsTrigger value="contributors">Contributeurs</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>

        <TabsContent value="contribute" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Soutenez notre communauté</CardTitle>
              <CardDescription>Vos contributions nous aident à maintenir et développer la communauté</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {contributionTiers.map((tier) => (
                  <Card
                    key={tier.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedTier?.id === tier.id ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => setSelectedTier(tier)}
                  >
                    <CardContent className="p-4 text-center">
                      <h3 className="font-semibold">{tier.name}</h3>
                      <p className="text-2xl font-bold text-blue-600">{tier.amount}€</p>
                      <p className="text-sm text-gray-600 mb-2">{tier.description}</p>
                      <div className="space-y-1">
                        {tier.benefits.map((benefit, index) => (
                          <p key={index} className="text-xs text-gray-500">
                            • {benefit}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex gap-4">
                <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                  <DialogTrigger asChild>
                    <Button className="flex-1" disabled={!selectedTier && !customAmount}>
                      <Heart className="h-4 w-4 mr-2" />
                      Contribuer maintenant
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Finaliser votre contribution</DialogTitle>
                      <DialogDescription>
                        Choisissez votre méthode de paiement et finalisez votre contribution
                      </DialogDescription>
                    </DialogHeader>

                    {paymentStatus === "success" && (
                      <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-green-800">Paiement réussi ! Merci pour votre contribution.</span>
                      </div>
                    )}

                    {paymentStatus === "error" && (
                      <div className="flex items-center gap-2 p-4 bg-red-50 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <span className="text-red-800">Erreur de paiement. Veuillez réessayer.</span>
                      </div>
                    )}

                    {!paymentStatus && (
                      <div className="space-y-4">
                        <div>
                          <Label>Montant</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input
                              type="number"
                              value={selectedTier ? selectedTier.amount : customAmount}
                              onChange={(e) => setCustomAmount(e.target.value)}
                              disabled={!!selectedTier}
                              placeholder="Montant personnalisé"
                            />
                            <span className="text-gray-500">€</span>
                          </div>
                          {selectedTier && <p className="text-sm text-gray-600 mt-1">Niveau: {selectedTier.name}</p>}
                        </div>

                        <div>
                          <Label>Message (optionnel)</Label>
                          <Textarea
                            value={contributionMessage}
                            onChange={(e) => setContributionMessage(e.target.value)}
                            placeholder="Laissez un message pour la communauté..."
                            className="mt-1"
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="anonymous"
                            checked={isAnonymous}
                            onChange={(e) => setIsAnonymous(e.target.checked)}
                          />
                          <Label htmlFor="anonymous">Contribution anonyme</Label>
                        </div>

                        <div>
                          <Label>Méthode de paiement</Label>
                          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-2">
                            <div className="flex items-center space-x-2 p-3 border rounded-lg">
                              <RadioGroupItem value="stripe" id="stripe" />
                              <Label htmlFor="stripe" className="flex items-center gap-2 cursor-pointer">
                                <CreditCard className="h-4 w-4" />
                                Carte bancaire (Stripe)
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 p-3 border rounded-lg">
                              <RadioGroupItem value="paypal" id="paypal" />
                              <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer">
                                <div className="h-4 w-4 bg-blue-600 rounded"></div>
                                PayPal
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {paymentMethod === "stripe" && (
                          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                            <div>
                              <Label>Numéro de carte</Label>
                              <Input placeholder="1234 5678 9012 3456" className="mt-1" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label>Expiration</Label>
                                <Input placeholder="MM/AA" className="mt-1" />
                              </div>
                              <div>
                                <Label>CVC</Label>
                                <Input placeholder="123" className="mt-1" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <DialogFooter>
                      {!paymentStatus && (
                        <>
                          <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
                            Annuler
                          </Button>
                          <Button onClick={handleContribute} disabled={isProcessing}>
                            {isProcessing ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Traitement...
                              </>
                            ) : (
                              `Payer ${selectedTier ? selectedTier.amount : customAmount || 0}€`
                            )}
                          </Button>
                        </>
                      )}
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Montant personnalisé"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contributors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nos contributeurs</CardTitle>
              <CardDescription>Merci à tous ceux qui soutiennent notre communauté</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contributions
                  .filter((c) => !c.isAnonymous)
                  .map((contribution) => (
                    <div key={contribution.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={contribution.avatar || "/placeholder.svg"} alt={contribution.contributor} />
                          <AvatarFallback>{contribution.contributor.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{contribution.contributor}</p>
                          {contribution.message && <p className="text-sm text-gray-600">"{contribution.message}"</p>}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{contribution.amount}€</p>
                        <p className="text-xs text-gray-500">
                          {new Date(contribution.timestamp).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique des contributions</CardTitle>
              <CardDescription>Toutes les contributions reçues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {contributions.map((contribution) => (
                  <div
                    key={contribution.id}
                    className="flex items-center justify-between p-3 border-l-4 border-green-500 bg-green-50"
                  >
                    <div>
                      <p className="font-medium">
                        {contribution.isAnonymous ? "Contribution anonyme" : contribution.contributor}
                      </p>
                      {contribution.message && <p className="text-sm text-gray-600">"{contribution.message}"</p>}
                      <p className="text-xs text-gray-500">
                        {new Date(contribution.timestamp).toLocaleString("fr-FR")}
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      +{contribution.amount}€
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}