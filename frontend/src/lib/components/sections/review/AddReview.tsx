import React, { useState } from "react";

import { Form, useActionData } from "react-router-dom";
import { sendReview } from "../../../data/reviewAPI";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const response = await sendReview(formData);
  return response;
}

const AddReviewComponent = ({
  productId,
  sellerId,
}: {
  productId: string;
  sellerId: string;
}) => {
  const [text, setText] = useState<string>("");

  const actionData = useActionData() as string;

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setText(event.target.value);
  };

  return (
    <Form method="post">
      {actionData && actionData}
      <div className="bg-[#F2EEEC] flex flex-col justify-center items-center w-full max-w-lg p-6 box-border border-2 border-[#763A12] rounded-lg">
        <p className="text-[#763A12] font-semibold text-lg mb-4">
          Add your Review
        </p>
        <textarea
          required
          name="comment"
          value={text}
          onChange={handleChange}
          placeholder="Type your review here..."
          className="w-full h-40 bg-[#F5DE7A] text-[#763A12] border-2 border-[#E08600] rounded-md p-3 text-base resize-none outline-none placeholder-[#763A12] focus:ring-2 focus:ring-[#763A12]"
        ></textarea>
        <div className="flex justify-evenly bg-[#F5DE7A] p-4 rounded-lg shadow-md">
          <select
            required
            name="rating"
            id="rating"
            className="px-4 py-2 bg-white border border-[#763A12] text-[#763A12] rounded-lg shadow-md focus:ring-2 focus:ring-[#763A12] focus:outline-none hover:cursor-pointer"
            defaultValue=""
          >
            <option value="" disabled>
              Select a rating
            </option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
          <input
            hidden
            required
            readOnly
            type="text"
            name="productId"
            value={productId}
          />
          <input
            hidden
            required
            readOnly
            type="text"
            name="sellerId"
            value={sellerId}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-[#E08600] text-white font-semibold rounded-lg shadow-md hover:bg-[#763A12] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#763A12] focus:ring-offset-2"
      >
        Submit Review
      </button>
    </Form>
  );
};

export default AddReviewComponent;
