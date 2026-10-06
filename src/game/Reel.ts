import { Container, Graphics } from 'pixi.js'
import { SlotSymbol } from './SlotSymbol'
export class Reel extends Container {
  symbolsContainer = new Container()
  symbols: SlotSymbol[] = []
  constructor(labels: string[]){

    super()

        this.addChild(this.symbolsContainer)

    labels.forEach((label, index) => {
    const symbol = new SlotSymbol(label, 0x45475a)
      symbol.y = index * 125
      this.symbolsContainer.addChild(symbol)
      this.symbols.push(symbol)
    })

    const reelMask = new Graphics()
      .rect(-74, -74, 148, 398)
      .fill(0xffffff)
    this.addChild(reelMask)
    this.symbolsContainer.mask = reelMask

  }
}