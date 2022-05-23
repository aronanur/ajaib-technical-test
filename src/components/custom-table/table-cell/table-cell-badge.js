import React from 'react'
import PropTypes, { shape } from 'prop-types'
import { CBadge, CTableDataCell } from '@coreui/react'
import Helper from 'src/helper/helper'

const CustomTableCellBadgeComponent = (props) => {
  const { cellConfig, tableData, onCellClick, keyExtractor } = props
  const { field, textAlign, textColor, badgeRules } = cellConfig
  return (
    <CTableDataCell
      className="custom-table-container-cell"
      style={{ textAlign: textAlign, color: textColor }}
      onClick={() =>
        onCellClick({ data: tableData, value: tableData[field], id: tableData[keyExtractor] })
      }
    >
      <CBadge color={Helper.badgeConverter(tableData[field], badgeRules)} shape="rounded-pill">
        {tableData[field]}
      </CBadge>
    </CTableDataCell>
  )
}

CustomTableCellBadgeComponent.propTypes = {
  cellConfig: shape({
    field: PropTypes.string,
    textAlign: PropTypes.oneOf(['left', 'right', 'center']),
    textColor: PropTypes.string,
    cellConfig: {
      isBadge: PropTypes.bool,
      badgeColor: PropTypes.string,
      buttonDetailIcon: PropTypes.element,
      buttonDetailColor: PropTypes.string,
    },
  }),
  onCellClick: PropTypes.func,
  tableData: PropTypes.object,
  keyExtractor: PropTypes.string,
}
CustomTableCellBadgeComponent.defaultProps = {
  keyExtractor: 'id',
  cellConfig: {
    field: '',
    textAlign: 'center',
    textColor: 'black',
    suffix: '',
    prefix: '',
    textFormat: () => {},
    useTextFormat: false,
    badgeRules: [],
  },
  tableData: {},
  onCellClick: () => {},
}

export default CustomTableCellBadgeComponent
