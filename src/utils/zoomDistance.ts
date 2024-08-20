const getZoomDistance = (e: number) => {
    switch (e) {
        case 16:
            return 700;
        case 17:
            return 300;
        case 18:
            return 150;
        case 19:
            return 75;
        case 20:
            return 50;
        case 21:
            return 25;
        default:
            return 300;
    }
};

export default getZoomDistance;
