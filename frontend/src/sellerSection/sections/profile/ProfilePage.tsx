// import { Link } from "react-router-dom"

// export async function loader() {
//     const response = await fetch('')
// }

// export default function ProfilePage() {
//     return (
//         <section>
//             <Link to={'/panel/seller/profile/edit'} className="border p-2 text-yellowish border-accent shadow-md active:shadow-none">Edit Profile</Link>
//         </section>
//     )
// }
import { Link } from "react-router-dom";

export default function ProfilePage() {
  return (
    <section className="w-[86%] mx-auto py-10">
      <div className="bg-white border rounded-xl shadow-md p-8">

        <h1 className="text-3xl font-bold text-accent mb-6">
          Seller Profile
        </h1>

        <p className="text-gray-600 mb-6">
          Manage your seller profile information.
        </p>

        <Link
          to="/panel/seller/profile/edit"
          className="inline-block border p-2 text-yellowish border-accent shadow-md active:shadow-none"
        >
          Edit Profile
        </Link>

      </div>
    </section>
  );
}