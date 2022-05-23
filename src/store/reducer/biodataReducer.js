import reduxString from 'src/const/reduxString'

const initialState = {
  isLoading: false,
  listBiodata: {
    data: [],
    paginationData: {
      totalData: 0,
      totalRow: 10,
      page: 1,
      keyword: '',
      filter: {
        key: null,
        value: null,
      },
      sortOrder: '',
      sortBy: '',
    },
  },
}

const biodataReducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
      }
    case reduxString.REQUEST_LIST_BIODATA:
      return {
        ...state,
        isLoading: true,
      }
    case reduxString.SET_LIST_BIODATA:
      return {
        ...state,
        listBiodata: action.payload,
        isLoading: false,
      }
    case reduxString.RESET_LIST_BIODATA:
      return {
        ...state,
        listBiodata: {
          data: [],
          paginationData: {
            totalData: 0,
            totalRow: 10,
            page: 1,
          },
        },
      }
    default:
      return state
  }
}

export default biodataReducer
