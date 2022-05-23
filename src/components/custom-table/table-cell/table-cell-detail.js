import React from 'react'
import PropTypes, { shape } from 'prop-types'
import { CButton, CListGroup, CListGroupItem, CTableDataCell } from '@coreui/react'
import { CustomModal } from '../..'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CustomTableDetailTextComponent = (props) => {
  const [isShowModal, setIsShowModal] = React.useState(false)
  const { cellConfig, tableData, onCellClick, keyExtractor } = props
  const {
    field,
    textAlign,
    textColor,
    buttonColor,
    detailText,
    detailTextColor,
    buttonIcon,
    iconSource,
    modalSize,
    modalTitle,
    actionText,
    ModalContent,
    onShowModal,
    onHideModal,
    isFullScreenModal,
  } = cellConfig
  return (
    <CTableDataCell
      className="custom-table-container-cell"
      style={{ textAlign: textAlign, color: textColor }}
    >
      <CButton
        onClick={() => {
          onCellClick({
            data: tableData,
            value: tableData[field],
            id: tableData[keyExtractor],
          })
          setIsShowModal(true)
        }}
        color={buttonColor}
        size="sm"
        style={{ color: 'white', height: 25, fontSize: 12 }}
      >
        {buttonIcon && <FontAwesomeIcon icon={iconSource} color={detailTextColor} />}{' '}
        <span style={{ color: detailTextColor }}>{detailText || 'View'}</span>
      </CButton>
      <CustomModal
        isFullScreenModal={isFullScreenModal}
        onShow={onShowModal}
        onHide={onHideModal}
        modalSize={modalSize}
        modalTitle={modalTitle}
        isShow={isShowModal}
        setIsShow={setIsShowModal}
        actionText={actionText}
        onClickAction={() => setIsShowModal(false)}
        modalContent={
          ModalContent ? (
            <ModalContent data={tableData} />
          ) : (
            <CListGroup flush>
              {tableData[field] ? (
                tableData[field]
                  .split(',')
                  .map((data, index) => <CListGroupItem key={index}>{data}</CListGroupItem>)
              ) : (
                <h5>No Data</h5>
              )}
            </CListGroup>
          )
        }
      />
    </CTableDataCell>
  )
}

CustomTableDetailTextComponent.propTypes = {
  cellConfig: shape({
    field: PropTypes.string,
    textAlign: PropTypes.oneOf(['left', 'right', 'center']),
    textColor: PropTypes.string,
    cellConfig: {
      isBadge: PropTypes.bool,
      badgeColor: PropTypes.string,
      buttonDetailIcon: PropTypes.element,
      buttonDetailColor: PropTypes.string,
      detailText: PropTypes.string,
      detailTextColor: PropTypes.string,
      buttonIcon: PropTypes.bool,
      iconSource: PropTypes.any,
      modalSize: PropTypes.oneOf(['sm', 'lg', 'xl', 'none']),
      modalTitle: PropTypes.string,
      actionText: PropTypes.string,
      ModalContent: PropTypes.element,
      onShowModal: PropTypes.func,
      onHideModal: PropTypes.func,
      isFullScreenModal: PropTypes.bool,
    },
  }),
  onCellClick: PropTypes.func,
  tableData: PropTypes.object,
  keyExtractor: PropTypes.string,
}
CustomTableDetailTextComponent.defaultProps = {
  keyExtractor: 'id',
  cellConfig: {
    field: '',
    textAlign: 'center',
    textColor: 'white',
    detailText: 'View',
    buttonColor: 'primary',
    detailTextColor: 'black',
    buttonIcon: false,
    iconSource: null,
    modalSize: 'none',
    ModalTitle: 'View Detail',
    actionText: 'Close',
    onShowModal: () => {},
    onHideModal: () => {},
    isFullScreenModal: false,
  },
  tableData: {},
  onCellClick: () => {},
}

export default CustomTableDetailTextComponent
