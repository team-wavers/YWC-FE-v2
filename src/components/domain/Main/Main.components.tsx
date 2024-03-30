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
        ErrorMessage: styled.span`
            font-size: 1.5rem;
            font-weight: 300;
            color: ${({ theme }) => theme.black};
            &.link {
                color: #ccc;
                margin-top: 20px;
                &:hover {
                    color: ${({ theme }) => theme.primary};
                }
            }
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
            height: 100vh;
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
                align-items: center;
                justify-content: center;
                background: linear-gradient(
                    0deg,
                    rgb(100 134 156 / 70%) 0%,
                    rgba(255, 255, 255, 0) 100%
                );
            }
        `,
        RefreshButton: styled.button`
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 10px;
            width: 160px;
            height: 45px;
            padding: 10px;
            border: none;
            border-radius: 16px;
            outline: none;
            font-size: 1.3rem;
            color: #fff;
            background-color: #3498db;
            box-shadow: 0px 10px 20px 1px rgb(42 109 153 / 75%);
            & svg path {
                fill: #fff;
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
        MenuButton: styled.button<{ $expanded: boolean }>`
            position: fixed;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            right: 20px;
            bottom: 80px;
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
            ${({ $expanded }) => $expanded && `box-shadow: none;`}
        `,
        MenuContainer: styled.ul`
            position: fixed;
            right: 20px;
            bottom: 80px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
            width: 200px;
            min-height: 30px;
            padding: 10px 0;
            border-radius: 20px;
            background-color: ${({ theme }) => theme.white};
            box-shadow: 0px 3px 15px -2px rgba(0, 0, 0, 0.1);
            z-index: 9999;
        `,
        MenuItemContainer: styled.li`
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
            height: 30px;
            padding: 0px 10px;
        `,
        MenuItem: styled.button`
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            background-color: transparent;
            font-size: 1.25rem;
        `,
    },
};
