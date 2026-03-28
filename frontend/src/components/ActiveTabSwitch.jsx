import React from "react";
import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  const tabs = [
    { id: "chats", label: "Chats" },
    { id: "contacts", label: "Contacts" },
  ];

  return (
    <div className="flex justify-between tabs tabs-boxed bg-transparent p-2 m-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab flex-1 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
              isActive
                ? "bg-cyan-500/20 text-cyan-400"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default ActiveTabSwitch;