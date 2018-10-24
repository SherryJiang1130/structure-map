// 遍历对象
export function forEach(obj, cb) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            cb(obj[key]);
        }
    }
}

export const scrollFn = function (obj) {
    let r = obj
    document.body.onmousewheel = function (event) {
        if (event.target.classList[0] == 'side') {
            return
        }
        if (event.wheelDelta) {
            //判断浏览器IE，谷歌滑轮事件
            if (event.wheelDelta > 0) {
                //当滑轮向上滚动时
                // alert("滑轮向上滚动");
                r.setViewBox(r._left, r._top, r.width -= 10, r.height -= 10, true)
            }
        }
        if (event.wheelDelta < 0) {
            //当滑轮向下滚动时
            // alert('滑轮向下滚动')
            r.setViewBox(r._left, r._top, r.width += 10, r.height += 10, true)
        } else if (event.detail) {
            //Firefox滑轮事件
            if (event.detail > 0) {
                //当滑轮向上滚动时
                // alert("滑轮向上滚动");
                r.setViewBox(r._left, r._top, r.width -= 10, r.height -= 10, true)
            }

            if (event.detail < 0) {
                //当滑轮向下滚动时
                // alert('滑轮向下滚动')
                r.setViewBox(r._left, r._top, r.width += 10, r.height += 10, true)
            }
        }
    }
}

