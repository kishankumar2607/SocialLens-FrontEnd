import React from 'react'
import Image from 'next/image'
import styles from "./ImageComponent.module.scss"

const ImageComponent = ({src, alt, width, height, imageStyle}) => {
  return (
	<div className={imageStyle}>
		<Image 
			src={src}
			alt={alt}
			width={width}
			height={height}
			className={styles.imageSizeStyle}
		/>
	</div>
  )
}

export default ImageComponent