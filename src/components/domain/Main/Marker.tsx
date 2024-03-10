import { Marker, NaverMap, HTMLIcon } from "@/types/navermap";
import { useEffect } from "react";

interface Props {
    mapRef: NaverMap | null;
    position: { lat: number; lng: number };
    title?: string;
    count?: number;
    onClick?: () => void;
}

const Marker = ({ mapRef, position, title, count, onClick }: Props) => {
    useEffect(() => {
        let marker: Marker | null = null;
        const { lat, lng } = position;
        const markerIcon: HTMLIcon = {
            content: count
                ? `<div style="position: relative; width: auto; height: auto; z-index: 99;"><img src="/assets/icons/marker-icon.svg" /><div style="display: flex; align-items: center; justify-content: center; position: absolute; top: -5px; right: 0; width:15px; height:15px; border-radius: 30px; background-color: rgb(201,78,63); color: white; font-size: 1rem; font-weight: 900;">${count}</div></div>`
                : `<img src="/assets/icons/marker-icon.svg"/>`,
            anchor: new naver.maps.Point(12, 24),
        };

        if (mapRef) {
            const markerOptions = {
                map: mapRef,
                position: new naver.maps.LatLng(lat, lng),
                icon: markerIcon,
            };
            marker = new naver.maps.Marker(markerOptions);
            title && marker.setTitle(title);
        }

        marker &&
            onClick &&
            naver.maps.Event.addListener(marker, "click", onClick);

        return () => marker?.setMap(null);
    }, [mapRef]);

    return null;
};

export default Marker;
