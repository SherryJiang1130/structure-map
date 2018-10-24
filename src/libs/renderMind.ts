import Raphael from 'raphael'
import { drawArr } from '../libs/drawArr'
import Drag from '../libs/drag'
import {scrollFn} from '../libs/utils'
let that =null
class Renderer {

  constructor(data,options) {
    this.saveNode= [] //存储两个节点
    this.startNode= null
    this.objCrr= null
    this.tempArrPath= [] //两个点连线时用于暂时存储起始节点到鼠标的线段
    this.shapes= []
    this.texts= []
    this.connections=[]
    this.basePosition= { x:500; y: 100; width: 60; height: 40; r: 4 }
    this.obj = data
    this.options=options
    that=this
    this.createdNode()
   
  }
  createdNode(obj) {
    this.shapes= []
    this.texts= []
    this.connections=[]
    let renderDom = document.getElementById('raphael')
    if(!obj){
      this.r = new Raphael(renderDom)
    }
   
    this.options.isScroll?scrollFn(this.r):'';
    this.options.draggable? this.draggable = new Drag(this.r, this.connections, this.shapes, this.texts):'';
    
   
    this.obj.forEach((element, index) => {
      let offset = 0
      if (index > 0) {
        offset = index * index*50
      }
      let randomNum= Math.round(Math.random()*200)
      this.shapes.push(
        this.r.rect(
          this.basePosition.x+(index==0?0:index%2==0?randomNum:-randomNum),
          this.basePosition.y + offset / (index > 0 ? index: 2),
          this.basePosition.width,
          this.basePosition.height,
          this.basePosition.r
        )
      )
      this.texts.push(
        this.r.text(
          this.basePosition.x +(index==0?0:index%2==0?randomNum:-randomNum)+ 30,
          this.basePosition.y + offset / (index > 0 ? index : 2) + 20,
          element.id
        )
      )
    })
    // 添加样式和方法
    this.addStyle(this.shapes,this.texts,this.obj)
    //存储节点间的顺序
    this.shapes.forEach((ele, index) => {
      // collecConnections(shapes, index)
      this.loop(this.shapes, ele, ele.id)
    })
  }
  addStyle(shapes, texts, data) {
    //为节点添加样式和事件，并且绘制节点之间的箭头
    for (var i = 0, ii = shapes.length; i < ii; i++) {
      var color = Raphael.getColor()
      shapes[i].attr({
        fill: color,
        stroke: color,
        'fill-opacity': 0.8,
        'stroke-width': 2,
        cursor: 'move'
      })
      texts[i].attr({
        cursor: 'move'
      })
      shapes[i].id = data[i].id
      shapes[i].in = data[i].in
      texts[i].id = data[i].id
      if(this.options.draggable){
        shapes[i].drag(
          this.draggable.move,
          this.draggable.dragger,
          this.draggable.up
        )
        texts[i].drag(
          this.draggable.move,
          this.draggable.dragger,
          this.draggable.up
        )
      }
      shapes[i].dblclick(this.editText)
      texts[i].dblclick(this.editText)
    }
  }
  collecConnections(obj1, obj2, r) {
    this.connections.push(drawArr({ obj1: obj1, obj2: obj2 }, r))
  }
  loop(data, obj, id) {
    let that =this
    data.forEach(ele => {
      if (ele.in && ele.in.indexOf(id) > -1) {
        this.collecConnections(obj, ele,that.r)
      }
    })
  }
  rePaint(obj){
    that.clearMap()
    that.obj=obj
    that.createdNode(obj)
  }
  clearMap(){
    this.r.clear()
  }
  editText(event){
    if (event.target.nodeName == 'rect') {
  
        console.log(event.target.nextSibling.childNodes[0].childNodes[0].nodeValue)
    } else {
      console.log(event.target.innerHTML)
      
    }
  }
}

export default Renderer