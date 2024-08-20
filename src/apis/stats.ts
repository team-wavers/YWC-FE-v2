import instance from "./base";

const statistics = {
    addClickCountByName: (storeName: string) =>
        instance().get(`rank/set?storeName=${storeName}`),
};

export { statistics };
