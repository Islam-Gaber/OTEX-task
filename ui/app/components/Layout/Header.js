import React, { Component } from "react";
import AppContext from "../../contexts/AppContext";

class Header extends Component {
    state = {
        userMenu: false,
        user: JSON.parse(localStorage.getItem("user")),
        showUserSetting: false,
    };

    toggleUserSetting = (id) => {
        this.setState({
            showUserSetting: !this.state.showUserSetting,
        });
    };

    componentDidMount() {
        this.clickOutsideUserMenuEvent = document.addEventListener(
            "mouseup",
            this.handleClickOutsideUserMenu
        );
    }
    componentWillUnmount() {
        document.removeEventListener("mouseup", this.clickOutsideUserMenuEvent);
    }

    userMenuRef = React.createRef();
    handleClickOutsideUserMenu = (e) => {
        if (
            this.userMenuRef.current != null &&
            !this.userMenuRef.current.contains(e.target)
        ) {
            this.setState({ userMenu: false });
        }
    };
    handleClickInsideUserMenu = () => this.setState({ userMenu: true });
    signOut = () => {
        localStorage.clear();
        window.location = "/logout";
    };

    render() {
        const user = JSON.parse(localStorage.getItem("user"));
        return (
            <nav
                className="bg-white border-b border-gray-200 "
                aria-label="Global"
            >
                <div className="max-w-7xl mx-auto px-2  pl-3  pr-8">
                    <div className="flex justify-between h-12">
                        <div className="flex items-center px-2 lg:px-0">
                            <div className="flex items-center ">
                                <button
                                    onClick={this.props.toggleSide}
                                    className="inline-flex mr-4 items-center justify-center p-2 rounded-md text-light-red-200 hover:text-black hover:bg-light-red-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    aria-expanded="false"
                                >
                                    <img
                                        className="inline-block h-8 w-8  "
                                        src="/images/menu.png"
                                        alt=""
                                    ></img>
                                </button>
                            </div>
                        </div>

                        <div className="hidden lg:ml-4 lg:flex lg:items-center">
                            <div className="ml-4 relative flex-shrink-0">
                                <div ref={this.userMenuRef}>
                                    <button
                                        onClick={this.handleClickInsideUserMenu}
                                        className="bg-light-red-500   flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-red-500 focus:ring-white"
                                    >
                                        <span className="px-4 leading-6 font-bold">
                                            {user.username}
                                        </span>
                                        <img
                                            className="inline-block h-6 w-6  "
                                            src="/images/avatar.png"
                                            alt=""
                                        ></img>
                                    </button>

                                    {this.state.userMenu ? (
                                        <div className="z-20 origin-top-right absolute right-0 mt-5  w-56 rounded-sm shadow-lg">
                                            <div className="rounded-sm bg-white shadow-xs">
                                                <div
                                                    className="py-1"
                                                    role="menu"
                                                    aria-orientation="vertical"
                                                    aria-labelledby="options-menu"
                                                >
                                                    <a
                                                        onClick={this.signOut}
                                                        className={`block w-full cursor-pointer font-bold  
                                                            ltr
                                                        )} px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900`}
                                                    >
                                                        sign out
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}
Header.contextType = AppContext;
export default Header;
