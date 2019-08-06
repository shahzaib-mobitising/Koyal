import React from 'react'
import ContentLoader from "react-content-loader"

function ArtistLoader() {
    return (
        <div>
            <ContentLoader
                height={475}
                width={800}
                speed={2}
                primaryColor="#c2c2c7"
                secondaryColor="#e0e0e2"
            >
                {/* Left Side */}

                <rect x="15" y="4" rx="5" ry="5" width="160" height="160" />
                <rect x="15" y="190" rx="4" ry="4" width="150" height="6" />
                <rect x="15" y="210" rx="4" ry="4" width="150" height="6" />
                <rect x="15" y="230" rx="4" ry="4" width="150" height="6" />

                {/* Right Side */}
                
                <rect x="200" y="43" rx="4" ry="4" width="50" height="6" />
                <rect x="200" y="63" rx="4" ry="4" width="150" height="6" />
                <rect x="200" y="83" rx="4" ry="4" width="150" height="6" />
                <rect x="200" y="103" rx="4" ry="4" width="50" height="6" />
                <rect x="200" y="103" rx="4" ry="4" width="50" height="6" />

            </ContentLoader>
        </div>
    )
}


export default ArtistLoader
