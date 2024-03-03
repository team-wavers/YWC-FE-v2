import React from "react";
import styled from "styled-components";
import { highlightKeyword } from "@/utils/text-highlight";
import CloseIcon from "@/assets/icons/close-icon.svg";

type Props = {
    keyword: string;
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
            <CloseButton onClick={onClose}>
                <CloseIcon />
            </CloseButton>
            <VoucherListContainer>
                {data &&
                    data.map(({ result }: { result: IVoucher[] }) =>
                        result.map((voucher: IVoucher) => {
                            return (
                                <VoucherItem
                                    onClick={() =>
                                        voucher.latitude && voucher.longitude
                                            ? onClick(voucher)
                                            : undefined
                                    }
                                    key={voucher._id}
                                    style={{
                                        cursor:
                                            !voucher.latitude ||
                                            !voucher.longitude
                                                ? "not-allowed"
                                                : undefined,
                                    }}
                                >
                                    <VoucherName>
                                        {voucher.latitude &&
                                        voucher.longitude ? (
                                            highlightKeyword(
                                                voucher.name,
                                                keyword,
                                            )
                                        ) : (
                                            <span
                                                style={{
                                                    fontSize: "inherit",
                                                    color: "#aaa",
                                                }}
                                            >
                                                {voucher.name}
                                            </span>
                                        )}
                                    </VoucherName>
                                    <VoucherAddress>
                                        {voucher.address || "주소 미제공"}
                                    </VoucherAddress>
                                </VoucherItem>
                            );
                        }),
                    )}
                {data.length <= 0 && <>검색 결과가 없습니다. :(</>}
                {observerRef}
            </VoucherListContainer>
        </Container>
    );
};

const Container = styled.div`
    position: relative;
    width: min(370px, calc(100% - 20px));
    height: auto;
`;

const VoucherListContainer = styled.ul`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    width: 100%;
    min-height: 50px;
    max-height: 500px;
    padding: 20px 0;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.white};
    box-shadow: 0px 3px 15px -2px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    z-index: 99;
`;

const CloseButton = styled.button`
    position: absolute;
    width: auto;
    right: 5px;
    top: 10px;
    background: transparent;
    outline: none;
    border: none;
    z-index: 999;
    & svg path {
        fill: ${({ theme }) => theme.black};
    }
`;

const VoucherItem = styled.li`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 8px;
    width: 100%;
    height: 45px;
    padding: 0 20px;
    cursor: pointer;
`;

const VoucherName = styled.span`
    width: 90%;
    font-size: 1.3rem;
    font-weight: 500;
`;

const VoucherAddress = styled.span`
    width: 90%;
    font-size: 1rem;
    line-height: 1.2rem;
    font-weight: 300;
    color: #aaa;
`;

export default SearchResult;
