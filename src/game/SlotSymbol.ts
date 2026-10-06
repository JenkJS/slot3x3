import { Container, Graphics, Text } from 'pixi.js'

export class SlotSymbol extends Container {
  private labelText: Text

  constructor(label: string, color: number) {
    super()

    const background = new Graphics()
      .roundRect(-70, -70, 140, 140, 16)
      .fill(color)
      .stroke({
        color: 0xffffff,
        width: 3,
      })

    this.labelText = new Text({
      text: label,
      style: {
        fontSize: 64,
      },
    })

    this.labelText.anchor.set(0.5)

    this.addChild(background)
    this.addChild(this.labelText)
  }

  setLabel(label: string) {
    this.labelText.text = label
  }
}