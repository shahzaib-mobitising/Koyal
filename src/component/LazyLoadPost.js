import React, { Component } from 'react'
import PostLayout from './PostLayout'
import LazyLoad from 'react-lazyload'
//import Loading from './Loading'
import axios from 'axios'

export default class LazyLoadPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            slider: [
              ]
        }
    }

    componentDidMount() {

        axios.get('https://jsonplaceholder.typicode.com/photos')
            .then(response => {
                this.setState({
                    slider: response.data
                })
              
            })
            .catch(error => {
                console.log(error)
              
            })
    }

    render() {
        const { slider } = this.state
        return (
            <>
                <div className="post-container">
                    {
                        slider.map(data =>


                            <LazyLoad height={100} offset={[-100, 100]} key={data.Id}  
                            placeholder={<img src={`https://dummyimage.com/200x200/000/fff.jpg&text=LazyLoadPost`} alt={`hello`} />}
                            >
                                   <PostLayout Id={data.id} SliderImageWeb={data.url} />
                             </LazyLoad>


                         
                        )
                    }
                </div>
            </>
        )
    }
}
