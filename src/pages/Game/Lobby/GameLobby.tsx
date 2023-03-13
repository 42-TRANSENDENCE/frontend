import '../styles/GameLobby.css'
import { useEffect } from 'react'
import FriendList from './FriendList'
import PlayerProfile from './PlayerProfile'
import JoinButton from './JoinButton'
import { LobbyContainer, LobbySeperator, LobbyLeft, LobbyRight } from './styles'

export const GameLobby = (props : any) => {
  const game_socket = props.socket;

  useEffect(() => {
    console.log("GameLobby 입장");
    return () => {
      console.log("GameLobby 나감");
    }
  }, [])

  //return (
  //  <LobbyContainer>

  //    <div className='home__left'>
  //      <FriendList
  //        socket={game_socket}
  //      />
  //    </div>
      
  //    <div className='home__seperator'/>
      
  //    <div className='home__right'>
  //      <PlayerProfile/>
  //      <LobbySeperator/>
  //      <JoinButton 
  //        socket={game_socket}
  //      />
  //    </div>
  //  </LobbyContainer>
  //)
  return (
    <LobbyContainer>
      <LobbyLeft>

      </LobbyLeft>

      <LobbySeperator/>
      
      <LobbyRight>

      </LobbyRight>
    </LobbyContainer>
  )
}
