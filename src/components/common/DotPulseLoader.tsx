import React from "react";
import styled, { keyframes } from "styled-components";

const DotPulseLoader = ({ color }: { color: string }) => {
    return (
        <Container color={color}>
            <Dot />
        </Container>
    );
};

const Pulse = keyframes`
    0%,
    100% {
        transform: scale(0);
    }

    50% {
        transform: scale(1);
    }  
`;

const Container = styled.div<{ color: string }>`
    --uib-size: 43px;
    --uib-color: ${({ color }) => color};
    --uib-speed: 1.3s;
    --uib-dot-size: calc(var(--uib-size) * 0.24);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--uib-dot-size);
    width: var(--uib-size);
    &::before,
    &::after {
        content: "";
        display: block;
        height: var(--uib-dot-size);
        width: var(--uib-dot-size);
        border-radius: 50%;
        background-color: var(--uib-color);
        transform: scale(0);
        transition: background-color 0.3s ease;
    }
    &::before {
        animation: ${Pulse} var(--uib-speed) ease-in-out
            calc(var(--uib-speed) * -0.375) infinite;
    }
    &::after {
        animation: ${Pulse} var(--uib-speed) ease-in-out
            calc(var(--uib-speed) * -0.125) infinite;
    }
`;

const Dot = styled.div`
    content: "";
    display: block;
    height: var(--uib-dot-size);
    width: var(--uib-dot-size);
    border-radius: 50%;
    background-color: var(--uib-color);
    transform: scale(0);
    transition: background-color 0.3s ease;
    animation: ${Pulse} var(--uib-speed) ease-in-out
        calc(var(--uib-speed) * -0.25) infinite both;
`;

export default DotPulseLoader;
