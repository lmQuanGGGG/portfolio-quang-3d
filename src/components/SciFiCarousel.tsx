"use client";
import * as THREE from "three";
import { useRef, useState, useMemo, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Text, useCursor, useTexture } from "@react-three/drei";
import { useSpring, animated, config } from "@react-spring/three";
import { useDrag } from "@use-gesture/react";
import { profile } from "@/app/data";

// --- CẤU HÌNH KÍCH THƯỚC ---
const RADIUS = 5.5;      
const CARD_WIDTH = 3.2;  
const CARD_HEIGHT = 2.4; 

// --- FIX RESPONSIVE: Tự động chỉnh Camera khi màn hình nhỏ ---
function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    // Nếu chiều rộng < 768px (Mobile), đẩy camera ra xa (z=16) để thấy hết chiều ngang card
    // Desktop giữ nguyên z=9
    const isMobile = size.width < 768;
    camera.position.z = isMobile ? 16 : 9;
  }, [camera, size.width]);

  return null;
}

// 1. Component hiển thị ảnh 
function HighResCardContent({ url }: { url: string }) {
  const texture = useTexture(url);
  const { gl } = useThree();

  useMemo(() => {
    // Tối ưu Texture: Giữ độ nét tối đa
    texture.anisotropy = gl.capabilities.getMaxAnisotropy();
    texture.generateMipmaps = false; 
    texture.minFilter = THREE.LinearFilter; 
    texture.magFilter = THREE.LinearFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture, gl]);

  return (
    <mesh>
      <planeGeometry args={[CARD_WIDTH, CARD_HEIGHT]} />
      <meshBasicMaterial 
        map={texture} 
        
        // --- SỬA ĐỔI QUAN TRỌNG ---
        // 1. transparent={false}: Tắt trong suốt hoàn toàn -> Ảnh luôn đặc, rắn, không bị xuyên thấu.
        transparent={false}
        
        // 2. opacity={1}: Luôn hiển thị 100% độ rõ, không bị mờ.
        opacity={1}
        
        // 3. color="white": Luôn giữ màu gốc trắng sáng, KHÔNG ám tím bất kể vị trí.
        color="white"
        
        // 4. toneMapped={false}: Giữ độ tương phản gốc của giấy trắng mực đen.
        toneMapped={false} 
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// 2. Component con xử lý hiệu ứng & Chữ (Phiên bản Clean)
function CardVisuals({ url, i, springIndex, title, link, hovered }: any) {
    const [isActive, setIsActive] = useState(false);
    const [btnHover, setBtnHover] = useState(false); // State hover cho nút
    
    useFrame(() => {
        const val = springIndex.get();
        const count = profile.certificates.length;
        let normalized = Math.round(val) % count;
        if (normalized < 0) normalized += count;
        
        const isNowActive = normalized === i;
        setIsActive((prev) => (prev !== isNowActive ? isNowActive : prev));
    });

    const { scale } = useSpring({
        scale: isActive ? 1.2 : hovered ? 1.1 : 1,
        config: config.stiff
    });

    return (
        <animated.group scale={scale}>
            {/* Gọi Content hiển thị ảnh */}
            <HighResCardContent url={url} />

            {/* TEXT THÔNG TIN & BUTTON */}
            <group position={[0, -1.5, 0]}>
                {/* Tên chứng chỉ */}
                <Text 
                    position={[0, 0.15, 0]} 
                    fontSize={0.15} 
                    color="white" 
                    anchorX="center" 
                    anchorY="middle" 
                    maxWidth={2.8}
                    textAlign="center"
                >
                    {title}
                </Text>

                {/* NÚT BẤM LINK*/}
                <group 
                    position={[0, -0.15, 0]}
                    onClick={(e) => {
                        e.stopPropagation(); 
                        if (link) window.open(link, '_blank');
                    }}
                    onPointerOver={() => setBtnHover(true)}
                    onPointerOut={() => setBtnHover(false)}
                >
                    <mesh position={[0, 0, -0.01]}>
                        <planeGeometry args={[0.9, 0.18]} />
                        <meshBasicMaterial color={btnHover ? "#fdfdfdff" : "#333"} />
                    </mesh>
                    <Text
                        fontSize={0.06}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                    >
                        {btnHover ? "OPEN ↗" : "VIEW CERTIFICATE"}
                    </Text>
                </group>
            </group>
        </animated.group>
    )
}

// 3. Component Wrapper
function Card({ url, title, link, i, count, springIndex, setIndex }: any) {
  const [hovered, setHover] = useState(false);
  useCursor(hovered);

  const { position, rotation } = useSpring({
    to: {
        position: [
            Math.sin((i * (Math.PI * 2) / count)) * RADIUS, 
            0, 
            Math.cos((i * (Math.PI * 2) / count)) * RADIUS
        ],
        rotation: [0, (i * (Math.PI * 2) / count), 0],
    },
    config: config.wobbly
  });

  return (
    <animated.group
      position={position as any}
      rotation={rotation as any}
      onClick={() => setIndex(i)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <Suspense fallback={<mesh><planeGeometry args={[CARD_WIDTH, CARD_HEIGHT]} /><meshBasicMaterial color="#333" /></mesh>}>
         <CardVisuals url={url} i={i} springIndex={springIndex} title={title} link={link} hovered={hovered} />
      </Suspense>
    </animated.group>
  );
}

// 4. Vòng tròn chứa logic Drag
function CarouselRing() {
  const count = profile.certificates.length;
  const [{ index }, api] = useSpring(() => ({ 
      index: 0, 
      config: { mass: 1, tension: 200, friction: 26 } 
  }));

  const bind = useDrag(({ offset: [x], down, velocity: [vx], direction: [dx], cancel }) => {
    const sensitivity = 500; 
    const curIndex = -x / sensitivity; 

    if (!down) {
       const targetIndex = Math.round(curIndex);
       api.start({ index: targetIndex, immediate: false });
    } else {
       api.start({ index: curIndex, immediate: true });
    }
  }, { 
      axis: 'x', 
      rubberband: true,
      from: () => [-index.get() * 500, 0] 
  });

  const setIndex = (i: number) => {
      const current = index.get();
      
      // --- FIX LOGIC: TÍNH ĐƯỜNG ĐI NGẮN NHẤT ---
      // 1. Chuẩn hóa index hiện tại về khoảng [0, count-1]
      let currentMod = Math.round(current) % count;
      if (currentMod < 0) currentMod += count;
      
      // 2. Tính khoảng cách tới đích
      let dist = i - currentMod;

      // 3. Nếu khoảng cách > nửa vòng, đi đường ngược lại cho gần
      if (dist > count / 2) dist -= count;
      if (dist < -count / 2) dist += count;

      // 4. Cập nhật target
      const target = Math.round(current) + dist;
      api.start({ index: target });
  };

  return (
    <animated.group 
        {...bind()} 
        // --- FIX QUAN TRỌNG: ĐẢO CHIỀU XOAY ---
        // Thêm dấu trừ (-) trước i để đồng bộ giữa hình ảnh và logic index
        rotation-y={index.to(i => -i * (Math.PI * 2) / count)} 
        position={[0, 0, -1]}
    >
      {profile.certificates.map((cert, i) => (
        <Card
          key={i}
          i={i}
          count={count}
          url={cert.img}
          title={cert.name}
          link={cert.link}
          springIndex={index} 
          setIndex={setIndex} 
        />
      ))}
    </animated.group>
  );
}

// 5. Main Component
export default function SciFiCarousel() {
  return (
    <div className="w-full h-[700px] relative cursor-grab active:cursor-grabbing"> 
      <Canvas 
        dpr={[1, 2]} 
        gl={{ antialias: true, preserveDrawingBuffer: true }}
        camera={{ position: [0, 0, 9], fov: 50 }}
      >
        {/* Thêm component xử lý responsive vào đây */}
        <ResponsiveCamera />

        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#d946ef" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#4ade80" />
        
        <CarouselRing />
        
        <Environment preset="city" /> 
      </Canvas>
    </div>
  );
}