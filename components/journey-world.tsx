"use client";

import { useEffect, useRef } from "react";
import type * as Three from "three";

export type JourneyAnchor = { left: number; top: number };
type Props = { selected: number; onRender: (anchors: JourneyAnchor[] | null) => void; onSelect: (index: number) => void };

export function JourneyWorld({ selected, onRender, onSelect }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const selection = useRef(selected);
  const runtime = useRef<{ select: (index: number) => void } | null>(null);
  useEffect(() => { selection.current = selected; runtime.current?.select(selected); }, [selected]);

  useEffect(() => {
    let cancelled = false;
    let mounting = false;
    let dispose: (() => void) | undefined;
    const media = matchMedia("(min-width: 640px)");

    async function mount() {
      if (!media.matches || dispose || mounting || !canvas.current) return;
      mounting = true;
      try {
        const [THREE, { RoundedBoxGeometry }, { RoomEnvironment }] = await Promise.all([
          import("three"),
          import("three/addons/geometries/RoundedBoxGeometry.js"),
          import("three/addons/environments/RoomEnvironment.js"),
        ]);
        if (cancelled || !media.matches || !canvas.current) return;
        const element = canvas.current;
        const renderer = new THREE.WebGLRenderer({ canvas: element, antialias: true, alpha: true, powerPreference: "low-power" });
        renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.05;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        renderer.setClearColor(0x000000, 0);

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-7, 7, 4.2, -4.2, .1, 60);
        camera.position.set(8, 8, 14);
        camera.lookAt(0, 1.65, 0);
        const room = new RoomEnvironment();
        const pmrem = new THREE.PMREMGenerator(renderer);
        const environment = pmrem.fromScene(room, .04);
        scene.environment = environment.texture;
        scene.environmentIntensity = .55;
        pmrem.dispose(); room.dispose();

        scene.add(new THREE.HemisphereLight(0xfff9f4, 0x8d839f, 1.7));
        const key = new THREE.DirectionalLight(0xfff4e8, 3.2);
        key.position.set(-5, 13, 7);
        key.castShadow = true;
        key.shadow.mapSize.set(2048, 2048);
        Object.assign(key.shadow.camera, { left: -10, right: 10, top: 10, bottom: -10, near: 1, far: 32 });
        key.shadow.bias = -.0002;
        key.shadow.normalBias = .025;
        key.shadow.radius = 4;
        scene.add(key);
        const fill = new THREE.DirectionalLight(0xdbe1ff, 1.2);
        fill.position.set(6, 6, -8); scene.add(fill);
        const floor = new THREE.Mesh(new THREE.PlaneGeometry(45, 40), new THREE.ShadowMaterial({ color: 0x51445b, opacity: .19 }));
        floor.rotation.x = -Math.PI / 2; floor.position.y = -.12; floor.receiveShadow = true; scene.add(floor);

        const materials: Three.MeshPhysicalMaterial[] = [];
        const positions = [new THREE.Vector3(-3.75, .04, 2.7), new THREE.Vector3(-1.25, .94, .9), new THREE.Vector3(1.25, 1.84, -.9), new THREE.Vector3(3.75, 2.74, -2.7)];
        const surface = (color: number, metalness = .08, roughness = .38) => new THREE.MeshPhysicalMaterial({ color, metalness, roughness, clearcoat: .35, clearcoatRoughness: .3 });
        function block(parent: Three.Group, width: number, height: number, depth: number, x: number, y: number, z: number, material: Three.Material, radius = .04) {
          const mesh = new THREE.Mesh(new RoundedBoxGeometry(width, height, depth, 3, Math.min(radius, width / 3, height / 3, depth / 3)), material);
          mesh.position.set(x, y, z); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
        }
        const graphite = surface(0x292734, .38, .27);
        const metal = surface(0xb6a2a3, .8, .22);
        const ceramic = surface(0xf4edf7, .08, .3);
        const plum = surface(0x80546e, .22, .28);

        function codeTexture() {
          const drawing = document.createElement("canvas"); drawing.width = 768; drawing.height = 448;
          const context = drawing.getContext("2d")!;
          context.fillStyle = "#22222d"; context.fillRect(0, 0, 768, 448);
          ["#ad7b91", "#c5a47f", "#a8b8a8"].forEach((color, index) => { context.fillStyle = color; context.beginPath(); context.arc(38 + index * 24, 28, 6, 0, Math.PI * 2); context.fill(); });
          context.font = "23px monospace";
          const lines = ["class MatchingEngine {", "  OrderBook book;", "", "  void on_order(Order order) {", "    validate(order);", "    book.match(order);", "  }", "};"];
          lines.forEach((line, index) => { context.fillStyle = index === 0 || index === 3 ? "#c79bad" : "#c6ced3"; context.fillText(line, 38, 86 + index * 40); });
          const texture = new THREE.CanvasTexture(drawing); texture.colorSpace = THREE.SRGBColorSpace; return texture;
        }
        const texture = codeTexture();
        positions.forEach((position, index) => {
          const group = new THREE.Group(); group.position.copy(position); group.userData.stage = index; scene.add(group);
          const base = surface(0xe7e2ed, .1, .36); materials.push(base);
          if (position.y > .1) block(group, 1.92, position.y, 1.56, 0, -position.y / 2, 0, surface(0xded5e5, .04, .6), .06);
          block(group, 2.08, .28, 1.72, 0, .14, 0, base, .075);
          block(group, 1.96, .035, 1.6, 0, .292, 0, ceramic, .045);
          if (index === 0) {
            block(group, 1.1, .2, .94, 0, .48, 0, graphite, .045);
            block(group, .72, .035, .58, 0, .595, 0, surface(0x655063, .5, .24), .025);
            for (let pin = 0; pin < 5; pin++) {
              const offset = -.38 + pin * .19;
              block(group, .2, .045, .055, -.63, .43, offset, metal, .008);
              block(group, .2, .045, .055, .63, .43, offset, metal, .008);
              block(group, .055, .045, .2, offset, .43, -.56, metal, .008);
              block(group, .055, .045, .2, offset, .43, .56, metal, .008);
            }
            const emblem = new THREE.Mesh(new THREE.TorusGeometry(.14, .018, 8, 32), metal); emblem.rotation.x = -Math.PI / 2; emblem.position.set(0, .62, 0); group.add(emblem);
          } else if (index === 1) {
            block(group, .62, .055, .45, 0, .345, .05, metal);
            block(group, .085, .45, .085, 0, .57, -.02, metal, .015);
            const display = new THREE.Group(); display.position.set(0, 1.18, -.02); display.rotation.y = -.12; group.add(display);
            block(display, 1.53, .98, .12, 0, 0, 0, graphite, .055);
            const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.39, .84), new THREE.MeshBasicMaterial({ map: texture })); screen.position.z = .064; display.add(screen);
            block(group, .98, .035, .35, .04, .345, .51, surface(0xb8adb9, .28, .4), .035);
            for (let row = 0; row < 3; row++) for (let column = 0; column < 9; column++) block(group, .068, .009, .045, -.36 + column * .09, .367, .42 + row * .075, ceramic, .004);
          } else if (index === 2) {
            block(group, .58, .58, .58, -.32, .61, .12, plum, .055);
            block(group, .58, .58, .58, .32, .61, .12, ceramic, .055);
            block(group, .58, .58, .58, 0, 1.2, .12, surface(0xb29cb6, .22, .25), .055);
            block(group, .43, .43, .43, 0, .535, -.48, surface(0xd4b9ab, .18, .35), .05);
          } else {
            block(group, .54, .055, .4, 0, .345, .08, metal);
            block(group, .065, .3, .065, 0, .49, 0, metal, .01);
            const chart = new THREE.Group(); chart.position.set(0, 1.12, 0); chart.rotation.y = -.12; group.add(chart);
            block(chart, 1.5, 1.05, .075, 0, 0, 0, ceramic, .05);
            const heights = [.23, .5, .38, .78];
            heights.forEach((height, bar) => {
              const x = -.46 + bar * .3;
              block(chart, .12, height, .055, x, -.4 + height / 2, .06, bar === 2 ? surface(0xbe9c8b, .25) : plum, .008);
              block(chart, .015, height + .13, .025, x, -.4 + height / 2, .067, metal, .004);
            });
            block(chart, 1.16, .012, .02, 0, -.41, .05, metal, .003);
          }
        });

        positions.slice(0, -1).forEach((position, index) => {
          const next = positions[index + 1];
          const from = new THREE.Vector3(position.x + .95, position.y + .31, position.z - .35);
          const to = new THREE.Vector3(next.x - .95, next.y + .31, next.z + .35);
          const middle = from.clone().lerp(to, .5);
          const curve = new THREE.CatmullRomCurve3([from, from.clone().lerp(middle, .6), middle, middle.clone().lerp(to, .4), to]);
          if (index === 2) {
            const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(35)), new THREE.LineDashedMaterial({ color: 0xb28b75, dashSize: .09, gapSize: .065 })); line.computeLineDistances(); scene.add(line);
          } else { const connector = new THREE.Mesh(new THREE.TubeGeometry(curve, 28, .024, 8, false), metal); connector.castShadow = true; scene.add(connector); }
        });

        let frame = 0;
        const draw = () => { renderer.render(scene, camera); cancelAnimationFrame(frame); frame = requestAnimationFrame(() => renderer.render(scene, camera)); };
        const select = (index: number) => { materials.forEach((material, item) => material.color.setHex(item === index ? 0x835b77 : 0xe7e2ed)); draw(); };
        runtime.current = { select };
        function resize() {
          if (!element.parentElement) return;
          const { width, height } = element.parentElement.getBoundingClientRect();
          if (!width || !height) return;
          renderer.setSize(width, height, false);
          const halfHeight = 3.5;
          camera.left = -halfHeight * width / height; camera.right = halfHeight * width / height;
          camera.top = halfHeight; camera.bottom = -halfHeight; camera.updateProjectionMatrix(); camera.updateMatrixWorld();
          select(selection.current);
          onRender(positions.map(position => {
            const point = new THREE.Vector3(position.x + .3, position.y + .1, position.z + .5).project(camera);
            return { left: (point.x + 1) * 50, top: (1 - point.y) * 50 - 15 };
          }));
        }
        const observer = new ResizeObserver(resize); observer.observe(element.parentElement!); resize();
        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();
        const pick = (event: globalThis.PointerEvent) => {
          const bounds = element.getBoundingClientRect();
          pointer.set((event.clientX - bounds.left) / bounds.width * 2 - 1, -(event.clientY - bounds.top) / bounds.height * 2 + 1);
          raycaster.setFromCamera(pointer, camera);
          for (const hit of raycaster.intersectObjects(scene.children, true)) {
            let object: Three.Object3D | null = hit.object;
            while (object) { if (typeof object.userData.stage === "number") { onSelect(object.userData.stage); return; } object = object.parent; }
          }
        };
        element.addEventListener("pointerdown", pick);
        const lost = (event: Event) => { event.preventDefault(); onRender(null); };
        element.addEventListener("webglcontextlost", lost);
        dispose = () => {
          cancelAnimationFrame(frame); observer.disconnect(); element.removeEventListener("webglcontextlost", lost); element.removeEventListener("pointerdown", pick); runtime.current = null;
          scene.traverse(object => {
            if (object instanceof THREE.Mesh || object instanceof THREE.Line) { object.geometry.dispose(); const list = Array.isArray(object.material) ? object.material : [object.material]; list.forEach(material => material.dispose()); }
          });
          texture.dispose(); environment.dispose(); key.shadow.dispose(); renderer.dispose();
        };
      } catch (error) { console.warn("The static journey is being used because 3D rendering is unavailable.", error); onRender(null); }
      finally { mounting = false; }
    }
    const toggle = () => { if (media.matches) void mount(); else { dispose?.(); dispose = undefined; onRender(null); } };
    media.addEventListener("change", toggle); void mount();
    return () => { cancelled = true; media.removeEventListener("change", toggle); dispose?.(); };
  }, [onRender, onSelect]);

  return <canvas ref={canvas} className="journey-webgl" aria-hidden="true" />;
}
