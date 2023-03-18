import styled from 'styled-components';

export const Box = styled.button`
    --w: min(max(30vw, 200px), 600px);
    width: var(--w);
    border-radius : calc(var(--w) * 50 / 600);
    border: calc(var(--w) * 10 / 600) solid black;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    overflow: hidden;
    img {
        width: 100%;
        margin: 0;
    };
    cursor: pointer;

    &:hover {
    opacity: 0.9;
    transform: scale(0.98);
    };

    &:active {
        opacity: 0.4;
    };
`