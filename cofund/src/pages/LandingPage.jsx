"use client"


import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { 
  Lightbulb, 
  Shield, 
  Users, 
  TrendingUp, 
  ArrowRight
} from "lucide-react"
import { Link } from "react-router-dom"

export default function LandingPage() {
  const user = null // You can connect this to your auth context later

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Financez vos Rêves, Soutenez les Autres
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Rejoignez notre plateforme de financement participatif pour donner vie à des projets innovants. 
                Que vous soyez un entrepreneur avec une vision ou quelqu'un qui souhaite soutenir de grandes idées, 
                vous êtes au bon endroit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/communities">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3">
                    Explorer les Communautés
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                {user ? (
                  <Link to="/create-campaign">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3"
                    >
                      Créer une Campagne
                    </Button>
                  </Link>
                ) : (
                  <Link to="/register">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3"
                    >
                      Commencer
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <Lightbulb className="h-24 w-24 text-yellow-300 mx-auto" />
                  <div className="mt-4 text-center">
                    <div className="text-2xl font-bold">1000+</div>
                    <div className="text-blue-100">Projets Financés</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi Choisir Notre Plateforme ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les avantages qui font de notre plateforme le choix idéal pour vos projets de financement participatif
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">Sécurisé & Fiable</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 leading-relaxed">
                  Vos fonds et informations personnelles sont protégés par des mesures de sécurité de niveau industriel.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">Communauté Active</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 leading-relaxed">
                  Connectez-vous avec des personnes qui partagent vos idées et construisez une communauté autour de vos projets.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">Suivi des Progrès</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 leading-relaxed">
                  Surveillez les progrès de votre campagne avec des analyses détaillées et des mises à jour en temps réel.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">1,000+</div>
              <div className="text-gray-600">Projets Réalisés</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">€2.5M</div>
              <div className="text-gray-600">Fonds Collectés</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">50K+</div>
              <div className="text-gray-600">Contributeurs</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comment ça Marche ?
            </h2>
            <p className="text-xl text-gray-600">
              Trois étapes simples pour réaliser vos projets
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto mb-6 w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Créez votre Projet</h3>
              <p className="text-gray-600">
                Présentez votre idée, définissez votre objectif de financement et partagez votre vision avec la communauté.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto mb-6 w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Partagez & Promouvez</h3>
              <p className="text-gray-600">
                Utilisez nos outils pour promouvoir votre campagne et atteindre votre audience cible.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto mb-6 w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Réalisez vos Rêves</h3>
              <p className="text-gray-600">
                Collectez les fonds nécessaires et donnez vie à votre projet avec le soutien de la communauté.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à Commencer ?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Rejoignez des milliers de créateurs et de contributeurs qui réalisent des rêves ensemble.
          </p>
          {!user && (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3"
                >
                  S'inscrire Maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3"
                >
                  Se Connecter
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}