<template>
  <div :id="id" :style="{width: width + 'px', height: height + 'px'}"></div>
</template>

<script>
export default {
  name: 'Amap',
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    pois: {
      type: Array,
      default() {
        return []
      }
    },
    center: {
      type: Array,
      default() {
        return [116.46, 39.92]
      }
    }
  },
  data() {
    return {
      id: '',
      key: 'f40c8a66bb76a96da55e6e072c45770f',
      iconMap: new Map([
        [0, [14, 92]],
        [1, [101, 92]],
        [2, [194, 92]],
        [3, [283, 92]],
        [4, [370, 92]],
        [5, [459, 92]],
        [6, [547, 92]],
        [7, [635, 92]],
        [8, [723, 92]],
        [9, [811, 92]]
      ]),
      markers: []
    }
  },
  watch: {
    center(newVal) {
      this.map.setCenter(newVal)
    },
    pois(newVal) {
      newVal.forEach((item, index) => {
        this.markers[index].setPosition(item.position)
        this.markers[index].setText({
          content: item.name
        })
      })
    }
  },
  mounted() {
    this.id = 'map' + Math.random().toString().slice(4, 6)

    window.onAMapLoad = () => {
      const map = new window.AMap.Map(this.id, {
        zoom: 22,
        center: this.center
      })
      this.map = map

      window.AMap.plugin(['AMap.ToolBar'], () => {
        const toolbar = new window.AMap.ToolBar()
        map.addControl(toolbar)

        const layer = new window.AMap.LabelsLayer({
          collision: true,
          animation: true
        })
        map.add(layer)

        this.pois.forEach((item, index) => {
          const labelMarker = new window.AMap.LabelMarker({
            zooms: [3, 20],
            position: item.position,
            icon: {
              type: 'image',
              image: 'https://a.amap.com/jsapi_demos/static/images/poi-marker.png',
              clipOrigin: this.iconMap.get(index),
              clipSize: [50, 68],
              size: [25, 34],
              anchor: 'bottom-center',
              angel: 0,
              retina: true
            },
            text: {
              content: item.name,
              direction: 'top',
              style: {
                fontSize: 15,
                fontWeight: 'normal',
                fillColor: '#333',
                strokeColor: '#fff',
                strokeWidth: 2
              }
            }
          })
          labelMarker.on('click', function () {
            location.hash = item.id
          })
          layer.add(labelMarker)
          this.markers.push(labelMarker)
        })
        map.setFitView()
      })
    }
    const url = `https://webapi.amap.com/maps?v=1.4.15&key=${this.key}&callback=onAMapLoad`
    const jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
  }
}
</script>

<style lang="scss" scoped>
</style>
