import React from 'react'
import LazyLoad from 'react-lazyload'

const MainSlider = props => {
    return (
        <>
            <LazyLoad once={true} placeholder={<img src={`assets/dummy-img.jpg`} alt={`hello`} />} >
                <img className="collection-image" src={props.image} style={{ width: "100%", height: "100%" }} alt={props.url_id} />
            </LazyLoad>
        </>
    )
}

export default MainSlider
