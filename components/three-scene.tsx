"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (!containerRef.current || isInitialized) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000510)

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5
    camera.position.y = 1

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1
    containerRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    const pointLight1 = new THREE.PointLight(0x7b68ee, 2, 10)
    pointLight1.position.set(2, 2, 2)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x00ffff, 2, 10)
    pointLight2.position.set(-2, -1, -2)
    scene.add(pointLight2)

    // Post-processing
    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.5, 0.4, 0.85)
    composer.addPass(bloomPass)

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 2000

    const posArray = new Float32Array(particlesCount * 3)
    const scaleArray = new Float32Array(particlesCount)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 10
      posArray[i + 1] = (Math.random() - 0.5) * 10
      posArray[i + 2] = (Math.random() - 0.5) * 10

      // Scale
      scaleArray[i / 3] = Math.random()
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute("scale", new THREE.BufferAttribute(scaleArray, 1))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Create central brain/neural network structure
    const brainGeometry = new THREE.SphereGeometry(1, 32, 32)
    const brainMaterial = new THREE.MeshStandardMaterial({
      color: 0x7b68ee,
      metalness: 0.3,
      roughness: 0.4,
      emissive: 0x2a0080,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.9,
    })

    const brain = new THREE.Mesh(brainGeometry, brainMaterial)
    scene.add(brain)

    // Create neural connections
    const connectionCount = 20
    const connections: THREE.Line[] = []

    for (let i = 0; i < connectionCount; i++) {
      const points = []
      const startAngle = Math.random() * Math.PI * 2
      const startRadius = 0.8 + Math.random() * 0.2

      const startX = Math.cos(startAngle) * startRadius
      const startY = Math.sin(startAngle) * startRadius
      const startZ = (Math.random() - 0.5) * 2 * startRadius

      points.push(new THREE.Vector3(startX, startY, startZ))

      const midX = startX * 1.5
      const midY = startY * 1.5
      const midZ = startZ * 1.5

      points.push(new THREE.Vector3(midX, midY, midZ))

      const endX = startX * (2 + Math.random())
      const endY = startY * (2 + Math.random())
      const endZ = startZ * (2 + Math.random())

      points.push(new THREE.Vector3(endX, endY, endZ))

      const curve = new THREE.CatmullRomCurve3(points)
      const geometry = new THREE.TubeGeometry(curve, 20, 0.02, 8, false)

      const hue = Math.random() * 0.2 + 0.6 // Blue to purple range
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(hue, 1, 0.5),
        transparent: true,
        opacity: 0.6,
      })

      const tube = new THREE.Mesh(geometry, material)
      scene.add(tube)
      connections.push(tube)

      // Add a small sphere at the end of each connection
      const nodeGeometry = new THREE.SphereGeometry(0.05, 16, 16)
      const nodeMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(hue, 1, 0.7),
        transparent: true,
        opacity: 0.8,
      })

      const node = new THREE.Mesh(nodeGeometry, nodeMaterial)
      node.position.set(endX, endY, endZ)
      scene.add(node)
    }

    // Create floating data cubes
    const cubes: THREE.Mesh[] = []
    const cubeCount = 10

    for (let i = 0; i < cubeCount; i++) {
      const size = 0.1 + Math.random() * 0.2
      const geometry = new THREE.BoxGeometry(size, size, size)

      const material = new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        metalness: 0.7,
        roughness: 0.2,
        transparent: true,
        opacity: 0.7,
      })

      const cube = new THREE.Mesh(geometry, material)

      // Position cubes in a wider area around the brain
      const distance = 2 + Math.random() * 3
      const angle = Math.random() * Math.PI * 2
      const height = (Math.random() - 0.5) * 4

      cube.position.x = Math.cos(angle) * distance
      cube.position.y = height
      cube.position.z = Math.sin(angle) * distance

      scene.add(cube)
      cubes.push(cube)
    }

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate brain
      brain.rotation.y += 0.002
      brain.rotation.z += 0.001

      // Animate particles
      particlesMesh.rotation.y += 0.0005

      // Animate cubes
      cubes.forEach((cube, i) => {
        cube.rotation.x += 0.01 + i * 0.001
        cube.rotation.y += 0.02 - i * 0.001

        // Make cubes float up and down
        cube.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002
      })

      // Pulse the brain
      const pulseScale = 1 + Math.sin(Date.now() * 0.001) * 0.05
      brain.scale.set(pulseScale, pulseScale, pulseScale)

      // Update controls
      controls.update()

      // Render scene with post-processing
      composer.render()
    }

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      composer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Start animation
    animate()
    setIsInitialized(true)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      // Dispose of geometries and materials
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      brainGeometry.dispose()
      brainMaterial.dispose()

      connections.forEach((connection) => {
        connection.geometry.dispose()
        ;(connection.material as THREE.Material).dispose()
      })

      cubes.forEach((cube) => {
        cube.geometry.dispose()
        ;(cube.material as THREE.Material).dispose()
      })
    }
  }, [isInitialized])

  return <div ref={containerRef} className="absolute inset-0" />
}
