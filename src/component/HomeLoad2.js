import React from 'react'
import ContentLoader from 'react-content-loader'

const HomeLoad2 = () => (
    <ContentLoader
        height={300}
        width={300}
        speed={3}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
    >
        <rect x="3" y="3" rx="10" ry="10" width="300" height="300" />

    </ContentLoader>
)


export default HomeLoad2