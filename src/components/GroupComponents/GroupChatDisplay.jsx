/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";
import { isGroupJoinedByUser } from "../../utils/helpers";
import JoinGroupSection from "../JoinGroupSection";
import chatBg from "../../assets/chatBackground.png";
import GroupDetails from "./GroupDetails";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";

import {
  addUser,
  getUserGroups,
  nearestGroup,
} from "../../redux/actions/groupActions";
import { GoThumbsdown, GoThumbsup } from "react-icons/go";

// For fetching messages on inView
import {
  fetchGroupMessages,
} from "../../redux/actions/groupActions";
import { useEffect, useState } from "react";

const GroupChatDisplay = (props) => {
  const {
    chatRef,
    groups,
    grpPanel,
    messages,
    groupDetails,
    activeChat,
    setActiveChat,
    setNearbyGroupPanel,
    setMessages
  } = props;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);


  // Establishing state to manage the page number used for API calls to retrieve the subsequent set of messages.
  const [viewPage, setViewPage] = useState(0);
  const { ref, inView } = useInView({ 
    /* Optional options */
    threshold: 0,
  });


  useEffect(()=>{
    if(inView){
    setViewPage(prev=>prev+1);
    }
  }, [inView]);

  useEffect(()=>{
    const fetchNextPageOfMsg = () => {
      dispatch(fetchGroupMessages(activeChat.group_id)).then((result) => {
            setMessages([...result.payload, ...messages]);
      });
    }
    fetchNextPageOfMsg();
    console.log(viewPage);
  }, [viewPage]);

  
  const handleJoinGroup = (grpId, grpName) => {
    try {
      setActiveChat({ group_id: grpId, group_name: grpName });
      dispatch(addUser({ groupId: grpId, userId: user._id }))
        .then((result) => {
          setNearbyGroupPanel(false);
          setActiveChat({ group_id: grpId, group_name: grpName });
          dispatch(getUserGroups());
          dispatch(nearestGroup());
        })
        .catch((err) => {
          alert("Error in joining group");
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  //   const handleThumbsUp = (msg_id) => {
  //   socket.emit('up-vote', { msg_id });
  // };

  // const handleThumbsDown = (msg_id) => {
  //   socket.emit('down-vote', { msg_id });
  // };

  return (
    <div
      className={"h-[75vh] items-stretch justify-stretch relative"}
      style={{ backgroundImage: chatBg }}
    >
      {!groupDetails?.isOpen &&
      !isGroupJoinedByUser(groups, groupDetails?._id) ? (
        <JoinGroupSection
          handleJoinGroup={handleJoinGroup}
          activeChat={activeChat}
        />
      ) : (
        <div className=" h-full overflow-y-scroll px-4">
          <AnimatePresence>
            {grpPanel && (
              <motion.div
                className="absolute w-4/12 right-0 bg-white z-10 h-full"
                initial={{ x: "100vw" }}
                animate={{ x: 0 }}
                exit={{ x: "100vw" }}
                transition={{ type: "easeInOut", duration: 0.2 }}
              >
                {groupDetails ? (
                  <GroupDetails {...groupDetails} />
                ) : (
                  <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col w-full">
            {messages
              ?.slice()
              .reverse()
              .map((msg, index) => {

                const isLastMessage = messages.length - 1 === index;

                return (
                  <div
                    className={`flex ${
                      msg.senderName == user?.username
                        ? "flex-row-reverse"
                        : "flex-row"
                    } gap-2.5 my-4  w-full  `}
                    key={index}
                    ref={index === 0 ? ref  : ((messages.length - 1 === index) ? chatRef : null) }
                  >
                    <img
                      src={msg.senderPhoto}
                      className={`w-8 h-8 rounded-full`}
                      alt={msg.senderName}
                    />
                    <div className="flex flex-col justify-between items-center  leading-1.5 ">
                      <div
                        className={`px-[0.2rem] bg-white  border-gray-200 backdrop-blur-md ${
                          msg.senderName == user?.username
                            ? "rounded-tr-xl rounded-br-xl rounded-bl-xl"
                            : "rounded-tl-xl rounded-br-xl rounded-bl-xl"
                        }   backdrop-brightness-125 shadow-md`}
                      >
                        <h1
                          className={`font-bold text-sm ps-2 pe-3 capitalize`}
                        >
                          {msg.senderName == user?.username
                            ? "You"
                            : msg.senderName}
                        </h1>
                        <p className="block text-sm font-normal py-1 ps-2 pe-3 text-left  ">
                           {
                            (msg.msg ? (msg.msg) :(<img className="h-36" src={msg.mediaLink}/>))
                           }
                        </p>
                        <p className="text-[11px] font-thin text-right ps-1">
                          <span className=" pr-1 text-gray-500 dark:text-gray-400 text-right">
                            {new Date(msg.sent_at).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })}
                            {/* {new Date(msg.time).getHours()}:{new Date(msg.time).getMinutes()} */}
                          </span>
                        </p>
                      </div>
                      <div
                        className={`w-full flex  text-gray-700 mt-2 text-sm ${
                          msg.senderName === user?.username
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <motion.button
                          whileTap={{
                            scale: 0.9,
                            rotate: -45,
                            color: "aqua",
                          }}
                          // onClick={() => handleThumbsDown(msg._id)}
                          className="mr-2 "
                        >
                          <GoThumbsup />
                        </motion.button>
                        <motion.button
                          whileTap={{
                            scale: 0.9,
                            rotate: 45,
                            color: "red",
                          }}
                          // onClick={() => handleThumbsDown(msg._id)}
                          className="mr-2 "
                        >
                          <GoThumbsdown />
                        </motion.button>
                        <p className="text-gray-600 text-sm">{msg.votes}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupChatDisplay;
