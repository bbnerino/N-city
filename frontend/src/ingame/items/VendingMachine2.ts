import Item from './Item'
import { ItemType } from './Item'
import store from '../stores'

import { openVendingMachineDialog } from '../stores/VendingMachineStore'

export default class VendingMachine2 extends Item {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)
    this.itemType = ItemType.VENDINGMACHINE2
  }

  onOverlapDialog() {
    this.setDialogBox('R-그림 자세히 보기')
  }
  openDialog(roomnum){
    store.dispatch(openVendingMachineDialog(roomnum))
  }
}