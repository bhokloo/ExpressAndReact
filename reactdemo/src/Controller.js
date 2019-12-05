import React from 'react';
import './index.css';
import './Controller.css'

class Controller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoaded: false,
        };
    };

    componentDidMount() {
        fetch('http://localhost:8090/notes')
            .then(data => data.json())
            .then(jsonData => {
                this.setState({
                    isLoaded: true,
                    data: jsonData
                })
            });
    }

    render() {
        var {isLoaded, data} = this.state;
        if (!isLoaded) {
            return (
                <div>
                    Loading.....
                </div>
            )
        } else {
            return (
                <div className="foo">
                    <h2>*****DATAS LOADED*****</h2>
                    <ul>
                        {
                            data.map(data => (
                                <li key={data._id}> {data.createdAt}</li>
                            ))
                        }
                    </ul>
                </div>
            )
        }
    }
}

export default Controller;