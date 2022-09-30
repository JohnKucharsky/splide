import { useRef, useState, Fragment } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./Tags.module.scss";

interface TagsProps {
    term: "company" | "contact" | "country";
    setFiltersArray: React.Dispatch<
        React.SetStateAction<{
            [string: string]: {
                [string: string]: boolean;
            };
        }>
    >;
    filtersArray: {
        [string: string]: { [string: string]: boolean };
    };
}

const close = (
    <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M13.3334 3.7403L12.2591 2.66602L8.00008 6.92506L3.74103 2.66602L2.66675 3.7403L6.9258 7.99935L2.66675 12.2584L3.74103 13.3327L8.00008 9.07363L12.2591 13.3327L13.3334 12.2584L9.07437 7.99935L13.3334 3.7403Z"
            fill="#2B3648"
        />
    </svg>
);

export default function Tags(p: TagsProps) {
    const [offset, setOffset] = useState(0);
    const appRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const containerRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    function handlePrev() {
        if (offset) {
            setOffset((prev) => prev - 1);
        }
    }
    function handleNext() {
        if (
            appRef.current.offsetWidth - 200 <
            containerRef.current.offsetWidth
        ) {
            setOffset((prev) => prev + 1);
        }
    }

    return (
        <div ref={appRef} className={styles.main}>
            <IoIosArrowBack
                fontSize={24}
                width={24}
                onClick={() => handlePrev()}
            />
            <div className={styles.container}>
                <div ref={containerRef} className={styles.innercontainer}>
                    {Object.entries(p.filtersArray)
                        .slice(offset, offset + 20)
                        .map((main) => {
                            return (
                                <Fragment key={main[0]}>
                                    {Object.entries(main[1])
                                        .map((v) => {
                                            if (v[1]) {
                                                return v[0];
                                            }
                                            return null;
                                        })
                                        .filter((v) => v)
                                        .map((v2) => (
                                            <div
                                                className={styles.item}
                                                key={v2}>
                                                <p>{v2}</p>
                                                <span
                                                    onClick={() => {
                                                        p.setFiltersArray({
                                                            ...p.filtersArray,
                                                            [main[0]]: {
                                                                ...p
                                                                    .filtersArray[
                                                                    main[0]
                                                                ],
                                                                [v2 || ""]:
                                                                    false,
                                                            },
                                                        });
                                                    }}>
                                                    {close}
                                                </span>
                                            </div>
                                        ))}
                                </Fragment>
                            );
                        })}
                </div>
            </div>

            <IoIosArrowForward
                width={24}
                fontSize={24}
                onClick={() => handleNext()}
            />
        </div>
    );
}
