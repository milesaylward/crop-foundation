import * as THREE from 'three'
import gsap from 'gsap'
import drop from '@/assets/images/drop.png'
import eventBus from '@/core/eventBus'

/**
 * Inspired and adapted from https://codepen.io/robin-dela/pen/qBEVRbv
 * Robin if you ever see this, Thanks!
 */

const MIN_WIDTH = 994

class WatercolorSlide {
  constructor(opts = {}) {
    this.lastUpdate = null
    this.container = null
    this.camera = null
    this.scene = null
    this.renderer = null
    this.uniforms = null
    this.material = null
    this.container = opts.container
    this.animate = this.animate.bind(this)
    this.destroy = this.destroy.bind(this)
    this.stopRender = this.stopRender.bind(this)
    this.onAnimate = this.onAnimate.bind(this)
    this.showContent = this.showContent.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.imageRef = opts.imageRef
    this.image = opts.image
    this.showControls = opts.showControls
    this.debug = opts.debug
    this.useMin = opts.useMin !== undefined ? opts.useMin : true
    this.width = opts.width < 600 && this.useMin ? MIN_WIDTH : opts.width
    this.height = opts.height || window.innerHeight
  }

  readyImage() {
    const image = new Image()
    image.src = `${this.image}`
    image.crossOrigin = 'anonymous'
    image.onload = () => {
      if (this.width === 0 && this.imageRef) {
        this.width = this.imageRef.getBoundingClientRect().width
      }
      this.init()
    }
    this.image = image
  }

  init() {
    this.camera = new THREE.OrthographicCamera(
      this.width / -2,
      this.width / 2,
      this.height / 2,
      this.height / -2,
      1,
      1000
    )
    this.setShaders()
    this.camera.position.z = 1
    this.scene = new THREE.Scene()
    this.geometry = new THREE.PlaneBufferGeometry(this.width, this.height)
    this.textureLoader = new THREE.TextureLoader()
    this.textureLoader.crossOrigin = ''
    const _texture = this.textureLoader.load(this.image.src)
    _texture.minFilter = THREE.LinearFilter

    const _drop = this.textureLoader.load(drop)
    _drop.minFilter = THREE.LinearFilter

    this.uniforms = {
      dispFactor: { type: 'f', value: 0.0 },
      dispFactor2: { type: 'f', value: 0.0 },
      dispFactor3: { type: 'f', value: 0.0 },
      dispFactorA: { type: 'f', value: 0.0 },
      dispFactor4: { type: 'f', value: 0.0 },
      dispFactor5: { type: 'f', value: 0.0 },
      map: { type: 't', value: _texture },
      map3: { type: 't', value: _drop }
    }
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader,
      transparent: true
    })

    this.lastUpdate = new Date().getTime()
    // put it together for rendering
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
    this.mesh.position.z = -1

    this.renderer = new THREE.WebGLRenderer({ alpha: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    // eslint-disable-next-line
    this.renderer.setClearColor( 0xFFFFFF, 0)
    this.handleResize(this)
    this.container.appendChild(this.renderer.domElement)
    setTimeout(() => {
      eventBus.$emit('slideReady')
    }, 150)
  }

  handleResize({ width, height }) {
    if (!this.renderer) return
    let innerWidth = width < MIN_WIDTH && this.useMin ? MIN_WIDTH : width
    if (height === this.height && innerWidth < this.width) {
      innerWidth = this.width
    } else {
      this.width = innerWidth
    }
    this.height = height
    this.renderer.setSize(innerWidth, height)
  }

  showContent() {
    if (!this.material) return
    gsap.to(this.material.uniforms.dispFactor, 0.5, {
      value: 2.0,
      ease: 'linear'
    })
    gsap.to(this.material.uniforms.dispFactor5, 0.5, {
      value: 2.0,
      delay: 0.1,
      ease: 'linear'
    })
    gsap.to(this.material.uniforms.dispFactor2, 0.5, {
      value: 2.0,
      delay: 0.2,
      ease: 'linear'
    })
    gsap.to(this.material.uniforms.dispFactor4, 0.5, {
      value: 2.0,
      delay: 0.3,
      ease: 'linear'
    })
    gsap.to(this.material.uniforms.dispFactor3, 0.5, {
      value: 2.0,
      delay: 0.4,
      ease: 'linear',
      onComplete: () => {
        this.stopRender()
        eventBus.$emit('animateSlideContent')
        if (this.showControls) {
          eventBus.$emit('animateSlideControls')
        }
      }
    })
  }

  onAnimate() {
    this.animate()
    setTimeout(() => {
      this.showContent()
    }, 150)
  }

  animate() {
    this.animationFrame = requestAnimationFrame(this.animate)
    this.render()
  }

  render() {
    if (this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera)
    }
  }

  stopRender() {
    cancelAnimationFrame(this.animationFrame)
  }

  destroy() {
    this.stopRender()
    this.scene.dispose()
    this.geometry.dispose()
    this.material.dispose()
    this.renderer.dispose()
    this.scene = null
    this.camera = null
    this.renderer = null
  }

  setShaders() {
    this.fragmentShader = `
      varying vec2 vUv;
      uniform float dispFactor;
      uniform float dispFactor2;
      uniform float dispFactor3;
      uniform float dispFactor4;
      uniform float dispFactor5;
      uniform sampler2D map;
      uniform sampler2D map3;
    
      vec4 layer(vec4 foreground, vec4 background) {
        return foreground * foreground.a + background * (1.0 - foreground.a);
      }
    
      vec2 rotateUV(vec2 uv, float rotation) {
        float mid = 0.5;
        return vec2(
            cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
            cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
        );
      }
      
      void main()
      {
        vec4 color = vec4(0.0, 0.0, 0.0, 0.0);
        vec4 OG = texture2D(map, vUv);
        OG.a = 0.0;
    
        vec2 scaleCenter = vec2(0.5, 0.5);
    
          for(float i = 0.0; i < 10.0; i++) {
    
          // float rnd = random( st );
    
          vec2 myUV = vUv;
    
          myUV = (myUV - scaleCenter) * ((i * 0.075)) + scaleCenter;
          myUV = rotateUV(myUV, (2.0) * (i + 1.0));
    
          vec4 image = texture2D(map3, myUV);
          image.a *= step(myUV.x, 1.)*
                      step(0., myUV.x) *
                      step(myUV.y, 1.) *
                      step(0., myUV.y);
    
          image.rgb += 1.0;
          // image.rgb += 1.0 - (dispFactor2 / 10.0);
          if(i == 0.0 || i == 9.0) {
            image.rgb -= (dispFactor);
          }
          if(i == 1.0 || i == 8.0) {
            image.rgb -= (dispFactor2);
          }
          if(i == 2.0 || i == 7.0) {
            image.rgb -= (dispFactor3);
          }
          if(i == 3.0 || i == 6.0) {
            image.rgb -= (dispFactor4);
          }
          if(i == 4.0 || i == 5.0) {
            image.rgb -= (dispFactor5);
          }
    
          color = layer(image, color);
        }
    
          OG.a = 1.0 - color.r;
    
        gl_FragColor = OG;
      }
    `
    this.vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
    `
  }
}

export default WatercolorSlide
