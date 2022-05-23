import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDoubleLeft,
  faAngleLeft,
  faAngleDoubleRight,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons'

const CustomTablePaginationComponent = (props) => {
  const pageSize = [10, 25, 50]
  const { paginationData, clientSidePagination, isServerSide, onChangePageSize, onChangePage } =
    props
  const [pageNumber, setPageNumber] = React.useState(0)
  const [totalPage, setTotalPage] = React.useState(0)
  const [defaultPageSize, setDefaultPageSize] = React.useState(10)
  const logicPageOf = (data) => {
    const { totalData, totalRow, page } = data
    const currentPage = page
    const totalPage = Math.ceil(+totalData / +totalRow) || 0
    setPageNumber(totalPage <= 0 ? totalPage : currentPage)
    setTotalPage(totalPage)
  }
  const logicTextInput = (event) => {
    const { value } = event?.target
    const defaultValue = value <= -1 ? 1 : value
    const fixedValue = defaultValue > totalPage ? totalPage : defaultValue
    setPageNumber(fixedValue)
    onChangePage(fixedValue)
    if (!isServerSide) {
      clientSidePagination({ ...paginationData, page: fixedValue })
    }
  }
  const changePageSize = (e) => {
    const { innerText } = e.target
    setDefaultPageSize(+innerText)
    onChangePageSize(+innerText)
  }
  React.useEffect(() => {
    logicPageOf(paginationData)
  }, [paginationData])
  return (
    <CRow>
      <CCol></CCol>
      <CCol xs={'auto'}>
        <CDropdown variant="btn-group" alignment={{ xs: 'start' }}>
          <div className="btn-action-size">
            <CInputGroupText className="btn-action-text-size">{defaultPageSize}</CInputGroupText>
            <CDropdownToggle className="btn-action-toggle-size" color="light" shape="rounded-0" />
          </div>
          <CDropdownMenu className="collapse-action">
            {pageSize.map((size, index) => (
              <CDropdownItem key={index} onClick={changePageSize}>
                {size}
              </CDropdownItem>
            ))}
          </CDropdownMenu>
        </CDropdown>
        <span className="btn-action-span" style={{ paddingRight: 20 }}>
          {' '}
          per page
        </span>
        <CButton
          size="sm"
          color="light"
          className="input-pagination"
          disabled={pageNumber === 0}
          onClick={() => {
            setPageNumber(1)
            onChangePage(1)
            if (!isServerSide) {
              clientSidePagination({ ...paginationData, page: 1 })
            }
          }}
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </CButton>{' '}
        &nbsp;
        <CButton
          size="sm"
          color="light"
          className="input-pagination"
          disabled={pageNumber === 0 || pageNumber === 1}
          onClick={() => {
            setPageNumber(pageNumber - 1)
            onChangePage(pageNumber - 1)
            if (!isServerSide) {
              clientSidePagination({ ...paginationData, page: pageNumber - 1 })
            }
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </CButton>{' '}
        &nbsp;
        <input
          disabled={pageNumber === 0 || pageNumber === totalPage}
          type={'number'}
          className="input-pagination text-center"
          style={{ width: 35 }}
          value={pageNumber}
          onChange={(event) => logicTextInput(event)}
        />{' '}
        &nbsp;
        <span className="input-pagination-text">of {totalPage}</span> &nbsp;
        <CButton
          size="sm"
          color="light"
          className="input-pagination"
          disabled={pageNumber === 0 || pageNumber >= totalPage}
          onClick={() => {
            setPageNumber(pageNumber + 1)
            onChangePage(pageNumber + 1)
            if (!isServerSide) {
              clientSidePagination({ ...paginationData, page: pageNumber + 1 })
            }
          }}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </CButton>{' '}
        &nbsp;
        <CButton
          size="sm"
          color="light"
          className="input-pagination"
          disabled={pageNumber === 0}
          onClick={() => {
            setPageNumber(totalPage)
            onChangePage(totalPage)
            if (!isServerSide) {
              clientSidePagination({ ...paginationData, page: totalPage })
            }
          }}
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </CButton>
      </CCol>
    </CRow>
  )
}

CustomTablePaginationComponent.propTypes = {
  paginationData: PropTypes.shape({
    totalData: PropTypes.number,
    totalRow: PropTypes.number,
    page: PropTypes.number,
  }),
  isServerSide: PropTypes.bool,
  clientSidePagination: PropTypes.func,
  onChangePageSize: PropTypes.func,
  onChangePage: PropTypes.func,
}
CustomTablePaginationComponent.defaultProps = {
  paginationData: {
    totalData: 0,
    totalRow: 10,
    page: 0,
    isServerSide: false,
    onChangePage: () => {},
    clientSidePagination: () => {},
    onChangePageSize: () => {},
  },
}

export default CustomTablePaginationComponent
