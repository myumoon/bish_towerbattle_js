// main.js
(function() {

  var WIDTH = 640, HEIGHT = 480;
  var renderer, scene, camera, scene2d, camera2d;

  init();
  animate();

  function init() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0x000000, 1);
    renderer.autoClear = false;
    document.body.appendChild(renderer.domElement);
    
    (function init3D() {
      camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 0.001, 1000);
      camera.position.set(0, 0, 10);
      scene = new THREE.Scene();
      scene.add(new THREE.AmbientLight(0x303030));
      var light = new THREE.DirectionalLight(0xFFFFFF);
      light.position.set(1, 1, 1);
      scene.add(light);
      var mesh = new THREE.Mesh(
        new THREE.SphereGeometry(1, 20, 20),
        new THREE.MeshLambertMaterial({ambient: 0xFFFFFF})
      );
      mesh.position.set(0, 0, 0);
      scene.add(mesh);
    })();
    
    (function init2D() {
      camera2d = new THREE.OrthographicCamera(0, WIDTH, 0, HEIGHT, 0.001, 10000);
      scene2d = new THREE.Scene();
    
      THREE.ImageUtils.loadTexture("img/block_ayuni_01.png", undefined, function(texture) {
        var material = new THREE.SpriteMaterial({map: texture, color: 0xFFFFFF});
        var sprite;
        var w = texture.image.width, h = texture.image.height;

        sprite = new THREE.Sprite(material);
        sprite.position.set(w*0.5, h*0.5, -9999);
        sprite.scale.set(w, -h, 1);
        scene2d.add(sprite);
    
//         sprite = new THREE.Sprite(material);
//         sprite.position.set(w, h, -1);
//         sprite.scale.set(w, -h, 1);
//         scene2d.add(sprite);
      });
    })();
  }
  
  function animate() {
    requestAnimationFrame(animate);
    renderer.clear();
    renderer.render(scene2d, camera2d);
    renderer.render(scene, camera);
  }
  
})();
