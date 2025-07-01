import React, { useState } from "react";
import CommunityCard from "../components/ui/CommunityCard";

const CommunitiesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const communities = [
    {
      name: "Tech & Innovation",
      description:
        "Communauté dédiée aux projets technologiques et innovations numériques",
      members: "2 000",
      projects: "23",
    },
    {
      name: "Art & Créativité",
      description:
        "Espace pour artistes, designers et créateurs de tous horizons",
      members: "8 800",
      projects: "13",
    },
    {
      name: "Développement Durable",
      description:
        "Projets écologiques et initiatives pour un avenir plus vert",
      members: "1 156",
      projects: "34",
    },
    {
      name: "Éducation & Formation",
      description: "Initiatives éducatives et projets écologiques innovants",
      members: "5 578",
      projects: "23",
    },
    {
      name: "Santé & Bien-être",
      description:
        "Projets liés à la santé, au sport et au bien-être communicatoire",
      members: "6 923",
      projects: "29",
    },
    {
      name: "Social & Solidarité",
      description: "Actions sociales et projets d'entraide communautaire",
      members: "3 008",
      projects: "41",
    },
  ];

  const filteredCommunities = communities.filter(
    (community) =>
      community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* Header Section with Search */}
      <section className="bg-gradient-to-b from-sky-100 to-blue-200 py-12 w-full mb-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-6xl font-bold leading-tight mb-4 text-gray-900">
            Discover our communities
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-10">
            Join passionate groups, and take part in inspiring projects
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search communities ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
              <svg
                className="absolute right-3 top-3.5 h-5 w-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 whitespace-nowrap transition-colors">
              <span>+</span>
              <span>Create a community</span>
            </button>
          </div>
        </div>
      </section>

      {/* Communities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        {filteredCommunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunities.map((community, index) => (
              <CommunityCard key={index} community={community} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">
              No communities found matching your search
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default CommunitiesPage;
