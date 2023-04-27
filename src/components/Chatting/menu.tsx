import { Socket } from "socket.io-client";
import { ChannelInfo, MemberType } from "./interface";
import { useAdmin, useBan, useKick, useMute } from "../../hooks/mutation/chat";
import { ChatsMenuContainer } from "./styles";
import { useEffect } from "react";

const ChatMenu = ({
  userId,
  channelInfo,
  channelId,
  socket,
  setPopMenu,
}: {
  userId: string;
  channelInfo: ChannelInfo;
  channelId: string;
  socket: Socket | undefined;
  setPopMenu: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  const admin = useAdmin();
  const kick = useKick();
  const ban = useBan();
  const mute = useMute();
  const isMember = channelInfo.channelMembers
    ?.map((member) => String(member.userId) === userId)
    .includes(true);

  const onAdminOther = () => {
    admin.mutate({ id: channelId, user: userId, socket: socket });
    setPopMenu(false);
  };
  const onKickOther = () => {
    kick.mutate({ id: channelId, user: userId, socket: socket });
    setPopMenu(false);
  };
  const onBanOther = () => {
    ban.mutate({ id: channelId, user: userId, socket: socket });
    setPopMenu(false);
  };
  const onMuteOther = () => {
    mute.mutate({ id: channelId, user: userId, socket: socket });
    setPopMenu(false);
  };

  useEffect(() => {
    console.log(channelInfo.myType);
  });

  const OwnerRoll = (): JSX.Element => {
    return (
      <>
        <div onClick={onAdminOther}>- Grant Admin</div>
        <div onClick={onKickOther}>- Kick</div>
        <div onClick={onBanOther}>- Ban</div>
        <div onClick={onMuteOther}>- Mute</div>
        <div onClick={() => {}}>- See Profile</div>
      </>
    );
  };

  const AdminRoll = (): JSX.Element => {
    return (
      <>
        {channelInfo.channelMembers?.map((member) => {
          if (
            String(member.userId) === userId &&
            member.type === MemberType.OWNER
          )
            return <div>Channel Owner</div>;
          else if (String(member.userId) === userId)
            return (
              <>
                <div onClick={onKickOther}>Kick</div>
                <div onClick={onBanOther}>Ban</div>
                <div onClick={onMuteOther}>Mute</div>
              </>
            );
          return null;
        })}
      </>
    );
  };

  const MemberRoll = (): JSX.Element => {
    return (
      <>
        {channelInfo.channelMembers?.map((member) => {
          return String(member.userId) === userId
            ? {
                [MemberType.OWNER]: <div>Channel Owner</div>,
                [MemberType.ADMIN]: <div>Channel Administrator</div>,
                [MemberType.MEMBER]: <div>Channel Member</div>,
              }[member.type]
            : null;
        })}
      </>
    );
  };

  return (
    <ChatsMenuContainer>
      <div
        className="outMenu"
        onClick={() => {
          setPopMenu(false);
        }}
      ></div>
      <div className="InMenu">
        {isMember ? (
          {
            [MemberType.OWNER]: <OwnerRoll />,
            [MemberType.ADMIN]: <AdminRoll />,
            [MemberType.MEMBER]: <MemberRoll />,
          }[channelInfo.myType]
        ) : (
          <div>Out Member</div>
        )}
      </div>
    </ChatsMenuContainer>
  );
};

export default ChatMenu;
