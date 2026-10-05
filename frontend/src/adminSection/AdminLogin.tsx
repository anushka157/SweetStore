import { Form, useActionData, useNavigate } from "react-router-dom";
import { domain } from "../lib/utils/domain";
const AdminLogin = () => {
  const actionData = useActionData() as {
    error?: string;
  } | undefined;

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          Admin Login
        </h1>

        <p className="text-center text-gray-500 mb-6">
          SweetStore Administration
        </p>

        {actionData?.error && (
          <p className="text-red-500 text-center mb-4">
            {actionData.error}
          </p>
        )}

        <Form method="post" className="space-y-4">

          <div>
            <label className="block mb-1 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              required
              className="w-full border rounded-md px-3 py-2"
              placeholder="Enter admin email"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              required
              className="w-full border rounded-md px-3 py-2"
              placeholder="Enter admin password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
          >
            Login
          </button>

        </Form>
      </div>
    </div>
  );
};

export default AdminLogin;
export async function action({
  request,
}: {
  request: Request;
}) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await fetch(
      `${domain}/admin/login`,
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
      return {
        error: data.message || "Invalid admin credentials",
      };
    }

    // localStorage.setItem(
    //   "jwtAdminToken",
    //   data.jwtAdminToken
    // );
localStorage.setItem(
  "jwtAdminToken",
  data.jwtAdminToken
);

// Remove other roles
localStorage.removeItem("jwtToken");
localStorage.removeItem("jwtCustomerToken");

window.location.href = "/admin/dashboard";
   
  } catch (error) {
    console.error("Admin login error:", error);

    return {
      error: "Unable to connect to server",
    };
  }

  return null;
}