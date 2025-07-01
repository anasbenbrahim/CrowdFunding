import React, { useState } from "react";
import { Search } from "lucide-react";
import CampaignCard from "../components/ui/CampaignCard";
import { Link } from "react-router-dom";

const CampaignsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const campaigns = [
    {
      title: "EcoTech – Smart Environmental Sensors",
      description: "Development of real-time air quality monitoring sensors.",
      raised: "18,780€",
      goal: "25,000€",
      creator: "Marie Dubois",
      contributors: "56 contributors",
      daysLeft: "28",
      supportText: "Support",
    },
    {
      title: "Creative Collaborative Workshop",
      description: "Creation of a coworking space dedicated to local artists.",
      raised: "8,200€",
      goal: "15,000€",
      creator: "Lucas Martin",
      contributors: "89 contributors",
      daysLeft: "28",
      supportText: "Support",
    },
    {
      title: "AppMobile – Community Management",
      description:
        "Mobile app to facilitate communication in local communities.",
      raised: "28,800€",
      goal: "35,000€",
      creator: "Sophie Chen",
      contributors: "234 contributors",
      daysLeft: "28",
      supportText: "Support",
    },
    {
      title: "Urban Community Garden",
      description:
        "Development of a collaborative green space in the city center.",
      raised: "12,450€",
      goal: "20,000€",
      creator: "Thomas Leroy",
      contributors: "112 contributors",
      daysLeft: "14",
      supportText: "Support",
    },
    {
      title: "Community Library Project",
      description: "Establishment of a neighborhood library with free access.",
      raised: "9,780€",
      goal: "15,000€",
      creator: "Amélie Petit",
      contributors: "67 contributors",
      daysLeft: "21",
      supportText: "Support",
    },
    {
      title: "Bike Repair Workshop",
      description: "Collaborative space to learn bicycle maintenance.",
      raised: "6,320€",
      goal: "10,000€",
      creator: "Jean Dupont",
      contributors: "45 contributors",
      daysLeft: "7",
      supportText: "Support",
    },
    {
      title: "Renewable Energy Initiative",
      description: "Community solar panel installation project.",
      raised: "32,150€",
      goal: "50,000€",
      creator: "Emma Johnson",
      contributors: "189 contributors",
      daysLeft: "42",
      supportText: "Support",
    },
    {
      title: "Youth Coding Academy",
      description: "Programming courses for underprivileged youth.",
      raised: "14,670€",
      goal: "30,000€",
      creator: "David Wilson",
      contributors: "93 contributors",
      daysLeft: "19",
      supportText: "Support",
    },
    {
      title: "Neighborhood Food Bank",
      description: "Expansion of local food distribution services.",
      raised: "22,890€",
      goal: "25,000€",
      creator: "Sarah Miller",
      contributors: "156 contributors",
      daysLeft: "5",
      supportText: "Support",
    },
  ];

  // Filtering campaigns based on search term
  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* Header Section */}
      <section className="bg-gradient-to-b from-blue-100 to-purple-200 py-12 w-full mb-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-6xl font-bold leading-tight mb-4 text-gray-900">
            Explore Campaigns
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-10">
            Discover and support the most innovative ideas from our communities.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
              <Search className="absolute right-3 top-3.5 text-gray-500" />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 whitespace-nowrap transition-colors">
              <span>+</span>
              <span>Create a campaign</span>
            </button>
          </div>
        </div>
      </section>

      {/* Campaigns Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left justify-center mx-auto">
          {filteredCampaigns.map((campaign, index) => (
            <CampaignCard key={index} campaign={campaign} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CampaignsPage;
