export type User = {
    _id: string;
    email: string;
    name: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    country: string;
};

export type MenuItem = {
    _id: string;
    name: string;
    price: number;
};

export type Restaurant = {
    _id: string;
    user: string;
    restaurantName: string;
    suburb: string;
    city: string;
    country: string;
    deliFee: number;
    estiDeliTime: number;
    dishes: string[];
    menuItems: MenuItem[];
    imageUrl: string;
    lastUpdated: string;
};

export type RestaurantSearchResponse = {
    data: Restaurant[];
    pagination: {
        totalResta: number;
        page: number;
        pages: number;
    }
};