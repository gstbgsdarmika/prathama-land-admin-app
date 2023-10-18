import { useState } from 'react';
import PropertiesHead from './PropertiesHead';
import TableProperties from '../../components/table/TableProperties';

function Properties() {
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  };
  return (
    <section>
      <PropertiesHead handleSearch={handleSearch} />
      <TableProperties searchKeyword={searchKeyword} />
    </section>
  );
}

export default Properties;
