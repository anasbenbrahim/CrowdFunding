"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Progress } from "./ui/progress"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "./ui/dialog"
import { 
  CreditCard, 
  Heart, 
  Loader2, 
  CheckCircle, 
  AlertCircle 
} from "lucide-react"

const contributionTiers = [
  {
    id: "supporter",
    name: "Supporter",
    amount: 10,
    description: "Soutenez le projet"
  },
  {
    id: "contributor",
    name: "Contributeur",
    amount: 25,
    description: "Contribuez activement"
  },
  {
    id: "sponsor",
    name: "Sponsor",
    amount: 50,
    description: "Sponsorisez le projet"
  },
  {
    id: "patron",
    name: "Mécène",
    amount: 100,
    description: "Devenez mécène"
  }
]

export function ContributionModal({ project, onComplete, onClose }) {
  const [selectedTier, setSelectedTier] = useState(null)
  const [customAmount, setCustomAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("stripe")
  const [contributionMessage, setContributionMessage] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState(null)

  if (!project) return null

  const progressPercentage = Math.min((project.currentAmount / project.targetAmount) * 100, 100)

  const handleContribute = async () => {
    setIsProcessing(true)
    setPaymentStatus(null)

    try {
      const amount = selectedTier ? selectedTier.amount : Number.parseInt(customAmount)
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setPaymentStatus("success")
      
      // Call the completion callback
      setTimeout(() => {
        onComplete(amount)
      }, 1500)
      
    } catch (error) {
      console.error("Error processing payment:", error)
      setPaymentStatus("error")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Contribuer à {project.title}</DialogTitle>
          <DialogDescription>
            Soutenez ce projet et aidez-le à atteindre son objectif
          </DialogDescription>
        </DialogHeader>

        {/* Project Progress */}
        <div className="space-y-4 py-4">
          <div className="flex justify-between text-sm">
            <span>Progression</span>
            <span>€{project.currentAmount.toLocaleString()} / €{project.targetAmount.toLocaleString()}</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{project.backers} contributeurs</span>
            <span>{progressPercentage.toFixed(0)}% atteint</span>
          </div>
        </div>

        {paymentStatus === "success" ? (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">Paiement réussi !</h3>
            <p className="text-green-600">Merci pour votre contribution au projet.</p>
          </div>
        ) : paymentStatus === "error" ? (
          <div className="text-center py-8">
            <AlertCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">Erreur de paiement</h3>
            <p className="text-red-600">Veuillez réessayer ou choisir une autre méthode.</p>
            <Button onClick={() => setPaymentStatus(null)} className="mt-4">
              Réessayer
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Contribution Tiers */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Montants suggérés</Label>
              <div className="grid grid-cols-2 gap-3">
                {contributionTiers.map((tier) => (
                  <Card
                    key={tier.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedTier?.id === tier.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                    }`}
                    onClick={() => {
                      setSelectedTier(tier)
                      setCustomAmount("")
                    }}
                  >
                    <CardContent className="p-3 text-center">
                      <p className="font-semibold">{tier.name}</p>
                      <p className="text-xl font-bold text-blue-600">€{tier.amount}</p>
                      <p className="text-xs text-gray-600">{tier.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <Label htmlFor="custom-amount">Ou montant personnalisé</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id="custom-amount"
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setSelectedTier(null)
                  }}
                  placeholder="Montant en €"
                  min="1"
                />
                <span className="text-gray-500">€</span>
              </div>
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message">Message (optionnel)</Label>
              <Textarea
                id="message"
                value={contributionMessage}
                onChange={(e) => setContributionMessage(e.target.value)}
                placeholder="Encouragez le créateur avec un message..."
                className="mt-1"
                rows={3}
              />
            </div>

            {/* Anonymous Option */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="anonymous" className="text-sm">Contribution anonyme</Label>
            </div>

            {/* Payment Method */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Méthode de paiement</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="stripe" id="stripe" />
                  <Label htmlFor="stripe" className="flex items-center gap-2 cursor-pointer flex-1">
                    <CreditCard className="h-4 w-4" />
                    Carte bancaire (Sécurisé)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer flex-1">
                    <div className="h-4 w-4 bg-blue-600 rounded"></div>
                    PayPal
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Payment Form */}
            {paymentMethod === "stripe" && (
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label htmlFor="card-number">Numéro de carte</Label>
                  <Input id="card-number" placeholder="1234 5678 9012 3456" className="mt-1" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="expiry">Expiration</Label>
                    <Input id="expiry" placeholder="MM/AA" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" className="mt-1" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {paymentStatus !== "success" && (
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={onClose} disabled={isProcessing}>
              Annuler
            </Button>
            <Button 
              onClick={handleContribute} 
              disabled={(!selectedTier && !customAmount) || isProcessing}
              className="min-w-[120px]"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Traitement...
                </>
              ) : (
                <>
                  <Heart className="h-4 w-4 mr-2" />
                  Contribuer €{selectedTier ? selectedTier.amount : customAmount || 0}
                </>
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}