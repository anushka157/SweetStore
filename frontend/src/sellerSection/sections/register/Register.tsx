import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigate,
} from "react-router-dom";
import { domain } from "../../../lib/utils/domain";

export async function action({ request }: { request: Request }) {
  const formdata = await request.formData();
  const formEntires = Array.from(formdata.entries()).reduce(
    (acc, [key, value]) => {
      acc[key] = value;
      return acc;
    },
    {} as Record<string, FormDataEntryValue>
  );

  const body = JSON.stringify(formEntires);

  const response = await fetch(`${domain}/seller/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Ensure the server knows you're sending JSON
    },
    body: body,
  });

  const parsedResponse = await response.json();

  return { parsedResponse, statusCode: response.status };
}

export default function Register() {
  const actionData = useActionData() as {
    parsedResponse: {
      message?: string;
    };
    statusCode: number;
  };

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center bg-background py-8 px-4">
      {/* Title or Success Message */}
      <p className="text-accent text-2xl font-bold mb-4">
        {(actionData && actionData.parsedResponse.message) || "Register"}
      </p>

      {/* Link to Login Page */}
      {actionData && actionData.statusCode === 201 && (
        <Link
          className="text-lighterAccent font-medium underline hover:no-underline mb-6"
          to={"/panel/seller/login"}
        >
          Go to login page
        </Link>
      )}

      {/* Registration Form */}
      <Form
        className="max-w-[40rem] w-full bg-white p-6 rounded-lg shadow-lg flex flex-col gap-6"
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

        {/* Business Name */}
        <label className="block text-accent font-medium">
          Business Name
          <input
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-accent outline-none"
            required
            type="text"
            id="businessName"
            name="businessName"
            placeholder="Enter your business name"
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
        <p className="mt-4 w-full">
          <button
            className="w-full py-2 bg-accent text-white font-medium rounded-md hover:bg-lighterAccent transition-transform transform hover:scale-105 focus:ring-2 focus:ring-lighterAccent focus:ring-offset-2 focus:outline-none"
            type="submit"
          >
            Register
          </button>
        </p>
      </Form>
    </section>
  );
}
