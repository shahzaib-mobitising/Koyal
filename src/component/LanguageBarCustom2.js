import React from 'react'
import { NavLink } from 'react-router-dom'



function LanguageBarCustom2(props) {

    const typp = props.type
    const languages = [
        {
            id: 1,
            langName: "Urdu",
            url: "/explore/" + typp + "/urdu"
        },
        {
            id: 2,
            langName: "Punjabi",
            url: "/explore/" + typp + "/punjabi"
        },
        {
            id: 3,
            langName: "Saraiki",
            url: "/explore/" + typp + "/saraiki"
        },
        {
            id: 4,
            langName: "Sindhi",
            url: "/explore/" + typp + "/sindhi"
        },
        {
            id: 5,
            langName: "Pashto",
            url: "/explore/" + typp + "/pashto"
        },
        {
            id: 6,
            langName: "Balochi",
            url: "/explore/" + typp + "/balochi"
        },
        {
            id: 7,
            langName: "Hindko",
            url: "/explore/" + typp + "/hindko"
        }
    ]


    return (
        <div className="languageBarCustom">

            <div className="ul_language">

                {
                    languages.map(lang =>

                        <div className="language-item" key={lang.id}>
                            <NavLink
                                to={lang.url} activeStyle={{
                                    backgroundColor: "#ec297b",
                                    color: "white",
                                }}>
                                {lang.langName}
                            </NavLink>
                        </div>)
                }
            </div>
        </div>
    )
}

export default LanguageBarCustom2
