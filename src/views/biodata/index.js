import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CRow, CCol, CCard, CCardBody, CCardTitle } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import useFocusAndCleanUpHook from 'src/customHooks/focusAndCleanUpHook'
import { CustomTable } from 'src/components'
import BiodataConfig from 'src/const/config/biodata-config.const'
import { loadListBiodata, resetListBiodata } from 'src/store/actions/biodataAction'

const BiodataPage = () => {
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const { isLoading, listBiodata } = useSelector((state) => state.biodataReducer)

  const onHeaderSort = ({ field, sortType }) => {
    const paramsData = { ...listBiodata.paginationData }
    paramsData.sortOrder = sortType ? (sortType === 'ASC' ? 'ascend' : 'descend') : ''
    paramsData.sortBy = field
    dispatch(loadListBiodata(paramsData))
  }
  const onChangePageSize = (newSize) => {
    const paramsData = { ...listBiodata.paginationData }
    paramsData.totalRow = newSize
    dispatch(loadListBiodata(paramsData))
  }
  const onChangePage = (newPage) => {
    const paramsData = { ...listBiodata.paginationData }
    paramsData.page = newPage
    dispatch(loadListBiodata(paramsData))
  }
  const onChangeAction = ({ key, value }) => {
    const paramsData = { ...listBiodata.paginationData }
    paramsData.filter = {
      key,
      value,
    }
    dispatch(loadListBiodata(paramsData))
  }
  const onResetAction = ({ key, value }) => {
    const paramsData = { ...listBiodata.paginationData }
    paramsData.filter = { key, value }
    dispatch(loadListBiodata(paramsData))
  }
  const onDataSearch = (keyword) => {
    const paramsData = { ...listBiodata.paginationData }
    paramsData.keyword = keyword

    dispatch(loadListBiodata(paramsData))
  }

  useFocusAndCleanUpHook(
    'biodata',
    () => {
      const { page, totalRow, totalData } = BiodataConfig.paginationDataDefault
      dispatch(
        loadListBiodata({
          page,
          totalRow,
          totalData,
        }),
      )
    },
    () => {
      dispatch(resetListBiodata())
    },
  )

  return (
    <CRow>
      <CCol md={12}>
        <CCard className="py-2 px-2">
          <CCardBody>
            <CCardTitle>Biodata</CCardTitle>
            <hr></hr>
            <CustomTable
              tableField={BiodataConfig.tableField}
              tableData={listBiodata?.data}
              headerConfig={BiodataConfig.headerConfig}
              cellConfig={BiodataConfig.cellConfig}
              tableKeyExtractor={'id'}
              isTableLoading={isLoading}
              onHeaderSort={onHeaderSort}
              onChangePageSize={onChangePageSize}
              onChangePage={onChangePage}
              onChangeAction={onChangeAction}
              onResetAction={onResetAction}
              onDataSearch={onDataSearch}
              listAction={BiodataConfig.listAction}
              paginationData={listBiodata.paginationData}
              isServerSide={true}
              toolbar={<></>}
              actionText={'Gender'}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default BiodataPage
