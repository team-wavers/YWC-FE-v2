import styled from "styled-components";

export const Components = {
    Error: {
        Container: styled.div`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 10px;
            width: 100%;
            height: 100vh;
            background-color: ${({ theme }) => theme.white};
            & svg path {
                fill: ${({ theme }) => theme.black};
            }
        `,
        Title: styled.h1`
            font-size: 2rem;
            font-weight: 500;
            color: ${({ theme }) => theme.black};
            margin: 10px 0;
        `,
        ErorrMessage: styled.span`
            font-size: 1.5rem;
            font-weight: 300;
            color: ${({ theme }) => theme.black};
        `,
    },
    Loader: {
        Container: styled.div`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100vh;
            background-color: ${({ theme }) => theme.white};
        `,
    },
    Search: {
        Container: styled.div`
            position: fixed;
            top: 0;
            left: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 12px;
            width: min(500px, calc(100% - 20px));
            height: auto;
            margin-bottom: 40px;
            padding: 30px 40px;
            z-index: 999;
            @media screen and (max-width: 767px) {
                width: 100%;
                height: auto;
                padding: 0;
                padding-top: 20px;
            }
        `,
    },
    Map: {
        Container: styled.div`
            width: 100%;
            height: 100%;
            background-color: black;
        `,
        RefreshButtonContainer: styled.div`
            position: fixed;
            bottom: 0;
            left: 20px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
            height: auto;
            padding: 20px;
            z-index: 99;
            @media screen and (max-width: 767px) {
                width: 100%;
                left: 0;
                bottom: 20px;
                align-items: center;
                justify-content: center;
            }
        `,
        RefreshButton: styled.button`
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 10px;
            width: 200px;
            height: 60px;
            border: none;
            border-radius: 20px;
            outline: none;
            font-size: 2rem;
            color: ${({ theme }) => theme.white};
            background-color: ${({ theme }) => theme.primary};
            box-shadow: 0px 3px 15px -2px rgba(0, 0, 0, 0.1);
            & svg path {
                fill: ${({ theme }) => theme.white};
            }
        `,
        CurrentLocationButton: styled.button`
            position: fixed;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            right: 20px;
            bottom: 20px;
            width: 50px;
            height: 50px;
            border: none;
            border-radius: 20px;
            outline: none;
            background-color: ${({ theme }) => theme.white};
            box-shadow: 0px 3px 15px -2px rgba(0, 0, 0, 0.1);
            z-index: 9999;
            & svg path {
                fill: ${({ theme }) => theme.black};
            }
        `,
    },
};
