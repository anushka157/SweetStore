// import { Form, useActionData, useNavigate } from "react-router-dom";

// export async function action({ request }: { request: Request }) {
//   const formData = await request.formData();

//   const email = formData.get("email");
//   const password = formData.get("password");

//   try {
//     const response = await fetch(
//       "http://localhost:5005/delivery-partner/login",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       return data.message || "Login failed";
//     }

//     localStorage.setItem(
//       "jwtDeliveryPartnerToken",
//       data.jwtDeliveryPartnerToken
//     );

//     return { success: true };
//   } catch (error) {
//     return "Unable to connect to server";
//   }
// }

// export default function DeliveryPartnerLogin() {
//   const actionData = useActionData() as
//     | string
//     | { success: boolean }
//     | undefined;

//   const navigate = useNavigate();

//   if (
//     actionData &&
//     typeof actionData !== "string" &&
//     actionData.success
//   ) {
//     navigate("/panel/delivery-partner");
//   }

//   return (
//     <section className="min-h-screen flex items-center justify-center bg-background px-4">

//       <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

//         <h1 className="text-3xl font-bold text-accent text-center mb-8">
//           Delivery Partner Login
//         </h1>

//         {typeof actionData === "string" && (
//           <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-5 text-center">
//             {actionData}
//           </div>
//         )}

//         <Form method="post" className="space-y-5">

//           <div>
//             <label className="block font-medium mb-2">
//               Email
//             </label>

//             <input
//               type="email"
//               name="email"
//               required
//               className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent"
//               placeholder="Enter your email"
//             />
//           </div>

//           <div>
//             <label className="block font-medium mb-2">
//               Password
//             </label>

//             <input
//               type="password"
//               name="password"
//               required
//               className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent"
//               placeholder="Enter your password"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
//           >
//             Login
//           </button>

//         </Form>
//         <div className="text-center mt-6">

//   <p className="text-gray-600">
//     Don't have an account?
//   </p>

//   <button
//     type="button"
//     onClick={() =>
//       navigate("/panel/delivery-partner/register")
//     }
//     className="text-accent font-semibold mt-1 hover:underline"
//   >
//     Register as Delivery Partner
//   </button>

// </div>
//       </div>

//     </section>
//   );
// }

import { Form, useActionData, useNavigate } from "react-router-dom";
import { domain } from "../../utils/domain";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await fetch(
      `${domain}/delivery-partner/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return data.message || "Login failed";
    }

    localStorage.setItem(
      "jwtDeliveryPartnerToken",
      data.jwtDeliveryPartnerToken
    );

    return { success: true };
  } catch (error) {
    return "Unable to connect to server";
  }
}

export default function DeliveryPartnerLogin() {
  const actionData = useActionData() as
    | string
    | { success: boolean }
    | undefined;

  const navigate = useNavigate();

  if (
    actionData &&
    typeof actionData !== "string" &&
    actionData.success
  ) {
    navigate("/panel/delivery-partner");
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-background px-4">

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-accent text-center mb-8">
          Delivery Partner Login
        </h1>

        {typeof actionData === "string" && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-5 text-center">
            {actionData}
          </div>
        )}

        <Form method="post" className="space-y-5">

          <div>
            <label className="block font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              required
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              required
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Login
          </button>

        </Form>

        <div className="text-center mt-6">

          <p className="text-gray-600">
            Don't have an account?
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/panel/delivery-partner/register")
            }
            className="text-accent font-semibold mt-1 hover:underline"
          >
            Register as Delivery Partner
          </button>

        </div>

      </div>

    </section>
  );
}