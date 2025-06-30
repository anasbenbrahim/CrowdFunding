"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { 
  CreditCard, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Download,
  Search,
  Filter
} from "lucide-react"
import { PaymentDialog } from "../components/PaymentDialog"

// Mock payment data
const mockPayments = [
  {
    id: 1,
    type: "contribution",
    project: "Application Mobile Écologique",
    amount: 50,
    date: "2024-06-28",
    status: "completed",
    paymentMethod: "Carte bancaire"
  },
  {
    id: 2,
    type: "withdrawal",
    project: "Café Communautaire",
    amount: 1200,
    date: "2024-06-25",
    status: "pending",
    paymentMethod: "Virement bancaire"
  },
  {
    id: 3,
    type: "contribution",
    project: "Album Musical Indépendant",
    amount: 25,
    date: "2024-06-20",
    status: "completed",
    paymentMethod: "PayPal"
  },
  {
    id: 4,
    type: "contribution",
    project: "Jardin Urbain Partagé",
    amount: 75,
    date: "2024-06-18",
    status: "completed",
    paymentMethod: "Carte bancaire"
  },
  {
    id: 5,
    type: "withdrawal",
    project: "Application Mobile Écologique",
    amount: 800,
    date: "2024-06-15",
    status: "completed",
    paymentMethod: "Virement bancaire"
  }
]

export default function PaymentsPage() {
  const [payments] = useState(mockPayments)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddPayment, setShowAddPayment] = useState(false)
  const [selectedTab, setSelectedTab] = useState("all")

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.project.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = selectedTab === "all" || payment.type === selectedTab
    return matchesSearch && matchesTab
  })

  const totalContributions = payments
    .filter(p => p.type === "contribution" && p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0)

  const totalWithdrawals = payments
    .filter(p => p.type === "withdrawal" && p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0)

  const pendingAmount = payments
    .filter(p => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Paiements</h1>
              <p className="text-gray-600 mt-2">Gérez vos transactions et paiements</p>
            </div>
            <Button onClick={() => setShowAddPayment(true)} className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Nouveau Paiement
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Contributions</p>
                  <p className="text-2xl font-bold text-green-600">€{totalContributions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingDown className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Retraits</p>
                  <p className="text-2xl font-bold text-blue-600">€{totalWithdrawals}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">En Attente</p>
                  <p className="text-2xl font-bold text-orange-600">€{pendingAmount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CreditCard className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Solde Net</p>
                  <p className="text-2xl font-bold text-purple-600">€{totalWithdrawals - totalContributions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Rechercher une transaction</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="search"
                    placeholder="Nom du projet..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Historique des Transactions</CardTitle>
            <CardDescription>Toutes vos transactions récentes</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">Toutes</TabsTrigger>
                <TabsTrigger value="contribution">Contributions</TabsTrigger>
                <TabsTrigger value="withdrawal">Retraits</TabsTrigger>
              </TabsList>
              
              <TabsContent value={selectedTab} className="mt-6">
                <div className="space-y-4">
                  {filteredPayments.map((payment) => (
                    <PaymentRow key={payment.id} payment={payment} />
                  ))}
                  
                  {filteredPayments.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Aucune transaction trouvée
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Payment Dialog */}
      {showAddPayment && (
        <PaymentDialog
          open={showAddPayment}
          onOpenChange={setShowAddPayment}
        />
      )}
    </div>
  )
}

function PaymentRow({ payment }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Terminé</Badge>
      case "pending":
        return <Badge className="bg-orange-100 text-orange-800">En attente</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeIcon = (type) => {
    return type === "contribution" ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-blue-600" />
    )
  }

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {getTypeIcon(payment.type)}
        </div>
        <div>
          <p className="font-medium text-gray-900">{payment.project}</p>
          <p className="text-sm text-gray-500">
            {payment.type === "contribution" ? "Contribution" : "Retrait"} • {payment.paymentMethod}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className={`font-semibold ${
            payment.type === "contribution" ? "text-green-600" : "text-blue-600"
          }`}>
            {payment.type === "contribution" ? "-" : "+"}€{payment.amount}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(payment.date).toLocaleDateString("fr-FR")}
          </p>
        </div>
        {getStatusBadge(payment.status)}
      </div>
    </div>
  )
}