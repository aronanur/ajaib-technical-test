import httpRequest from 'src/const/httpRequest'
import reduxString from 'src/const/reduxString'
import { apiPath } from 'src/const/service-path'

const setListBiodata = (data) => ({
  type: reduxString.SET_LIST_BIODATA,
  payload: data,
})

const requestListBiodata = () => ({
  type: reduxString.REQUEST_LIST_BIODATA,
})

const requestError = () => ({
  type: reduxString.REQUEST_ERROR,
})

const resetListBiodata = () => ({
  type: reduxString.RESET_LIST_BIODATA,
})

const loadListBiodata = ({ page, totalRow, totalData, keyword, filter, sortBy, sortOrder }) => {
  return async (dispatch) => {
    dispatch(requestListBiodata())
    const paramsData = {
      page,
      results: totalRow,
      pageSize: totalData,
    }
    if (keyword) paramsData.keyword = keyword
    if (filter?.key) paramsData[filter.key] = filter.value
    if (sortBy && sortOrder) {
      paramsData.sortBy = sortBy
      paramsData.sortOrder = sortOrder
    }
    try {
      const { data } = await httpRequest.get(apiPath, {
        params: paramsData,
      })
      if (data) {
        const { results, info } = data
        if (info.results > 0) {
          const formattedData = results.map((data) => {
            const { login, name, email, gender, registered } = data
            return {
              username: login?.username,
              name: `${name?.title} ${name?.first} ${name?.last}`,
              email,
              gender,
              registeredDate: registered?.date,
            }
          })
          const payloadData = {
            data: formattedData,
            paginationData: {
              page: info?.page,
              totalRow: info?.results,
              totalData: totalData,
              keyword: keyword,
              filter: filter,
              sortBy,
              sortOrder,
            },
          }
          dispatch(setListBiodata(payloadData))
        }
      }
    } catch (error) {
      dispatch(requestError())
    }
  }
}

export { loadListBiodata, resetListBiodata }
