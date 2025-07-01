"use client";

import { Button } from "../components/ui/button";

import CommunityCard from "../components/ui/CommunityCard";
import CampaignCard from "../components/ui/CampaignCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Users,
  ShieldCheck,
  BarChart3,
  Lightbulb,
  Shield,
  TrendingUp,
  ArrowRight,
  Plus,
  User,
  FolderPlus,
  Clock,
  Megaphone,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function LandingPage() {
  const user = null;
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-sky-100 to-blue-200 py-9 text-center">
        <div className="max-w-5xl mx-auto px-4">
          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 text-gray-900">
            Fund your projects <br />
            <span className="text-blue-600">with your community</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-gray-700 mb-10">
            Join passionate communities, support innovative projects, and build
            the future together. <br />
            <span className="text-gray-800 font-medium">
              CrowdUnity connects project creators with engaged communities.
            </span>
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <Link to="/authentication">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg font-semibold">
                + Launch my project
              </Button>
            </Link>
            <Link to="/campaigns">
              <Button
                variant="outline"
                className="bg-white hover:bg-gray-100 text-gray-800 px-6 py-3 text-lg font-medium border border-gray-300"
              >
                🔍 Explore projects
              </Button>
            </Link>
          </div>

          <div className="w-full px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-screen-xl mx-auto">
              {/* Card 1 */}
              <Card className="bg-white shadow-md p-2 border border-gray-100 w-full max-h-40 flex flex-col justify-between">
                <CardHeader className="flex flex-col items-center gap-0 pb-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-1">
                    <Shield className="h-4 w-4 text-blue-600" />
                  </div>
                  <CardTitle className="text-base font-semibold text-gray-900 text-center leading-tight">
                    Sécurisé & Fiable
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center px-2 pt-1">
                  <CardDescription className="text-gray-600 text-xs leading-tight">
                    Vos fonds et informations personnelles sont protégés par des
                    mesures de sécurité avancées.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Card 2 */}
              <Card className="bg-white shadow-md p-2 border border-gray-100 w-full max-h-40 flex flex-col justify-between">
                <CardHeader className="flex flex-col items-center gap-0 pb-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-1">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <CardTitle className="text-base font-semibold text-gray-900 text-center leading-tight">
                    Communauté Active
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center px-2 pt-1">
                  <CardDescription className="text-gray-600 text-xs leading-tight">
                    Connectez-vous avec des personnes qui partagent vos idées et
                    intérêts.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Card 3 */}
              <Card className="bg-white shadow-md p-2 border border-gray-100 w-full max-h-40 flex flex-col justify-between">
                <CardHeader className="flex flex-col items-center gap-0 pb-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-1">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                  </div>
                  <CardTitle className="text-base font-semibold text-gray-900 text-center leading-tight">
                    Suivi des Progrès
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center px-2 pt-1">
                  <CardDescription className="text-gray-600 text-xs leading-tight">
                    Analyses détaillées et mises à jour en temps réel de votre
                    campagne.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Active Communities Section */}
      <section className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-2">Active Communities</h2>
          <p className="text-gray-600 mb-6">
            Join passionate communities and discover projects that reflect who
            you are
          </p>

          {/* Map through communities and display the CommunityCard */}
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              {
                name: "Tech & Innovation", // Updated to 'name'
                description:
                  "Communauté dédiée aux projets technologiques et innovations numériques",
                members: "1200",
                projects: "23",
              },
              {
                name: "Art & Créativité", // Updated to 'name'
                description:
                  "Espace pour artistes, designers et créateurs de tous horizons",
                members: "800",
                projects: "13",
              },
              {
                name: "Développement Durable", // Updated to 'name'
                description:
                  "Projets écologiques et initiatives pour un avenir plus vert",
                members: "1156",
                projects: "34",
              },
              {
                name: "Éducation & Formation", // Updated to 'name'
                description:
                  "Initiatives éducatives et projets pédagogiques innovants",
                members: "678",
                projects: "17",
              },
              {
                name: "Santé & Bien-être", // Updated to 'name'
                description:
                  "Projets liés à la santé, au sport et au bien-être communautaire",
                members: "923",
                projects: "20",
              },
              {
                name: "Social & Solidarité", // Updated to 'name'
                description:
                  "Actions sociales et projets d'entraide communautaire",
                members: "1008",
                projects: "41",
              },
            ].map((comm, i) => (
              <CommunityCard key={i} community={comm} />
            ))}
          </div>

          <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
            <Link to="/communities">
              <button className="border border-gray-300 px-6 py-3 rounded-xl text-sm font-medium hover:bg-gray-50">
                Voir toutes les communautés
              </button>
            </Link>
            <Link to="/authentication">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-700">
                <Plus className="w-4 h-4" /> Créer une communauté
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-2">Projets en Vedette</h2>
          <p className="text-gray-600 mb-6">
            Découvrez les projets les plus prometteurs soutenus par nos
            communautés actives
          </p>

          <div className="inline-grid md:grid-cols-3 gap-5 text-left justify-center mx-auto">
            {[
              {
                title: "EcoTech – Capteurs Environnementaux Intelligents",
                description:
                  "Développement de capteurs IoT pour surveiller la qualité de l’air en temps réel.",
                image: "/capt.webp", // This can be replaced with any image prop if needed
                raised: "18 750€",
                goal: "25 000€",
                contributors: 124,
                daysLeft: 12,
                creator: "Marie Dubois",
                supportText: "Soutenir",
              },
              {
                title: "Atelier Créatif Collaboratif",
                description:
                  "Création d’un espace de coworking dédié aux artistes locaux.",
                image: "/raed.webp", // This can be replaced with any image prop if needed
                raised: "8 200€",
                goal: "15 000€",
                contributors: 89,
                daysLeft: 25,
                creator: "Lucas Martin",
                supportText: "Soutenir",
              },
              {
                title: "AppMobile – Gestion Communautaire",
                description:
                  "Application mobile pour faciliter la communication et l’organisation dans les communautés locales.",
                image: "/app.webp", // This can be replaced with any image prop if needed
                raised: "28 900€",
                goal: "35 000€",
                contributors: 234,
                daysLeft: 8,
                creator: "Sophie Chen",
                supportText: "Soutenir",
              },
            ].map((campaign, i) => (
              <CampaignCard key={i} campaign={campaign} />
            ))}
          </div>

          <div className="mt-6">
            <Link to="/campaigns">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-blue-700">
                Voir tous les projets
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-b from-sky-400 to-blue-600 text-white py-16 px-6 text-center">
        <h2 className="text-4xl font-bold mb-2">CoFund en Chiffres</h2>
        <p className="text-white-600 mb-8">
          Ensemble, nous construisons l’avenir
        </p>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center gap-8">
          {[
            {
              value: "2.5M€",
              title: "Fonds collectés",
              subtitle: "Montant total levé par notre communauté",
            },
            {
              value: "1,247",
              title: "Projets financés",
              subtitle: "Projets ayant atteint leur objectif",
            },
            {
              value: "15,000+",
              title: "Contributeurs actifs",
              subtitle: "Membres engagés dans nos communautés",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white bg-opacity-20 rounded-xl p-10 flex flex-col items-center text-center max-w-sm mx-auto"
            >
              <span className="text-3xl font-extrabold mb-2">{stat.value}</span>
              <h3 className="text-xl font-semibold mb-2">{stat.title}</h3>
              <p className="text-sm">{stat.subtitle}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
