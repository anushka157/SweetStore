import { availableSavories, availableSweets } from "../../data/filterData";

export default function Filter() {

    const renderSweets = availableSweets.map((sweet, index) => (
        <li key={index}  className="filters w-full mt-1 ">
            <label htmlFor={sweet} className="flex  gap-2 items-center select-none">
                <input
                type="checkbox"
                name={sweet}
                id={sweet}
                value={sweet}
                className="
                
                shrink-0
                appearance-none w-6 h-6 border-2 rounded-md  checked:bg-citron 
                focus:outline-none
                disabled:border-gray-600 disabled:bg-gray-600
                "
                />
              {sweet}
            </label>
          </li>
    ))

    const renderSavories = availableSavories.map((savroy, index) => (
        <li key={index} className="filters  mx-1 mt-1">
            <label htmlFor={savroy} className="flex w-full gap-2 items-center select-none">
                <input
                type="checkbox"
                name={savroy}
                id={savroy}
                value={savroy}
                className="
                shrink-0
                appearance-none w-6 h-6 border-2 rounded-md  checked:bg-citron 
                focus:outline-none
                disabled:border-gray-600 disabled:bg-gray-600
                "
                />
              {savroy}
            </label>
          </li>
    ))

  return (
    <nav className=" mr-1 bg-background p-2 h-fit border">
      <section className=" bg-white p-3 border rounded-sm min-w-[15rem]">
        <div className="mb-4 text-indigoDye">All Sweets</div>
        <ul>
            {renderSweets}
        </ul>
      </section>
      <section className=" bg-white p-3 border rounded-sm ">
        <div className="mb-4 text-indigoDye">All Savories</div>
        <ul>
            {renderSavories}
        </ul>
      </section>
    </nav>
  );
}

        