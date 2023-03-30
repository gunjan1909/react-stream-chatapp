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

export function Home() {
  const { user, streamChat } = useLoggedInAuth();

  //is streamchat null, we show the loading indicatior(inbuilt in streamchat) while we authenticating/logging in the user to stream
  if (streamChat == null) return <LoadingIndicator />;

  return (
    //stream chat application
    <Chat client={streamChat}>
      {/* list of channels */}
      <ChannelList
        List={Channels}
        sendChannelsToList
        //filters={{ members: { $in: [user.id] } }}
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
  const { setActiveChannel, channel: activeChannel } = useChatContext();
  return <div className="w-60 flex flex-col gap-4 m-3 h-full"></div>;
}
