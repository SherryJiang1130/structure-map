import Raphael from 'raphael'
export const drawArr = function (obj, that) {
    var point = getStartEnd(obj.obj1, obj.obj2)
    var path1 = getArr(point.start.x, point.start.y, point.end.x, point.end.y, 8)
    if (obj.arrPath) {
        obj.arrPath.attr({
            path: path1
        })
    } else {
        obj.arrPath = that.path(path1)
    }
    return obj
}

function getStartEnd(obj1, obj2) {
    var bb1 = obj1.getBBox(),
        bb2 = obj2.getBBox()
    var p = [{
            x: bb1.x + bb1.width / 2,
            y: bb1.y - 1
        },
        {
            x: bb1.x + bb1.width / 2,
            y: bb1.y + bb1.height + 1
        },
        {
            x: bb1.x - 1,
            y: bb1.y + bb1.height / 2
        },
        {
            x: bb1.x + bb1.width + 1,
            y: bb1.y + bb1.height / 2
        },
        {
            x: bb2.x + bb2.width / 2,
            y: bb2.y - 1
        },
        {
            x: bb2.x + bb2.width / 2,
            y: bb2.y + bb2.height + 1
        },
        {
            x: bb2.x - 1,
            y: bb2.y + bb2.height / 2
        },
        {
            x: bb2.x + bb2.width + 1,
            y: bb2.y + bb2.height / 2
        }
    ]
    var d = {},
        dis = []
    for (var i = 0; i < 4; i++) {
        for (var j = 4; j < 8; j++) {
            var dx = Math.abs(p[i].x - p[j].x),
                dy = Math.abs(p[i].y - p[j].y)
            if (
                i == j - 4 ||
                (((i != 3 && j != 6) || p[i].x < p[j].x) &&
                    ((i != 2 && j != 7) || p[i].x > p[j].x) &&
                    ((i != 0 && j != 5) || p[i].y > p[j].y) &&
                    ((i != 1 && j != 4) || p[i].y < p[j].y))
            ) {
                dis.push(dx + dy)
                d[dis[dis.length - 1]] = [i, j]
            }
        }
    }
    if (dis.length == 0) {
        var res = [0, 8]
    } else {
        res = d[Math.min.apply(Math, dis)]
    }
    var result = {}
    result.start = {}
    result.end = {}
    result.start.x = p[res[0]].x
    result.start.y = p[res[0]].y
    result.end.x = p[res[1]].x
    result.end.y = p[res[1]].y
    return result
}
//获取组成箭头的三条线段的路径
function getArr(x1, y1, x2, y2, size) {
    var angle = Raphael.angle(x1, y1, x2, y2) //得到两点之间的角度
    var a45 = Raphael.rad(angle - 45) //角度转换成弧度
    var a45m = Raphael.rad(angle + 45)
    var x2a = x2 + Math.cos(a45) * size
    var y2a = y2 + Math.sin(a45) * size
    var x2b = x2 + Math.cos(a45m) * size
    var y2b = y2 + Math.sin(a45m) * size
    var result = [
        'M',
        x1,
        y1,
        'L',
        x2,
        y2,
        'L',
        x2a,
        y2a,
        'M',
        x2,
        y2,
        'L',
        x2b,
        y2b
    ]
    return result
}