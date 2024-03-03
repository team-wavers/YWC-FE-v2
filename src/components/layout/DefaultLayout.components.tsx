import styled from "styled-components";

export const Components = {
    Container: styled.div`
        width: 100%;
        height: 100vh;
        margin: 0 auto;
    `,
    Header: {
        Container: styled.header`
            position: relative;
            top: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 120px;
        `,
        Title: styled.h1`
            text-align: center;
            font-size: 3rem;
            font-weight: 500;
            line-height: 4rem;
            color: ${({ theme }) => theme.black};
        `,
    },
    Main: styled.main`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
    `,
    Footer: styled.footer``,
};
