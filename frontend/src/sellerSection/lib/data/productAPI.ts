


import { domain } from "../../../lib/utils/domain";

export async function getAllProductsBySeller() {

    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
        return "You need to login first";
    }

    try {

        const response = await fetch(`${domain}/seller/products`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });

        const parsedResponse = await response.json();

        if (response.status === 401) {
            return "You need to login first";
        }

        if (response.status === 200) {
            return parsedResponse;
        }

        throw new Error("Something went wrong");

    } catch (error) {

        if (error instanceof Error) {
            return error.message;
        }

        return "Couldn't fetch Products";
    }
}