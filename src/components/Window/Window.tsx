import home from "../../assets/home.svg";
import game from "../../assets/game.svg";
import chat from "../../assets/chat.svg";
import logout from "../../assets/logout.svg";
import setting from "../../assets/setting.svg";
import {
  Container,
  Container__Body,
  Container__Topbar,
  DotThreeContainer,
  WorkspaceButton,
} from "./styles";

export const Window = ({
  children,
  title,
  sidebarToggle,
  width,
  height,
  max_width,
  min_width,
  max_height,
  min_height,
  background,
}: any): JSX.Element => {
  return (
    <Container
      width={width}
      height={height}
      max_width={max_width}
      min_width={min_width}
      max_height={max_height}
      min_height={min_height}
      background={background}
    >
      <Container__Topbar>
        <DotThree />
        <p>{title}</p>
      </Container__Topbar>

      <Container__Body>
        <div className="children">{children}</div>

        {sidebarToggle && (
          <div className="sidebar">
            <WorkspaceButton>
              <img src={home}></img>
            </WorkspaceButton>
            <WorkspaceButton>
              <img src={game}></img>
            </WorkspaceButton>
            <WorkspaceButton>
              <img src={chat}></img>
            </WorkspaceButton>
            <WorkspaceButton>
              <img src={setting}></img>
            </WorkspaceButton>
            <WorkspaceButton>
              <img src={logout}></img>
            </WorkspaceButton>
          </div>
        )}
      </Container__Body>
    </Container>
  );
};

const DotThree = (): JSX.Element => {
  return (
    <DotThreeContainer>
      <div className="outer">
        <div className="dot red"></div>
        <div className="dot amber"></div>
        <div className="dot green"></div>
      </div>
    </DotThreeContainer>
  );
};
