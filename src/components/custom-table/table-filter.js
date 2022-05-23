import React from 'react'
import CIcon from '@coreui/icons-react'
import PropTypes from 'prop-types'
import { cilSearch } from '@coreui/icons'
import {
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'

const CustomTableFilterComponent = (props) => {
  const { onDataSearch } = props
  const [keyword, setKeyword] = React.useState('')

  const _searchHandler = (e) => {
    setKeyword(e.target.value)
  }
  const _submitHandler = (e) => {
    e.preventDefault()
    onDataSearch(keyword)
    setKeyword('')
  }

  return (
    <CRow className="justify-content-end">
      <CCol xs={8}>
        <CForm onSubmit={_submitHandler}>
          <CInputGroup className="mb-3 input-search-group">
            <CInputGroupText className="btn-group-text">
              <CIcon icon={cilSearch} />
            </CInputGroupText>
            <CFormInput
              style={{ border: 'none' }}
              value={keyword}
              placeholder="Search (please enter when you stop writing)"
              onChange={_searchHandler}
            />
          </CInputGroup>
        </CForm>
      </CCol>
    </CRow>
  )
}

CustomTableFilterComponent.propTypes = {
  onDataSearch: PropTypes.func,
}
CustomTableFilterComponent.defaultProps = {
  onDataSearch: () => {},
}

export default CustomTableFilterComponent
