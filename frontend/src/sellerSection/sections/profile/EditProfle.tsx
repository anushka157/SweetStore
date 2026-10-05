import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { domain } from "../../../lib/utils/domain";
export default function EditProfile() {
  const navigate = useNavigate();

  const [businessName, setBusinessName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

 async function handleSubmit(
  event: React.FormEvent<HTMLFormElement>
) {
  event.preventDefault();

  setMessage("");
  setError("");
  setLoading(true);

  const token = localStorage.getItem("jwtToken");

  if (!token) {
    setError("You need to login as a seller first.");
    setLoading(false);
    return;
  }

  try {
    const response = await fetch(
      `${domain}/seller/profile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          businessName,
          phoneNumber,
          address,
          city,
          country,
          zipCode,
        }),
      }
    );

    const contentType = response.headers.get("content-type");

    let result: any = {};

    if (
      contentType &&
      contentType.includes("application/json")
    ) {
      result = await response.json();
    } else {
      const text = await response.text();

      console.error(
        "SERVER RETURNED NON-JSON =",
        text
      );

      setError(
        `Server returned ${response.status}. Please check the backend route.`
      );

      setLoading(false);
      return;
    }

    if (!response.ok) {
      setError(
        result.error || "Unable to update seller profile"
      );
      setLoading(false);
      return;
    }

    setMessage("Profile updated successfully!");
    setLoading(false);

    setTimeout(() => {
      navigate("/panel/seller/profile");
    }, 1000);
  } catch (error) {
    console.error("UPDATE PROFILE ERROR =", error);

    setError(
      "Something went wrong while updating profile."
    );

    setLoading(false);
  }
}

  return (
    <section className="w-[86%] mx-auto py-10">

      <div className="bg-white border rounded-xl shadow-md p-8">

        <h1 className="text-3xl font-bold text-accent mb-6">
          Edit Seller Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* BUSINESS NAME */}
          <div>
            <label className="block font-semibold mb-2">
              Business Name
            </label>

            <input
              type="text"
              name="businessName"
              value={businessName}
              onChange={(event) =>
                setBusinessName(event.target.value)
              }
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-accent"
              placeholder="Enter business name"
              required
            />
          </div>


          {/* PHONE */}
          <div>
            <label className="block font-semibold mb-2">
              Phone Number
            </label>

            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(event) =>
                setPhoneNumber(event.target.value)
              }
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-accent"
              placeholder="Enter phone number"
              required
            />
          </div>


          {/* ADDRESS */}
          <div>
            <label className="block font-semibold mb-2">
              Address
            </label>

            <input
              type="text"
              name="address"
              value={address}
              onChange={(event) =>
                setAddress(event.target.value)
              }
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-accent"
              placeholder="Enter address"
              required
            />
          </div>


          {/* CITY */}
          <div>
            <label className="block font-semibold mb-2">
              City
            </label>

            <input
              type="text"
              name="city"
              value={city}
              onChange={(event) =>
                setCity(event.target.value)
              }
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-accent"
              placeholder="Enter city"
              required
            />
          </div>


          {/* COUNTRY */}
          <div>
            <label className="block font-semibold mb-2">
              Country
            </label>

            <input
              type="text"
              name="country"
              value={country}
              onChange={(event) =>
                setCountry(event.target.value)
              }
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-accent"
              placeholder="Enter country"
              required
            />
          </div>


          {/* ZIP CODE */}
          <div>
            <label className="block font-semibold mb-2">
              ZIP Code
            </label>

            <input
              type="text"
              name="zipCode"
              value={zipCode}
              onChange={(event) =>
                setZipCode(event.target.value)
              }
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-accent"
              placeholder="Enter ZIP code"
              required
            />
          </div>


          {/* SUCCESS MESSAGE */}
          {message && (
            <p className="text-green-600 font-semibold">
              {message}
            </p>
          )}


          {/* ERROR MESSAGE */}
          {error && (
            <p className="text-red-500 font-semibold">
              {error}
            </p>
          )}


          {/* BUTTONS */}
          <div className="flex gap-4 pt-4">

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-accent text-white rounded-md shadow-md hover:bg-lighterAccent disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : "Save Changes"}
            </button>


            <button
              type="button"
              onClick={() =>
                navigate("/panel/seller/profile")
              }
              className="px-6 py-2 border border-accent text-accent rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </section>
  );
}