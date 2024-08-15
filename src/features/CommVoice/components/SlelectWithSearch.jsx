import { useState, useEffect, React } from 'react';
import { Link } from 'react-router-dom';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';

function SearchSelect({ contents, onSelect }) {
  const [query, setQuery] = useState('');
  const [filteredContents, setFilteredContents] = useState(contents);

  useEffect(() => {
    const filteredItems = contents?.filter((item) => {
      const key = item.toLowerCase();
      key.includes(query.toLowerCase());
      return key;
    });
    setFilteredContents(filteredItems);
  }, [query, contents]);

  return (
    <ul className="dropdown-menu drop-supervisor p-3">
      <SearchWithBorder
        placeholderText="Search role"
        searchTerm={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        clearBtn={() => {
          setQuery('');
        }}
      />
      {filteredContents?.map((item) => (
        <li key={item}>
          <Link
            to="/"
            className="role fw-500 text-blue-active"
            onClick={(event) => {
              event.preventDefault();
              onSelect(item);
            }}
          >
            {item}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SearchSelect;
