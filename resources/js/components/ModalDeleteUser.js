import React, {Component} from 'react';
import axios from 'axios';

// This component should be a modal or pop-up confirmation when deleting the user
class ModalDeleteUser extends Component{
    render(){
        return (
            <>
                <h3>Are You Sure ?</h3>
                <p>
                    <button onClick={() => {
                        const {id} = this.props.match.params;
                        axios.delete(`http://localhost:8000/api/react/${id}`)
                        .then(response => {
                            alert(response.data);
                            // Redirect
                            this.props.history.push("/react");
                        });
                    }}>Yes</button>
                    <button onClick={() => {
                        this.props.history.push("/react");
                    }}>No</button>
                </p>
            </>
        );
    }
}

export default ModalDeleteUser;