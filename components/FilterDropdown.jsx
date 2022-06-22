import React, {useState} from 'react'
import { AiFillCaretDown } from 'react-icons/ai'

const FilterDropdown = ({ header, content }) => {
  const [active, setActive] = useState(false)
  let toggleClassCheck =  active ? '-active': ''

  const handleClick = () => {
    setActive(active=> !active)
  }
  return (
    <div className={`filter-box${toggleClassCheck}`}>
      <div className="filter-header" onClick={handleClick}>
        <h6>{header}</h6>
        <AiFillCaretDown size='25px' />
      </div>
      <div className="filter-content">
        {content}
      </div>
    </div>
  )
}

export default FilterDropdown