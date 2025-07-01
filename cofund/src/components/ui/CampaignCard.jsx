import React from "react";
import { Clock, Eye, User } from "lucide-react";

const CampaignCard = ({ campaign }) => {
  const getProgress = (raised, goal) => {
    const raisedNum = parseInt(raised.replace(/[€,]/g, ""));
    const goalNum = parseInt(goal.replace(/[€,]/g, ""));
    return Math.min((raisedNum / goalNum) * 100, 100);
  };

  const progress = getProgress(campaign.raised, campaign.goal);

  return (
    <div className="rounded-lg border bg-white shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg mb-2">{campaign.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{campaign.description}</p>

        <div className="flex items-center justify-between mb-1 text-sm font-medium">
          <span className="text-blue-600">{campaign.raised}</span>
          <span className="text-gray-500">of {campaign.goal}</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
          <div className="bg-blue-600 h-2" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-gray-500" />
            {campaign.daysLeft} days remaining
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
          <span className="flex items-center gap-1">
            <User className="h-4 w-4 text-gray-400" />
            by {campaign.creator}
          </span>
          <div className="flex gap-2">
            <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-semibold px-3 py-1 rounded-md transition-colors">
              {campaign.supportText}
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-md transition-colors">
              <Eye className="h-4 w-4" /> See More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
