import { voucher } from "@/apis/voucher";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { v4 } from "uuid";

export const useVoucherInfQuery = (q: string) => {
    const { data, status, fetchNextPage, hasNextPage, refetch } =
        useInfiniteQuery({
            queryKey: ["ywc.voucherlist.infQuery", q, v4],
            queryFn: async ({ pageParam }) => {
                const response: AxiosResponse<GeneralResponse<IVoucher[]>> =
                    await voucher.getVouchersByKeyword({
                        q: q,
                        page: pageParam,
                        size: 10,
                    });

                return {
                    result: response.data.result.rows,
                    currentPage: pageParam,
                    nextPage: pageParam + 1,
                    maxPage: Math.ceil(response.data.result.count / 10),
                };
            },
            initialPageParam: 1,
            getNextPageParam: (lastPage) => {
                return lastPage.currentPage >= lastPage.maxPage
                    ? undefined
                    : lastPage.nextPage;
            },
            enabled: false,
            staleTime: Infinity,
            gcTime: 0,
        });

    return { data, status, fetchNextPage, hasNextPage, refetch };
};
