import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { NavLink } from 'react-router-dom'


const searchWords = [
    {
        id: 0,
        langName: "0-9",
        url: "/0-9"
    },
    {
        id: 1,
        langName: "A",
        url: "/a"
    },
    {
        id: 2,
        langName: "B",
        url: "/b"
    },
    {
        id: 3,
        langName: "C",
        url: "/c"
    },
    {
        id: 4,
        langName: "D",
        url: "/d"
    },
    {
        id: 5,
        langName: "E",
        url: "/e"
    },
    {
        id: 6,
        langName: "F",
        url: "/f"
    },
    {
        id: 7,
        langName: "G",
        url: "/g"
    },
    {
        id: 8,
        langName: "H",
        url: "/h"
    },
    {
        id: 9,
        langName: "I",
        url: "/i"
    },
    {
        id: 10,
        langName: "J",
        url: "/j"
    },
    {
        id: 11,
        langName: "K",
        url: "/k"
    },
    {
        id: 12,
        langName: "L",
        url: "/l"
    },
    {
        id: 13,
        langName: "M",
        url: "/m"
    },
    {
        id: 14,
        langName: "N",
        url: "/n"
    },
    {
        id: 15,
        langName: "O",
        url: "/o"
    },
    {
        id: 16,
        langName: "P",
        url: "/p"
    },
    {
        id: 17,
        langName: "Q",
        url: "/q"
    },
    {
        id: 18,
        langName: "R",
        url: "/r"
    },
    {
        id: 19,
        langName: "S",
        url: "/s"
    },
    {
        id: 20,
        langName: "T",
        url: "/t"
    },
    {
        id: 21,
        langName: "U",
        url: "/u"
    },
    {
        id: 22,
        langName: "V",
        url: "/v"
    },
    {
        id: 23,
        langName: "W",
        url: "/w"
    },
    {
        id: 24,
        langName: "X",
        url: "/x"
    },
    {
        id: 25,
        langName: "Y",
        url: "/y"
    },
    {
        id: 26,
        langName: "Z",
        url: "/z"
    }
]



function AlphabetViewMoreCustom(props) {

    const alphabetHtml = searchWords.map(val =>
        <div key={val.id} className="item">

            <NavLink

                to={`/explore/sort/` + props.languageCurrent + val.url}

                activeStyle={{
                    backgroundColor: "rgb(236, 41, 123)",
                    color: "white",
                    borderRadius: "20px"
                }}>
                {val.langName}
            </NavLink>
        </div>


    )


    return (
        <div className="alphabetCarousel">

            <OwlCarousel
                className="owl-theme"
                items={14}
                dots={false}
            >
                {alphabetHtml}
            </OwlCarousel>
        </div>
    )
}

export default AlphabetViewMoreCustom
