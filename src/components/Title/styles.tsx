import styled from 'styled-components'

export const TitleContainer = styled.div `
    width: 100%;
    height: 100%;
    background: white;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2rem;
    border: 0.3rem solid black;
    img {
        width: 3rem;
    }
    img.HomeButton {
        position: absolute;
        left: 1rem;
    };

    img.SearchButton {
        position: absolute;
        right: 1rem;
    };
`