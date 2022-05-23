import React from 'react'
import PropTypes, { shape } from 'prop-types'
import { CSpinner, CTable, CTableBody, CTableDataCell, CTableHead, CTableRow } from '@coreui/react'
import {
  CustomTableHeaderCheck,
  CustomTableHeaderSort,
  CustomTableHeaderText,
} from './table-header'
import {
  CustomTableCellAction,
  CustomTableCellBadge,
  CustomTableCellCheck,
  CustomTableCellDate,
  CustomTableCellText,
} from './table-cell'
import CustomTableDetailTextComponent from './table-cell/table-cell-detail'
import CustomTableActionComponent from './table-action'

const CustomTableContainerComponent = (props) => {
  const {
    tableField,
    headerConfig,
    cellConfig,
    tableData,
    onCellClick,
    onCellCheck,
    onHeaderCheck,
    onHeaderSort,
    isLoading,
    keyExtractor,
    paginationData,
    isHeaderChecked,
    isServerSide,
    isPaginationEnabled,
    defaultCheckedCellExtractor,
    defaultCheckedCellValue,
    onAutoCheckCell,
  } = props
  const { totalData, totalRow, page } = paginationData

  const renderField = (type = 'header') => (
    <>
      {tableField.map((field) =>
        type === 'header' ? renderTableHeader(field) : renderTableCell(field),
      )}
    </>
  )
  const renderTableHeader = (field) => (
    <>
      {headerConfig.map((header, index) => (
        <>{header.field === field && getHeaderType(header, index)}</>
      ))}
    </>
  )
  const renderTableCell = () => {
    const startRow = Number(totalRow * page - totalRow)
    const loopNumber = totalRow <= totalData - startRow ? totalRow : totalData - startRow
    if (isPaginationEnabled) {
      return Array(loopNumber)
        .fill(0)
        .map((_, index) => (
          <CTableRow key={index} align="middle">
            {tableField.map((field, idx) => (
              <>
                {getCellType(
                  cellConfig[cellConfig.findIndex((cell) => cell.field === field)],
                  tableData[isServerSide ? index : index + startRow],
                  index,
                )}
              </>
            ))}
          </CTableRow>
        ))
    } else {
      return tableData.map((data, index) => (
        <CTableRow key={index} align="middle">
          {tableField.map((field, idx) => (
            <>
              {getCellType(
                cellConfig[cellConfig.findIndex((cell) => cell.field === field)],
                data,
                index,
              )}
            </>
          ))}
        </CTableRow>
      ))
    }
  }

  const getHeaderType = (header, index) => {
    switch (header.cellType) {
      case 'CHECK':
        return (
          <CustomTableHeaderCheck
            key={index}
            headerConfig={header}
            onHeaderCheck={onHeaderCheck}
            tableData={tableData}
          />
        )
      case 'TEXT':
        return <CustomTableHeaderText key={index} headerConfig={header} />
      case 'SORT':
        return (
          <CustomTableHeaderSort
            key={index}
            headerConfig={header}
            onHeaderSort={onHeaderSort}
            tableData={tableData}
          />
        )

      default:
        return <CustomTableHeaderText key={index} headerConfig={header} />
    }
  }
  const getCellType = (cell, data, index) => {
    switch (cell.cellType) {
      case 'CHECK':
        return (
          <CustomTableCellCheck
            key={index}
            tableData={data}
            cellConfig={cell}
            onCellCheck={onCellCheck}
            keyExtractor={keyExtractor}
            isHeaderChecked={isHeaderChecked}
            defaultCheckedCellExtractor={defaultCheckedCellExtractor}
            defaultCheckedCellValue={defaultCheckedCellValue}
            onAutoCheckCell={onAutoCheckCell}
            queueNumber={index + 1}
          />
        )
      case 'TEXT':
        return (
          <CustomTableCellText
            key={index}
            tableData={data}
            cellConfig={cell}
            onCellClick={onCellClick}
            keyExtractor={keyExtractor}
          />
        )
      case 'BADGE':
        return (
          <CustomTableCellBadge
            key={index}
            tableData={data}
            cellConfig={cell}
            onCellClick={onCellClick}
            keyExtractor={keyExtractor}
          />
        )
      case 'DATE':
        return (
          <CustomTableCellDate
            key={index}
            tableData={data}
            cellConfig={cell}
            onCellClick={onCellClick}
            keyExtractor={keyExtractor}
          />
        )
      case 'DETAIL':
        return (
          <CustomTableDetailTextComponent
            key={index}
            tableData={data}
            cellConfig={cell}
            onCellClick={onCellClick}
            keyExtractor={keyExtractor}
          />
        )
      case 'ACTION':
        return (
          <CustomTableCellAction
            key={index}
            tableData={data}
            cellConfig={cell}
            onCellClick={onCellClick}
            keyExtractor={keyExtractor}
          />
        )

      default:
        return (
          <CustomTableCellText
            key={index}
            tableData={data}
            cellConfig={cell}
            onCellClick={onCellClick}
            keyExtractor={keyExtractor}
          />
        )
    }
  }
  const defaultCell = (element = '') => (
    <CTableRow>
      <CTableDataCell className="text-center bg-light py-4 text-bold" colSpan={headerConfig.length}>
        {element}
      </CTableDataCell>
    </CTableRow>
  )

  return (
    <CTable small striped hover responsive>
      <CTableHead>
        <CTableRow>{renderField('header')}</CTableRow>
      </CTableHead>
      <CTableBody>
        {isLoading
          ? defaultCell(
              <>
                <CSpinner className="mx-1" size="sm" variant="grow" />
                <CSpinner className="mx-1" size="sm" variant="grow" />
                <CSpinner className="mx-1" size="sm" variant="grow" />
              </>,
            )
          : tableData.length > 0
          ? renderTableCell()
          : defaultCell('Data tidak tersedia!')}
      </CTableBody>
    </CTable>
  )
}

CustomTableContainerComponent.propTypes = {
  tableField: PropTypes.array,
  headerConfig: PropTypes.arrayOf(
    shape({
      field: PropTypes.string,
      cellType: PropTypes.oneOf(['CHECK', 'TEXT', 'SORT']),
      bgColor: PropTypes.string,
      height: PropTypes.string,
      textAlign: PropTypes.oneOf(['left', 'right', 'center']),
      textColor: PropTypes.string,
      label: PropTypes.string,
      isSort: PropTypes.bool,
      isCheck: PropTypes.bool,
      sortKey: PropTypes.string,
    }),
  ),
  onHeaderCheck: PropTypes.func,
  onHeaderSort: PropTypes.func,
  cellConfig: PropTypes.arrayOf(
    shape({
      field: PropTypes.string,
      cellType: PropTypes.oneOf(['CHECK', 'TEXT', 'DETAIL', 'BADGE']),
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
  ),
  onCellClick: PropTypes.func,
  onCellCheck: PropTypes.func,
  tableData: PropTypes.array,
  isLoading: PropTypes.bool,
  keyExtractor: PropTypes.string,
  isServerSide: PropTypes.bool,
  paginationData: PropTypes.shape({
    totalData: PropTypes.number,
    totalRow: PropTypes.number,
    page: PropTypes.number,
  }),
  isHeaderChecked: PropTypes.bool,
  isPaginationEnabled: PropTypes.bool,
  defaultCheckedCellExtractor: PropTypes.string,
  defaultCheckedCellValue: PropTypes.array,
  onAutoCheckCell: PropTypes.func,
}
CustomTableContainerComponent.defaultProps = {
  isHeaderChecked: false,
  keyExtractor: 'id',
  tableField: [],
  headerConfig: [],
  cellConfig: [],
  tableData: [],
  isLoading: false,
  isServerSide: false,
  defaultCheckedCellExtractor: '',
  defaultCheckedCellValue: [],
  onCellClick: () => {},
  onCellCheck: () => {},
  onHeaderCheck: () => {},
  onHeaderSort: () => {},
  paginationData: {
    totalData: 0,
    totalRow: 10,
    page: 0,
  },
  isPaginationEnabled: true,
  onAutoCheckCell: () => {},
}

export default CustomTableContainerComponent
