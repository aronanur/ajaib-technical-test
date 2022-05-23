import React from 'react'
import PropTypes, { shape } from 'prop-types'
import { CTableDataCell } from '@coreui/react'

const CustomTableCellBadgeComponent = (props) => {
  const { cellConfig, tableData } = props
  const { textAlign, ActionContent } = cellConfig
  return (
    <CTableDataCell className="custom-table-container-cell" style={{ textAlign: textAlign }}>
      {ActionContent && <ActionContent data={tableData} />}
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
      ActionContent: PropTypes.element,
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
  },
  tableData: {},
  onCellClick: () => {},
}

export default CustomTableCellBadgeComponent
