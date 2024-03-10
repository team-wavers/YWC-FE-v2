import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Components } from "@/components/domain/Main/Main.components";
import { NaverMap } from "@/types/navermap";
import Script from "next/script";
import { voucher } from "@/apis/voucher";
import Marker from "@/components/domain/Main/Marker";
import SearchBox from "@/components/domain/Main/SearchBox";
import RefreshIcon from "@/assets/icons/refresh-icon.svg";
import LocationIcon from "@/assets/icons/location-icon.svg";
import ErrorIcon from "@/assets/icons/error-icon.svg";
import { getOverlapMarkers } from "@/utils/overlap-markers";
import { createOverlay } from "@/utils/Overlay";
import SearchResult from "@/components/domain/Main/SearchResult";
import DotPulseLoader from "@/components/common/DotPulseLoader";
import { useVoucherInfQuery } from "@/hooks/queries/infquery/useVoucherList";
import { useRouter } from "next/router";
import Link from "next/link";

const apiKey = process.env.NEXT_PUBLIC_NAVER_MAP_APIKEY;

const index = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<number | null>(null);
    const [mount, setMount] = useState<boolean>(false);
    const [coords, setCoords] = useState<{
        init: ICoord | null;
        temp: ICoord | null;
        client: ICoord | null;
    }>({ init: null, temp: null, client: null });
    const [markers, setMarkers] = useState<Array<IVoucher> | null>(null);
    const [overlapMarkers, setOverlapMarkers] = useState<Array<
        IVoucher[]
    > | null>(null); // 겹치는 마커 (마커 표시용)
    const [isCenterChanged, setIsCenterChanged] = useState<boolean>(false);
    const [selected, setSelected] = useState<IVoucher | null>(null);
    const [overlapPlaces, setOverlapPlaces] = useState<IVoucher[] | null>(null); //겹치는 장소 (오버레이 표시용)
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [expanded, setExpanded] = useState<boolean>(false);
    const mapRef = useRef<NaverMap | null>(null);
    const router = useRouter();
    const { data, fetchNextPage, hasNextPage, refetch, isFetchingNextPage } =
        useVoucherInfQuery(searchKeyword);

    // 맵 초기화
    const initializeMap = () => {
        const { init } = coords;
        if (init && !loading) {
            const mapOptions = {
                center: new window.naver.maps.LatLng(init.lat, init.lng),
                zoom: 16,
            };

            const map = new window.naver.maps.Map("map", mapOptions);
            mapRef.current = map;

            // 이벤트 최적화를 위한 center_changed 변경 -> touchend 및 mouseup event 사용
            mapRef.current.addListener("touchend", coordChangeHandler);
            mapRef.current.addListener("mouseup", coordChangeHandler);

            setMount(true);
        }
    };

    const coordChangeHandler = () => {
        const { client } = coords;
        const coord = mapRef.current?.getCenter() || null;
        if (client && coord) {
            if (client.lat !== coord.y || client.lng !== coord.x) {
                setIsCenterChanged(true);
                setCoords((prev) => ({
                    ...prev,
                    temp: {
                        lat: coord.y,
                        lng: coord.x,
                    },
                }));
            }
        }
    };

    // 지도 중심좌표 이동 시 데이터 refetch
    const refreshHandler = () => {
        setCoords({
            ...coords,
            client: coords.temp,
        });
        setIsCenterChanged(false);
        setSelected(null);
    };

    const searchHandler = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { value } = e.currentTarget[0] as HTMLInputElement;
        if (value && value.length >= 2) {
            if (value === "개발자들") {
                router.push(process.env.NEXT_PUBLIC_SERVICE_DOCUMENT_URL || "");
                return;
            }

            setExpanded(true);
            if (value !== searchKeyword) setSearchKeyword(value);
        }
    };

    const panToCenter = () => {
        const zoom = 16;
        if (coords.init) {
            setCoords({
                ...coords,
                client: coords.init,
            });
            mapRef.current?.morph(
                new naver.maps.LatLng(coords.init.lat, coords.init.lng),
                zoom,
                { easing: "easeInCubic" },
            );
            setIsCenterChanged(false);
        }
    };

    useEffect(() => {
        searchKeyword && refetch();
    }, [searchKeyword]);

    // 컴포넌트 마운트 시 현재 사용자 위치 가져옴
    useEffect(() => {
        setLoading(true);

        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
                (c) => {
                    setCoords({
                        ...coords,
                        init: {
                            lat: c.coords.latitude,
                            lng: c.coords.longitude,
                        },
                        client: {
                            lat: c.coords.latitude,
                            lng: c.coords.longitude,
                        },
                    });
                    setLoading(false);
                },
                (e: GeolocationPositionError) => {
                    setError(e.code);
                    console.error(
                        `An error occured while retrieving coordinates.: ${e.message}`,
                    );
                },
            );
        }
        return () => {
            mapRef.current?.destroy();
        };
    }, []);

    // 마커 정보 오버레이
    useEffect(() => {
        if (selected && mapRef.current) {
            const Overlay = createOverlay(
                `<div class="information">
                <button id="close-btn" class="close-btn"><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg></button>
                <span class="voucher-name">${selected.name}</span>
                <span class="voucher-category">${selected.category}</span>
                <span class="voucher-phone">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#222" d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z"/></svg>
                    ${selected.phone}
                </span>
                <span class="voucher-address">
                    <svg style="flex-shrink: 0;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#222" d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>
                    ${selected.address}
                </span>
            </div>
            <span class="tail"></span>`,
                () => null,
            );

            const info = new Overlay({
                position: new window.naver.maps.LatLng(
                    selected.latitude,
                    selected.longitude,
                ),
                map: mapRef.current,
            });

            document.getElementById("close-btn")?.addEventListener(
                "click",
                () => {
                    setSelected(null);
                    info.delMap();
                },
                {
                    once: true,
                },
            );

            document.getElementById("close-btn")?.addEventListener(
                "touchend",
                () => {
                    setSelected(null);
                    info.delMap();
                },
                {
                    once: true,
                },
            );

            mapRef.current.panTo(
                new window.naver.maps.LatLng(
                    selected.latitude,
                    selected.longitude,
                ),
                { duration: 300, easing: "easeOutCubic" },
            );

            return () => info.delMap();
        }
    }, [selected]);

    // 중복 마커 리스트
    useEffect(() => {
        if (overlapPlaces && mapRef.current) {
            const Overlay = createOverlay(
                `<div class="information">
                <button id="close-btn" class="close-btn"><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg></button>
                    <ul class="voucher-list">
                        ${overlapPlaces
                            .map((voucher) => {
                                return String(
                                    `<li class="voucher" data-id="${voucher._id}">${voucher.name}</li>`,
                                );
                            })
                            .join("")}
                        <li class="count">${overlapPlaces.length}개의 가맹점이 있습니다.</li>
                    </ul>
                </div>
                <span class="tail"></span>`,
                () =>
                    document.querySelectorAll("li.voucher").forEach((item) => {
                        const id = item.getAttribute("data-id");
                        item.addEventListener("click", () => {
                            setOverlapPlaces(null);
                            markers &&
                                setSelected(
                                    markers?.filter(
                                        (v) => String(v._id) === id,
                                    )[0],
                                );
                        });
                    }),
            );

            const places = new Overlay({
                position: new window.naver.maps.LatLng(
                    overlapPlaces[0].latitude,
                    overlapPlaces[0].longitude,
                ),
                map: mapRef.current,
            });

            document.getElementById("close-btn")?.addEventListener(
                "click",
                () => {
                    setOverlapPlaces(null);
                    places.delMap();
                },
                {
                    once: true,
                },
            );

            document.getElementById("close-btn")?.addEventListener(
                "touchend",
                () => {
                    setOverlapPlaces(null);
                    places.delMap();
                },
                {
                    once: true,
                },
            );

            mapRef.current.panTo(
                new window.naver.maps.LatLng(
                    overlapPlaces[0].latitude,
                    overlapPlaces[0].longitude,
                ),
                { duration: 300, easing: "easeOutCubic" },
            );

            return () => places.delMap();
        }
    }, [overlapPlaces]);

    // coords가 변경될 때마다 새롭게 데이터 fetch
    useEffect(() => {
        if (coords.client) {
            voucher
                .getVouchersByCoord({
                    lat: coords.client?.lat,
                    lng: coords.client?.lng,
                })
                .then(
                    ({ data }: { data: GeneralResponse<Array<IVoucher>> }) => {
                        if (data.code === 2000) {
                            setMarkers(data.result.rows);
                            setOverlapMarkers(
                                getOverlapMarkers(data.result.rows),
                            );
                        }
                    },
                )
                .catch((e) => console.log(e));
        }
    }, [coords.client]);

    if (error === 1) {
        return (
            <Components.Error.Container>
                <ErrorIcon width={48} />
                <Components.Error.Title>
                    에러가 발생했습니다.
                </Components.Error.Title>
                <Components.Error.ErrorMessage>
                    위치 수집 권한이 없습니다.
                </Components.Error.ErrorMessage>
                <Components.Error.ErrorMessage className="link">
                    <Link
                        style={{
                            fontSize: "inherit",
                            color: "inherit",
                        }}
                        href={process.env.NEXT_PUBLIC_SERVICE_FAQ_URL || ""}
                    >
                        문제가 발생했나요?
                    </Link>
                </Components.Error.ErrorMessage>
            </Components.Error.Container>
        );
    }
    if (loading && error === null) {
        return (
            <Components.Loader.Container>
                <DotPulseLoader color="#3498db" />
            </Components.Loader.Container>
        );
    } else {
        return (
            <>
                <Script
                    strategy="beforeInteractive"
                    type="text/javascript"
                    src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${apiKey}&callback=initMap`}
                    onReady={initializeMap}
                />

                {mount && (
                    <Components.Search.Container>
                        <SearchBox onSubmit={searchHandler} />
                        {expanded && searchKeyword && data && (
                            <>
                                <SearchResult
                                    keyword={searchKeyword}
                                    data={
                                        data.pages[0].result.length > 0
                                            ? data.pages
                                            : []
                                    }
                                    onClose={() => setExpanded(false)}
                                    hasNextPage={hasNextPage}
                                    pageHandler={fetchNextPage}
                                    isFetchingNextPage={isFetchingNextPage}
                                    onClick={(voucher: IVoucher) => {
                                        setExpanded(false);
                                        setSelected(voucher);
                                        setCoords({
                                            ...coords,
                                            client: {
                                                lat: voucher.latitude,
                                                lng: voucher.longitude,
                                            },
                                        });
                                        setIsCenterChanged(false);
                                    }}
                                />
                            </>
                        )}
                    </Components.Search.Container>
                )}
                <Components.Map.Container id="map">
                    {mount &&
                        mapRef &&
                        markers
                            ?.filter(
                                (vouchers) =>
                                    !overlapMarkers?.flat().includes(vouchers),
                            )
                            .map((marker) => {
                                return (
                                    <Marker
                                        key={marker._id}
                                        mapRef={mapRef.current || null}
                                        title={marker.name}
                                        onClick={() => {
                                            setOverlapPlaces(null);
                                            setSelected(marker);
                                        }}
                                        position={{
                                            lat: marker.latitude,
                                            lng: marker.longitude,
                                        }}
                                    />
                                );
                            })}
                    {mount &&
                        mapRef &&
                        overlapMarkers &&
                        overlapMarkers.map((marker) => {
                            return (
                                <Marker
                                    key={marker[0]._id}
                                    mapRef={mapRef.current || null}
                                    count={marker.length}
                                    onClick={() => {
                                        setOverlapPlaces(marker);
                                        setSelected(null);
                                    }}
                                    position={{
                                        lat: marker[0].latitude,
                                        lng: marker[0].longitude,
                                    }}
                                />
                            );
                        })}
                    {mount && isCenterChanged && (
                        <Components.Map.RefreshButtonContainer>
                            <Components.Map.RefreshButton
                                onClick={refreshHandler}
                            >
                                <RefreshIcon width={24} height={24} />
                                장소 재검색
                            </Components.Map.RefreshButton>
                        </Components.Map.RefreshButtonContainer>
                    )}
                    {mount && (
                        <Components.Map.CurrentLocationButton
                            onClick={() => panToCenter()}
                        >
                            <LocationIcon width={24} />
                        </Components.Map.CurrentLocationButton>
                    )}
                </Components.Map.Container>
            </>
        );
    }
};

export default index;
