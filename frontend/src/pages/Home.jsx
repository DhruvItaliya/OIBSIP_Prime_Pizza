import React, { useContext } from "react";
import Hero from "../components/Hero";
import NewLaunches from "../components/NewLaunches";
import Recommended from "../components/Recommended";
import PizzaMania from "../components/PizzaMania";
import { PizzaContext } from "../contexts/PizzaContext";
const Home = () => {

    return (
        <>
            <Hero />
            <NewLaunches />
            <Recommended />
            <PizzaMania />
        </>
    )
}

export default Home;

