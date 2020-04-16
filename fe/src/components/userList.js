import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/users/')
            .then(response => {
                this.setState({users: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/users/')
        .then(response => {
            this.setState({users: response.data});
        })
        .catch(function (error) {
            console.log(error);
        })   
    }

    userList() {
        return this.state.users.map(function(currentUser, i) {
            return(
                <tr key={i}>
                    <td className='tbName'>{currentUser.name}</td>
                    <td className='tbDob'>{currentUser.dob}</td>
                    <td className='tbMs'>{currentUser.ms}</td>
                    <td className='tbSmoke'>{currentUser.smoking}</td>
                    <td>
                        <Link to={"/edit/"+currentUser._id}>Edit</Link> &nbsp;
                        <button type="button" value={currentUser._id} onClick={()=>{
                            axios.delete(`http://localhost:4000/users/remove/${currentUser._id}`)
                            .then(resp =>{
                                this.setState({users: resp.data})
                            })
                            .catch(function (error) {
                                console.log(error);
                            })}}>Delete</button>
                    </td>
                </tr>
            )
        });
    }

    render() {
        return (
            <div>
                <h3>User List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>DoB</th>
                            <th>Marital Status</th>
                            <th>Smoking</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.userList() }
                    </tbody>
                </table>
            </div>
        )
    }
}