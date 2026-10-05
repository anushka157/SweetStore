import { Form, Link, redirect, useActionData } from "react-router-dom";
import { loginCustomer } from "../../../data/customerAPI";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  // const response = await loginCustomer(formData);

  // if (response.error) {
  //   return { error: response.error };
  // }

  // console.log(response.message);
  // return redirect("/");
  const response = await loginCustomer(formData);

if (response.error) {
  return { error: response.error };
}

// Customer is logging in
localStorage.removeItem("jwtToken");
localStorage.removeItem("jwtAdminToken");

console.log(response.message);

return redirect("/");
}

export default function CustomerLogin() {
  const actionData = useActionData() as {
    message?: string;
    error?: string;
  };

  return (
    <section className="flex w-full min-h-screen flex-col justify-center items-center bg-background py-8 px-4">
      {/* Error Message */}
      {actionData?.error && (
        <p className="text-red-600 font-medium mb-4">{actionData.error}</p>
      )}

      {/* Title */}
      <p className="text-accent text-2xl font-bold mb-6">
        {actionData?.message || "Login"}
      </p>

      {/* Login Form */}
      <Form
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
        method="post"
      >
        {/* Email Field */}
        <p className="mb-4">
          <label htmlFor="email" className="block text-accent font-medium mb-2">
            Email:
          </label>
          <input
            className="w-full border border-gray-300 rounded-md p-2 text-accent focus:ring-2 focus:ring-accent outline-none"
            required
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
          />
        </p>

        {/* Password Field */}
        <p className="mb-6">
          <label
            htmlFor="password"
            className="block text-accent font-medium mb-2"
          >
            Password:
          </label>
          <input
            className="w-full border border-gray-300 rounded-md p-2 text-accent focus:ring-2 focus:ring-accent outline-none"
            required
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
          />
        </p>

        {/* Submit Button */}
        <p>
          <button
            className="w-full py-2 bg-accent text-white font-medium rounded-md hover:bg-lighterAccent transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-lighterAccent focus:ring-offset-2"
            type="submit"
          >
            Login
          </button>
        </p>
      </Form>

      {/* Register Link */}
      <p className="mt-6 text-accent">
        Don't have an Account?{" "}
        <Link
          to="/customer/register"
          className="font-bold underline text-orangeee hover:no-underline hover:text-lighterAccent"
        >
          Register
        </Link>
      </p>
    </section>
  );
}
