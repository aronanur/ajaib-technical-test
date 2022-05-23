import React from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from '@coreui/react'

const CustomModalComponent = (props) => {
  const {
    modalTitle,
    modalContent,
    isShow,
    onHide,
    onShow,
    actionText,
    onClickAction,
    isActionLoading,
    setIsShow,
    isActionDisabled,
    modalSize,
    isFullScreenModal,
  } = props

  const closeModal = () => {
    setIsShow(false)
    onHide()
  }
  React.useEffect(() => {
    if (isShow) onShow()
  }, [isShow])

  return (
    <CModal
      fullscreen={isFullScreenModal}
      size={modalSize}
      visible={isShow}
      onClose={closeModal}
      backdrop="static"
    >
      <CModalHeader onClose={closeModal}>
        <CModalTitle>{modalTitle}</CModalTitle>
      </CModalHeader>
      <CModalBody>{modalContent || ''}</CModalBody>
      <CModalFooter>
        <CButton
          disabled={isActionLoading || isActionDisabled}
          color="primary"
          size="sm"
          onClick={() => onClickAction()}
          className="main-blue-color"
        >
          {isActionLoading ? (
            <>
              <CSpinner component="span" size="sm" aria-hidden="true" /> Loading...
            </>
          ) : (
            <>{actionText}</>
          )}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

CustomModalComponent.propTypes = {
  modalTitle: PropTypes.string,
  modalContent: PropTypes.element,
  isShow: PropTypes.bool,
  onShow: PropTypes.func,
  onHide: PropTypes.func,
  actionText: PropTypes.string,
  onClickAction: PropTypes.func,
  isActionLoading: PropTypes.bool,
  isActionDisabled: PropTypes.bool,
  setIsShow: PropTypes.func,
  modalSize: PropTypes.oneOfType(['lg', 'xl', 'sm']),
  isFullScreenModal: PropTypes.bool,
}
CustomModalComponent.defaultProps = {
  modalTitle: 'Modal Title',
  isShow: false,
  actionText: 'Submit',
  onShow: () => {},
  onHide: () => {},
  onClickAction: () => {},
  setIsShow: () => {},
  isActionDisabled: false,
  isActionLoading: false,
  modalSize: '',
  isFullScreenModal: false,
}

export default CustomModalComponent
