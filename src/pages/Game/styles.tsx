import styled from 'styled-components'
import triangle from '../../assets/triangle.svg'

export const GameContainer = styled.div `
  width: var(--page-width);
  height: var(--page-height);
  padding: var(--html-padding-vertical) var(--html-padding-horizontal);
  display: flex;
  flex-direction: column;
  gap: var(--html-padding-vertical);
  /* justify-content: top; */
  align-items: center;

  .Title, .Footer{
    width: var(--title-width);
    height: var(--title-height);

    display: flex;
    flex-direction: column;
    justify-content: top;
  }
  .Body{
    --body-height: calc(var(--page-height) - 2*var(--title-height) - 4*var(--html-padding-vertical));
    width: var(--body-width);
    height: var(--body-height);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .Footer{
    transform: rotate(180deg)
  }

`
