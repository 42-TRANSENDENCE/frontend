import styled from 'styled-components';

export const Container = styled.div`
  width: var(--page-width);
  height: var(--page-height);
  padding: var(--html-padding-vertical) var(--html-padding-horizontal);
  display: flex;
  flex-direction: column;
  gap: var(--html-padding-vertical);
  justify-content: top;
  align-items: center;

  .Title {
    width: var(--title-width);
    height: var(--title-height);

    display: flex;
    flex-direction: column;
    justify-content: top;
  }

  .BodyOuter {
    width: var(--body-width);
    height: var(--body-height);
    display: flex;
    align-items: top;
    justify-content: top;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none; // 크롬, 사파리, 오페라, 엣지
    }
  }

  .Body {
    --body-height: max(
      calc(
        var(--page-height) - 1 * var(--title-height) - 3 *
          var(--html-padding-vertical)
      ),
      calc(var(--body-width) * (9 / 16))
    );
    width: var(--body-width);
    height: var(--body-height);

    display: flex;
    justify-content: space-between;
    align-items: top;
    flex-direction: row;
    overflow: hidden;

    .Section {
      --section-width: calc(
        var(--body-width) * 0.33 - var(--html-padding-horizontal)
      );
      width: var(--section-width);
      height: var(--body-height);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .LeftSide {
    }

    .MiddleSide {
      --section-width: calc(var(--body-width) * 0.34);
      width: var(--section-width);
      gap: var(--html-padding-vertical);
      .BigButtons {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: var(--html-padding-vertical);
        Button {
          width: calc(var(--section-width) * 0.9);
          border: var(--border-width) solid black;
        }
      }

      .MidiumButtons {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: var(--html-padding-horizontal);
        Button {
          width: calc(var(--section-width) * 0.35);
          border: var(--border-width) solid black;
        }
      }
    }

    .RightSide {
      gap: var(--html-padding-vertical);
      .Profile {
        --w: calc(var(--section-width) * 0.8);
        width: var(--w);
      }
      .Notification {
        --w: calc(var(--section-width) * 0.95);
        --h: calc(var(--w) * 0.2);
        width: var(--w);
        height: var(--h);
        background: white;
        border-radius: calc(var(--h) / 3);
        border: var(--border-width) solid black;
        text-align: center;
        margin-top: 2rem;
      }
    }
  }
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  & > span {
    font-size: 20px;
    font-weight: 800;
    cursor: pointer;
    // line-height: 1.46666667;
  }
`;

export const Input = styled.input`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 20px;
  width: 24px;
  height: 24px;
  appearance: none;
  background-color: rgba(var(--sk_primary_background, 255, 255, 255), 1);
  border-radius: 4px;
  border: 1px solid rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:checked {
    background-color: rgba(var(--sk_highlight, 18, 100, 163), 1);
    border: 1px solid rgba(var(--sk_highlight, 18, 100, 163), 1);
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(var(--sk_highlight, 18, 100, 163), 0.5);
  }
  &:before {
    content: '';
    position: absolute;
    display: none;
    left: 5px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
  &:checked:before {
    display: block;
  }
`;

export const InputName = styled.input`
  display: flex;
  margin: 0 auto;
  margin-right: 1rem;
  border-radius: 4px;
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  border: 1px solid var(--saf-0);
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;
  width: 50%;
  color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);
  background-color: rgba(var(--sk_primary_background, 255, 255, 255), 1);
  padding: 18px;
  height: 30px;
  padding-top: 11px;
  padding-bottom: 13px;
  font-size: 12px;
  transition: 0.4s;
  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
    width: 60%;
  }
`;

export const Avatar = styled.img`
  border-radius: 50%;
  border: 0.3rem solid black;
  width: 55%;
  height: 55%;
  aspect-ratio: 1;
`;
