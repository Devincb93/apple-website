import { useGSAP } from '@gsap/react'
import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import ModelView from './ModelView'
import { yellowImg } from '../utils'
import { Canvas } from '@react-three/fiber'

import * as Three from 'three'
import { View } from '@react-three/drei'
import { models, sizes } from '../constants'

const Model = () => {

  const [size, setSize] = useState('small')
  const [model, setModel] = useState({
    title: 'Iphone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
    img: yellowImg
  })
  // this is the camera control for the small and large models.
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  // this is the actual models themselves small and large.
  const small = useRef(new Three.Group())
  const large = useRef(new Three.Group())

  //keep track of rotation value
  const [smallRotation, setSmallRotation] = useState(0)
  const [largeRotation, setLargeRotation] = useState(0)

  useGSAP(() => {
    gsap.to('#heading', {
      y: 0, opacity: 1
    })
  }, [])
  return (
    <section className='common-padding'>
      <div className='screen-max-width'>
        <h1 id='heading' className='section-heading'>
          Take a closer look.
        </h1>
        <div className='flex flex-col items-center mt-5'>
          <div className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative'>
            <ModelView
              index={1}
              groupRef={small}
              gsaptype='view1'
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            
            />
            <ModelView
              index={2}
              groupRef={large}
              gsaptype='view2'
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            
            />
            <Canvas className='w-full h-full' 
            style={{ position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, overflow: 'hidden'}} eventSource={document.getElementById('root')}>
              <View.Port/>
            </Canvas>
          </div>
          <div className='mx-auto w-full'>
            <p className=' text-sm font-light text-center mb-5'>{model.title}
              <div>
                <ul className='color-container'>
                  {models.map((item, i)=> (
                    <li key={i} className='w-6 h-6 rounded-full mx-2 cursor-pointer ' style={{backgroundColor: item.color[0]}} onClick={() => {setModel(item)}}/>
                  ))}
                </ul>
                <button className='size-btn-container'>
                  {sizes.map(({label, value})=> (
                    <span key={label} className='size-btn' style={{backgroundColor: size === value ? 'white' : 'transparent', color: size === value ? 'black' : ' white'}} onClick={()=> setSize(value)}>{label}</span>
                  ))}
                </button>
              </div>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Model