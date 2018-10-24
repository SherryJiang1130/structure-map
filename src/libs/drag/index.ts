
import {drawArr} from '../drawArr'

let that=null
class Drag {
  constructor(t,connections,shapes,texts) {
    this.r=t
    this.connections = connections
    this.shapes=shapes
    this.texts=texts
    that=this
  }
// 文字和矩形同步移动
  textsMove(att, id, data, type) {
    data.forEach(element => {
      if (element.id == id) {
        if (type == 'text') {
          att.x += 30
          att.y += 20
        } else {
          att.x -= 30
          att.y -= 20
        }
        element.attr(att)
      }
    })
  }
  dragger() {
    this.ox = this.attr('x')
    this.oy = this.attr('y')
    this.animate({ 'fill-opacity': 0.2 }, 500)
  }
  //拖动事件
  move(dx, dy) {
    var att = { x: this.ox + dx, y: this.oy + dy }
    this.attr(att)
    if (this.type == 'rect') {
      that.textsMove(att, this.id, that.texts, 'text')
    } else if (this.type == 'text') {
      that.textsMove(att, this.id, that.shapes, 'shapes')
    }

    for (var i = that.connections.length; i--; ) {
      drawArr(that.connections[i])
    }
  }

  //拖动结束后的事件
  up() {
    this.animate({ 'fill-opacity': 0.8 }, 500)
  }
}

export default Drag
