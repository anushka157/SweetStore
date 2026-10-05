import { CartItem } from "../types/cartTypes";
import { Customer } from "../types/customerTypes";
import { domain } from "../utils/domain";


export async function registerCustomer(data: Record<string, FormDataEntryValue>) {
    const body = JSON.stringify(data)
    try {
        const response = await fetch(`${domain}/customer/register`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        })
        const parsedResponse = await response.json();
        if(response.status === 201) {
            return parsedResponse
        } else {
            return parsedResponse.error
        }

    } catch(error ) {
        return "Registration fail"
    }
}

// export async function loginCustomer(formData: FormData) :Promise<{ error?: string; message?: string }> {
//     try {
//         const response = await fetch(`${domain}/customer/login`,{
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json", // Ensure the server knows you're sending JSON
//             },
//             body: JSON.stringify({
//                 email: formData.get("email"),
//                 password: formData.get("password")
//             })
//         })
    
//         const parsedResponse = await response.json();
//         if(parsedResponse.error) {
//             return {
//                 error: parsedResponse.error
//             }
//         }
//         const jwtCustomerToken = parsedResponse.jwtCustomerToken
//         localStorage.setItem('jwtCustomerToken', JSON.stringify(jwtCustomerToken))
//         return {
//             message: parsedResponse.message
//         }
//     } catch (error) {
//         return {error: "Something went wrong"}
//     }
    
// }

export async function loginCustomer(
    formData: FormData
): Promise<{ error?: string; message?: string }> {
    try {
        const response = await fetch(`${domain}/customer/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: formData.get("email"),
                password: formData.get("password")
            })
        });

        console.log("LOGIN STATUS =", response.status);

        const parsedResponse = await response.json();

        console.log("LOGIN RESPONSE =", parsedResponse);

        if (parsedResponse.error) {
            return {
                error: parsedResponse.error
            };
        }

        console.log(
            "CUSTOMER TOKEN RECEIVED =",
            parsedResponse.jwtCustomerToken
        );

        const jwtCustomerToken = parsedResponse.jwtCustomerToken;

        if (!jwtCustomerToken) {
            console.log("❌ NO CUSTOMER TOKEN RECEIVED");
            return {
                error: "Customer token was not received from server"
            };
        }

        // localStorage.setItem(
        //     "jwtCustomerToken",
        //     JSON.stringify(jwtCustomerToken)
        // );
        localStorage.setItem(
    "jwtCustomerToken",
    jwtCustomerToken
);

        console.log(
            "TOKEN STORED =",
            localStorage.getItem("jwtCustomerToken")
        );

        return {
            message: parsedResponse.message
        };

    } catch (error) {
        console.log("CUSTOMER LOGIN ERROR =", error);

        return {
            error: "Something went wrong"
        };
    }
}