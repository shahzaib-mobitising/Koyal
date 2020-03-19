import React from 'react'
import ContentLoader from 'react-content-loader'

const HomeLoad = () => (
    <ContentLoader
        height={360}
        width={580}
        speed={3}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
    >
        <rect x="3" y="3" rx="10" ry="10" width="580" height="360" />

    </ContentLoader>
)


export default HomeLoad