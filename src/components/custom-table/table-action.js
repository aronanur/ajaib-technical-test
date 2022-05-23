import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CInputGroupText,
} from '@coreui/react'

const CustomTableActionComponent = (props) => {
  const { listAction, onChangeAction, actionText, onResetAction } = props
  const [selectedLabel, setSelectedLabel] = React.useState(null)
  const _changeAction = (e, key) => {
    const { attributes, innerText } = e.target
    setSelectedLabel(innerText)
    onChangeAction({ label: innerText, value: attributes?.value?.value, key })
  }
  const _resetAction = () => {
    setSelectedLabel(null)
    onResetAction({ value: null, key: null })
  }
  return (
    <>
      <span className="filter-text">Filter</span>
      <CDropdown variant="btn-group" popper alignment={{ xs: 'start' }}>
        <div className="btn-action">
          <CInputGroupText className="btn-action-text">
            {selectedLabel || actionText}
          </CInputGroupText>
          <CDropdownToggle className="btn-action-toggle" color="light" shape="rounded-0" />
        </div>
        <CDropdownMenu className="collapse-action">
          {listAction.length > 0 &&
            listAction.map((action, index) => (
              <>
                {action.isVisible && (
                  <CDropdownItem
                    key={index}
                    className="collapse-action-item"
                    disabled={action.isDisabled}
                    value={action.value}
                    onClick={(e) => _changeAction(e, action?.key)}
                  >
                    {action.label}
                  </CDropdownItem>
                )}
              </>
            ))}
        </CDropdownMenu>
      </CDropdown>
      <CButton
        onClick={_resetAction}
        color="dark"
        variant="outline"
        size="sm"
        className="reset-filter-button"
      >
        Reset Filter
      </CButton>
    </>
  )
}

CustomTableActionComponent.propTypes = {
  listAction: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
      isDisabled: PropTypes.bool,
      isVisible: PropTypes.bool,
    }),
  ),
  onChangeAction: PropTypes.func,
  onResetAction: PropTypes.func,
  actionText: PropTypes.string,
}
CustomTableActionComponent.defaultProps = {
  listAction: [{ value: '1', label: 'Example', isDisabled: false, isVisible: true }],
  onChangeAction: () => {},
  onResetAction: () => {},
  actionText: 'Action',
}

export default CustomTableActionComponent
