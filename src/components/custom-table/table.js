import React from 'react'
import PropTypes, { shape } from 'prop-types'
import { CCol, CContainer, CRow } from '@coreui/react'
import CustomTableFilterComponent from './table-filter'
import CustomTableActionComponent from './table-action'
import CustomTablePaginationComponent from './table-pagination'
import CustomTableContainerComponent from './table-container'

const CustomTableComponent = (props) => {
  const {
    toolbar,
    tableField,
    headerConfig,
    onHeaderCheck,
    onHeaderSort,
    cellConfig,
    onCellCheck,
    onCellClick,
    tableData,
    tableKeyExtractor,
    paginationData,
    isServerSide,
    onChangePage,
    onChangePageSize,
    onChangeAction,
    onResetAction,
    listAction,
    onDataSearch,
    isHeaderChecked,
    isActionEnabled,
    isSearchEnabled,
    isPaginationEnabled,
    customContainerClass,
    isTableLoading,
    defaultCheckedCellValue,
    defaultCheckedCellExtractor,
    onAutoCheckCell,
    actionText,
  } = props
  const [clientPagination, setClientPagination] = React.useState({
    totalData: 0,
    totalRow: 0,
    page: 0,
  })

  const _clientSidePagination = (newPaginationData) => {
    if (clientPagination) {
      setClientPagination(newPaginationData)
    }
  }

  React.useEffect(() => {
    setClientPagination(paginationData)
  }, [paginationData])

  return (
    <CContainer fluid className={customContainerClass}>
      <CCol xs={12}>
        <CRow>
          <CCol>
            {toolbar
              ? toolbar
              : isSearchEnabled && <CustomTableFilterComponent onDataSearch={onDataSearch} />}
          </CCol>
          <CCol xs={5}>
            {isSearchEnabled && toolbar ? (
              <CustomTableFilterComponent onDataSearch={onDataSearch} />
            ) : (
              isPaginationEnabled && (
                <CustomTablePaginationComponent
                  paginationData={paginationData}
                  isServerSide={isServerSide}
                  clientSidePagination={_clientSidePagination}
                  onChangePageSize={onChangePageSize}
                  onChangePage={onChangePage}
                />
              )
            )}
          </CCol>
        </CRow>
      </CCol>
      <CCol xs={12}>
        <CRow>
          <CCol>
            {isActionEnabled && (
              <CustomTableActionComponent
                onChangeAction={onChangeAction}
                onResetAction={onResetAction}
                listAction={listAction}
                actionText={actionText}
              />
            )}
          </CCol>
          <CCol xs={5}>
            {isPaginationEnabled && isSearchEnabled && toolbar && (
              <CustomTablePaginationComponent
                paginationData={paginationData}
                isServerSide={isServerSide}
                clientSidePagination={_clientSidePagination}
                onChangePageSize={onChangePageSize}
                onChangePage={onChangePage}
              />
            )}
          </CCol>
        </CRow>
      </CCol>
      <CCol xs={12} className="mt-4">
        <CustomTableContainerComponent
          isServerSide={isServerSide}
          isLoading={isTableLoading}
          keyExtractor={tableKeyExtractor}
          tableField={tableField}
          headerConfig={headerConfig}
          onHeaderCheck={onHeaderCheck}
          onHeaderSort={onHeaderSort}
          cellConfig={cellConfig}
          onCellCheck={onCellCheck}
          onCellClick={onCellClick}
          tableData={tableData}
          paginationData={isServerSide ? paginationData : clientPagination}
          isHeaderChecked={isHeaderChecked}
          isPaginationEnabled={isPaginationEnabled}
          defaultCheckedCellExtractor={defaultCheckedCellExtractor}
          defaultCheckedCellValue={defaultCheckedCellValue}
          onAutoCheckCell={onAutoCheckCell}
        />
      </CCol>
    </CContainer>
  )
}

CustomTableComponent.propTypes = {
  tableKeyExtractor: PropTypes.string,
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
    }),
  ),
  onCellClick: PropTypes.func,
  onCellCheck: PropTypes.func,
  tableData: PropTypes.array,
  toolbar: PropTypes.instanceOf(Element),
  paginationData: PropTypes.object,
  isServerSide: PropTypes.bool,
  onChangePageSize: PropTypes.func,
  onChangePage: PropTypes.func,
  onChangeAction: PropTypes.func,
  onResetAction: PropTypes.func,
  listAction: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
      isDisabled: PropTypes.bool,
      isVisible: PropTypes.bool,
    }),
  ),
  onDataSearch: PropTypes.func,
  isHeaderChecked: PropTypes.bool,
  isActionEnabled: PropTypes.bool,
  isSearchEnabled: PropTypes.bool,
  isPaginationEnabled: PropTypes.bool,
  customContainerClass: PropTypes.string,
  isTableLoading: PropTypes.bool,
  defaultCheckedCellExtractor: PropTypes.string,
  defaultCheckedCellValue: PropTypes.array,
  onAutoCheckCell: PropTypes.func,
  actionText: PropTypes.string,
}

CustomTableComponent.defaultProps = {
  customContainerClass: '',
  toolbar: null,
  isServerSide: false,
  isActionEnabled: true,
  isSearchEnabled: true,
  isPaginationEnabled: true,
  isTableLoading: false,
  defaultCheckedCellExtractor: '',
  defaultCheckedCellValue: [],
  actionText: 'Action',
  onChangePage: () => {},
  onChangePageSize: () => {},
  onChangeAction: () => {},
  onResetAction: () => {},
  onDataSearch: () => {},
  onAutoCheckCell: () => {},
}

export default CustomTableComponent
