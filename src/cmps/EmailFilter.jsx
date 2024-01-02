import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types, no-unused-vars
export function EmailFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  useEffect(() => {
    onSetFilter(filterByToEdit);
  }, [filterByToEdit]);

  function handleChange(ev) {
    let { value, name: field, type } = ev.target;
    value = type === "number" ? +value : value;

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  function handleSortChange(ev) {
    let { value, name: field, type } = ev.target;
    value = value === "desc" ? "asc" : "desc";

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  return (
    // <div>EmailFilter</div>
    <section className="emailfilter">
      <form onSubmit={(ev) => ev.preventDefault()}>
        {/* Read */}
        <div className="emailfilter-field">
          <label htmlFor="read">Read:</label>
          <select
            name="read"
            id="read"
            onChange={handleChange}
            value={"" + filterByToEdit.read}
          >
            <option value={"all"}>All</option>
            <option value={"read"}>Read</option>
            <option value={"unread"}>Unread</option>
          </select>
        </div>
        {/* Starred */}
        <div className="emailfilter-field">
          <label htmlFor="starred">Starred:</label>
          <select
            name="starred"
            id="starred"
            onChange={handleChange}
            // eslint-disable-next-line react/prop-types
            value={"" + filterByToEdit.starred}
          >
            <option value={"all"}>All</option>
            <option value={"starred"}>Starred</option>
            <option value={"unstarred"}>Not starred</option>
          </select>
        </div>
        {/* Text search */}
        <div className="emailfilter-field">
          <label htmlFor="searchBy">Search:</label>
          <input
            type="text"
            id="searchBy"
            placeholder="Search by text"
            name="searchBy"
            onChange={handleChange}
            // eslint-disable-next-line react/prop-types
            value={filterByToEdit.searchBy ? filterByToEdit.searchBy : ""}
          />
        </div>

        {/* Sort button */}
        <div className="emailfilter-field">
          <button
            id="dateSort"
            name="dateSort"
            value={filterByToEdit.dateSort}
            onClick={handleSortChange}
          >
            {filterByToEdit.dateSort === "desc" ? "desc" : "asc"}
          </button>
        </div>
      </form>
    </section>
  );
}
