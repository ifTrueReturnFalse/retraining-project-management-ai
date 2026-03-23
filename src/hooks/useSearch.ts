import { useMemo, useState, useEffect } from "react";

/**
 * Custom hook to manage searching and filtering of a generic list of items.
 * Includes a debounce mechanism to optimize performance by avoiding
 * filtering the list on every keystroke.
 * 
 * @param items - The initial list of items to filter.
 * @param filterFunction - The function that determines if an item matches the search query.
 * @returns An object containing the search query, its setter, and the filtered list of items.
 */
export function useSearch<T>(
  items: T[],
  filterFunction: (item: T, query: string) => boolean,
) {
  // State for the immediate search input value (updated on every keystroke)
  const [query, setQuery] = useState("");
  
  // State for the debounced search value (updated after the user stops typing)
  const [debouncedQuery, setDebouncedQuery] = useState("")

  // Update 'debouncedQuery' if 'query' hasn't changed for 300 milliseconds
  useEffect(() => {
    // Set up a timer
    const handler = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300)

    // Clean up the timer if 'query' changes (user continues typing) before 300ms is up
    return () => clearTimeout(handler)
  }, [query])

  // Memoize and calculate the filtered list only when items, debouncedQuery, or filterFunction change
  const filteredItems = useMemo(() => {
    // If the search query is empty, return all items without filtering
    if (!debouncedQuery.trim()) return items;

    const lowerQuery = debouncedQuery.toLowerCase();
    // Filter the items applying the provided filter function
    return items.filter((item) => filterFunction(item, lowerQuery));
  }, [items, debouncedQuery, filterFunction]);

  return { query, setQuery, filteredItems };
}
