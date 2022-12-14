import { Fragment, useEffect, useState } from "react";
import Tags from "./components/Tags/Tags";
import { arr, tableArr } from "./data";
import styles from "./App.module.scss";
import { Popover } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CheckboxPopover from "./components/CheckboxPopover/CheckboxPopover";

const svgTableIcon = (
    <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0.541571 1.67565C2.2249 3.83398 5.33324 7.83398 5.33324 7.83398V12.834C5.33324 13.2923 5.70824 13.6673 6.16657 13.6673H7.83324C8.29157 13.6673 8.66657 13.2923 8.66657 12.834V7.83398C8.66657 7.83398 11.7666 3.83398 13.4499 1.67565C13.8749 1.12565 13.4832 0.333984 12.7916 0.333984H1.1999C0.508238 0.333984 0.116571 1.12565 0.541571 1.67565Z"
            fill="black"
        />
    </svg>
);

function App() {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [term, setTerm] = useState<"company" | "contact" | "country">(
        "company",
    );
    const [filtersArray, setFiltersArray] = useState<{
        [string: string]: { [string: string]: boolean };
    }>({
        company: initialValue("company"),
        contact: initialValue("contact"),
        country: initialValue("country"),
    });

    function initialValue(termm: string) {
        const obj: { [string: string]: boolean } = tableArr.reduce(
            (o, key) => ({
                ...o,
                [key[termm as "company" | "contact" | "country"]]: false,
            }),
            {},
        );
        return obj;
    }

    function dataToSend() {
        let obj = {
            company: getArrayforObject("company"),
            contact: getArrayforObject("contact"),
            country: getArrayforObject("country"),
        };

        function getArrayforObject(term: string) {
            return Object.entries(filtersArray[term])
                .map((v) => {
                    if (v[1]) {
                        return v[0];
                    }
                    return null;
                })
                .filter((v) => v);
        }

        return obj;
    }

    return (
        <Fragment>
            <Tags
                term={term}
                setFiltersArray={setFiltersArray}
                filtersArray={filtersArray}
            />
            <CheckboxPopover
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                setFiltersArray={setFiltersArray}
                filtersArray={filtersArray}
                term={term}
            />
            <table>
                <thead>
                    <tr>
                        <th>
                            <div className={styles.tableheadercell}>
                                <p>Company</p>{" "}
                                <span
                                    onClick={(
                                        event: React.MouseEvent<HTMLButtonElement>,
                                    ) => {
                                        setAnchorEl(event.currentTarget);
                                        setTerm("company");
                                    }}>
                                    {svgTableIcon}
                                </span>{" "}
                            </div>
                        </th>
                        <th>
                            <div className={styles.tableheadercell}>
                                <p>Contact</p>{" "}
                                <span
                                    onClick={(
                                        event: React.MouseEvent<HTMLButtonElement>,
                                    ) => {
                                        setAnchorEl(event.currentTarget);
                                        setTerm("contact");
                                    }}>
                                    {svgTableIcon}
                                </span>{" "}
                            </div>
                        </th>
                        <th>
                            <div className={styles.tableheadercell}>
                                <p>Country</p>{" "}
                                <span
                                    onClick={(
                                        event: React.MouseEvent<HTMLButtonElement>,
                                    ) => {
                                        setAnchorEl(event.currentTarget);
                                        setTerm("country");
                                    }}>
                                    {svgTableIcon}
                                </span>{" "}
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tableArr.map((v) => (
                        <tr key={v.contact}>
                            {Object.values(v).map((cell) => (
                                <td key={cell}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}

export default App;
