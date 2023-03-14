import React, { useCallback, useEffect, useState } from "react";
import loadable from "@loadable/component";
import { useNavigate, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import {
  Container,
  MainContainer,
  ProfileContainer,
  Button,
  Nav,
  Label,
  Input,
  Workspaces,
  WorkspaceButton,
  Div,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  HomeContainer,
} from "./styles";
import home from "../../assets/home.svg";
import game from "../../assets/game.svg";
import chat from "../../assets/chat.svg";
import logout from "../../assets/logout.svg";
import setting from "../../assets/setting.svg";
import { Window } from "../../components/Window/Window";

// const Channel = loadable(() => import('@pages/Channel'));
const Channel = loadable(() => import("../../pages/Channel/Channel"));

interface Profile {
  name: string;
  photo: Blob;
}

const Home = () => {
  // const value = `cookie : ${document.cookie}`;
  const awsUrl = import.meta.env.VITE_AWS_URL;
  const navigate = useNavigate();
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] =
    useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);

  const onClickCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal(true);
  }, []);

  const toggleTwoFactor = useCallback(() => {
    setTwoFactorEnabled(!twoFactorEnabled);
  }, [twoFactorEnabled]);

  const onCloseTwoFactorModal = useCallback(() => {
    setShowTwoFactorModal(false);
  }, []);

  const onOpenTwoFactorModal = useCallback(() => {
    setShowTwoFactorModal(true);
  }, []);

  const onClickHome = () => {
    window.location.reload();
  };

  useEffect(() => {
    const api = twoFactorEnabled ? "/2fa/turn-on" : "/2fa/turn-off";
    fetch(awsUrl + api, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        if (response.status === 200 && api === "/2fa/turn-on") {
          fetch(awsUrl + "/2fa/generate", {
            method: "GET",
            headers: { "Content-Type": "img/png" },
            credentials: "include",
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              if (
                response.status === 200 &&
                response.headers.get("Content-Type") === "img/png"
              ) {
                return response.blob();
              } else {
                throw new Error("Invalid QR code image response");
              }
            })
            .then((blob) => {
              const qrCodeImageUrl = URL.createObjectURL(blob);
              setQrCodeImage(qrCodeImageUrl);
            })
            .catch((error) => console.error("Error:", error));
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }, [twoFactorEnabled]);

  const onClickLogOut = () => {
    fetch(awsUrl + "/auth/logout", {
      method: "POST",
      credentials: "include",
    }).then((response) => {
      if (response.status === 200) {
        window.location.href = `${awsUrl}:5173/`;
      } else {
        throw new Error("Unexpected response status code");
      }
    });
  };

  // TODO : Workspace onClick함수들 Window컴포넌트안으로 넣기
  const onClickGame = () => {
    navigate("/game");
  };

  const onClickChat = () => {
    navigate("/chat");
  };

  const [profile, setProfile] = useState<Profile>({
    name: "",
    photo: new Blob(),
  });

  const fetchProfile = useCallback(async () => {
    setTwoFactorEnabled(false);
    try {
      const nameResponse = await fetch(`${awsUrl}/users`, {
        method: "GET",
        credentials: "include",
      });
      const user = await nameResponse.text();
      const userObj = JSON.parse(user);
      const name = userObj.nickname.replace(/\"/g, "");

      const photoResponse = await fetch(`${awsUrl}/users/avatar`, {
        method: "GET",
        credentials: "include",
      });
      const photo = await photoResponse.blob();

      setProfile({ name, photo });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }, [awsUrl]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // return (
  //   <>
  //     <Container>
  //       <Nav>○ ○ ○</Nav>
  //       <Div>
  //         <Workspaces>
  //           <WorkspaceButton onClick={onClickHome}>
  //             <img src={home}></img>
  //           </WorkspaceButton>
  //           <WorkspaceButton onClick={onClickGame}>
  //             <img src={game}></img>
  //           </WorkspaceButton>
  //           <WorkspaceButton onClick={onClickChat}>
  //             <img src={chat}></img>
  //           </WorkspaceButton>
  //           <WorkspaceButton onClick={onOpenTwoFactorModal}>
  //             <img src={setting}></img>
  //           </WorkspaceButton>
  //           <WorkspaceButton onClick={onClickLogOut}>
  //             <img src={logout}></img>
  //           </WorkspaceButton>
  //           <WorkspaceButton onClick={onClickCreateWorkspace}>
  //             +
  //           </WorkspaceButton>
  //         </Workspaces>
  //         <MainContainer>
  //           <Nav>○ ○ ○</Nav>
  //           <h1>전적 /</h1>
  //           <h1>승률 /</h1>
  //           <h1>친구 목록 등</h1>
  //           <Channel />
  //         </MainContainer>
  //         <ProfileContainer>
  //           <Nav>○ ○ ○</Nav>
  //           <h1>Profile</h1>
  //           <img
  //             src={URL.createObjectURL(profile.photo)}
  //             alt="Profile"
  //             style={{
  //               borderRadius: "60%",
  //               maxWidth: "100px",
  //               maxHeight: "100px",
  //             }}
  //           />
  //           <h2>{profile.name}</h2>
  //           <Channel />
  //         </ProfileContainer>
  //       </Div>
  //     </Container>

  //     {/* ==============[ MODAL ]============== */}
  //     {showCreateWorkspaceModal && (
  //       <Modal>
  //         <ModalContent>
  //           <ModalHeader>Create Workspace</ModalHeader>
  //           <ModalBody>
  //             <Label>Workspace Name</Label>
  //             <Input type="text" />
  //           </ModalBody>
  //           <ModalFooter>
  //             <Button>Create</Button>
  //             <Button onClick={() => setShowCreateWorkspaceModal(false)}>
  //               Cancel
  //             </Button>
  //           </ModalFooter>
  //         </ModalContent>
  //       </Modal>
  //     )}
  //     {showTwoFactorModal && (
  //       <Modal>
  //         <ModalContent>
  //           <ModalHeader>Two Factor Authentication</ModalHeader>
  //           <ModalBody>
  //             <Label>Enable two factor authentication:</Label>
  //             <Input
  //               type="checkbox"
  //               checked={twoFactorEnabled}
  //               onChange={toggleTwoFactor}
  //             />
  //             {qrCodeImage && <img src={qrCodeImage} />}
  //           </ModalBody>
  //           <ModalFooter>
  //             <Button onClick={onCloseTwoFactorModal}>Close</Button>
  //           </ModalFooter>
  //         </ModalContent>
  //       </Modal>
  //     )}
  //   </>
  // );

  /* 여기서부터 Window 적용 수정본 */
  return (
    <>
      <Window title="Home" sidebarToggle={true} background="gray">
        <HomeContainer>
          <Window title="Main" height="70%">
            <h1>전적 /</h1>
            <h1>승률 /</h1>
            <h1>친구 목록 등</h1>
            <Channel />
          </Window>
          <Window title="Profile" height="70%">
            <h1>Profile</h1>
            <img
              src={URL.createObjectURL(profile.photo)}
              alt="Profile"
              style={{
                borderRadius: "60%",
                maxWidth: "100px",
                maxHeight: "100px",
              }}
            />
          </Window>
        </HomeContainer>
      </Window>
      {showCreateWorkspaceModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>Create Workspace</ModalHeader>
            <ModalBody>
              <Label>Workspace Name</Label>
              <Input type="text" />
            </ModalBody>
            <ModalFooter>
              <Button>Create</Button>
              <Button onClick={() => setShowCreateWorkspaceModal(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {showTwoFactorModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>Two Factor Authentication</ModalHeader>
            <ModalBody>
              <Label>Enable two factor authentication:</Label>
              <Input
                type="checkbox"
                checked={twoFactorEnabled}
                onChange={toggleTwoFactor}
              />
              {qrCodeImage && <img src={qrCodeImage} />}
            </ModalBody>
            <ModalFooter>
              <Button onClick={onCloseTwoFactorModal}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
export default Home;
