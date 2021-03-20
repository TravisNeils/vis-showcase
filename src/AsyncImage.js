import React from 'react';
import firebase from "firebase";

export default class AsyncImage extends React.Component {

    constructor(props) {
        super(props);
        this.state =
            {
                loading: true,
                image: "/images/logoblue.jpg",
                url: "",
                key:""
            }
    }

    componentDidMount() {
        this.setState({ isMounted: true })
        this.getAndLoadHttpUrl()
    }

    async getAndLoadHttpUrl() {
        if (this.state.mounted == true) {
            const ref = firebase.storage().ref("images").child(this.props.image);
            console.log(this.props.image + "");
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
                    <img src={this.state.url} />
                )
            }
        }
        else {
            return null
        }
    }

}