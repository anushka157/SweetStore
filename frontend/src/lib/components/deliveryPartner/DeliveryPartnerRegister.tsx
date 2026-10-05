// import {
//   Form,
//   useActionData,
//   useNavigate,
// } from "react-router-dom";

// export async function action({
//   request,
// }: {
//   request: Request;
// }) {
//   const formData = await request.formData();

//   const name = formData.get("name");
//   const email = formData.get("email");
//   const phoneNumber = formData.get("phoneNumber");
//   const password = formData.get("password");
//   const confirmPassword = formData.get("confirmPassword");

//   if (
//     !name ||
//     !email ||
//     !phoneNumber ||
//     !password ||
//     !confirmPassword
//   ) {
//     return "All fields are required";
//   }

//   if (password !== confirmPassword) {
//     return "Passwords do not match";
//   }

//   try {
//     const response = await fetch(
//       "http://localhost:5005/delivery-partner/register",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           phoneNumber,
//           password,
//         }),
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       return (
//         data.message ||
//         data.error ||
//         "Registration failed"
//       );
//     }

//     return {
//       success: true,
//       message:
//         data.message ||
//         "Registration successful. Please wait for admin approval.",
//     };
//   } catch (error) {
//     console.error(
//       "Delivery partner registration error:",
//       error
//     );

//     return "Unable to connect to server";
//   }
// }

// export default function DeliveryPartnerRegister() {
//   const actionData = useActionData() as
//     | string
//     | {
//         success: boolean;
//         message: string;
//       }
//     | undefined;

//   const navigate = useNavigate();

//   if (
//     actionData &&
//     typeof actionData !== "string" &&
//     actionData.success
//   ) {
//     return (
//       <section className="min-h-screen flex items-center justify-center bg-background px-4">
//         <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">

//           <h1 className="text-3xl font-bold text-accent mb-5">
//             Registration Submitted
//           </h1>

//           <p className="text-gray-600 mb-6">
//             {actionData.message}
//           </p>

//           <button
//             type="button"
//             onClick={() =>
//               navigate("/panel/delivery-partner/login")
//             }
//             className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
//           >
//             Go to Login
//           </button>

//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="min-h-screen flex items-center justify-center bg-background px-4">

//       <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

//         <h1 className="text-3xl font-bold text-accent text-center mb-8">
//           Delivery Partner Registration
//         </h1>

//         {typeof actionData === "string" && (
//           <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-5 text-center">
//             {actionData}
//           </div>
//         )}

//         <Form method="post" className="space-y-5">

//           {/* NAME */}
//           <div>
//             <label className="block font-medium mb-2">
//               Full Name
//             </label>

//             <input
//               type="text"
//               name="name"
//               required
//               className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent"
//               placeholder="Enter your full name"
//             />
//           </div>

//           {/* EMAIL */}
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

//           {/* PHONE */}
//           <div>
//             <label className="block font-medium mb-2">
//               Phone Number
//             </label>

//             <input
//               type="tel"
//               name="phoneNumber"
//               required
//               className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent"
//               placeholder="Enter your phone number"
//             />
//           </div>

//           {/* PASSWORD */}
//           <div>
//             <label className="block font-medium mb-2">
//               Password
//             </label>

//             <input
//               type="password"
//               name="password"
//               required
//               className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent"
//               placeholder="Create a password"
//             />
//           </div>

//           {/* CONFIRM PASSWORD */}
//           <div>
//             <label className="block font-medium mb-2">
//               Confirm Password
//             </label>

//             <input
//               type="password"
//               name="confirmPassword"
//               required
//               className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent"
//               placeholder="Confirm your password"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
//           >
//             Register
//           </button>

//         </Form>

//         <div className="text-center mt-6">

//           <p className="text-gray-600">
//             Already have an account?
//           </p>

//           <button
//             type="button"
//             onClick={() =>
//               navigate("/panel/delivery-partner/login")
//             }
//             className="text-accent font-semibold mt-1 hover:underline"
//           >
//             Login here
//           </button>

//         </div>

//       </div>

//     </section>
//   );
// }

import {
  Form,
  useActionData,
  useNavigate,
} from "react-router-dom";
import { domain } from "../../utils/domain";

export async function action({
  request,
}: {
  request: Request;
}) {
  const formData = await request.formData();

  const name = formData.get("name");
  const email = formData.get("email");
  const phoneNumber = formData.get("phoneNumber");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (
    !name ||
    !email ||
    !phoneNumber ||
    !password ||
    !confirmPassword
  ) {
    return "All fields are required";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  try {
    const response = await fetch(
      `${domain}/delivery-partner/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phoneNumber,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return (
        data.message ||
        data.error ||
        "Registration failed"
      );
    }

    return {
      success: true,
      message:
        data.message ||
        "Registration successful. Please wait for admin approval.",
    };
  } catch (error) {
    console.error(
      "Delivery partner registration error:",
      error
    );

    return "Unable to connect to server";
  }
}

export default function DeliveryPartnerRegister() {
  const actionData = useActionData() as
    | string
    | {
        success: boolean;
        message: string;
      }
    | undefined;

  const navigate = useNavigate();

  if (
    actionData &&
    typeof actionData !== "string" &&
    actionData.success
  ) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">

          <h1 className="text-3xl font-bold text-accent mb-5">
            Registration Submitted
          </h1>

          <p className="text-gray-600 mb-6">
            {actionData.message}
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/panel/delivery-partner/login")
            }
            className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Go to Login
          </button>

        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-background px-4">

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-accent text-center mb-8">
          Delivery Partner Registration
        </h1>

        {typeof actionData === "string" && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-5 text-center">
            {actionData}
          </div>
        )}

        <Form method="post" className="space-y-5">

          <div>
            <label className="block font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              required
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter your full name"
            />
          </div>

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
              Phone Number
            </label>

            <input
              type="tel"
              name="phoneNumber"
              required
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter your phone number"
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
              placeholder="Create a password"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              required
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Register
          </button>

        </Form>

        <div className="text-center mt-6">

          <p className="text-gray-600">
            Already have an account?
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/panel/delivery-partner/login")
            }
            className="text-accent font-semibold mt-1 hover:underline"
          >
            Login here
          </button>

        </div>

      </div>

    </section>
  );
}