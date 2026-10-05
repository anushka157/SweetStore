import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigate,
} from "react-router-dom";
import { registerCustomer } from "../../../data/customerAPI";
import { Customer } from "../../../types/customerTypes";

export async function action({ request }: { request: Request }) {
  const formdata = await request.formData();
  const formEntires = Array.from(formdata.entries()).reduce(
    (acc, [key, value]) => {
      acc[key] = value;
      return acc;
    },
    {} as Record<string, FormDataEntryValue>
  );

  const response = await registerCustomer(formEntires);

  return response;
}

export default function CustomerRegister() {
  const actionData = useActionData() as { message: string } | string;
  if (typeof actionData === "string") {
    return <p className="text-red-600 font-medium text-center">{actionData}</p>;
  }

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center bg-background py-8 px-4">
      {/* Title or Success Message */}
      <p className="text-accent text-2xl font-bold mb-4">
        {(actionData && actionData.message) || "Register"}
      </p>

      {/* Link to Login Page */}
      {actionData && (
        <Link
          className="text-lighterAccent font-medium underline hover:no-underline mb-6"
          to={"/customer/login"}
        >
          Go to login page
        </Link>
      )}

      {/* Registration Form */}
      <Form
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4"
        method="post"
      >
        {/* Email */}
        <label className="block text-accent font-medium">
          Email
          <input
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-accent outline-none"
            required
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
          />
        </label>

        {/* Password */}
        <label className="block text-accent font-medium">
          Password
          <input
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-accent outline-none"
            required
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />
        </label>

        {/* Customer Name */}
        <label className="block text-accent font-medium">
          Name
          <input
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-accent outline-none"
            required
            type="text"
            id="customerName"
            name="customerName"
            placeholder="Enter your full name"
          />
        </label>

        {/* Phone Number */}
        <label className="block text-accent font-medium">
          Contact No.
          <input
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-accent outline-none"
            required
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter your contact number"
          />
        </label>

        {/* Address Line 1 */}
        <label className="block text-accent font-medium">
          Address Line 1
          <input
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-accent outline-none"
            required
            type="text"
            id="addressLine1"
            name="addressLine1"
            placeholder="Enter address line 1"
          />
        </label>

        {/* Address Line 2 */}
        <label className="block text-accent font-medium">
          Address Line 2
          <input
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-accent outline-none"
            required
            type="text"
            id="addressLine2"
            name="addressLine2"
            placeholder="Enter address line 2"
          />
        </label>

        {/* City */}
        <label className="block text-accent font-medium">
          City
          <input
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-accent outline-none"
            required
            type="text"
            id="city"
            name="city"
            placeholder="Enter your city"
          />
        </label>

        {/* Country */}
        <label className="block text-accent font-medium">
          Country
          <input
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-accent outline-none"
            required
            type="text"
            id="country"
            name="country"
            placeholder="Enter your country"
          />
        </label>

        {/* Zip Code */}
        <label className="block text-accent font-medium">
          Zip Code
          <input
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-accent outline-none"
            required
            type="text"
            id="zipCode"
            name="zipCode"
            placeholder="Enter your zip code"
          />
        </label>

        {/* Submit Button */}
        <button
          className="w-full py-2 bg-accent text-white font-medium rounded-md hover:bg-lighterAccent transition-transform transform hover:scale-105 focus:ring-2 focus:ring-lighterAccent focus:ring-offset-2 focus:outline-none"
          type="submit"
        >
          Register
        </button>
      </Form>
    </section>
  );
}
