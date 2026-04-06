import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, []);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
    <>
      {allContacts?.map((contact) => {
        const isOnline = onlineUsers?.includes(contact._id?.toString());

        return (
          <div
            key={contact._id}
            className="bg-cyan-500/10 p-4 pt-2 pb-2 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
            onClick={() => setSelectedUser(contact)}
          >
            <div className="flex items-center gap-3">
              
              <div className={`avatar ${isOnline ? "avatar-online" : "avatar-offline"}`}>
                <div className="size-12 rounded-full">
                  <img
                    src={contact.profilePic || "/avatar.png"}
                    alt={contact.fullName}
                  />
                </div>
              </div>

              <h4 className="text-slate-200 font-medium">
                {contact.fullName}
              </h4>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ContactList;