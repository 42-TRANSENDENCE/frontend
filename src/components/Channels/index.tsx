import { useCallback, useEffect, useState } from 'react';
import { Socket } from "socket.io-client";
import { Scrollbars } from 'react-custom-scrollbars';
import { useAllChannels } from '../../hooks/query/chat';
import { useCreatChannel, CreateChannelData } from '../../hooks/mutation/chat';
import { ChannelContainer, ChannelList, Input, SearchChannel, Header } from './styles';
import { SmallButton } from '../../components/Button';
import Modal from '../Modal';
import searchButton from '../../assets/Search.svg';
import createChannelButton from '../../assets/smallButton/newChatRoomButton.svg';

export enum ChannelStatus {
  PUBLIC = 'PUBLIC',
  PROTECTED = 'PROTECTED',
  PRIVATE = 'PRIVATE'
}

export interface ChannelInfo {
  id: number;
  title: string;
  owner: number;
  status: ChannelStatus;
  createdAt: string;
  updatedAt: string;
}

export const Channels = ({ socket }: { socket: Socket | undefined }) => {
  const createChannel = useCreatChannel();
  const allChannels: ChannelInfo[] = useAllChannels().data;
  const [title, setTitle] = useState('');
  const [password, setPassword]= useState('');
  const [findChannelName, setFindChannelName] = useState('');
  const [filteredChannels, setFilteredChannels] = useState(allChannels);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);

  useEffect(() => {
    if (allChannels && findChannelName === '')
      setFilteredChannels(allChannels);
  }, [allChannels]);

  const onSubmitChannelName = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (findChannelName.trim() === '') {
      setFilteredChannels(allChannels);
      setFindChannelName('');
      return;
    }
    const newFilteredChannels = allChannels.filter((channel: ChannelInfo) => {
      return channel.title === findChannelName.trimStart();
    });
    setFilteredChannels(newFilteredChannels);
    setFindChannelName('');
  }, [allChannels, findChannelName]);

  const onChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFindChannelName(e.target.value);
    const newFilteredChannels = allChannels.filter((channel: ChannelInfo) => {
      return channel.title.includes(e.target.value.trimStart());
    });
    setFilteredChannels(newFilteredChannels);
  }, [allChannels]);

  const onEnterEvent = useCallback((e: any) => {
    e.preventDefault();
  }, []);

  const onNewChannel = useCallback(async (data: any) => {

  }, []);

  const onRemoveChannel = useCallback(async (data: any) => {

  }, []);

  const onClickCreatChennel = useCallback(() => {
    setShowCreateChannelModal(true);
  }, []);

  const onCloseCreateChannelModal = useCallback(() => {
    setShowCreateChannelModal(false);
    setPassword('');
    setTitle('');
  }, []);

  const onChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitle(e.target.value);
  }, [title]);

  const onChangePassowrd = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  }, [password]);

  const onSubmitCreateChannel = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: CreateChannelData = {
      title: title,
      password: password,
    }
    createChannel.mutate(data);
    onCloseCreateChannelModal();
  }, [createChannel]);

  useEffect(() => {
    socket?.on('newRoom', onNewChannel);
    socket?.on('removeChannel', onRemoveChannel);
    return () => {
      socket?.off('newChannel', onNewChannel);
      socket?.off('removeChannel', onRemoveChannel);
    };
  }, [onNewChannel, onRemoveChannel]);

  return (
    <ChannelContainer>
      <Header>Channels</Header>
      <SearchChannel onSubmit={onSubmitChannelName}>
        <input title='searchInput' onChange={onChangeInput} value={findChannelName} />
        <SmallButton img_url={searchButton} type='submit' />
        <SmallButton img_url={createChannelButton} onClick={onClickCreatChennel} />
      </SearchChannel>
      <ChannelList>
        <Scrollbars autoHide>
          {filteredChannels?.map((channelInfo: ChannelInfo) => {
            return (
              <div
                className='eachChannel'
                data-id={channelInfo.id}
                // data-password={channelInfo.status === ChannelStatus.PROTECTED ? 'true' : 'false'}
                key={channelInfo.id}
                onClick={onEnterEvent}
              >
                <div>
                  {channelInfo.status === ChannelStatus.PROTECTED ? (
                    <img
                    src='./../../public/padlock_locked.png'
                    alt='padlock_locked'
                  />
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  {channelInfo.title.length > 20
                    ? channelInfo.title.slice(0, 20) + '...'
                    : channelInfo.title}
                </div>
                <div>{channelInfo.owner}</div>
              </div>
            )
          })}
        </Scrollbars>
      </ChannelList>
      <Modal
        show={showCreateChannelModal}
        onCloseModal={onCloseCreateChannelModal}
        showCloseButton
        showInfoButton
        tooltipText='If you do not set password, public channel will be created.'
      >
        <form onSubmit={onSubmitCreateChannel}>
          <div>
            <Input 
              type='text'
              name='title'
              placeholder='Channel Name'
              value={title}
              onChange={onChangeTitle}
            />
          </div>
          <div>
            <Input 
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={onChangePassowrd}
            />
          </div>
          <SmallButton img_url={createChannelButton} type='submt' />
        </form>
      </Modal>
    </ChannelContainer>
  )
}


export const MyChannels = ({ socket }: { socket: Socket | undefined }) => {
  // const myChannels: ChannelInfo[] = useMyChannels().data;

  return (
    <ChannelContainer>
      <Header>Chats</Header>
      <ChannelList>
        <Scrollbars autoHide>

        </Scrollbars>
      </ChannelList>
    </ChannelContainer>
  )
}
