import React, { Component } from "react";
import AppContext from "../../../contexts/AppContext";
import Error from "../../Utilities/Error";
import Select from "react-select";
import ScrollArea from "react-scrollbar";

class DataModule extends Component {
    state = {
        item: {},
        errors: {},
    };
    handleSelectChange = (key, value) => {
        let temp = this.state.item;

        temp[key] = value.value;

        let error = this.state.errors;
        error[key] = null;

        this.setState({ item: temp, errors: error });
    };
    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.item !== nextProps.item ||
            prevState.errors !== nextProps.errors
        ) {
            return { item: nextProps.item, errors: nextProps.errors };
        }
        return null;
    }

    componentDidMount() {}

    handelchange = (e) => {
        let temp = this.state.item;
        temp[e.target.name] = e.target.value;
        let error = this.state.errors;
        error[e.target.name] = null;

        this.setState({ item: temp, errors: error });
    };

    render() {
        return (
            <div className="bg-black bg-opacity-50 w-full h-full z-50 fixed right-0 top-0 flex items-center justify-center layer-4 font-medium">
                <div className="bg-white shadow w-smallModal  rounded ">
                    <div className={`px-3 py-5 left`}>
                        <h3 className="uppercase text-lg leading-6 font-medium text-gray-900">
                            {this.props.title} tasks
                        </h3>
                        <ScrollArea
                            style={{
                                overflow: "hidden",
                                height: "400px",
                                width: "100%",
                            }}
                        >
                            <div className="space-y-3 pb-5 pr-4 ">
                                <div>
                                    <label
                                        htmlFor="title"
                                        className="block text-sm font-medium text-gray-700 pt-2"
                                    >
                                        title
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            autocomplete="none"
                                            id="title"
                                            name="title"
                                            type="text"
                                            value={this.state.item.title}
                                            onChange={this.handelchange}
                                            className="shadow-sm border p-2 leading-5 focus:ring-red-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                    {this.state.errors.title ? (
                                        <Error
                                            message={this.state.errors.title}
                                        />
                                    ) : null}
                                </div>
                                <div>
                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-medium text-gray-700 pt-2"
                                    >
                                        description
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            autocomplete="none"
                                            id="description"
                                            name="description"
                                            type="text"
                                            value={
                                                this.state.item.description
                                            }
                                            onChange={this.handelchange}
                                            className="shadow-sm border p-2 leading-5 focus:ring-red-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                    {this.state.errors.description ? (
                                        <Error
                                            message={
                                                this.state.errors.description
                                            }
                                        />
                                    ) : null}
                                </div>

                            </div>
                        </ScrollArea>
                        <div className="mt-5">
                            <button
                                type="button"
                                onClick={() => {
                                    this.props.action(this.state.item);
                                }}
                                className="inline-flex items-center mr-4 justify-center px-4 py-2 border border-transparent font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                            >
                                save
                            </button>

                            <button
                                type="button"
                                onClick={this.props.close}
                                className="inline-flex items-center px-4 py-2  text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
DataModule.contextType = AppContext;
export default DataModule;
