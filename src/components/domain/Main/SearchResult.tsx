import React from "react";
import styled from "styled-components";
import { highlightKeyword } from "@/utils/text-highlight";

type Props = {
    keyword: string;
    // vouchers: IVoucher[];
    data: {
        currentPage: number;
        maxPage: number;
        nextPage: number;
        result: IVoucher[];
    }[];
    onClick: (voucher: IVoucher) => void;
    onClose: () => void;
    observerRef: React.ReactNode;
};

const SearchResult = ({
    keyword,
    data,
    onClick,
    onClose,
    observerRef,
}: Props) => {
    return (
        <Container>
            <CloseButton onClick={onClose} />

            {data &&
                data.map(({ result }: { result: IVoucher[] }) =>
                    result.map((voucher: IVoucher) => {
                        return (
                            <VoucherItem
                                onClick={() => onClick(voucher)}
                                key={voucher._id}
                            >
                                <VoucherName>
                                    {highlightKeyword(voucher.name, keyword)}
                                </VoucherName>
                                <VoucherAddress>
                                    {voucher.address}
                                </VoucherAddress>
                            </VoucherItem>
                        );
                    }),
                )}
            {data.length <= 0 && <>검색 결과가 없습니다. :(</>}
            {observerRef}
        </Container>
    );
};

const Container = styled.ul`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    width: min(370px, calc(100% - 20px));
    min-height: 50px;
    max-height: 500px;
    padding: 20px 0;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.white};
    box-shadow: 0px 3px 15px -2px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const CloseButton = styled.button`
    position: absolute;
    width: 10px;
    right: 20px;
    top: 12px;
    background: transparent;
    outline: none;
    border: none;
    &:after {
        content: "✕";
        color: #222;
    }
`;

const VoucherItem = styled.li`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 8px;
    width: 100%;
    height: 40px;
    padding: 0 20px;
    cursor: pointer;
`;

const VoucherName = styled.span`
    font-size: 1.3rem;
    font-weight: 500;
`;

const VoucherAddress = styled.span`
    font-size: 1rem;
    font-weight: 300;
    color: #aaa;
`;

export default SearchResult;
