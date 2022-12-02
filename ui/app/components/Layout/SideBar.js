import React, { Component, Fragment } from "react";
import AppContext from "../../contexts/AppContext";
import ScrollArea from "react-scrollbar";
import { Link } from "react-router-dom";

class SideBar extends Component {
    userData = JSON.parse(localStorage.getItem("user"));
    state = {
        side: false,
        users: false,
        tasks: false,
        menus: ["tasks",  "users"],
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.side !== prevState.side) {
            return { side: nextProps.side };
        }
        return null;
    }
    componentDidMount() {}
    render() {
        return (
            <Fragment>
                <div
                    className={`${
                        this.state.side ? null : "hideLeft"
                    } leftTransition w-side h-full fixed left-0 z-40 top-0 bg-white border-l border-gray-400 `}
                >
                    <ScrollArea
                        style={{
                            overflow: "hidden",
                            height: "100%",
                        }}
                    >
                        <ul className="divide-y divide-gray-200 ltr">
                            <li
                                className="py-4 pl-10 bg-no-repeat "
                                style={{
                                    backgroundPosition: "10px center ",
                                    backgroundSize: 24,
                                    backgroundImage: "url('/images/users.png')",
                                }}
                            >
                                <Link to={"/tasks"}>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-900">
                                            tasks
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            manage tasks
                                        </p>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </ScrollArea>
                </div>
                {this.state.side ? (
                    <div
                        onClick={this.props.toggleSide}
                        className="w-full fixed left-0 z-30 top-0 h-full bg-black bg-opacity-25"
                    ></div>
                ) : null}
            </Fragment>
        );
    }
}
SideBar.contextType = AppContext;
export default SideBar;
