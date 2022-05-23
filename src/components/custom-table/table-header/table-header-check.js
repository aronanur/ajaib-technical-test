import React from 'react'
import PropTypes from 'prop-types'
import { CFormCheck, CTableHeaderCell } from '@coreui/react'

const CustomTableHeaderCheckComponent = (props) => {
  const [isCheck, setIsCheck] = React.useState(false)
  const { headerConfig, onHeaderCheck, tableData } = props
  const { width, height, field } = headerConfig
  const checkHeader = () => {
    setIsCheck(!isCheck)
    onHeaderCheck({ field, tableData, isCheck: !isCheck })
  }
  return (
    <CTableHeaderCell
      scope="col"
      style={{
        width: width || 30,
        height: height,
      }}
      className="custom-table-container-header"
    >
      <CFormCheck checked={isCheck} onChange={checkHeader} value={isCheck} />
    </CTableHeaderCell>
  )
}

CustomTableHeaderCheckComponent.propTypes = {
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
  }),
  onHeaderCheck: PropTypes.func,
  onHeaderSort: PropTypes.func,
  tableData: PropTypes.func,
}
CustomTableHeaderCheckComponent.defaultProps = {
  headerConfig: {
    width: 20,
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

export default CustomTableHeaderCheckComponent
