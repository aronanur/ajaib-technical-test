import React from 'react'
import PropTypes, { shape } from 'prop-types'
import { CFormCheck, CTableDataCell } from '@coreui/react'

const CustomTableCellCheckComponent = (props) => {
  const [isCheck, setIsCheck] = React.useState(false)
  const {
    cellConfig,
    tableData,
    onCellCheck,
    keyExtractor,
    isHeaderChecked,
    defaultCheckedCellExtractor,
    defaultCheckedCellValue,
    onAutoCheckCell,
    queueNumber,
  } = props
  const { field } = cellConfig
  const checkField = () => {
    setIsCheck(!isCheck)
    onCellCheck({
      data: tableData,
      value: tableData[field],
      id: tableData[keyExtractor],
      isCheck: !isCheck,
    })
  }
  React.useEffect(() => {
    setIsCheck(isHeaderChecked)
  }, [isHeaderChecked])

  React.useEffect(() => {
    if (defaultCheckedCellValue.length > 0) {
      let defaultValue = defaultCheckedCellValue
      if (!Array.isArray(defaultCheckedCellValue)) {
        defaultValue = defaultCheckedCellValue.split(';')
      }
      let isChecked = defaultValue.some((value) => value === tableData[defaultCheckedCellExtractor])
      if (isChecked) {
        setTimeout(() => {
          onAutoCheckCell({
            data: tableData,
            value: tableData[field],
            id: tableData[keyExtractor],
            isCheck: isChecked,
          })
          setIsCheck(isChecked)
        }, queueNumber * 200)
      }
    }
  }, [defaultCheckedCellValue])

  return (
    <CTableDataCell className="custom-table-container-cell">
      <CFormCheck checked={isCheck} onChange={checkField} value={isCheck} />
    </CTableDataCell>
  )
}

CustomTableCellCheckComponent.propTypes = {
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
    isCheck: PropTypes.bool,
  }),
  onCellCheck: PropTypes.func,
  tableData: PropTypes.object,
  keyExtractor: PropTypes.string,
  isHeaderChecked: PropTypes.bool,
  defaultCheckedCellExtractor: PropTypes.string,
  defaultCheckedCellValue: PropTypes.array,
  onAutoCheckCell: PropTypes.func,
  queueNumber: PropTypes.number,
}
CustomTableCellCheckComponent.defaultProps = {
  keyExtractor: 'id',
  isHeaderChecked: false,
  cellConfig: {
    field: '',
    textAlign: 'center',
    textColor: 'black',
  },
  isCheck: false,
  tableData: {},
  defaultCheckedCellExtractor: '',
  defaultCheckedCellValue: [],
  queueNumber: 0,
  onCellCheck: () => {},
  onAutoCheckCell: () => {},
}

export default CustomTableCellCheckComponent
