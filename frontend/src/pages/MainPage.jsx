import React, {Component} from 'react';
import Graf from "./Graf";
import Table from "./Table";
import {connect} from "react-redux";
import {deletePoints, getPoints} from "../actions/coordinatesAction";
import {setAnswer, signIn} from "../actions/userAction";
import ChooseForm from "./ChooseForm";
import "../screen/mainPage.css";
import {Navigate} from "react-router-dom";
import Button from "react-toolbox/lib/button";

class MainPage extends Component{
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.getPoints();
    }

    getPoints() {
        this.props.getPoints();
    }
    logout() {
        this.props.setAnswer('');
        this.props.setSignIn(false);
        localStorage.setItem("user", undefined);
        <Navigate to="/"/>
    }
    delete(){
        this.props.deletePoints()
    }
    render(){
        return(
            <div>
                <ChooseForm/>
                <Graf/>
                <Table/>
                <Button label = "Выйти" className="return" onClick={this.logout} />
                <Button label= "Очистить" className="delete" onClick={this.delete}/>

            </div>
        )

    }
}
const stateToProps = store => {
    return {
        app: store.app,
    }
};

const dispatchToProps = dispatch => {
    return {
        getPoints: () => dispatch(getPoints()),
        setSignIn: (logIn) => dispatch(signIn(logIn)),
        setAnswer: (answer) => dispatch(setAnswer(answer)),
        deletePoints: () => dispatch(deletePoints())
    }
};

export default (connect(stateToProps, dispatchToProps)(MainPage));
