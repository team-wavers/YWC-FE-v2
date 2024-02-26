import styled from "styled-components";

export const Components = {
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
            width: auto;
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
            right: 20px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
            height: auto;
            padding: 20px;
            z-index: 999;
            @media screen and (max-width: 767px) {
                width: 100%;
                right: 0;
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

            & svg path {
                fill: ${({ theme }) => theme.white};
            }
        `,
    },
};
