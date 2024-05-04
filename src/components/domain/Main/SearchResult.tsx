import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { highlightKeyword } from "@/utils/text-highlight";
import CloseIcon from "@/assets/icons/close-icon.svg";
import ArrowDownIcon from "@/assets/icons/arrow-down-icon.svg";
import DotPulseLoader from "@/components/common/DotPulseLoader";

type Props = {
    keyword: string;
    data:
        | {
              currentPage: number;
              maxPage: number;
              nextPage: number;
              result: IVoucher[];
          }[]
        | null;
    onClick: (voucher: IVoucher) => void;
    onClose: () => void;
    hasNextPage: boolean;
    pageHandler: () => void;
    status: { isFetchingNextPage: boolean; isFetching: boolean };
};

const SearchResult = ({
    keyword,
    data,
    onClick,
    onClose,
    hasNextPage,
    pageHandler,
    status,
}: Props) => {
    const listRef = useRef<HTMLUListElement | null>(null);
    const { isFetching, isFetchingNextPage } = status;

    useEffect(() => {
        if (listRef.current) listRef.current.scrollTo(0, 0);
    }, [keyword]);

    return (
        <Container>
            <CloseButton onClick={onClose}>
                <CloseIcon />
            </CloseButton>

            <VoucherListContainer ref={listRef}>
                {isFetching && !isFetchingNextPage ? (
                    <Item>
                        <DotPulseLoader color="#3498db" />
                    </Item>
                ) : (
                    data &&
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
                    )
                )}
                {data &&
                    data.length <= 0 &&
                    !isFetchingNextPage &&
                    !isFetching && <NoResult>검색 결과가 없습니다.</NoResult>}
                {hasNextPage && !isFetching && (
                    <Item>
                        <ShowMoreButton onClick={pageHandler}>
                            <ArrowDownIcon /> 더보기
                        </ShowMoreButton>
                    </Item>
                )}
                {isFetchingNextPage && (
                    <Item>
                        <DotPulseLoader color="#3498db" />
                    </Item>
                )}
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
    max-height: 300px;
    padding: 20px 0;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.white};
    box-shadow: 0px 3px 15px -2px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    z-index: 99;
    @media screen and (min-width: 768px) {
        max-height: 500px;
    }
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

const NoResult = styled.span`
    width: 100%;
    padding-left: 20px;
    text-align: left;
    font-size: 1.5rem;
    color: #ccc;
`;

const Item = styled(VoucherItem)`
    height: 50px;
    align-items: center;
`;

const ShowMoreButton = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    height: auto;
    border: none;
    outline: none;
    background-color: transparent;
    color: ${({ theme }) => theme.black};
`;

export default SearchResult;
