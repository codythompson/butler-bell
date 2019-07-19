import React from 'react'

import styles from '../styles/DoteOverlay.module.scss'

export default function () {
  return (
    <div>
      <hr/>
      <h2 className={styles.h2}>Dote Note</h2>
      <form>
        <div className={"form-group"}>
          <textarea className={"form-control"} rows="10"></textarea>
        </div>
        <button className={"btn btn-success"} type="submit">save dote note</button>
      </form>
    </div>
  )
}