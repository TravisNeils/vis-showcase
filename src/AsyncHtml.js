import React from 'react';
import firebase from "firebase";

export default class AsyncHTML extends React.Component {

    constructor(props) {
        super(props);
        this.state =
            {
                loading: true,
                mounted: true,
                image: "/images/logoblue.jpg",
                url: "",
            }
    }

    componentDidMount() {
        this.setState({ isMounted: true })
        this.getAndLoadHttpUrl()

    }

    async getAndLoadHttpUrl() {
        if (this.state.mounted == true) {
            const ref = firebase
            .storage().ref("images").child(this.props.image);
            
            ref.getDownloadURL().then(data => {
                this.setState({ url: data })
                this.setState({ loading: false })
                console.log(data)
            }).catch(error => {
                this.setState({ url: "/images/logoblue.jpg" })
                this.setState({ loading: false })
            })
        }
    }

    componentWillUnmount() {
        this.setState({ isMounted: false })
    }


    componentWillReceiveProps(props) {
        this.props = props
        if (this.props.refresh == true) {

        }
    }


    render() {
        if (this.state.mounted == true) {
            if (this.state.loading == true) {
                return (
                    <p>img loading</p>
                )
            }
            else {
                return (
                    <iframe src={this.state.url} title="W3Schools Free Online Web Tutorials"></iframe>
                )
            }
        }
        else {
            return null
        }
    }

}