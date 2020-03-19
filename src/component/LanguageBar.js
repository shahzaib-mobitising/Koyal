import React from 'react'
import { Link } from "react-router-dom";

const languages = [
    {
        id: 0,
        langName: "Urdu",
        url: "/urdu"
    },
    {
        id: 1,
        langName: "Punjabi",
        url: "/punjabi"
    },
    {
        id: 2,
        langName: "Saraiki",
        url: "/saraiki"
    },
    {
        id: 3,
        langName: "Sindhi",
        url: "/sindhi"
    },
    {
        id: 4,
        langName: "Pashto",
        url: "/pashto"
    },
    {
        id: 5,
        langName: "Balochi",
        url: "/balochi"
    },
    {
        id: 6,
        langName: "Hindko",
        url: "/hindko"
    }
]

const languagesHTML = languages.map(lang =>

    <li key={lang.id}>
        <Link to={lang.url + "/" + lang.id}>{lang.langName}</Link>
    </li>
)

const LanguageBar = () => {

    return (
        <>
                <ul>
                    {languagesHTML}
                </ul>
        </>
    );
}
export default LanguageBar
