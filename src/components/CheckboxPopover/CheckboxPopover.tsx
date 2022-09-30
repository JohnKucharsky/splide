import { Checkbox, FormControlLabel, FormGroup, Popover } from "@mui/material";
import { Fragment } from "react";
import { tableArr } from "../../data";

interface CheckboxPopoverProps {
    anchorEl: HTMLButtonElement | null;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
    term: "company" | "contact" | "country";
    setFiltersArray: React.Dispatch<
        React.SetStateAction<{
            [string: string]: { [string: string]: boolean };
        }>
    >;
    filtersArray: {
        [string: string]: { [string: string]: boolean };
    };
}

export default function CheckboxPopover(p: CheckboxPopoverProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        p.setFiltersArray({
            ...p.filtersArray,
            [p.term]: {
                ...p.filtersArray[p.term],
                [event.target.name]: event.target.checked,
            },
        });
    };

    return (
        <Popover
            id={!!p.anchorEl ? "simple-popover" : undefined}
            open={!!p.anchorEl}
            anchorEl={p.anchorEl}
            onClose={() => p.setAnchorEl(null)}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}>
            <FormGroup
                sx={{
                    padding: "1rem",
                    label: {
                        padding: "0.5rem",
                    },
                }}>
                {Object.entries(p.filtersArray).map((main) => {
                    return (
                        <Fragment key={main[0]}>
                            {Object.entries(main[1])
                                .map((v) => {
                                    if (p.term === main[0]) {
                                        return v[0];
                                    }
                                    return null;
                                })
                                .filter((v) => v)
                                .map((v2) => {
                                    return (
                                        <FormControlLabel
                                            key={v2}
                                            control={
                                                <Checkbox
                                                    key={v2}
                                                    name={v2 || ""}
                                                    checked={
                                                        p.filtersArray[main[0]][
                                                            v2 || ""
                                                        ]
                                                    }
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        "aria-label":
                                                            "controlled",
                                                    }}
                                                />
                                            }
                                            label={v2}
                                        />
                                    );
                                })}
                        </Fragment>
                    );
                })}
            </FormGroup>
        </Popover>
    );
}
