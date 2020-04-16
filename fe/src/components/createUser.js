import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserDoB = this.onChangeUserDoB.bind(this);
        this.onChangeUserMs = this.onChangeUserMs.bind(this);
        this.onChangeUserSmoking = this.onChangeUserSmoking.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            dob: '',
            ms: '',
            smoking: '',
        }
    }

    onChangeUserName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeUserDoB(e) {
        this.setState({
            dob: e.target.value
        });
    }

    onChangeUserMs(e) {
        this.setState({
            ms: e.target.value
        });
    }

    onChangeUserSmoking(e) {
        this.setState({
            smoking: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            dob: this.state.dob,
            ms: this.state.ms,
            smoking: this.state.smoking,
        }

        axios.post('http://localhost:4000/users/add', newUser)
            .then(res => console.log(res.data));
        this.setState({
            name: '',
            dob: '',
            ms:'',
            smoking:'',
            dependant:''
        })
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeUserName}
                                />
                    </div>
                    <div className="form-group">
                        <label>DoB: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.dob}
                                onChange={this.onChangeUserDoB}
                                />
                    </div>
                    <div className="form-group">
                        <label>Marital Status: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.ms}
                                onChange={this.onChangeUserMs}
                                />
                    </div>
                    <div className="form-group">
                        <label>Smoker: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.smoking}
                                onChange={this.onChangeUserSmoking}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create user" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}