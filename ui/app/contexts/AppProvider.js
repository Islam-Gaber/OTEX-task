import React, { Component } from "react";
import AppContext from "./AppContext";
import { ToastContainer, toast } from "react-toastify";

class AppProvider extends Component {
    constructor() {
        super();
        this.state = {
            validation: this.validation,
            serverError: false,
            applicationError: false,
            serverErrorMessage: "",
            dataSources: {},
            showServerError: this.showServerError,
            handelError: this.handelError,
            showCodeMessage: this.showCodeMessage,
            hideError: this.hideError,
            clearMessage: this.clearMessage,
            validation: this.validation,
            getProperty: this.getProperty,
            setProperty: this.setProperty,

            setSearchQuery: this.setSearchQuery,
            setFilterQuery: this.setFilterQuery,
            setOrderQuery: this.setOrderQuery,

            showApplicationError: this.showApplicationError,
            getDate: this.getDate,
            reportData: {},
        };
    }

    loadingOn = () => {
        this.setState({ loading: true });
    };
    loadingOff = () => {
        this.setState({ loading: false });
    };

    getDate = () => {
        var d = new Date();
        d.setMonth(d.getMonth() + 2, 1);

        var month = "" + d.getMonth(),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    };

    setSearchQuery = (array) => {
        this.setState({ searchQuery: array });
    };
    setFilterQuery = (array) => {
        this.setState({ filterQuery: array });
    };
    setOrderQuery = (array) => {
        this.setState({ orderQuery: array });
    };

    showApplicationError = () => {
        this.setState({ applicationError: true });
    };
    showServerError = (error) => {
        this.setState({
            serverError: true,
            serverErrorMessage: error.response.data,
        });
    };
    showCodeMessage = (message, type) => {
        switch (type) {
            case "error":
                toast.error(message);
                break;
            case "warn":
                toast.warn(message);
                break;
            case "info":
                toast.info(message);
                break;
            case "success":
                toast.success(message);
                break;
            default:
                break;
        }
    };
    clearMessage = () => {
        this.setState({
            codeMessageType: "",
            codeMessageText: "",
        });
    };

    getProperty = (obj, prop) => {
        var last = obj;
        var parts = prop.split(".");
        var l = parts.length;
        var value = undefined;
        for (var i = 0; i < l; i++) {
            var current = parts[i];

            if (i == l - 1) {
                value = last[current];
            } else {
                if (last[current] == undefined) {
                    last[current] = {};
                    last = last[current];
                } else {
                    last = last[current];
                }
            }
        }
        if (value !== undefined && value !== null) {
            value = value.toString();
        }
        return value;
    };
    setProperty = (obj, prop, value) => {
        var last = obj;
        var parts = prop.split(".");
        var l = parts.length;
        for (var i = 0; i < l; i++) {
            var current = parts[i];

            if (i == l - 1) {
                last[current] = value;
            } else {
                if (last[current] == undefined) {
                    last[current] = {};
                    last = last[current];
                } else {
                    last = last[current];
                }
            }
        }
        return obj;
    };

    hideError = () => {
        this.setState({ codeError: false, serverError: false });
    };
    handelError = (error) => {
        console.log(error);
        if (!error.response) {
            this.showApplicationError();
        } else {
            switch (error.response.status) {
                case 404:
                    this.showApplicationError();
                    break;
                case 403:
                    this.showApplicationError();
                    break;
                case 500:
                    this.showServerError(error);
                    break;
                case 400:
                    this.showCodeMessage("Error", error.response.data, "error");
                    break;
                case 401:
                    localStorage.clear();
                    window.location = "/login";
                    break;
                default:
                    break;
            }
        }
    };

    render() {
        return (
            <AppContext.Provider
                value={{
                    state: this.state,
                }}
            >
                <ToastContainer autoClose={5000} />
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

export default AppProvider;
