import React, { Component } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import StartPage from './pages/StartPage';
import MainPage from './pages/MainPage';
import { authorization } from './actions/userAction';
import { connect } from 'react-redux';

class App extends Component {
    componentDidMount() {
        this.props.authorization();
    }

    render() {
        const { isLogin } = this.props;

        return (
            <div>
                <HashRouter>
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={isLogin ? <Navigate to="/main" /> : <StartPage />}
                        />
                        <Route
                            path="/main"
                            element={isLogin ? <MainPage /> : <Navigate to="/" />}
                        />
                    </Routes>
                </HashRouter>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isLogin: state.user.isLogin,
});

const mapDispatchToProps = (dispatch) => ({
    authorization: () => dispatch(authorization()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
