import React from 'react'
import PropTypes, { shape } from 'prop-types'
import { CTableDataCell } from '@coreui/react'
import moment from 'moment'
import 'moment/locale/id'

const CustomTableCellDateComponent = (props) => {
  const { cellConfig, tableData, onCellClick, keyExtractor } = props
  const { field, textAlign, textColor } = cellConfig
  return (
    <CTableDataCell
      className="custom-table-container-cell"
      style={{ textAlign: textAlign, color: textColor }}
      onClick={() =>
        onCellClick({ data: tableData, value: tableData[field], id: tableData[keyExtractor] })
      }
    >
      {moment(tableData[field]).format('ll')}
    </CTableDataCell>
  )
}

CustomTableCellDateComponent.propTypes = {
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
CustomTableCellDateComponent.defaultProps = {
  keyExtractor: 'id',
  cellConfig: {
    field: '',
    textAlign: 'center',
    textColor: 'black',
  },
  tableData: {},
  onCellClick: () => {},
}

export default CustomTableCellDateComponent
