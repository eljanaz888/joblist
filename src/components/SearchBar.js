import React, {useState} from "react";
import { Form } from "react-bootstrap";

const SearchBar = ({onSearch}) => {

 
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    onSearch(query);
  };


  return (
    <Form.Control
      size="sm"
      type='text'
      className='mb-3'
      placeholder='Search job sites...'
      onChange={handleSearch}
      style={{ width: "40%" }}
    />
  );
};

export default SearchBar;