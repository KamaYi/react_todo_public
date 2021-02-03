export const watermark = ({
    // 使用 ES6 的函数默认值方式设置参数的默认取值
    container = document.body,
    width = '200px',
    height = '100px',
    textAlign = 'left',
    textBaseline = 'bottom',
    font = '14px Microsoft Yahei',
    fillStyle = 'rgba(184, 184, 184, 0.4)',
    content = '水印内容',
    content2 = '',
    rotate = 10,
    zIndex = 1000
} = {}, ...res: undefined[]) => {
    const args = res
    const canvas = document.createElement('canvas')

    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)
    const ctx: any = canvas.getContext('2d')

    ctx.textAlign = textAlign
    ctx.textBaseline = textBaseline
    ctx.font = font
    ctx.fillStyle = fillStyle
    ctx.rotate(Math.PI / 180 * rotate)
    // ctx.fillText(content, 30, parseFloat(height) / 2)
    ctx.fillText(content, 35, 15)
    ctx.fillText(content2, 10, 40)
    const base64Url = canvas.toDataURL()
    const __wm = document.querySelector('.__wm')
    const watermarkDiv = __wm || document.createElement('div')
    const styleStr = `
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      z-index:${zIndex};
      pointer-events:none;
      background-repeat:repeat;
      background-image:url('${base64Url}')`
    watermarkDiv.setAttribute('style', styleStr)
    watermarkDiv.classList.add('__wm')

    if (!__wm) {
        container.style.position = 'relative'
        container.insertBefore(watermarkDiv, container.firstChild)
    }
    let wi: any = window
    const MutationObserver = wi.MutationObserver || wi.WebKitMutationObserver
    if (MutationObserver) {
        let mo = new MutationObserver(function () {
            const __wm = document.querySelector('.__wm')
            // 只在__wm元素变动才重新调用 __canvasWM
            if ((__wm && __wm.getAttribute('style') !== styleStr) || !__wm) {
                // 避免一直触发
                mo.disconnect()
                mo = null
                watermark(JSON.parse(JSON.stringify(args)))
            }
        })

        mo.observe(container, {
            attributes: true,
            subtree: true,
            childList: true
        })
    }

}

export default watermark