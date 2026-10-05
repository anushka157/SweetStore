import { Form, Link, redirect, useActionData } from "react-router-dom";
import { domain } from "../../../lib/utils/domain";


export async function action({ request }: { request: Request }) {
  const formData = await request.formData();

  const response = await fetch(`${domain}/seller/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formData.get("email"),
      password: formData.get("password"),
    }),
  });

  const parsedResponse = await response.json();

  console.log("LOGIN RESPONSE:", parsedResponse);

  // ✅ IMPORTANT SAFE CHECK
  // if (response.ok && parsedResponse.jwtToken) {
  //   localStorage.setItem("jwtToken", parsedResponse.jwtToken); // NO JSON.stringify
  // } else {
  //   localStorage.removeItem("jwtToken");
  //   console.log("Login failed");
  // }

  // return redirect("/panel/seller/");
  if (response.ok && parsedResponse.jwtToken) {
  // Seller is logging in
  localStorage.setItem("jwtToken", parsedResponse.jwtToken);

  // Remove any old customer/admin session
  localStorage.removeItem("jwtCustomerToken");
  localStorage.removeItem("jwtAdminToken");

  return redirect("/panel/seller/");
} else {
  localStorage.removeItem("jwtToken");

  return {
    error: parsedResponse.message || "Invalid seller credentials",
  };
}
}
export default function Login() {
  const actionData = useActionData() as {
    message?: string;
    error?: string;
  };

  return (
    <section className="flex w-full flex-col justify-center items-center min-h-screen bg-background">
      <p className="text-accent text-xl font-semibold mb-6">
        {actionData?.message || "Welcome"}
      </p>
      <Form
        className="p-6 w-full max-w-md border-2 border-accent bg-lighterYellowish rounded-lg shadow-lg"
        method="post"
      >
        <p className="mt-4">
          <label htmlFor="email" className="block text-accent font-medium mb-2">
            Email:
          </label>
          <input
            className="w-full border border-accent rounded-md p-2 text-accent focus:ring-2 focus:ring-accent outline-none"
            required
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
          />
        </p>
        <p className="mt-4">
          <label
            htmlFor="password"
            className="block text-accent font-medium mb-2"
          >
            Password:
          </label>
          <input
            className="w-full border border-accent rounded-md p-2 text-accent focus:ring-2 focus:ring-accent outline-none"
            required
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
          />
        </p>
        <p className="mt-6">
          <button
            className="w-full py-2 bg-accent text-white font-medium rounded-md hover:bg-lighterAccent transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-lighterAccent focus:ring-offset-2"
            type="submit"
          >
            Login
          </button>
        </p>
      </Form>
      <p className="mt-6 text-accent">
        Don&apos;t have an Account?{" "}
        <Link
          to={"/panel/seller/register"}
          className="font-bold underline text-orangeee hover:no-underline hover:text-lighterAccent"
        >
          Register
        </Link>
      </p>
    </section>
  );
}