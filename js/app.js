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
    ammo: 'https://rawgit.com/WhitestormJS/physics-module-ammonext/master/vendor/ammo.js',
    gravity: new THREE.Vector3(0, -5.8, 0),
    softbody: true
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

new WHS.Icosahedron({ // Softbody (blue).
  geometry: {
    radius: 4,
    detail: 3
  },

  modules: [
    new PHYSICS.SoftbodyModule({
      mass: 15,
      viterations: 2,
      diterations: 2,
      pressure: 1000
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: new THREE.MeshBasicMaterial({color: 0xff0000})
  }),

  position: {
    x: 9,
    y: 4
  }
}).addTo(app).then(obj => { obj.native.frustumCulled = false });



const sphere = new WHS.Icosahedron({
  geometry: {
    radius: 4,
    detial: 3
  },

  modules: [
    new PHYSICS.SoftbodyModule({
      friction: 0.8,
      damping: 0,
      margin: 0,
      klst: 0.9,
      kvst: 0.9,
      kast: 0.9,
      piterations: 1,
      viterations: 0,
      diterations: 0,
      citerations: 4,
      anchorHardness: 0.7,
      rigidHardness: 1
    })
  ],

  material: new THREE.MeshBasicMaterial({color: 0xff0000})
});

sphere.position.y = 4;
sphere.addTo(app);
sphere.native.frustumCulled = false;
console.log(sphere);

for ( i = 0; i < 10; i++) {
    const newSphere = sphere.clone(true, false);
    newSphere.position.y = 5 + 4 * (i + 1);
    newSphere.native.frustumCulled = false;
    newSphere.addTo(app);
};

// const cloth = new WHS.Plane({
//   geometry: {
//     width: 100,
//     height: 50
//   },

//   modules: [
//     new PHYSICS.ClothModule({
//       mass: 5
//     })
//   ],

//   material: new THREE.MeshBasicMaterial({color: 0xff0000})
// });

// cloth.addTo(app);

new WHS.Plane({
  geometry: {
    width: 100,
    height: 100
  },
  
  modules: [
    new PHYSICS.PlaneModule({
      mass: 0
    })
  ],

  material: new THREE.MeshPhongMaterial({color: 0x447F8B}),

  position: [0, -10, 0],
  rotation: {
    x: -Math.PI / 2
  }
}).addTo(app);


// const plane = new WHS.Plane({
//   geometry: {
//     width: 100,
//     height: 100
//   },

//    modules: [
//     new PHYSICS.PlaneModule({
//       mass: 0, 
//       restitution: 1

//     })
//   ],

//   material: new THREE.MeshPhongMaterial({
//     color: 0x447F8B

//   }),
//   rotation: {
//     x: - Math.PI / 2
//   },
//   shadow: {
//     recieveShadow:true
//   },
//   position: [0,0,0]
// });
// plane.addTo(app);

// for (var i = 0; i < 1; i++) {
//   var box = new WHS.Box({
//   geometry: {
//     width: 2,
//     height: 2,
//     depth: 2
//   },
//   modules: [
//     new PHYSICS.BoxModule({
//       mass: 1,
//       restitution:1,
//       autoAlign: true
//     })
//   ],

//   material: new THREE.MeshPhongMaterial({
//     color: 0x08f702,
//   }),
//   position: [0, 10+i, 0]

// });
// box.addTo(app);  
// };


new WHS.Loop(() => {
  // box.rotation.y += 0.02;
}).start(app);
app.applyModule(new StatsModule(StatsModule.codes.fps));
app.start();

