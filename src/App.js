import React from 'react';
import { Canvas } from 'react-three-fiber';
import {
  Stars,
  PerspectiveCamera,
  OrbitControls,
  useMatcapTexture,
  MeshDistortMaterial
} from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  DepthOfField
} from '@react-three/postprocessing';
import './styles.css';

function PlanetX() {
  return (
    <mesh position={[0, 1, 5]}>
      <sphereBufferGeometry args={[1, 32, 32]} />
      <MeshDistortMaterial color="red" distort={0.8} speed={0.8} />
    </mesh>
  );
}

function DarkSun() {
  const [matcap] = useMatcapTexture(11, 1024);
  return (
    <mesh position={[-2, 3, -11]}>
      <sphereBufferGeometry args={[10, 32, 32]} />
      <meshMatcapMaterial matcap={matcap} />
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas shadowMap colorManagement>
      <pointLight
        castShadow
        position={[0, 1, 3]}
        intensity={1}
        color="yellow"
      />
      <React.Suspense fallback={null}>
        <DarkSun />
        <PlanetX />
      </React.Suspense>
      <Stars />
      <OrbitControls autoRotate autoRotateSpeed={0.8} enabled={false} />
      <PerspectiveCamera makeDefault position={[25, 0, 0]} fov={50} />
      <EffectComposer>
        <DepthOfField
          focusDistance={4}
          focalLength={0.02}
          bokehScale={1}
          height={400}
        />
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.8} height={300} />
      </EffectComposer>
    </Canvas>
  );
}
