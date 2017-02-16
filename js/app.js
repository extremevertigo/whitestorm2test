const camera = new WHS.app.CameraModule({
   position: new THREE.Vector3(0, 10, 50)
   });
const controlsModule = new WHS.controls.OrbitModule();

const app = new WHS.App([
  new WHS.app.ElementModule(),
  new WHS.app.SceneModule(),
  camera,
  controlsModule,
  new WHS.app.RenderingModule({
    bgColor: 0x162129,
    renderer: {
      shadowmap: {
        type: THREE.PCFSoftShadowMap
      }
    }   
  }, {shadow: true}),
  new WHS.app.ResizeModule(),
  new PHYSICS.WorldModule({
    ammo: 'https://cdn.rawgit.com/WhitestormJS/physics-module-ammonext/75634e80/vendor/ammo.js',
    gravity: new THREE.Vector3(0, -20, 0)
  })
]);
console.log(controlsModule);
new WHS.AmbientLight( {
  light: {
    color: 0xffffff,
    intensity: 0.1
  }
}).addTo(app);

new WHS.SpotLight( {
  light: {
    color: 0xffffff,
    intensity: 1,
    distance: 1000
  },
  position: [10, 20, 10]
}).addTo(app);

// const sphere = new WHS.Sphere({
//   geometry: {
//     radius: 3,
//     widthSegments: 32,
//     heighSegments: 32
//   },
//   modules: [
//     new PHYSICS.SphereModule({
//       mass: 20,
//       restitution: 3
//     })
//   ],

//   material: new THREE.MeshPhongMaterial({
//     color: 0xF2F2F2,
//     shading: THREE.SmoothShading,
//   }),
//   shadow: {
//     castShadow: true
//   },
  
//   position: [0,30,10]
// });


// sphere.addTo(app);

// const sphere = new WHS.Icosahedron({
//   geometry: {
//     radius: 3,
//     detial: 2
//   },

//   modules: [
//     new PHYSICS.SoftbodyModule({
//       mass: 2,
//       pressure: 100,
//       damping: 0.01,
//       friction: 0.3,
//       klst: 0.6,
//       kast: 0.6,
//       margin: 0.05
//     })
//   ],

//   position: [0,30,0],
//   material: new THREE.MeshBasicMaterial({color: 0xff0000})
// });
// sphere.native.frustumCulled = false;
// sphere.addTo(app);

const cloth = new WHS.Plane({
  geometry: {
    width: 100,
    height: 50
  },

  modules: [
    new PHYSICS.ClothModule({
      mass: 5
    })
  ],

  material: new THREE.MeshBasicMaterial({color: 0xff0000})
});

cloth.addTo(app);

const plane = new WHS.Plane({
  geometry: {
    width: 100,
    height: 100
  },

   modules: [
    new PHYSICS.PlaneModule({
      mass: 0
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: 0x447F8B

  }),
  rotation: {
    x: - Math.PI / 2
  },
  shadow: {
    recieveShadow:true
  },
  position: [0,-3,0]
});
plane.addTo(app);

for (var i = 0; i < 500; i++) {
  var box = new WHS.Box({
  geometry: {
    width: 2,
    height: 2,
    depth: 2
  },
  modules: [
    new PHYSICS.BoxModule({
      mass: 1,
      restitution:1,
      autoAlign: true
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: 0x08f702,
  }),
  position: [0, 10+i, 0]

});
box.addTo(app);  
};


new WHS.Loop(() => {
  // box.rotation.y += 0.02;
}).start(app);
app.applyModule(new StatsModule(StatsModule.codes.fps));
app.start();

