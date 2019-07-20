import React from 'react'
import PropTypes from 'prop-types'

import styles from '../styles/DoteOverlay.module.scss'

class DoteNote extends React.Component {
  constructor(props) {
    super(props)

    const { notes=null } = props

    this.state = {
      noteValue: notes,
      saving: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSaveClick = this.handleSaveClick.bind(this)
  }

  handleChange(e) {
    this.setState({
      noteValue: e.target.value
    })
  }

  handleSaveClick() {
    const { noteValue } = this.state;
    this.setState({noteValue: null, saving: true})
    if (this.props.onSaveNote) {
      this.props.onSaveNote(noteValue)
    }
  }

  render() {
    return (
      <div>
        <hr />
        <h2 className={styles.h2}>Dote Note</h2>
        <div className={'alert alert-danger'}>This feature is currently broken :{'('}</div>
        {/* <form>
          <div className={"form-group"}>
            <textarea className={"form-control"} rows="10" defaultValue={this.props.notes} onChange={this.handleChange}></textarea>
          </div>
          {this.state.saving? null: <button className={"btn btn-success"} type="button" onClick={this.handleSaveClick}>save dote note</button>}
        </form> */}
      </div>
    )
  }
}

DoteNote.propTypes = {
  notes: PropTypes.string,
  onSaveNote: PropTypes.func
}

export default DoteNote
