let that = null
class Rightmenu {
  constructor(containerId, rePaitFn, data) {
    this.id = 'menu'
    this.wrap = document.getElementById(containerId)
    this.createdMenu()
    this.rightClickFn(containerId, this.id)
    this.rePaitFn = rePaitFn
    this.data = data
    that = this
  }
  createdMenu() {
    let menuTitle = [
      { name: '添加子节点', val: 'add' },
      { name: '修改节点', val: 'edit' },
      { name: '移除节点', val: 'remove' }
    ]
    var ul = document.createElement('ul')
    ul.setAttribute('id', this.id)
    ul.classList.add('hidden')
    for (let i = 0, len = menuTitle.length; i < len; i++) {
      let li = document.createElement('li')
      let a = document.createElement('a')
      let node = document.createTextNode(menuTitle[i].name)
      a.appendChild(node)
      a.setAttribute('href', 'javascript:void(0)')
      a.setAttribute('id', menuTitle[i].val)
      a.addEventListener('click', this.clickHandle)
      li.appendChild(a)
      ul.appendChild(li)
    }
    this.wrap.appendChild(ul)
  }
  clickHandle(e) {
    if (e.target.id == 'add') {
      that.addChildNode()
    }
    if (e.target.id == 'remove') {
      that.removeNode()
    }
    if (e.target.id == 'edit') {
      that.editText()
    }
  }

  removeNode() {
    for (let index = that.data.length - 1; index >= 0; index--) {
      let element = that.data[index]
      if (element.id == that.selectDomId) {
        that.data.splice(index, 1)
      } else {
        if (
          element.in &&
          element.in.length < 2 &&
          element.in[0] == that.selectDomId
        ) {
          that.data.splice(index, 1)
        } else if (element.in) {
          let i = element.in.indexOf(that.selectDomId)
          if (i > -1) {
            element.in.splice(i, 1)
          }
        }
      }
    }
    that.rePaitFn(that.data)
  }
  addChildNode() {
    Math.random()
    that.data.push({
      in: [that.selectDomId],
      id: ((Math.random() * Date.now()) / 100000000000).toFixed(2) + 'Newjob',
      type: 'command'
    })
    that.rePaitFn(that.data)
  }
  editText() {
     
    let text = window.prompt('请输入新值', that.selectDomId)
    if(!text||text==that.selectDomId){
        return
    }
    that.data.forEach(element => {
      if (element.id == that.selectDomId) {
        element.id = text
      }
    })
    that.rePaitFn(that.data)
  }
  preventDefault(event) {
    event.preventDefault()
      ? event.preventDefault()
      : (event.returnValue = false)
  }

  getScrollTop() {
    if (document.compatMode == 'CSS1Compat') {
      return document.documentElement.scrollTop
    } else {
      return document.body.scrollTop
    }
  }
  getScrollLeft() {
    if (document.compatMode == 'CSS1Compat') {
      return document.documentElement.scrollLeft
    } else {
      return document.body.scrollLeft
    }
  }
  rightClickFn(containerId, id) {
    let domId = document.getElementById(containerId)
    domId.oncontextmenu = function(event) {
      if (event.target.nodeName != 'rect' && event.target.nodeName != 'tspan') {
        return
      }
      that.preventDefault(event)
      var menu = document.getElementById(id)
      var top = that.getScrollTop()
      var left = that.getScrollLeft()
      let leftStyle = event.pageX ? event.pageX : event.clientX + left
      let topStyle = event.pageY ? event.pageY : event.clientY + top
      menu.style.left = leftStyle + 'px'
      menu.style.top = topStyle + 'px'
      menu.style.visibility = 'visible'
      menu.style.height = 'auto'
      if (event.target.nodeName == 'rect') {
        that.selectDomId =
          event.target.nextSibling.childNodes[0].childNodes[0].nodeValue
      } else {
        that.selectDomId = event.target.innerHTML
      }
    }
    document.onclick = function() {
      document.getElementById(id).style.visibility = 'hidden'
    }
  }
}

export default Rightmenu
