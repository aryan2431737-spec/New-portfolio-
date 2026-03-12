/**
 * js/background3d.js
 * ─────────────────────────────────────────────────────────
 * Full-screen Three.js background:
 *   starfield, floating particles, torus rings,
 *   wireframe icosahedra, grid plane, mouse + scroll parallax.
 * Edit this file to change the 3D background environment.
 */
(function () {
  if (typeof THREE === 'undefined') return;

  const cv  = document.getElementById('bgCanvas');
  const ren = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: false });
  ren.setPixelRatio(Math.min(devicePixelRatio, 2));
  ren.setSize(innerWidth, innerHeight);
  ren.setClearColor(0x010b1e, 1);

  const scene = new THREE.Scene();
  scene.fog   = new THREE.FogExp2(0x010b1e, 0.011);

  const cam = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 1000);
  cam.position.set(0, 0, 30);

  /* Stars */
  const N = 3200, sp = new Float32Array(N * 3);
  for (let i = 0; i < N * 3; i++) sp[i] = (Math.random() - .5) * 220;
  const sGeo = new THREE.BufferGeometry();
  sGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  const stars = new THREE.Points(sGeo, new THREE.PointsMaterial({ color: 0x88ccff, size: .11, transparent: true, opacity: .65 }));
  scene.add(stars);

  /* Floating particles */
  const FC = 450, fp = new Float32Array(FC * 3), fv = [];
  for (let i = 0; i < FC; i++) {
    fp[i*3] = (Math.random()-.5)*70; fp[i*3+1] = (Math.random()-.5)*70; fp[i*3+2] = (Math.random()-.5)*25;
    fv.push({ x:(Math.random()-.5)*.012, y:(Math.random()-.5)*.012 });
  }
  const fGeo = new THREE.BufferGeometry();
  fGeo.setAttribute('position', new THREE.BufferAttribute(fp, 3));
  const fPts = new THREE.Points(fGeo, new THREE.PointsMaterial({ color: 0x00d4ff, size: .16, transparent: true, opacity: .44, blending: THREE.AdditiveBlending }));
  scene.add(fPts);

  /* Grid */
  const grid = new THREE.GridHelper(100, 50, 0x001545, 0x001545);
  grid.position.y = -20; grid.material.transparent = true; grid.material.opacity = .32;
  scene.add(grid);

  /* Torus rings */
  function mkT(r, tb, col, op, rx, rz) {
    const m = new THREE.Mesh(new THREE.TorusGeometry(r, tb, 8, 90), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: op }));
    m.rotation.x = rx; m.rotation.z = rz; scene.add(m); return m;
  }
  const t1 = mkT(9,.05,0x00d4ff,.07,Math.PI/2,0);
  const t2 = mkT(14,.04,0x7b2fff,.05,Math.PI/3,Math.PI/5);
  const t3 = mkT(6,.04,0x00ffa3,.06,Math.PI/4,Math.PI/3);

  /* Icosahedra */
  const icos = [[4.5,0x00d4ff,15,0,0],[3,0x7b2fff,-14,2,-4],[2.5,0x00ffa3,8,-5,6],[3.5,0xff2d78,-10,4,-7]].map(d => {
    const m = new THREE.Mesh(new THREE.IcosahedronGeometry(d[0],0), new THREE.MeshBasicMaterial({ color:d[1], wireframe:true, transparent:true, opacity:.12 }));
    m.position.set(d[2],d[3],d[4]); scene.add(m); return m;
  });

  /* Input */
  let mX = 0, mY = 0, cY = 0;
  document.addEventListener('mousemove', e => { mX=(e.clientX/innerWidth-.5)*2; mY=(e.clientY/innerHeight-.5)*2; });
  window.addEventListener('scroll', () => { cY = -(window.scrollY/(document.body.scrollHeight-innerHeight))*42; });
  window.addEventListener('resize', () => { ren.setSize(innerWidth,innerHeight); cam.aspect=innerWidth/innerHeight; cam.updateProjectionMatrix(); });

  const clk = new THREE.Clock();
  (function loop() {
    requestAnimationFrame(loop);
    const t = clk.getElapsedTime();
    cam.position.x += (mX*3 - cam.position.x)*.03;
    cam.position.y += (cY + mY*2 - cam.position.y)*.04;
    cam.lookAt(0, cam.position.y, 0);
    stars.rotation.y = t*.013; stars.rotation.x = t*.007;
    fPts.rotation.y = t*.009;
    const pp = fPts.geometry.attributes.position.array;
    for (let i = 0; i < FC; i++) {
      pp[i*3] += fv[i].x; pp[i*3+1] += fv[i].y;
      if (Math.abs(pp[i*3])>35) fv[i].x*=-1;
      if (Math.abs(pp[i*3+1])>35) fv[i].y*=-1;
    }
    fPts.geometry.attributes.position.needsUpdate = true;
    t1.rotation.z=t*.07; t2.rotation.y=t*.05; t3.rotation.x=t*.09; t3.rotation.z=t*.06;
    icos.forEach((ic,i) => { ic.rotation.x=t*(.18+i*.04); ic.rotation.y=t*(.14+i*.03); });
    grid.material.opacity = .16 + .16*Math.sin(t*.45);
    ren.render(scene, cam);
  })();
})();