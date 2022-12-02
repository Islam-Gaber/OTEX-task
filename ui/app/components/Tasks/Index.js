import React from "react";
import AppContext from "../../contexts/AppContext";
import Container from "../Layout/Container";
import List from "./List";

class SubtractionTypes extends React.Component {
    state = {
        tab: "list",
        uuid: null,
        id: JSON.parse(localStorage.getItem("subtractionTypes"))
            ? JSON.parse(localStorage.getItem("subtractionTypes"))
            : 0,
    };
    setSelected = (id, uuid) => {
        localStorage.setItem("subtractionTypes", JSON.stringify(id));
        this.setState({ id: id, uuid: uuid });
    };

    componentDidMount() {}

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.tab !== nextProps.match.params.tab) {
            return { tab: nextProps.match.params.tab };
        }

        return null;
    }

    render() {
        return (
            <Container>
                <div className="relative w-full h-full">
                    <List
                        full={true}
                        setSelected={this.setSelected}
                        tab={this.state.tab}
                    ></List>
                </div>
            </Container>
        );
    }
}

SubtractionTypes.contextType = AppContext;
export default SubtractionTypes;
