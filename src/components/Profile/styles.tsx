import styled from "styled-components";

export const ProfileContainer = styled.div<any>`
  --border-color: ${(props) => props.color || "black"};
  --profile-height: calc(var(--profile-width) * 60 / 45);
  --profile-halfheight: calc(var(--profile-height) * 0.5);

  width: var(--profile-width);
  height: var(--profile-height);
  background: white;
  position: relative;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: calc(var(--profile-width) / 6);
  border: var(--border-width) solid var(--border-color);
  text-align: center;
  overflow: hidden;

  div {
    width: var(--profile-width);
    height: var(--profile-halfheight);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .AvatarBox {
    justify-content: center;
    Button {
      width: calc(var(--profile-width) * 0.1);
      aspect-ratio: 1;
      position: absolute;
      right: calc(var(--profile-width) * 0.05);
      top: calc(var(--profile-width) * 0.05);
    }
  }

  .InfoBox {
    background: #d9d9d9;

    .Text {
      width: var(--profile-width);
      height: calc(var(--profile-halfheight) * 0.6);
      display: flex;
      flex-direction: column;
      justify-content: top;
      align-items: center;
      h1 {
        margin: calc(var(--profile-halfheight) * 0.05);
        height: calc(var(--profile-halfheight) * 0.2);
        font-size: calc(var(--profile-halfheight) * 0.2);
      }
      h3 {
        margin: 0;
        height: calc(var(--profile-halfheight) * 0.1);
        font-size: calc(var(--profile-halfheight) * 0.1);
      }
    }

    .Achievement {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }

    .Achievements {
      width: calc(var(--profile-width) * 0.15);
    }

    .Buttons {
      width: var(--profile-width);
      height: calc(var(--profile-halfheight) * 0.4);
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      padding-right: 3vw;
      padding-bottom: 1vw;
      Button {
        width: calc(var(--profile-width) * 0.2);
      }
    }
  }
`;

export const Avatar = styled.img`
  border-radius: 50%;
  border: var(--border-width) solid black;
  width: calc(var(--profile-width) * 0.55);
  aspect-ratio: 1;
  object-fit: cover;
`;
