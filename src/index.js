import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {

    state = {lat: null, errorMessage: ''}

    componentDidMount(){
        navigator.geolocation.getCurrentPosition(
            (position) =>{
                //we called setState!!!!
                // we did not this.stat.lat = position = position.coords.latitude
                this.setState({lat: position.coords.latitude});
            },
            (err) => {
                this.setState({errorMessage: err.message}); 
            }
        );
        console.log('API was called')
    }

    componentWillMount(){
        console.log('my component just rerendered!')
    }

    renderContent(){
        if(this.state.errorMessage && !this.state.lat)
        {
            return <div>Error: {this.state.errorMessage}</div>
        }

        if(!this.state.errorMessage && this.state.lat)
        {
            return <SeasonDisplay lat={this.state.lat}/>;
        }

        return <Spinner message="Please accept location request!"/>;
    }
    //React req. us to define render()
    render(){
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)