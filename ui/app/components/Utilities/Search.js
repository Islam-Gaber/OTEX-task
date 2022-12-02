import React, { Component, Fragment } from "react";
import Select from "react-select";
import AppContext from "../../contexts/AppContext";
class Search extends Component {
    state = {
        userData : JSON.parse(localStorage.getItem("user")),
        selected: [],
        filter: false,
        filters: [],
        filterQuery: {},
    };

    static getDerivedStateFromProps(props, state) {
        if (
            props.selected !== state.selected ||
            props.filters !== state.filters ||
            props.filterQuery !== state.filterQuery
        ) {
            return props;
        }

        return null;
    }

    toggleFilter = () => {
        this.setState({ filter: !this.state.filter });
    };

    render() {
        return (
            <div
                className={` ${
                    this.props.full == false ? "mainHeader" : "w-full"
                }  h-16 border-b border-gray-400 bg-white px-3 py-3 font-semibold`}
            >
                <div className=" relative  flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                    <div className="  flex-1 absolute flex  right-0 ">
                        {(this.props.create == true ||
                        this.props.create == undefined ) && this.state.userData.type == 'admin' ? (
                            <div
                                onClick={this.props.toggleCreate}
                                className=" bg-no-repeat  pr-10 mr-5  uppercase leading-10 flex items-center text-sm text-blue-600 cursor-pointer"
                                style={{
                                    backgroundPosition: "right center ",
                                    backgroundSize: 32,
                                    backgroundImage: "url('/images/add.png')",
                                }}
                            >
                                add new {this.props.title}
                            </div>
                        ) : null}
                    </div>

                    <div className="w-1/5  flex pt-2 ">{this.props.title}</div>
                    <div className="w-2/5  relative  flex">
                        <div
                            className={
                                this.state.filters.length >= 1
                                    ? "w-11/12 "
                                    : "w-full"
                            }
                        >
                            <div className="relative text-gray-600 focus-within:text-gray-400">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <img
                                        className="h-8 w-8"
                                        src="/images/search.png"
                                    ></img>
                                </div>
                                <input
                                    id="search"
                                    name="search"
                                    onChange={(e) => {
                                        if (
                                            this.props.minLength
                                                ? e.target.value.length >=
                                                  this.props.minLength
                                                : e.target.value.length >= 3
                                        ) {
                                            let searchValues = {};
                                            this.props.searchFor.forEach(
                                                (searchElment) => {
                                                    searchValues[searchElment] =
                                                        e.target.value;
                                                }
                                            );
                                            this.props.search(searchValues);
                                        } else if (e.target.value.length == 0) {
                                            let searchValues = {};
                                            this.props.searchFor.forEach(
                                                (searchElment) => {
                                                    searchValues[searchElment] =
                                                        "";
                                                }
                                            );
                                            this.props.search(searchValues);
                                        }
                                    }}
                                    className="block w-full text-left pl-12   py-2 border border-transparent rounded-md leading-5 bg-gray-400 bg-opacity-25 text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-gray-100 focus:ring-0 focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm"
                                    placeholder="Search keyword ..."
                                    type="search"
                                ></input>
                            </div>
                        </div>
                        {this.state.filters.length >= 1 ? (
                            <div className=" cursor-pointer w-1/12 h-10 p-2">
                                <img
                                    className="w-6"
                                    onClick={this.toggleFilter}
                                    src="/images/filter.png"
                                ></img>
                            </div>
                        ) : null}
                        {this.state.filter ? (
                            <div className="p-10 text-sm font-normal text-left absolute w-full border mt-12 z-10  bg-white border-gray-200 rounded ">
                                {this.state.filters.map((filter) => {
                                    return (
                                        <div>
                                            <label
                                                htmlFor={filter.id}
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                {filter.name}
                                            </label>
                                            <div className="mt-1">
                                                <Select
                                                    value={
                                                        !this.state.filterQuery[
                                                            filter.id
                                                        ]
                                                            ? undefined
                                                            : filter.list
                                                                  .map(
                                                                      (
                                                                          item
                                                                      ) => {
                                                                          return {
                                                                              value: item.id,
                                                                              label: item.name,
                                                                          };
                                                                      }
                                                                  )
                                                                  .find(
                                                                      (item) =>
                                                                          item.value ==
                                                                          this
                                                                              .state
                                                                              .filterQuery[
                                                                              filter
                                                                                  .id
                                                                          ]
                                                                  )
                                                    }
                                                    onChange={(e) => {
                                                        this.props.setFilter(
                                                            filter.id,
                                                            e
                                                        );
                                                    }}
                                                    options={filter.list.map(
                                                        (item) => {
                                                            return {
                                                                value: item.id,
                                                                label: item.name,
                                                            };
                                                        }
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}

                                <div
                                    onClick={() => {
                                        this.props.clearFilter();
                                        this.toggleFilter();
                                    }}
                                    className=" cursor-pointer mt-4 text-blue-500"
                                >
                                    Clear filters{" "}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}
Search.contextType = AppContext;
export default Search;
