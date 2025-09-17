"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Html, useGLTF, Center } from "@react-three/drei"
import { Suspense, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

interface RobotProps {
  currentMessage: string
  isAnimating: boolean
}

function Robot({ currentMessage, isAnimating }: RobotProps) {
  const robotRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (robotRef.current) {
      robotRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
      robotRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1

      if (isAnimating) {
        robotRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.05
      }
    }
  })

  const { scene } = useGLTF(
    "https://raw.githubusercontent.com/Amaralarthurr/3d-modelrobot-cp2-gamedev/95509a21b8c2171ed7d96148ce12dca8109d156d/ai_robot.glb",
  )

  return (
    <Center>
      <group
        ref={robotRef}
        position={[0, -0.7, 0]}
      >
        <primitive object={scene} scale={3.0} rotation={[0, 0.2, 0]} />

      {currentMessage && (
        <Html position={[0, 1.6, 0]} center>
          <div className="bg-cyber-gray/90 border border-cyber-green/50 rounded px-3 py-2 min-w-[300px] backdrop-blur-sm">
            <p className="text-cyber-green font-mono text-sm text-center leading-snug">{currentMessage}</p>
            <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-cyber-green/50"></div>
          </div>
        </Html>
      )}
      </group>
    </Center>
  )
}

function QuizInterface({ onQuizStateChange }: { onQuizStateChange: (state: any) => void }) {
  return (
    <Html position={[2, 0, 0]} transform occlude>
      <div className="w-96 h-96 bg-cyber-gray/80 border border-cyber-pink/50 rounded-lg p-4 backdrop-blur-sm">
        <div id="quiz-container" className="h-full overflow-y-auto">
        </div>
      </div>
    </Html>
  )
}

interface Quiz3DSceneProps {
  quizState: any
  currentMessage: string
  visible?: boolean
  onClose?: () => void
}

export default function Quiz3DScene({ quizState, currentMessage, visible = false, onClose }: Quiz3DSceneProps) {
  return (
    <div className="relative w-full h-80 bg-cyber-dark rounded-lg overflow-hidden">
      <button
        type="button"
        aria-label="Fechar robô"
        onClick={onClose}
        className="absolute top-2 right-2 z-50 bg-cyber-gray/80 border border-cyber-pink/50 text-white rounded px-2 py-1 text-xs font-mono hover:bg-cyber-pink/20"
      >
        ✕
      </button>
      <Canvas camera={{ position: [0, 1.2, 2.4], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 3, 2]} intensity={0.8} />
          {visible && (
            <Robot currentMessage={currentMessage} isAnimating={quizState?.isPlaying || false} />
          )}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            target={[0, 1, 0]}
            minDistance={2.2}
            maxDistance={6}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={(2 * Math.PI) / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
