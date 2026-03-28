import React from "react";
import { useChatStore } from "../store/useChatStore";
import { motion } from "motion/react";
import GlassContainer from "../components/GlassContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="w-full p-5 flex justify-center h-[calc(100vh-2rem)]">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="w-full max-w-6xl mx-auto"
      >
        <GlassContainer className="h-[85vh]" padding={false}>
          <div className="flex h-full">
            {/* LEFT PANEL */}
            <div className="w-full md:w-1/3 flex flex-col bg-blue-600/5 backdrop-blur-3xl p-4 ">
              {/* TOP SECTION */}
              <ProfileHeader />
              <ActiveTabSwitch />

              {/* LIST SECTION */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-none">
                {/* Toggle based on tab later */}
                {activeTab === "chats" ? <ChatsList /> : <ContactList />}
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="hidden md:flex md:w-2/3 h-full scrollbar-none">
              {selectedUser ? (
                <div className="flex flex-col w-full h-full">
                  <ChatContainer />
                </div>
              ) : (
                <div className="flex w-full h-full items-center justify-center">
                  <NoConversationPlaceholder />
                </div>
              )}
            </div>
          </div>
        </GlassContainer>
      </motion.div>
    </div>
  );
}

export default ChatPage;
