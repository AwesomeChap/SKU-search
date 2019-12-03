import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Header from './Components/Header';
import InfoText from './Components/InfoText';
import Home from './Components/Home';
import Patterns from './Components/Patterns';
import {addPattern, modifyPattern, deletePattern} from './redux/actions';
import { connect } from 'react-redux';

const App = (props) => {
    
    const [choice, setChoice] = useState(1);
    const [bannerVisibility, setBannerVisibility] = useState(true);
    const {patterns, addPattern, modifyPattern, deletePattern} = props;

    const patternFuncs = {addPattern, modifyPattern, deletePattern};

    useEffect(() => {
        setBannerVisibility(true);
    }, [choice])

    return (
        <Router>
            <Header choice={choice} updateChoice={value => setChoice(value)} />
            <InfoText updateChoice={value => setChoice(value)} patterns={props.patterns} choice={choice} bannerVisibility={bannerVisibility} updateBannerVisibility={value => setBannerVisibility(value)} />
            <Route exact path="/" render={props => <Home {...props} patterns = {patterns.map( pt => ({value: pt.regex, name: pt.name, key: pt.key}))} />} />
            <Route exact path="/patterns" render={props => <Patterns {...props} patterns = {patterns} {...patternFuncs} />} />
        </Router>
    )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {addPattern, modifyPattern, deletePattern})(App);