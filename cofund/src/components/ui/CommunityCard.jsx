import React from "react";
import { User, FolderPlus } from "lucide-react";

const CommunityCard = ({ community }) => {
  return (
    <div className="border border-[#E5E5E5] rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-[#1A1A1A]">
          {community.name}
        </h2>
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors">
          Support
        </button>
      </div>
      <p className="text-[#666666] mb-4">{community.description}</p>
      <div className="flex justify-between text-sm text-[#999999]">
        <div className="flex items-center gap-1">
          <User className="w-4 h-4" /> {community.members} membres
        </div>
        <div className="flex items-center gap-1">
          <FolderPlus className="w-4 h-4" /> {community.projects} projets
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
