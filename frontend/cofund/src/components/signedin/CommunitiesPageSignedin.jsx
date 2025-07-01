"use client"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Plus, Users, MessageSquare, FolderOpen, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { CreateCommunityDialog } from "../CreateCommunityDialog"

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState([])
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCommunities = async () => {
      setLoading(true);
      setError(null);
      try {
        const userId = localStorage.getItem('userId');
        
        const allCommunitiesResponse = await fetch("http://localhost:8081/api/communities");
        if (!allCommunitiesResponse.ok) {
          throw new Error(`Failed to fetch all communities: ${allCommunitiesResponse.status}`);
        }
        let allCommunities = await allCommunitiesResponse.json();

        if (userId) {
          const userCommunitiesResponse = await fetch(`http://localhost:8081/api/communities/member/${userId}`);
          if (!userCommunitiesResponse.ok) {
            throw new Error(`Failed to fetch user communities: ${userCommunitiesResponse.status}`);
          }
          const userCommunities = await userCommunitiesResponse.json();
          const userCommunityIds = new Set(userCommunities.map(c => c.id));

          allCommunities = allCommunities.map(community => ({
            ...community,
            isMember: userCommunityIds.has(community.id)
          }));
        }

        setCommunities(allCommunities);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching communities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  const handleCreateCommunity = async (newCommunity) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error("User not logged in.");
      }

      const response = await fetch(`http://localhost:8081/api/communities/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCommunity),
      });

      if (!response.ok) {
        throw new Error(`Failed to create community: ${response.status}`);
      }

      const createdCommunity = await response.json();
      setCommunities([createdCommunity, ...communities]);
      setShowCreateDialog(false);
    } catch (err) {
      console.error("Error creating community:", err);
      setError(err.message);
    }
  };

  const handleJoinCommunity = async (communityId) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error("User not logged in.");
      }

      const response = await fetch(`http://localhost:8081/api/communities/${communityId}/members/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to join community: ${response.status}`);
      }

      // Update the local state to reflect the change
      setCommunities(
        communities.map((community) =>
          community.id === communityId
            ? { ...community, isMember: true, memberCount: (community.memberCount || 0) + 1 }
            : community,
        ),
      );
    } catch (err) {
      console.error("Error joining community:", err);
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Chargement...</div>
  }

  if (error) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-red-500">Erreur: {error}</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Communautés</h1>
                <p className="text-gray-600">Découvrez et rejoignez des communautés</p>
              </div>
            </div>
            <Button onClick={() => setShowCreateDialog(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Créer une communauté
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Mes communautés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities
              .filter((c) => c.isMember)
              .map((community) => (
                <CommunityCard key={community.id} community={community} onJoin={handleJoinCommunity} />
              ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Découvrir</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities
              .filter((c) => !c.isMember)
              .map((community) => (
                <CommunityCard key={community.id} community={community} onJoin={handleJoinCommunity} />
              ))}
          </div>
        </div>
      </main>

      <CreateCommunityDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onCreateCommunity={handleCreateCommunity}
      />
    </div>
  )
}

function CommunityCard({ community, onJoin }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Avatar className="h-12 w-12">
            <AvatarImage src={community.image || "/placeholder.svg"} alt={community.name} />
            <AvatarFallback>{community.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <Badge variant="secondary">{community.category || "Général"}</Badge>
        </div>
        <div>
          <CardTitle className="text-lg">{community.name}</CardTitle>
          <CardDescription className="line-clamp-2">{community.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{community.memberCount || 0} membres</span>
          </div>
          <div className="flex items-center gap-1">
            <FolderOpen className="h-4 w-4" />
            <span>{community.projectCount || 0} projets</span>
          </div>
        </div>

        <div className="flex gap-2">
          {community.isMember === true ? (
            <Link to={`/community/${community.id}`} className="flex-1">
              <Button variant="default" className="w-full">
                Voir la communauté
              </Button>
            </Link>
          ) : (
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => onJoin(community.id)}>
              Rejoindre
            </Button>
          )}
          <Button variant="ghost" size="icon">
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
