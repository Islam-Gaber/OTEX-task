import React, { Component } from "react";
import AppContext from "../../../contexts/AppContext";
class DeleteModal extends Component {
    render() {
        return (
            <div className="bg-black bg-opacity-50 w-full h-full z-50 fixed left-0 top-0 flex items-center justify-center layer-4  font-medium">
                <div className="bg-white shadow w-smallModal  rounded ">
                    <div className={`px-4 py-5 sm:p-6 left`}>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            {this.props.title}
                        </h3>
                        <div className="mt-2 max-w-xl text-sm text-gray-500">
                            <p>{this.props.children}</p>
                        </div>
                        <div className="mt-5">
                            <button
                                type="button"
                                onClick={this.props.action}
                                className="inline-flex items-center mr-4 justify-center px-4 py-2 border border-transparent font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                            >
                                delete
                            </button>

                            <button
                                type="button"
                                onClick={this.props.close}
                                className="inline-flex items-center px-4 py-2  text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
DeleteModal.contextType = AppContext;
export default DeleteModal;
