import { useCallback, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import createRoomButtonUrl from '../../assets/smallButton/newChatRoomButton.svg';
import CreateRoomModal from '../Modal';

const roomsInfo = [
  { roomName: 'roomName1', owner: 'owner', status: 0 },
  { roomName: 'roomName2', owner: 'owner', status: 0 },
  { roomName: 'roomName3', owner: 'owner', status: 1 },
  { roomName: 'roomName4', owner: 'owner', status: 0 },
  { roomName: 'roomName5', owner: 'owner', status: 0 },
  { roomName: 'roomName6', owner: 'owner', status: 1 },
  { roomName: 'roomName7', owner: 'owner', status: 1 },
  { roomName: 'roomName8', owner: 'owner', status: 0 },
  { roomName: 'roomName9', owner: 'owner', status: 1 },
  { roomName: 'roomName10', owner: 'owner', status: 0 },
  { roomName: 'roomName11', owner: 'owner', status: 0 },
  { roomName: 'roomName12', owner: 'owner', status: 0 },
  { roomName: 'roomName13', owner: 'owner', status: 0 },
  { roomName: 'roomName14', owner: 'owner', status: 0 },
];

const ChatRoom = ({ Flex }) => {
  const [findRoomName, setFindRoomName] = useState('');
  const [filteredRooms, setFilteredRooms] = useState(roomsInfo);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');

  const onCloseModal = useCallback(() => {
    setShowCreateRoomModal(
      (prevShowCreateRoomModal) => !prevShowCreateRoomModal
    );
    setPassword('');
    setTitle('');
  }, []);

  const onCreateRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // mutateRoom({ title, max: 0, password, owner: user.username });
    roomsInfo.push({
      roomName: title,
      owner: 'owner',
      status: password ? 1 : 0,
    });
    setFilteredRooms(roomsInfo);
    onCloseModal();
  };

  const onSubmitRoomName = useCallback(
    (e) => {
      e.preventDefault();
      if (findRoomName.trim() === '') {
        setFilteredRooms(roomsInfo);
        setFindRoomName('');
        return;
      }
      const newFilteredRooms = roomsInfo.filter((v) => {
        return v.roomName === findRoomName.trimLeft();
      });
      setFilteredRooms(newFilteredRooms);
      setFindRoomName('');
    },
    [findRoomName]
  );

  const onChangeInput = (e) => {
    e.preventDefault();
    setFindRoomName(e.target.value);
    const newFilteredRooms = roomsInfo.filter((v) => {
      return v.roomName.includes(e.target.value.trimLeft());
    });
    setFilteredRooms(newFilteredRooms);
  };

  const onChangeTitle = (e: any) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const onChangePassword = (e: any) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return (
    <div
      style={{
        flex: Flex,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '2rem',
        border: '0.3rem solid black',
        padding: '1rem',
        background: 'white',
      }}
    >
      <form
        style={{
          flex: 1,
          width: '100%',
          display: 'flex',
          marginBottom: '1rem',
        }}
        onSubmit={onSubmitRoomName}
      >
        <input
          style={{
            flex: 9,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '2rem',
            border: '0.3rem solid black',
            padding: '1rem',
          }}
          onChange={onChangeInput}
          value={findRoomName}
        ></input>
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src="../src/assets/Search.svg"
            style={{ width: '3rem', marginRight: '1rem', cursor: 'pointer' }}
            onClick={onSubmitRoomName}
          />
        </div>
      </form>
      <div style={{ flex: 13 }}>
        <Scrollbars>
          {filteredRooms.map((roomInfo) => {
            return (
              <div
                style={{
                  width: '96%',
                  height: '10%',
                  borderRadius: '2rem',
                  border: '0.3rem solid black',
                  margin: '0.3rem 0',
                  padding: '0.1rem 7.9rem 3rem 1rem',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    height: '100%',
                  }}
                >
                  {roomInfo.status === 0 ? (
                    <img
                      src="../../public/padlock_opened.png"
                      style={{ height: '30%' }}
                    />
                  ) : (
                    <img
                      src="../../public/padlock_locked.png"
                      style={{ height: '30%' }}
                    />
                  )}
                </div>
                <div>{roomInfo.roomName}</div>
                <div>{roomInfo.owner}</div>
              </div>
            );
          })}
        </Scrollbars>
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button
          style={{
            padding: '0.5rem',
            borderRadius: '1rem',
            backgroundColor: '#4495F7',
            border: '0.3rem solid black',
          }}
          onClick={(e) => {
            e.preventDefault();
            setShowCreateRoomModal(
              (prevShowCreateRoomModal) => !prevShowCreateRoomModal
            );
          }}
        >
          <img
            src={createRoomButtonUrl}
            style={{
              width: '30px',
              height: '30px',
              maxWidth: '100%',
              maxHeight: '100%',
            }}
          />
        </button>
      </div>
      <CreateRoomModal
        show={showCreateRoomModal}
        onCloseModal={onCloseModal}
        showCloseButton
        showInfoButton
        tooltipText="비밀번호가 없는 방은 공개방입니다. 주의하도록 하세요"
      >
        <form onSubmit={onCreateRoom}>
          <div>
            <input
              type="text"
              name="title"
              placeholder="방 제목"
              value={title}
              onChange={onChangeTitle}
              style={{
                borderRadius: '2rem',
                border: '0.3rem solid black',
                backgroundColor: 'yellow',
                padding: '1rem',
                margin: '1rem',
              }}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="비밀번호(없으면 공개방)"
              value={password}
              onChange={onChangePassword}
              style={{
                borderRadius: '2rem',
                border: '0.3rem solid black',
                backgroundColor: 'yellow',
                padding: '1rem',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              margin: '1rem',
              padding: '0.5rem',
              borderRadius: '1rem',
              backgroundColor: '#64E469',
              border: '0.3rem solid black',
              width: '4rem',
              height: '4rem',
            }}
          >
            <img
              src={createRoomButtonUrl}
              style={{
                width: '30px',
                height: '30px',
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            />
          </button>
        </form>
      </CreateRoomModal>
    </div>
  );
};

export default ChatRoom;
