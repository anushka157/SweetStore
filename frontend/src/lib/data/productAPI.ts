import { domain } from "../utils/domain";

// export async function getProductById(productId: string) {
//     try{
//         const response = await fetch(`${domain}/product/detail/${productId}`)
//         const parsedResponse = await response.json();
//         if(parsedResponse.error) {
//             throw new Error(parsedResponse.error)
//         }
//         return parsedResponse;

//     } catch (error){
//         if(error instanceof Error) {
//             return error.message
//         }
//         return "Something went wrong"
//     }
// }

export async function getAllProducts(pageNo: number) {
    try{

        const response = await fetch(`${domain}/all-products/${pageNo}`)
        const parsedResponse = await response.json();
        
        if(parsedResponse.error) {
            throw new Error(parsedResponse.error)
        }
        return parsedResponse;

    } catch (error) {
        if(error instanceof Error) {
            return "Backend Error: " + error.message;
        }
        return "Something went wrong"
    }
}

// export async function getAllProductsBySeller() {
//     const jwtToken = localStorage.getItem("jwtToken");

//     if (!jwtToken) {
//         return "You need to login first";
//     }

//     try {
//         const response = await fetch(`${domain}/seller/products`, {
//             headers: {
//                 Authorization: `Bearer ${jwtToken}`,
//             },
//         });

//         const parsedResponse = await response.json();

//         console.log("SELLER PRODUCTS STATUS =", response.status);
//         console.log("SELLER PRODUCTS RESPONSE =", parsedResponse);

//         if (response.status === 401) {
//             return "You need to login first";
//         }

//         if (response.status === 200) {
//             return parsedResponse;
//         }

//         throw new Error("Something went wrong");

//     } catch (error) {
//         console.log("SELLER PRODUCTS ERROR =", error);

//         if (error instanceof Error) {
//             return error.message;
//         }

//         return "Couldn't fetch Products";
//     }
// }
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

       console.log(
    "SELLER PRODUCT FIRST ITEM JSON =",
    JSON.stringify(parsedResponse.allProductByIdResults?.[0], null, 2)
);
        console.log(
            "SELLER PRODUCTS STATUS =",
            response.status
        );

        console.log(
            "SELLER PRODUCTS RESPONSE =",
            parsedResponse
        );

        if (response.status === 401) {
            return "You need to login first";
        }

        if (response.status === 200) {
            return parsedResponse;
        }

        throw new Error("Something went wrong");

    } catch (error) {
        console.log("SELLER PRODUCTS ERROR =", error);

        if (error instanceof Error) {
            return error.message;
        }

        return "Couldn't fetch Products";
    }
}
export async function getProductById(productId: string) {
    try {
        const response = await fetch(
            `${domain}/product/detail/${productId}`
        );

        const parsedResponse = await response.json();

        if (parsedResponse.error) {
            throw new Error(parsedResponse.error);
        }

        return parsedResponse;
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        }

        return "Something went wrong";
    }
}