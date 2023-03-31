import {
  LoadingIndicator,
  Chat,
  ChannelList,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  ChannelListMessengerProps,
  useChatContext,
} from "stream-chat-react";
import { useAuth, useLoggedInAuth } from "../context/AuthContext";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

export function Home() {
  const { user, streamChat } = useLoggedInAuth();

  //is streamchat null, we show the loading indicatior(inbuilt in streamchat) while we authenticating/logging in the user to stream
  if (streamChat == null)
    return (
      <div className="m-10 h-full bg-red">
        <LoadingIndicator color="grey" size={40} />
      </div>
    );

  return (
    //stream chat application
    <Chat client={streamChat}>
      {/* list of channels */}
      <ChannelList
        List={Channels}
        sendChannelsToList
        filters={{ members: { $in: [user.id] } }}
      />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </Chat>
  );
}

function Channels({ loadedChannels }: ChannelListMessengerProps) {
  const { logout } = useLoggedInAuth();
  const navigate = useNavigate();
  const { setActiveChannel, channel: activeChannel } = useChatContext();
  return (
    <div className="w-60 flex flex-col gap-4 m-3 h-full">
      <Button onClick={() => navigate("/channel/new")}>New Conversation</Button>
      <hr className="border-gray-500" />
      {loadedChannels != null && loadedChannels.length > 0
        ? loadedChannels.map((channel) => {
            const isActive = channel === activeChannel;
            const extraClasses = isActive
              ? "bg-blue-400 text-white"
              : "hover:bg-blue-100 bg-gray-100";
            return (
              <button
                onClick={() => {
                  setActiveChannel(channel);
                }}
                disabled={isActive}
                className={`p-4 rounded-lg flex gap-3 items-center ${extraClasses}`}
                key={channel.id}
              >
                {channel.data?.image && (
                  <img
                    src={channel.data.image}
                    alt=""
                    className="w-10 h-10 rounded-full object-center object-cover"
                  />
                )}
                <div className="text-ellipsis overflow-hidden whitespace-nowrap">
                  {channel.data?.name || channel.id}
                </div>
              </button>
            );
          })
        : "No Conversations found"}
      <hr className="border-gray-500 mt-auto" />
      <Button onClick={() => logout.mutate()} disabled={logout.isLoading}>
        Logout
      </Button>
    </div>
  );
}
