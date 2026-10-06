import './style.css'
import { Application, Container, Graphics, Text } from 'pixi.js'
import { Reel } from './game/Reel'
import { isWinningLine } from './game/Paylines'
import {
  AVAILABLE_SYMBOLS,
  BET,
  INITIAL_BALANCE,
  SPIN_DURATION,
  WIN_MULTIPLIER,
} from './game/config'



async function main() {
  const app = new Application()

  await app.init({
    width:800,
    height:600,
    background: 0x1e1e2e
  })

  const gameScene = new Container()
  app.stage.addChild(gameScene)
const frame = new Graphics()
.roundRect(100,100,600,400.24)
.fill(0x313244)
.stroke({
  color: 0xcba6f7,
  width:4
})
gameScene.addChild(frame)

const title = new Text({
  text: 'PIXI SLOT',
  style: {
    fill: 0xf5e0dc,
    fontSize: 42,
    fontWeight: 'bold',
  },
})
title.anchor.set(0.5)
title.position.set(400, 55)
let balance = INITIAL_BALANCE
const bet = BET
let winAmount = BET * WIN_MULTIPLIER
const balanceText = new Text({
  text: `Balance: ${balance}`,
  style: {
    fill: 0xa6e3a1,
    fontSize: 20,
  },
})

balanceText.anchor.set(0.5)
balanceText.position.set(150, 55)
gameScene.addChild(balanceText)

const betText = new Text({
  text: `Bet: ${bet}`,
  style: {
    fill: 0x89b4fa,
    fontSize: 20,
  },
})

betText.anchor.set(0.5)
betText.position.set(650, 55)
gameScene.addChild(betText)

gameScene.addChild(title)

const resultText = new Text({
  text: 'Line: —',
  style: {
    fill: 0xa6adc8,
    fontSize: 18,
  },
})

resultText.anchor.set(0.5)
resultText.position.set(400, 88)

gameScene.addChild(resultText)

const reelSymbols = [
  ['🍒', '🍋', '🔔'],
  ['⭐', '🍒', '🍋'],
  ['🔔', '⭐', '🍒'],
]
const reels: Reel[] = []
reelSymbols.forEach((symbols, index) => {
  const reel = new Reel(symbols)

  reel.position.set(230 + index * 170, 175)

  gameScene.addChild(reel)
  reels.push(reel)
})

const spinButton = new Container()

const buttonBackground = new Graphics()
.roundRect(-80,-25,160,50,12)
.fill(0xa6e3a1)

const buttonText = new Text({
  text: 'SPIN',
  style: {
    fill: 0x11111b,
    fontSize: 24,
    fontWeight: 'bold',
  },
})
buttonText.anchor.set(0.5)

spinButton.addChild(buttonBackground)
spinButton.addChild(buttonText)
spinButton.position.set(400, 550)

spinButton.eventMode = 'static'
spinButton.cursor = 'pointer'

gameScene.addChild(spinButton)

let isSpinning = false
let winEffectTime = 0

app.ticker.add((ticker) => {
  if (isSpinning) {
    reels.forEach((reel) => {
      reel.symbols.forEach((symbol) => {
        symbol.y += 900 * (ticker.deltaMS / 1000)

        if (symbol.y > 250) {
          symbol.y -= 375
        }
      })
    })
  }

  if (winEffectTime > 0) {
    winEffectTime -= ticker.deltaMS

    const pulse = 1 + Math.sin(winEffectTime * 0.02) * 0.08

    reels.forEach((reel) => {
      const middleSymbol = reel.symbolsContainer.children[1]
      middleSymbol.scale.set(pulse)
    })

    middlePayline.alpha =
      0.6 + Math.sin(winEffectTime * 0.03) * 0.4

    if (winEffectTime <= 0) {
      reels.forEach((reel) => {
        const middleSymbol = reel.symbolsContainer.children[1]
        middleSymbol.scale.set(1)
      })

      middlePayline.alpha = 1
    }
  }
})
const middlePayline = new Graphics()
  .moveTo(145, 300)
  .lineTo(655, 300)
  .stroke({
    color: 0xf9e2af,
    width: 8,
    alpha: 0.8,
  })

middlePayline.visible = false

gameScene.addChild(middlePayline)
app.ticker.start()

spinButton.on('pointerdown', () => {
  if (isSpinning) return

  if (balance < bet) {
    resultText.text = 'Недостаточно средств'
    resultText.style.fill = 0xf38ba8
    return
  }

  balance -= bet
  winAmount = 0

  balanceText.text = `Balance: ${balance}`
  middlePayline.visible = false
  winEffectTime = 0

reels.forEach((reel) => {
  reel.symbolsContainer.children[1].scale.set(1)
})

  isSpinning = true

  setTimeout(() => {
    isSpinning = false
    const result: string[][] = []

reels.forEach((reel) => {
  const reelResult: string[] = []

  reel.symbols.forEach((symbol, index) => {
    symbol.y = index * 125

    const randomIndex = Math.floor(
      Math.random() * AVAILABLE_SYMBOLS.length,
    )

    const randomSymbol = AVAILABLE_SYMBOLS[randomIndex]

    reelResult.push(randomSymbol)

    symbol.setLabel(randomSymbol)
  })

  result.push(reelResult)
  
})



const middleLine = result.map((reel) => reel[1])

const isWin = isWinningLine(middleLine)

if (isWin) {
  winAmount = bet * 5
  balance += winAmount
    winEffectTime = 1000
}

balanceText.text = `Balance: ${balance}`

middlePayline.visible = isWin

if (isWin) {
  resultText.text =
    `WIN +${winAmount}: ${middleLine.join(' | ')}`

  resultText.style.fill = 0xf9e2af
} else {
  resultText.text = `Line: ${middleLine.join(' | ')}`
  resultText.style.fill = 0xa6adc8
}

resultText.text = `Line: ${middleLine.join(' | ')}`
  }, SPIN_DURATION)
})

document.body.appendChild(app.canvas)
}
main()

