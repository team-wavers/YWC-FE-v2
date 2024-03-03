import React, { SyntheticEvent } from "react";
import styled from "styled-components";
import MagnifierIcon from "@/assets/icons/magnifier-icon.svg";

type Props = {
    onSubmit: (e: SyntheticEvent<HTMLFormElement>) => void;
};

const SearchBox = ({ onSubmit }: Props) => {
    return (
        <FormContainer onSubmit={onSubmit}>
            <Input placeholder="검색어를 입력하세요. (ex: 순천)" />
            <Button type="submit">
                <MagnifierIcon fill={"#fff"} />
            </Button>
        </FormContainer>
    );
};

const Input = styled.input`
    width: 300px;
    height: 50px;
    border: none;
    border-radius: 10px 0 0 10px;
    outline: none;
    padding: 0 15px;
    color: ${({ theme }) => theme.black};
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: min(370px, calc(100% - 30px));
    height: 50px;
    border-radius: 10px;
    box-shadow: 0px 3px 15px -2px rgba(0, 0, 0, 0.1);
    transition: all 0.15s ease-in-out;
    &:focus-within {
        transform: scale(1.04) translateY(-4px);
        box-shadow: 0px 4px 20px -2px rgba(0, 0, 0, 0.15);
    }
`;

const Button = styled.button`
    width: 70px;
    height: 50px;
    border: none;
    border-radius: 0 10px 10px 0;
    outline: none;
    background-color: ${({ theme }) => theme.primary};
`;

export default SearchBox;
