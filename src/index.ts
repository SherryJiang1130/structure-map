import './index.less'
import Renderer from './libs/renderMind'
// import { rightClickFn } from './libs/utils'
import Rightmenu from './libs/rightMenu'

let renderDom = document.getElementById('raphael')

let obj = {
  nodes: [
    {
      id: 'job1',
      type: 'command'
    },
    {
      in: ['job1'],
      id: 'job2',
      type: 'command'
    },
    {
      in: ['job1'],
      id: 'job3',
      type: 'command'
    },
    {
      in: ['job2', 'job3'],
      id: 'job4',
      type: 'command'
    },
    {
      in: ['job2', 'job3'],
      id: 'job5',
      type: 'command'
    },
    {
      in: ['job4', 'job5'],
      id: 'job6',
      type: 'command'
    }
  ],
  project: 'test_one_flow',
  projectId: 7,
  flow: 'job4'
}

//创建绘图对象

let render = new Renderer(obj.nodes, { isScroll: true, draggable: true })

new Rightmenu('raphael',render.rePaint,obj.nodes)

