// App.tsx
import React, { useCallback } from 'react';

import Particles from 'react-particles';
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { ISourceOptions } from "tsparticles-engine";
import particleConfig from './particleConfig/ParticleConfig.json';

const ParticleBackground: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles options={particleConfig as ISourceOptions} init={particlesInit}/>
  );
};

export default ParticleBackground;