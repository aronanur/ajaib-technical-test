import React from 'react'
import PropTypes from 'prop-types'
import { CTableHeaderCell } from '@coreui/react'

const CustomTableHeaderTextComponent = (props) => {
  const { headerConfig } = props
  const { width, height, textColor, textAlign, label } = headerConfig
  return (
    <CTableHeaderCell
      scope="col"
      style={{
        width: width,
        height: height,
        color: textColor,
        textAlign: textAlign,
        cursor: 'default',
      }}
      className="custom-table-container-header"
    >
      <span style={{ display: 'inline-block', width: width }}>{label}</span>
    </CTableHeaderCell>
  )
}

CustomTableHeaderTextComponent.propTypes = {
  headerConfig: PropTypes.shape({
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
}
CustomTableHeaderTextComponent.defaultProps = {
  headerConfig: {
    width: 100,
    height: 50,
    textColor: 'white',
    textAlign: 'center',
    label: 'Title',
    isSort: false,
    isCheck: false,
  },
  onHeaderCheck: () => {},
  onHeaderSort: () => {},
}

export default CustomTableHeaderTextComponent
