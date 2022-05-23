import React from 'react'
import PropTypes, { shape } from 'prop-types'
import { CTableDataCell } from '@coreui/react'

const CustomTableCellTextComponent = (props) => {
  const { cellConfig, tableData, onCellClick, keyExtractor } = props
  const { field, textAlign, textColor, suffix, prefix, textFormat, useTextFormat, textUnderline } =
    cellConfig
  return (
    <CTableDataCell
      className="custom-table-container-cell"
      style={{
        textAlign: textAlign,
        color: textColor,
        textDecorationLine: textUnderline ? 'underline' : '',
        cursor: textUnderline ? 'pointer' : 'default',
      }}
      onClick={() =>
        onCellClick({
          data: tableData,
          value: tableData[field],
          id: tableData[keyExtractor],
          field,
        })
      }
    >
      {useTextFormat
        ? textFormat(tableData[field])
        : `${suffix || ''}${tableData[field]}${prefix || ''}`}
    </CTableDataCell>
  )
}

CustomTableCellTextComponent.propTypes = {
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
CustomTableCellTextComponent.defaultProps = {
  keyExtractor: 'id',
  cellConfig: {
    field: '',
    textAlign: 'center',
    textColor: 'black',
    suffix: '',
    prefix: '',
    textFormat: () => {},
    useTextFormat: false,
    textUnderline: false,
  },
  tableData: {},
  onCellClick: () => {},
}

export default CustomTableCellTextComponent
