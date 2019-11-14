import React from 'react'
import { NavLink } from 'react-router-dom'

const languages = [
    {
        id: 1,
        langName: "Urdu",
        url: "/urdu"
    },
    {
        id: 2,
        langName: "Punjabi",
        url: "/punjabi"
    },
    {
        id: 3,
        langName: "Saraiki",
        url: "/saraiki"
    },
    {
        id: 4,
        langName: "Sindhi",
        url: "/sindhi"
    },
    {
        id: 5,
        langName: "Pashto",
        url: "/pashto"
    },
    {
        id: 6,
        langName: "Balochi",
        url: "/balochi"
    },
    {
        id: 7,
        langName: "Hindko",
        url: "/hindko"
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
