import React from 'react'
import ContentLoader from "react-content-loader"

function AlbumLoader() {
    return (
        <div>
            <ContentLoader
                height={475}
                width={800}
                speed={2}
                primaryColor="#f3f3f3"
                secondaryColor="#ecebeb"
            >
                <rect x="0" y="12" rx="5" ry="5" width="130" height="130" />
                <rect x="150" y="12" rx="5" ry="5" width="130" height="130" />
                <rect x="295" y="12" rx="5" ry="5" width="130" height="130" />
                <rect x="440" y="12" rx="5" ry="5" width="130" height="130" />
                <rect x="585" y="12" rx="5" ry="5" width="130" height="130" />

                <rect x="0" y="162" rx="5" ry="5" width="130" height="130" />
                <rect x="150" y="162" rx="5" ry="5" width="130" height="130" />
                <rect x="295" y="162" rx="5" ry="5" width="130" height="130" />
                <rect x="440" y="162" rx="5" ry="5" width="130" height="130" />
                <rect x="585" y="162" rx="5" ry="5" width="130" height="130" />

                <rect x="0" y="315" rx="5" ry="5" width="130" height="130" />
                <rect x="150" y="315" rx="5" ry="5" width="130" height="130" />
                <rect x="295" y="315" rx="5" ry="5" width="130" height="130" />
                <rect x="440" y="315" rx="5" ry="5" width="130" height="130" />
                <rect x="585" y="315" rx="5" ry="5" width="130" height="130" />

            </ContentLoader>
        </div>
    )
}

export default AlbumLoader
