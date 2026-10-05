import { useNavigate } from "react-router-dom";


export default function Pagination({totalPages, pageNo}: {
  totalPages: number,
  pageNo: number
}) {
  
  const navigate = useNavigate();
  const handlePageChange = (newPageNo: number) => {
    navigate(`?pageNo=${newPageNo}`)
  }

  const renderPages = [...Array(totalPages)].map((_, index) => (
    <li
      className={`${index+1 === pageNo? "underline": ""} hover:scale-125 cursor-pointer`}
      onClick={() => handlePageChange(index+1)}
    key={index}>
      {index + 1}
    </li>
  ));
  return (
    <nav className="">
      <ul className="flex gap-4 justify-center">
        <button
          onClick={() => handlePageChange(pageNo - 1)}
          disabled={pageNo === 1}
          className="inline-block hover:scale-125 cursor-pointer active:font-extrabold"
        >
          {"<"}
        </button>
        {renderPages}
          <button
            name="intent"
            value={"changePageNo"}
            onClick={() => handlePageChange(pageNo + 1)}
            disabled={pageNo === totalPages}
            className="inline-block hover:scale-125 cursor-pointer active:font-extrabold"
          >
            {">"}
          </button>
      </ul>
      
    </nav>
  );
}
