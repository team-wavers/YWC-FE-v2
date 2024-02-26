import React from "react";
import styled from "styled-components";

const CommonButton = ({ children }: { children: React.ReactNode }) => {
    return <Container>{children}</Container>;
};

const Container = styled.button`
    width: 100px;
    height: 50px;
`;

export default CommonButton;
