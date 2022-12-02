import React, { Component } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import AppContext from "../../contexts/AppContext";

class Container extends Component {
    state = {
        side: false,
    };

    toggleSide = () => {
        this.setState({
            side: !this.state.side,
        });
    };

    render() {
        return (
            <div className="h-screen flex overflow-hidden bg-gray-100">
                <div
                    id="loadinBar"
                    className="w-full fixed header-bar widthTransition"
                >
                    <span></span>
                </div>
                <div className="flex flex-col w-0 flex-1 overflow-hidden">
                    <Header toggleSide={this.toggleSide}></Header>
                    <SideBar
                        side={this.state.side}
                        toggleSide={this.toggleSide}
                    ></SideBar>
                    <main
                        className="flex-1  z-0  overflow-hidden focus:outline-none"
                        tabIndex="0"
                    >
                        {this.props.children}
                    </main>
                </div>
            </div>
        );
    }
}

Container.contextType = AppContext;
export default Container;
