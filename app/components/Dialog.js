import React from 'react'
import classNames from 'classnames'

import styles from '../styles/Dialog.module.scss'

export default function ({ titleText, bodyText, cancelText='cancel', confirmText='yes', onConfirm, onCancel }) {
  return (
    <div id={'DialogContainer'}>
      <div className={classNames('modal-backdrop', styles.DialogBackdrop)}></div>
      <div className={'modal d-block'} role="modal">
        <div className={'modal-dialog'} role="document">
          <div className={'modal-content'}>
            <div className={'modal-header'}>
              <h5 className={'modal-title'}>{titleText}</h5>
            </div>
            <div className={'modal-body'}>{bodyText}</div>
            <div className={'modal-footer'}>
              <button type="button" className={'btn btn-secondary'} onClick={onCancel}>{cancelText}</button>
              <button type="button" className={'btn btn-info'} onClick={onConfirm}>{confirmText}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}