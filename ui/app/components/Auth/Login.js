import React, { Component } from "react";
import { login } from "./../../services/userAuth";
import AppContext from "../../contexts/AppContext";
import Error from "./../Utilities/Error";

class Login extends Component {
    state = {
        errors: [],
        user: { email: "", password: "" },
    };

    componentDidMount() {
        this.setState({  });
    }
    handleChange = (field) => {
        let temp = this.state.user;
        temp[field.target.name] = field.target.value;

        let error = this.state.errors;
        error[field.target.name] = null;
        error["non_field_errors"] = null;

        this.setState({ user: temp, errors: error });
    };

    handleKeyPress = (e) => {
        if (e.key === "Enter") {
            this.submit();
        }
    };

    submit = () => {
        let temp = {};
        login(this.state.user)
            .then((res) => {
                localStorage.setItem("token", res.meta.token);
                localStorage.setItem("user", JSON.stringify(res.items));
                window.location = "/tasks";
            })
            .catch((errors) => {
                switch (errors.response.status) {
                    case 422:
                        Object.keys(errors.response.data.errors).forEach(
                            function (key) {
                                temp[key] = errors.response.data.errors[key][0];
                            }
                        );

                        this.setState({ errors: temp });
                        break;
                    case 400:
                        this.setState({ errors: errors.response.data.message });
                        break;
                    default:
                        this.context.state.handelError(errors);
                        break;
                }
            });
    };

    render() {
        return (
            <div className="arabic ltr flex absolute w-full  z-20  h-full">
                <div
                    id="loadinBar"
                    className="w-full fixed header-bar widthTransition"
                >
                    <span></span>
                </div>
                <div className="p-20 w-1/3 bg-white  h-full">

                    <div className="mt-6 mb-6  relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm leading-5">
                            <span className="px-2 bg-white text-gray-700">
                                {" "}
                                LOG IN
                            </span>
                        </div>
                    </div>

                    <form onSubmit={this.submit} className="w-full max-w-sm">
                        <div className="md:flex md:items-center mb-1">
                            <input
                                onChange={this.handleChange.bind(this)}
                                value={this.state.user.email}
                                onKeyPress={this.handleKeyPress}
                                placeholder="email"
                                className=" form-input border px-2 py-2 block w-full rounded-md sm:text-sm sm:leading-5  "
                                type="text"
                                name="email"
                            />
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            {this.state.errors.email ? (
                                <Error
                                    icon="false"
                                    message={this.state.errors.email}
                                ></Error>
                            ) : null}
                        </div>
                        <div className="md:flex md:items-center mb-1">
                            <input
                                onChange={this.handleChange.bind(this)}
                                value={this.state.user.password}
                                onKeyPress={this.handleKeyPress}
                                placeholder="password"
                                className=" form-input border px-2 py-2 block w-full rounded-md sm:text-sm sm:leading-5"
                                type="password"
                                name="password"
                            />
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            {this.state.errors.password ? (
                                <Error
                                    icon="false"
                                    message={this.state.errors.password}
                                ></Error>
                            ) : null}
                        </div>

                        <div className="md:flex ">
                            <div>
                                <button
                                    className="text-sm shadow bg-blue-600 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                    type="button"
                                    onClick={this.submit}
                                >
                                    SIGN IN
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="flex justify-center items-center relative w-0 flex-1">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="/images/background.jpg"
                        alt=""
                    />
                </div>
            </div>
        );
    }
}
Login.contextType = AppContext;
export default Login;
