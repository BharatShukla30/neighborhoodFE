/* eslint-disable react/prop-types */
import { IoIosAttach } from "react-icons/io";
import Dropzone from "../Dropzone";
import { useSelector } from "react-redux";
import { BsSend } from "react-icons/bs";
import { isGroupJoinedByUser } from "../../utils/helpers";

const GroupChatBar = (props) => {
  const {
    socket,
    activeChat,
    newMessage,
    setNewMessage,
    setMessages,
    groupDetails,
  } = props;

  const user = useSelector((state) => state.auth.user);
  const groups = useSelector((state) => state.groups.grps);

  const handleEnterKey = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      const message = e.target.value;
      if (message !== "") {
        const messageData = {
          group_id: activeChat.group_id,
          senderName: user?.username,
          senderPhoto: user?.picture,
          msg: message,
          // ToDo: Need to delete sent_at when server handles the date
          sent_at: new Date(),
        };

        socket.emit("send-message", messageData, (response) => {
          console.log("Send message response:", response);
        });
        setMessages((list) => [messageData, ...list]);
        setNewMessage("");
      }
      e.target.value = "";
    }
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (newMessage) {
      const messageData = {
        group_id: activeChat.group_id,
        senderName: user?.username,
        senderPhoto: user?.picture,
        msg: newMessage,
        sent_at: new Date(),
      };
      socket.emit("send-message", messageData);
      setMessages((list) => [messageData, ...list]);
      setNewMessage("");
    }
    e.target.value = "";
  };



  const handleImageMessageSubmit = (uploadedResponseImage) => {
      const messageData = {
        group_id: activeChat.group_id,
        senderName: user?.username,
        senderPhoto: user?.picture,
        msg: null,
        mediaLink: uploadedResponseImage.url,
        sent_at: new Date(),
      };
      socket.emit("send-message", messageData);
      setMessages((list) => [messageData, ...list]);
  };

  if (activeChat.group_name && isGroupJoinedByUser(groups, groupDetails?._id)) {
    return (
      <div className="absolute bottom-0 flex items-center justify-center  w-full bg-chatBg  pt-2 pb-2">
        <button className="h-10 w-10 me-5 ms-2 rounded-full bg-slate-300 shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
          <IoIosAttach className="mx-2 my-2 text-gray-600 font-bold text-2xl rotate-45" />
          <Dropzone callHandleImageMessageSubmit={handleImageMessageSubmit}/>
        </button>
        <textarea
          className=" resize-none pl-3 w-5/6 py-3 rounded-md shadow-md"
          placeholder="Type a message"
          rows={1}
          onKeyDown={handleEnterKey}
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        ></textarea>
        <button
          type="button"
          onClick={handleMessageSubmit}
          className="ms-5 me-3 rounded-full bg-primary px-3 py-3 text-xl font-semibold text-white shadow-sm hover:bg-black-bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          <BsSend />
        </button>
      </div>
    );
  }

  return <></>;
};

export default GroupChatBar;
