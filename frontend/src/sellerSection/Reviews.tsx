

export default function Reviews() {

    // const renderReviewList = reviewList.map((review, index) => (
    //     <tr>
    //         <td className=" truncate border border-gray-300 p-1 text-center" >{review.review_id}</td>
    //         <td className=" truncate border border-gray-300 p-1 text-center">{review.product_id}</td>
    //         <td className=" truncate border border-gray-300 p-1 text-center">{review.customer_id}</td>
    //         <td className="border border-gray-300 p-1 text-center">{review.rating}</td>
    //         <td className="border border-gray-300 p-1 text-center">{review.comment}</td>
    //         <td className="border border-gray-300 p-1 text-center">{review.created_at.toLocaleString()}</td>
    //     </tr>
    // ))

    return (
        <section className="w-[86%] m-auto">
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-1 text-center">Review id</th>
                        <th className="border border-gray-300 p-1 text-center">Product id</th>
                        <th className="border border-gray-300 p-1 text-center">Customer id</th>
                        <th className="border border-gray-300 p-1 text-center">Rating</th>
                        <th className="border border-gray-300 p-1 text-center">Comment</th>
                        <th className="border border-gray-300 p-1 text-center">Date</th>
                    </tr>
                </thead>
                <tbody>
                     {/* {renderReviewList} */}
                </tbody>
            </table>
        </section>
    )
}
