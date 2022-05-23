import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CTableHeaderCell } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortAsc, faSortDesc } from '@fortawesome/free-solid-svg-icons'

const CustomTableHeaderSortComponent = (props) => {
  const [isSort, setIsSort] = useState(false)
  const [sortType, setSortType] = useState('ASC')
  const [clickCount, setClickCount] = React.useState(0)
  const { headerConfig, onHeaderSort, tableData } = props
  const { width, height, field, textAlign, textColor, label, sortKey } = headerConfig
  const _sortFunction = () => {
    const sortRules = ['ASC', 'DESC', '']
    setSortType(sortRules[clickCount])
    onHeaderSort({ field: sortKey || field, sortType: sortRules[clickCount], tableData })
    if (clickCount >= 2) {
      setIsSort(false)
      setClickCount(0)
    } else {
      setIsSort(true)
      setClickCount(clickCount + 1)
    }
  }
  return (
    <CTableHeaderCell
      scope="col"
      style={{
        width: width,
        height: height,
        color: textColor,
        textAlign: textAlign,
      }}
      onClick={_sortFunction}
      className="custom-table-container-header"
    >
      <span style={{ display: 'inline-block', width: width }}>
        {label} &nbsp;
        <FontAwesomeIcon
          icon={isSort ? (sortType === 'ASC' ? faSortAsc : faSortDesc) : faSort}
          color={'white'}
        />
      </span>
    </CTableHeaderCell>
  )
}

CustomTableHeaderSortComponent.propTypes = {
  headerConfig: PropTypes.shape({
    field: PropTypes.string,
    bgColor: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    textAlign: PropTypes.oneOf(['left', 'right', 'center']),
    textColor: PropTypes.string,
    label: PropTypes.string,
    isSort: PropTypes.bool,
    isCheck: PropTypes.bool,
    sortKey: PropTypes.string,
  }),
  onHeaderCheck: PropTypes.func,
  onHeaderSort: PropTypes.func,
  tableData: PropTypes.func,
}
CustomTableHeaderSortComponent.defaultProps = {
  headerConfig: {
    width: 100,
    height: 50,
    textColor: 'white',
    textAlign: 'center',
    label: 'Title',
    isSort: false,
    isCheck: false,
  },
  tableData: [],
  onHeaderCheck: () => {},
  onHeaderSort: () => {},
}

export default CustomTableHeaderSortComponent
