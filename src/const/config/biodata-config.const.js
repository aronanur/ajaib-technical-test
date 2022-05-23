const BiodataConfig = {
  tableField: ['username', 'name', 'email', 'gender', 'registeredDate'],
  headerConfig: [
    {
      field: 'username',
      cellType: 'TEXT',
      label: 'Username',
      isSort: false,
      isCheck: false,
      sortKey: 'username',
    },
    {
      field: 'name',
      cellType: 'SORT',
      label: 'Name',
      isSort: false,
      isCheck: false,
      sortKey: 'name',
    },
    {
      field: 'email',
      cellType: 'SORT',
      label: 'Email',
      isSort: false,
      isCheck: false,
      sortKey: 'email',
    },
    {
      field: 'gender',
      cellType: 'TEXT',
      label: 'Gender',
      isSort: false,
      isCheck: false,
      sortKey: 'gender',
    },
    {
      field: 'registeredDate',
      cellType: 'SORT',
      label: 'Registered Date',
      isSort: false,
      isCheck: false,
      sortKey: 'registeredDate',
    },
  ],
  cellConfig: [
    { field: 'username', cellType: 'TEXT' },
    { field: 'name', cellType: 'TEXT' },
    { field: 'email', cellType: 'TEXT' },
    {
      field: 'gender',
      cellType: 'BADGE',
      badgeRules: [
        { value: 'male', color: 'primary' },
        { value: 'female', color: 'danger' },
      ],
    },
    {
      field: 'registeredDate',
      cellType: 'DATE',
    },
  ],
  dummyData: [
    {
      username: 'arona',
      name: 'Arona Nur Tetulis',
      email: 'arona.nur.tetulis@gmail.com',
      gender: 'male',
      registeredDate: new Date(),
    },
    {
      username: 'medina',
      name: 'Medina Indah Berliani',
      email: 'meidinaindah@gmail.com',
      gender: 'female',
      registeredDate: new Date(),
    },
  ],
  paginationDataDefault: {
    totalData: 100,
    totalRow: 10,
    page: 1,
    keyword: '',
    sortOrder: 'ascend',
    sortBy: '',
    filter: {
      key: null,
      value: null,
    },
  },
  listAction: [
    { value: 'male', label: 'Male', isDisabled: false, isVisible: true, key: 'gender' },
    { value: 'female', label: 'Female', isDisabled: false, isVisible: true, key: 'gender' },
  ],
}

export default BiodataConfig
