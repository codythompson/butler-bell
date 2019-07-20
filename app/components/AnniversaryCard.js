import React from 'react'
import classNames from 'classnames'

import styles from '../styles/AnniversaryCard.module.scss'
import themeStyles from '../styles/themes/themes.module.scss'

export default function ({ onClose }) {
  return (
    <div className={styles.AnniversaryCard}>
      <div className={styles.Backdrop}></div>
      <div className={styles.OverlayContainer}>
        <div className={classNames(styles.Overlay, themeStyles.secondaryBackground, themeStyles.tertiaryColor, themeStyles.quaternary_borderColor)}>
          <div className={'container-fluid'}>
            <div className={'row'}>
              <h1 className={classNames(styles.h1, 'col-10')}>Happy Anniversary Ivy!</h1>
              <button type="button" className={classNames(styles.CloseButton, 'col-2 close')} onClick={onClose}>&times;</button>
            </div>
          </div>
          <hr />
          <div className={styles.ContentContainer}>
            <p>
              Hi :{')'}
              These last two years seem to have flown by, and yet I feel like we
              did <strong>SOOOO</strong> many amazing things. We...
            </p>
            <ul>
              <li>Went to Europe</li>
              <li>...twice</li>
              <li>got a dog. He's a fluffy princess</li>
              <li>did we go to the Bahamas too?</li>
              <li>looked for new jobs</li>
              <li>moved</li>
              <li>impressed our husbands with our ever expanding sewing capabilities</li>
              <li>other stuff</li>
            </ul>
            <p>
              A lot of stuff on that list I wouldn't have done if I wasn't with
              you. The best moments of my life wouldn't have happened without you.
              And the worst moments of the last two years would've been so much
              worse without your incredible love and support.
            </p>
            <p>
              Thank you so so so so <i>soooo</i> much for being my big city pal.
            </p>
            <p>
              - Love Beaxue (AKA Cody, AKA the taller pet machine)
            </p>
            <hr/>
            <h3>Tentative Schedule</h3>
            <ul>
              <li>6ish: Ivy gets up and starts sewing (or whatever the fuck she wants to do because today is her day)</li>
              <li>8ish: Cody gets up and makes Ivy some espresso/latte</li>
              <li>8ish: Cody walks the dog</li>
              <li>8:30: Cody cleans up the kitchen because he was noodling too much last night to get it done then.</li>
              <li>10ish: Mimosas</li>
              <li>
                12ish: Tea!
                <ul>
                  <li>Cucumber Sandwiches &amp; Croissants</li>
                  <li>Misc. cheeses, meats, and crackers</li>
                  <li>Cake, cheesecake</li>
                </ul>
              </li>
              <li>6PM Reservation at Le Pichet in Belltown</li>
              <li>Ongoing: DOTES</li>
            </ul>
            <hr/>
            <h3>What is this thing?</h3>
            <p>
              I thought a good <i>cotton anniversary</i> gift would be an
              ultimate sewing day filled with ultimate dotes. To really distinguish
              this day from any other day this summer I created this app.
              This app is the state of the art in dote tending. It combines the
              downton abbey style of bell service with modern network communications.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}