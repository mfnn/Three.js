<!--suppress ALL -->
<template>
  <div id="container">
  </div>
</template>
<script>
  import * as THREE from "three";
  import {OBJLoader, MTLLoader} from 'three-obj-mtl-loader';
  // import MTLLoader from  'three-mtl-loader';
  // import OBJLoader from  'three-obj-loader';
  import {CSS2DRenderer, CSS2DObject} from 'three-css2drender';

  const OrbitControls = require('three-orbit-controls')(THREE);
  export default {
    name: "threeMap",
    data() {
      return {
        scene: '',
        labelRenderer: '',
        light: '',
        camera: '',
        controls: '',
        renderer: '',
        geometry: '',
        material: '',
        cube: '',
        fov: 60,
        biaozhudiv: '',
        img: '',
        biaozhuLabel: ''

      }
    },
    mounted() {
      this.init();
      this.addObj();
      this.animate();
    },
    // destroyed(){
    //   console.log("实例已经被销毁");
    // },
    methods: {
      init() {
        this.scene = new THREE.Scene();
        this.scene.add(new THREE.AmbientLight(0x999999));//环境光
        this.light = new THREE.DirectionalLight(0xdfebff, 0.45);//从正上方（不是位置）照射过来的平行光，0.45的强度
        this.light.position.set(50, 200, 100);
        this.light.position.multiplyScalar(0.3);
        this.scene.add(this.light);
        //初始化相机
        this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(10, 90, 65);
        this.camera.lookAt(this.scene.position);
        //初始化控制器
        this.controls = new OrbitControls(this.camera);
        this.controls.target.set(0, 0, 0);
        this.controls.minDistance = 80;
        this.controls.maxDistance = 400;
        this.controls.maxPolarAngle = Math.PI / 3;
        this.controls.update();
        //渲染
        this.renderer = new THREE.WebGLRenderer({
          alpha: true,
        });//会在body里面生成一个canvas标签,
        this.renderer.setPixelRatio(window.devicePixelRatio);//为了兼容高清屏幕
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        const container = document.getElementById('container');
        container.appendChild(this.renderer.domElement);
        //标注渲染
        this.labelRenderer = new CSS2DRenderer();
        this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.style.top = 0;
        container.appendChild(this.labelRenderer.domElement);
        window.addEventListener('resize', this.onWindowResize, false);//添加窗口监听事件（resize-onresize即窗口或框架被重新调整大小）
      },
      onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
      },
      animate() {
        requestAnimationFrame(this.animate);
        this.render();
      },
      render() {
        this.renderer.render(this.scene, this.camera);
        this.labelRenderer.render(this.scene, this.camera);
      },
      addObj() {
        //包含材质
        new MTLLoader().setPath('/static/model/modelFirst/').load('modelFirst.mtl', materials => {
          console.log("materials", materials);
          materials.preload();
          new OBJLoader().setMaterials(materials).setPath('/static/model/modelFirst/').load('modelFirst.obj', obj => {
            obj.scale.set(0.8, 0.8, 0.8);
            obj.position.set(-40, -50, 10);
            this.addSprite(-95, -55, -110, '/static/image/shoop.png', -70, 'SKECH', obj, function () {
            });
            this.addSprite(-80, -65, -90, '/static/image/cloth.png', -52, 'FILA', obj, function () {
            });
            this.addSprite(-100, -45, -80, '/static/image/apple.png', -63, 'APPLE', obj, function () {
            });
            this.scene.add(obj);
          });
        });
        new MTLLoader().setPath('/static/model/VANS/').load('VANS.mtl', materials => {
          materials.preload();
          new OBJLoader().setMaterials(materials).setPath('/static/model/VANS/').load('VANS.obj', obj => {
            obj.scale.set(0.8, 0.8, 0.8);
            obj.position.set(-40, -50, 10);
            this.addSprite(-165, -55, -170, '/static/image/vans.png', -58, 'VANS', obj, () => {
              this.viewDetailModel();
            });
            this.scene.add(obj)
          })
        });
        new MTLLoader().setPath('/static/model/LEVIS/').load('LEVIS.mtl', materials => {
          materials.preload();
          new OBJLoader().setMaterials(materials).setPath('/static/model/LEVIS/').load('LEVIS.obj', obj => {
            obj.scale.set(0.8, 0.8, 0.8);
            obj.position.set(-40, -50, 10);
            this.addSprite(-170, -40, -100, '/static/image/television.png', -64, 'LEVIS', obj, function () {

            });
            this.addSprite(-170, -35, -120, '/static/image/jac.png', -100, 'KORADIOP', obj, function () {

            });
            this.addSprite(-170, -40, -140, '/static/image/clo.png', -47, '天意', obj, function () {

            });
            this.scene.add(obj)
          })
        });
        new MTLLoader().setPath('/static/model/sanxing/').load('sanxing.mtl', materials => {
          materials.preload();
          new OBJLoader().setMaterials(materials).setPath('/static/model/sanxing/').load('sanxing.obj', obj => {
            obj.scale.set(0.8, 0.8, 0.8);
            obj.position.set(-40, -50, 10);
            this.addSprite(-125, -40, -98, '/static/image/phone.png', -50, '三星', obj, function () {

            });
            this.scene.add(obj)
          })
        });
        new MTLLoader().setPath('/static/model/CA/').load('CA.mtl', materials => {
          materials.preload();
          new OBJLoader().setMaterials(materials).setPath('/static/model/CA/').load('CA.obj', obj => {
            obj.scale.set(0.8, 0.8, 0.8);
            obj.position.set(-40, -50, 10);
            this.addSprite(-130, -35, -60, '/static/image/car.png', -37, 'CA', obj, function () {

            });
            this.scene.add(obj)
          })
        });
        new MTLLoader().setPath('/static/model/SHOES/').load('SHOES.mtl', materials => {
          materials.preload();
          new OBJLoader().setMaterials(materials).setPath('/static/model/SHOES/').load('SHOES.obj', obj => {
            obj.scale.set(0.8, 0.8, 0.8);
            obj.position.set(-40, -50, 10);
            this.addSprite(-90, -50, -155, '/static/image/shoes.png', -70, 'SHOES', obj, function () {

            });
            this.scene.add(obj)
          })
        });
        new MTLLoader().setPath('/static/model/square/').load('zhengfangxing.mtl', materials => {
          materials.preload();
          new OBJLoader().setMaterials(materials).setPath('/static/model/square/').load('zhengfangxing.obj', obj => {
            obj.scale.set(0.8, 0.8, 0.8);
            obj.position.set(-40, -50, 10);
            this.addSprite(-90, -50, -55, '/static/image/sensor.png', -95, '传感器节点', obj, () => {
              this.alarmDetail();
            });
            this.scene.add(obj)
          })
        });
        new MTLLoader().setPath('/static/model/LOHO/').load('LOHO.mtl', materials => {
          materials.preload();
          new OBJLoader().setMaterials(materials).setPath('/static/model/LOHO/').load('LOHO.obj', obj => {
            obj.scale.set(0.8, 0.8, 0.8);
            obj.position.set(-40, -50, 10);
            this.addSprite(-30, -55, -180, '/static/image/lv.png', -67, 'LOHO', obj, () => {
            });
            this.addSprite(-30, -55, -160, '/static/image/card.png', -68, '卡连劳', obj, () => {
            });
            this.addSprite(50, -55, -160, '/static/image/liangshi.png', -79, '无印良品', obj, () => {
            });
            this.scene.add(obj)
          })
        });
        new MTLLoader().setPath('/static/model/TWICE/').load('TWICE.mtl', materials => {
          materials.preload();
          new OBJLoader().setMaterials(materials).setPath('/static/model/TWICE/').load('TWICE.obj', obj => {
            obj.scale.set(0.8, 0.8, 0.8);
            obj.position.set(-40, -50, 10);
            this.addSprite(-20, -55, -110, '/static/image/demand.png', -71, 'TWICE', obj, () => {
            });
            this.addSprite(-20, -55, -90, '/static/image/lifang.png', -64, '3D-JP', obj, () => {
            });
            this.addSprite(-20, -55, -70, '/static/image/dance.png', -69, 'CASIO', obj, () => {
            });
            this.addSprite(30, -55, -120, '/static/image/sleep.png', -80, 'HAZZYS', obj, () => {
            });
            this.scene.add(obj)
          })
        });
        new MTLLoader().setPath('/static/model/manji/').load('manji.mtl', materials => {
          materials.preload();
          new OBJLoader().setMaterials(materials).setPath('/static/model/manji/').load('manji.obj', obj => {
            obj.scale.set(0.8, 0.8, 0.8);
            obj.position.set(-40, -50, 10);
            this.addSprite(30, -55, -70, '/static/image/candy.png', -79, '满记甜食', obj, () => {
            });

            this.scene.add(obj)
          })
        });
        new MTLLoader().setPath('/static/model/REPUBLIC/').load('REPUBLIC.mtl', materials => {
          materials.preload();
          new OBJLoader().setMaterials(materials).setPath('/static/model/REPUBLIC/').load('REPUBLIC.obj', obj => {
            obj.scale.set(0.8, 0.8, 0.8);
            obj.position.set(-40, -50, 10);
            this.addSprite(90, -45, -70, '/static/image/puhblic.png', -126, 'REPUBLIC&CO', obj, () => {
            });
            this.addSprite(70, -70, -70, '/static/image/humbar.png', -66, '汉堡王', obj, () => {
            });
            this.scene.add(obj)
          })
        });
        new MTLLoader().setPath('/static/model/JUSTCAVALLI/').load('JUSTCAVALLI.mtl', materials => {
          materials.preload();
          new OBJLoader().setMaterials(materials).setPath('/static/model/JUSTCAVALLI/').load('JUSTCAVALLI.obj', obj => {
            obj.scale.set(0.8, 0.8, 0.8);
            obj.position.set(-40, -50, 10);
            this.addSprite(140, -45, -80, '/static/image/juice.png', -126, 'JUST CAVALLI', obj, () => {
            });
            this.scene.add(obj)
          })
        });
        new MTLLoader().setPath('/static/model/taizhuolong/').load('taizhuolong.mtl', materials => {
          materials.preload();
          new OBJLoader().setMaterials(materials).setPath('/static/model/taizhuolong/').load('taizhuolong.obj', obj => {
            obj.scale.set(0.8, 0.8, 0.8);
            obj.position.set(-40, -50, 10);
            this.addSprite(120, -45, -120, '/static/image/long.png', -73, '泰卓龙', obj, () => {
            });
            this.scene.add(obj)
          })
        });
      },
      addSprite(x, y, z, image, loc, text, Mash, callback) {
        //添加div标签
        this.biaozhudiv = document.createElement('div');
        //添加图标标签
        this.img = document.createElement('img');
        this.img.src = image;
        this.img.style.marginLeft = loc + 'px';
        this.biaozhudiv.className = 'lable';
        //两者的执行顺序
        this.biaozhudiv.textContent = text;
        this.biaozhudiv.appendChild(this.img);
        //标注的样式
        this.biaozhudiv.id = 'biaozhu';
        this.biaozhudiv.style.color = 'rgb(' + 0 + ',' + 0 + ',' + 0 + ')';
        this.biaozhudiv.style.fontSize = 15 + 'px';
        this.biaozhudiv.style.fontFamily = 'Georgia,serif';
        this.biaozhudiv.style.cursor = 'pointer';
        this.biaozhudiv.onclick = function () {
          callback(Mash);
        };
        this.biaozhuLabel = new CSS2DObject(this.biaozhudiv);
        this.biaozhuLabel.position.set(x, y, z);
        Mash.add(this.biaozhuLabel);
      },
      //传感器详情界面
      alarmDetail() {
        this.$router.push('alarmPage');
        console.log("跳转到传感器详情界面");
      },
      //点击模块查看信息的3D界面
      viewDetailModel() {
        // this.fov = 80;
        // //改变相机
        // this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, 1, 1000);
        // this.camera.position.set(-20, 20, 35);
        // this.camera.lookAt(this.scene.position);
        // //控制器
        // this.controls = new OrbitControls(this.camera);
        // this.controls.target.set(0, 0, 0);
        // this.controls.minDistance = 80;
        // this.controls.maxDistance = 400;
        // this.controls.maxPolarAngle = Math.PI / 3;
        // this.controls.update();
        console.log("清除场景");
      }
    }
  }
</script>

<style scoped>

</style>
