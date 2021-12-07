import React, { useCallback, useMemo } from "react";
import { useState } from "react";
import { useDebouncedValue } from "./usedebouncedvalue";

function useQueryState() {
  const [query, setQuery] = useState("");
  const handleQueryChange = useCallback(
    (event) => setQuery(event.target.value),
    [setQuery]
  );
  return { query, onQueryChange: handleQueryChange };
}

function useFilteredEmployees(query, employees) {
  const debouncedQuery = useDebouncedValue(query, 400);

  const filteredEmployees = employees.filter((name) => {
    return name.toLowerCase().includes(debouncedQuery.toLowerCase());
  });

  return filteredEmployees;
}

function FilteredEmployeesList({ employees }) {
  const { query, onQueryChange } = useQueryState();
  const filteredEmployees = useFilteredEmployees(query, employees);

  return (
    <div>
      <h2>Employees List</h2>
      <input type="text" value={query} onChange={onQueryChange} />
      <div className="list">
        {filteredEmployees.map((name, index) => (
          <div key={index}>{name}</div>
        ))}
      </div>
    </div>
  );
}
export default FilteredEmployeesList;
