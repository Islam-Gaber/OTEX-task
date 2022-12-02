import React from "react";
import AppContext from "../../contexts/AppContext";
import ScrollArea from "react-scrollbar";
import DeleteModal from "./modals/DeleteModal";
import {
    records,
    create,
    update,
    userDelete,
    record,
} from "../../services/users";
import DataModel from "./modals/DataModal";
import Search from "../Utilities/Search";
import { Fragment } from "react";

class List extends React.Component {
    userData = JSON.parse(localStorage.getItem("user"));
    state = {
        items: [],
        item: {},
        tab: null,
        errors: {},
        delete: false,
        loading: true,
        selected: [],
        create: false,
        update: false,
        page: 1,
        pages: 1,
        filterQuery: {},
        filters: [],
        orderQuery: { type: "id", order: "desc" },
    };

    componentDidMount() {
        this.getData();
    }

    setFilter = (key, value) => {
        let temp = this.state.filterQuery;

        temp[key] = value.value;

        this.setState({ filterQuery: temp }, this.getData);
    };
    clearFilter = () => {
        this.setState({ filterQuery: {} }, this.getData);
    };

    getData = () => {
        this.setState({ loading: true }, () => {
            records({
                page: this.state.page, // send page number
                order: this.state.orderQuery, // send order value
                search: this.state.searchQuery, // send search value
                filter: this.state.filterQuery,
            })
                .then((res) => {
                    this.setState({
                        pages: Math.ceil(parseInt(res.meta.total) / 30),
                        total: parseInt(res.meta.total),
                        items: res.items,
                        loading: false,
                    });
                })
                .catch((error) => {
                    this.context.state.handelError(error);
                });
        });
    };

    handelchange = (e) => {
        let temp = this.state.item;
        temp[e.target.name] = e.target.value;

        let error = this.state.errors;
        error[e.target.name] = null;

        this.setState({ item: temp, errors: error });
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.tab !== nextProps.tab) {
            return { tab: nextProps.tab };
        }
        return null;
    }
    toggleDelete = (id) => {
        this.setState({
            selected: [id],
            delete: id == 0 ? false : true,
            errors: {},
        });
    };

    toggleCreate = () => {
        this.setState({ create: true, item: {}, errors: {} });
    };

    toggleUpdate = (id) => {
        record(id)
            .then((res) => {
                this.setState({ item: res.items, update: true, errors: {} });
            })
            .catch((error) => {
                this.context.state.handelError(error);
            });
    };

    closeDataModel = () => {
        this.setState({ create: false, update: false });
    };

    create = (data) => {
        create(data)
            .then((res) => {
                this.getData();
                this.closeDataModel();
            })
            .catch((errors) => {
                switch (errors.response.status) {
                    case 422:
                        let temp = {};
                        console.log(errors.response.data.errors);
                        Object.keys(errors.response.data.errors).forEach(
                            function (key, index) {
                                temp[key] = errors.response.data.errors[key][0];
                            }
                        );
                        this.setState({ errors: temp });
                        break;
                    default:
                        this.context.state.handelError(errors);
                        break;
                }
            });
    };

    update = (data) => {
        update(data.id, data)
            .then((res) => {
                this.getData();
                this.closeDataModel();
            })
            .catch((errors) => {
                switch (errors.response.status) {
                    case 422:
                        let temp = {};
                        Object.keys(errors.response.data.errors).forEach(
                            function (key, index) {
                                temp[key] = errors.response.data.errors[key][0];
                            }
                        );
                        this.setState({ errors: temp });
                        break;
                    default:
                        this.context.state.handelError(errors);
                        break;
                }
            });
    };

    userDelete = () => {
        userDelete(this.state.selected)
            .then((res) => {
                this.getData();
                this.toggleDelete(0);
                this.setState({ selected: [] });
            })
            .catch((error) => {
                switch (error.response.status) {
                    case 422:
                        let temp = {};
                        for (
                            let index = 0;
                            index < error.response.data.errors.length;
                            index++
                        ) {
                            const element = error.response.data.errors[index];

                            temp[element[0]] = element[1][0];
                        }
                        this.setState({ errors: temp });
                        break;
                    default:
                        this.context.state.handelError(errors);
                        break;
                }
            });
    };
    updateCheck = (id, uuid) => {
        let selected = this.state.selected;
        if (selected.indexOf(id) === -1) {
            selected.push(id);
            if (selected.length > 1) {
                this.props.setSelected(null, null);
            } else {
                this.props.setSelected(id, uuid);
            }
        } else {
            selected.splice(selected.indexOf(id), 1);
            if (selected.length > 1 || selected.length == 0) {
                this.props.setSelected(null, null);
            } else {
                this.props.setSelected(selected[0], uuid);
            }
        }

        this.setState({ selected: selected });
    };

    changepage = (page) => {
        //save page to state
        this.setState(
            {
                page: page,
            },
            //update the table data
            this.getData
        );
        //save page to context
    };
    //order
    // add order
    addOrder = (type) => {
        let temp = this.state.orderQuery;
        if (temp.type === type) {
            temp.order = temp.order == "desc" ? "asc" : "desc";
        } else {
            temp = { type: type, order: "desc" };
        }
        //save order to state
        this.setState(
            {
                orderQuery: temp,
            },
            //update the table data
            this.getData
        );
        //save order to context
        this.context.state.setOrderQuery(temp);
    };

    // create order icon next to the selected col
    renderOrder = (type) => {
        if (type !== this.state.orderQuery.type) {
            return (
                <svg
                    alt="order"
                    onClick={() => this.addOrder(type)}
                    className="w-3 orderLocation ml-2 cursor-pointer float-right order"
                    viewBox="0 0 1792 1792"
                >
                    <path
                        fill="#a0aec0"
                        d="M1408 1088q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45zm0-384q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z"
                    />
                </svg>
            );
        } else {
            switch (this.state.orderQuery.order) {
                case "desc":
                    return (
                        <svg
                            alt="order"
                            onClick={() => this.addOrder(type)}
                            className="w-3 orderLocation ml-2 cursor-pointer float-right order"
                            viewBox="0 0 1792 1792"
                        >
                            <path d="M1408 704q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z" />
                        </svg>
                    );
                    break;
                case "asc":
                    return (
                        <svg
                            alt="order"
                            onClick={() => this.addOrder(type)}
                            className="w-3 orderLocation ml-2 cursor-pointer float-right order"
                            viewBox="0 0 1792 1792"
                        >
                            <path d="M1408 1088q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z" />
                        </svg>
                    );
                    break;
                default:
                    return (
                        <svg
                            alt="order"
                            onClick={() => this.addOrder(type)}
                            className="w-3 orderLocation ml-2 cursor-pointer float-right order"
                            viewBox="0 0 1792 1792"
                        >
                            <path
                                fill="#a0aec0"
                                d="M1408 1088q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45zm0-384q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z"
                            />
                        </svg>
                    );
                    break;
            }
        }
    };

    renderPages = () => {
        let elements = [];
        let from = this.state.page - 3 > 1 ? this.state.page - 3 : 1;
        let to =
            this.state.page + 3 < this.state.pages
                ? this.state.page + 3
                : this.state.pages;

        if (this.state.page > 3) {
            elements.push(
                <span
                    key={0}
                    className="-mt-px pb-3 border-t-2 border-transparent pt-4 px-4 inline-flex items-center text-sm leading-5 font-semibold text-gray-500"
                >
                    ...
                </span>
            );
        }

        for (let index = from; index <= to; index++) {
            if (index === this.state.page) {
                elements.push(
                    <a
                        key={index}
                        className="-mt-px border-b-2 pb-3 border-blue-500 pt-4 px-4 inline-flex items-center text-sm leading-5 font-semibold text-blue-600 focus:outline-none focus:text-blue-800 focus:border-blue-700 transition ease-in-out duration-150"
                    >
                        {index}
                    </a>
                );
            } else {
                elements.push(
                    <a
                        key={index}
                        onClick={() => this.changepage(index)}
                        className="cursor-pointer pb-3 -mt-px border-b-2 border-transparent pt-4 px-4 inline-flex items-center text-sm leading-5 font-semibold text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-400 transition ease-in-out duration-150"
                    >
                        {index}
                    </a>
                );
            }
        }

        if (this.state.page - 3 < this.state.pages && this.state.pages > 3) {
            elements.push(
                <span
                    key={this.state.pages + 1}
                    className="-mt-px pb-3 border-t-2 border-transparent pt-4 px-4 inline-flex items-center text-sm leading-5 font-semibold text-gray-500"
                >
                    ...
                </span>
            );
        }

        return elements;
    };

    search = (tags) => {
        //set search value at state and context
        this.setState(
            {
                page: 1,
                searchQuery: tags,
            },
            this.getData
        );
        this.context.state.setSearchQuery(tags);
    };

    render() {
        return (
            <main
                className={` ${
                    this.state.tab !== "list" && this.state.tab !== undefined
                        ? "hidden"
                        : null
                } ${
                    this.props.full == false ? "ml-side" : null
                } w-full absolute left-0 top-0 h-full overflow-hidden font-semibold`}
            >
                {this.state.create || this.state.update ? (
                    <DataModel
                        item={this.state.item}
                        errors={this.state.errors}
                        title={this.state.create ? "create" : "update"}
                        action={this.state.create ? this.create : this.update}
                        close={this.closeDataModel}
                    ></DataModel>
                ) : null}

                {this.state.delete ? (
                    <DeleteModal
                        title="delete user"
                        close={() => {
                            this.toggleDelete(0);
                        }}
                        action={this.userDelete}
                    >
                        delete info subtraction Type delete info
                    </DeleteModal>
                ) : null}
                <Search
                    showReport={this.userData.type == "admin" ? 2 : 0}
                    full={this.props.full}
                    clearFilter={this.clearFilter}
                    setFilter={this.setFilter}
                    filterQuery={this.state.filterQuery}
                    filters={this.state.filters}
                    minLength={2}
                    //old data
                    selected={this.state.selected}
                    toggleDelete={this.toggleDelete}
                    search={this.search}
                    searchFor={["name"]}
                    toggleCreate={this.toggleCreate}
                    title="users"
                ></Search>

                <div
                    className={` ${
                        this.props.full == false
                            ? "mainContent"
                            : "mainContentFullWidth"
                    } h-full ltr`}
                >
                    {" "}
                    {this.state.loading ? (
                        <div className="w-full h-full   z-900 text-center align-middle	 ">
                            <img
                                src="/icons/loading.svg"
                                className="w-16 mx-auto my-auto align-middle pt-64	"
                            ></img>
                        </div>
                    ) : (
                        <Fragment>
                            <ScrollArea
                                style={{
                                    overflow: "hidden",
                                    height: "calc(100% - 50px)",
                                    width: "100%",
                                }}
                            >
                                <table
                                    className={` 
                                        "direction"
                                    )} w-full divide-y divide-gray-200`}
                                >
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className={`px-6 py-3 text-direction text-xs font-semibold text-gray-500 uppercase tracking-wider`}
                                            >
                                                {this.renderOrder("username")}
                                                username
                                            </th>
                                            <th
                                                scope="col"
                                                className={`px-6 py-3 
                                                    "text-direction"
                                                )} text-xs font-semibold text-gray-500 uppercase tracking-wider`}
                                            >
                                                {this.renderOrder(
                                                    "mobile_number"
                                                )}
                                                mobile number
                                            </th>
                                            <th
                                                scope="col"
                                                className={`px-6 py-3 
                                                    "text-direction"
                                                )} text-xs font-semibold text-gray-500 uppercase tracking-wider`}
                                            >
                                                {this.renderOrder("state")}
                                                state
                                            </th>

                                            <th
                                                scope="col"
                                                className="relative px-6 py-3 w-update"
                                            >
                                                <span className="sr-only">
                                                    update
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.state.items.map((item) => {
                                            return (
                                                <tr
                                                    key={item.id}
                                                    className="bg-white border-b border-gray-400"
                                                >
                                                    <td className=" relative flex items-start px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                        <div className="ml-3 text-sm">
                                                            <label
                                                                htmlFor={`select-${item.id}`}
                                                                className="font-semibold text-gray-700"
                                                            >
                                                                {item.username}{" "}
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {item.mobile_number}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {item.state}
                                                    </td>
                                                    <td
                                                        className={`px-6 py-4 whitespace-nowrap 
                                                            "text-direction"
                                                        )} text-sm font-semibold`}
                                                    >
                                                        <a
                                                            onClick={() => {
                                                                this.toggleUpdate(
                                                                    item.id
                                                                );
                                                            }}
                                                            className="mx-4 cursor-pointer text-blue-600 hover:text-blue-900"
                                                        >
                                                            update
                                                        </a>
                                                        <a
                                                            onClick={() => {
                                                                this.toggleDelete(
                                                                    item.id
                                                                );
                                                            }}
                                                            className=" cursor-pointer text-blue-600 hover:text-blue-900"
                                                        >
                                                            delete
                                                        </a>
                                                    </td>
                                                </tr>
                                            );
                                        })}{" "}
                                    </tbody>
                                </table>
                            </ScrollArea>
                            <nav className="bottom-0 px-4 pb-4 flex items-center justify-between ">
                                <div className="w-0 flex-1 flex justify-start">
                                    <div className="hidden sm:block">
                                        <p className="text-sm  leading-5 text-gray-700">
                                            displaying from:
                                            <span className="font-semibold ml-1 mr-1">
                                                {(this.state.page - 1) * 30 + 1}
                                            </span>
                                            to:
                                            <span className="font-semibold ml-1 mr-1">
                                                {(this.state.page - 1) * 30 +
                                                    30 >
                                                this.state.total
                                                    ? this.state.total
                                                    : (this.state.page - 1) *
                                                          30 +
                                                      30}
                                            </span>
                                            from:
                                            <span className="font-semibold ml-1 mr-1">
                                                {this.state.total}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden md:flex">
                                    {this.renderPages()}{" "}
                                </div>
                            </nav>
                        </Fragment>
                    )}
                </div>
            </main>
        );
    }
}

List.contextType = AppContext;
export default List;
