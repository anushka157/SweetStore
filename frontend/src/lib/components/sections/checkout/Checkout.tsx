// import PaymentComponent from "../../buttons/PaymentComponent";
// export default function Checkout(): JSX.Element {
//   return (
//     <div className="min-h-screen bg-[#F2EEEC] p-1 m-1 rounded shadow">
//       <h1 className="text-center text-4xl mb-6">Checkout</h1>
//       <PaymentComponent />
//     </div>
//   );
// }
import PaymentComponent from "../../buttons/PaymentComponent";

export default function Checkout(): JSX.Element {
  return (
    <div
      className="
        min-h-screen
        bg-[#F2EEEC]
        p-3
        sm:p-4
        md:p-6
        m-2
        sm:m-4
        rounded
        shadow
      "
    >
      <h1
        className="
          text-center
          text-2xl
          sm:text-3xl
          md:text-4xl
          font-semibold
          mb-5
          sm:mb-6
        "
      >
        Checkout
      </h1>

      <div className="w-full max-w-4xl mx-auto">
        <PaymentComponent />
      </div>
    </div>
  );
}