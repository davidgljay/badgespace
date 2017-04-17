import emojis from 'emojis-list'
import React, {PropTypes} from 'react'
import Dialog from 'material-ui/Dialog'

const Emojis = ({onEmojiClick, open, closeModal}) => <Dialog
  bodyStyle={styles.container}
  open={open}
  onRequestClose={closeModal}>
  {
    emojiAddresses.map((addresses, i) => <div style={styles.section} key={i} >
      {
        addresses.reduce((arr, address) =>
          address.legth === 1
          ? arr.concat(emojis[address[0]])
          : arr.concat(emojis.slice(address[0], address[1] + 1)), [])
          .map(emoji => <div
            style={styles.emoji}
            key={emoji}
            onClick={(e) => onEmojiClick(e.target.innerText)}
            value={emoji}>
            {emoji}
          </div>)
      }
    </div>)
  }
</Dialog>

const {func, bool} = PropTypes
Emojis.propTypes = {
  onEmojiClick: func.isRequired,
  open: bool.isRequired,
  closeModal: func.isRequired
}

export default Emojis

const styles = {
  container: {
    maxWidth: 800,
    overflowY: 'scroll',
    color: 'rgba(0,0,0,1)'
  },
  section: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 5,
    borderBottom: '1px solid #000'
  },
  emoji: {
    margin: 5,
    cursor: 'pointer'
  }
}

const emojiAddresses = [
  [
    // Emotions and faces
    [1629,1697],
    [1991,1998],
    [1338,1371],
    [1585,1602],
    [728,745],
    [746,810],
    [2401,2424],
    [2300,2305],
    [1999,2040],
    [2041,2113],
    [1698,1820],
    [659,663],
    [2458],
    [650,654]
  ],
  [
    // Animals and Nature
    [664,727],
    [2230,2284],
    [363,382],
    [2299]
  ],
  [
    // Food
    [359,362],
    [383,441],
    [2298],
    [2216,2229],
    [2249]
  ],
  [
    // Clothes and vehicles
    [811,829],
    [830,1336],
    [1821,1945],
    [1975,1990]
  ],
  [
    // Sports
    [503,622],
    [655,658],
    [2114,2215],
    [2352,2353],
    [2370,2394]
  ],
  [
    // Weather
    [317,358],
    [2297],
    [2354,2356],
    [2431],
    [1481],
    [1488,1500],
    [2374,2351],
    [2306,2308],
    [2334]
  ],
  [
    // Cities
    [623,649],
    [1372,1381],
    [1337],
    [442,468],
    [469,502],
    [1623,1628],
    [2345],
    [1946,1974],
    [2362,2369],
    [2395,2396],
    [1382,1436],
    [1545,1584]
  ],
  [
    // Time
    [1519,1544],
    [2274,2277],
    [2358,2361],
    [1603,1622],
    [1437,1475],
    [2263,226],
    [2337,2343]
  ],
  [
    // Abstract shapes
    [1501,1512],
    [2262],
    [1482,1488],
    [2460],
    [2463,2464],
    [2467,2473],
    [2336],
    [1513,1518],
    [2309,2329],
    [300,316],
    [2278,2280],
    [2437],
    [2398],
    [2452],
    [2357],
    [2267,2273]
  ],
  [
    // Flags
    [17,299]
  ],
  [
    // Black and white symbols
    [0,16],
    [1476,1480],
    [2250,2261],
    [2281,2296],
    [2397],
    [2399,2400],
    [2425,2430],
    [2346],
    [2330,2335],
    [2432,2436],
    [2438,2451],
    [2453,2457],
    [2459],
    [2461,2462],
    [2465,2466],
    [2474,2476]
  ]
]
