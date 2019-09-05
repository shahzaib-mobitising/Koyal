import React from 'react'
import { NavLink } from 'react-router-dom'

const languages = [
    {
        id: 1,
        langName: "Urdu",
        url: "/urdu-songs"
    },
    {
        id: 2,
        langName: "Punjabi",
        url: "/punjabi-songs"
    },
    {
        id: 3,
        langName: "Saraiki",
        url: "/saraiki-songs"
    },
    {
        id: 4,
        langName: "Sindhi",
        url: "/sindhi-songs"
    },
    {
        id: 5,
        langName: "Pashto",
        url: "/pashto-songs"
    },
    {
        id: 6,
        langName: "Balochi",
        url: "/balochi-songs"
    },
    {
        id: 7,
        langName: "Hindko",
        url: "/hindko-songs"
    }
]


const languagesHTML = languages.map(lang =>

    <div className="language-item" key={lang.id}>
        <NavLink to={lang.url} activeStyle={{
            backgroundColor: "#ec297b",
            color: "white",
        }}>
            {lang.langName}
        </NavLink>
    </div>
)

function LanguageBarCustom() {
    return (
        <div className="languageBarCustom">
            <div className="ul_language">

                {languagesHTML}
            </div>
        </div>
    )
}

export default LanguageBarCustom
