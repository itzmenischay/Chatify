import { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();

    sendMessage({
      text: text,
      image: imagePreview,
    });
    setText("");
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const isDisabled = !text.trim() && !imagePreview;

  return (
    <div className="p-4 border-t border-slate-700/50 bg-slate-900/40">
      {/* IMAGE PREVIEW */}
      {imagePreview && (
        <div className="mb-3 relative w-fit">
          <img
            src={imagePreview}
            alt="preview"
            className="w-24 h-24 object-cover rounded-lg border border-slate-700"
          />
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-slate-800 p-1 rounded-full"
          >
            <XIcon className="w-4 h-4 text-slate-300" />
          </button>
        </div>
      )}

      {/* INPUT ROW */}
      <div className="flex items-center gap-3">
        {/* TEXT INPUT */}
        <textarea
          placeholder="Type a message..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            isSoundEnabled && playRandomKeyStrokeSound();
          }}
          onKeyDown={handleKeyDown}
          rows={1}
          className="flex-1 px-4 py-2 rounded-xl bg-slate-800/60 text-slate-200 outline-none border border-slate-700 focus:ring-2 focus:ring-cyan-500 resize-none"
        />

        {/* IMAGE UPLOAD */}
        <label className="cursor-pointer p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
          <ImageIcon className="w-5 h-5 text-slate-300" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        {/* SEND BUTTON */}
        <button
          onClick={handleSendMessage}
          disabled={isDisabled}
          className={`p-2 rounded-lg transition cursor-pointer ${
            isDisabled
              ? "bg-slate-700 cursor-not-allowed opacity-50"
              : "bg-cyan-500 hover:bg-cyan-600"
          }`}
        >
          <SendIcon className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}

export default MessageInput;
