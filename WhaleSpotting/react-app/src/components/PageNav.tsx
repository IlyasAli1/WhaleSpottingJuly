import React from "react";
import "../styles/PageNav.scss";
import { Button, Style } from "./Button";

interface pageNavProps {
    page: number;
    nextPage: () => void;
    previousPage: () => void;
}

export default function PageNav({ page, nextPage, previousPage }: pageNavProps): JSX.Element {

    return (
        <div className="page-nav" data-testid="page-nav">
            <div className="previous-button" data-testid="previous-page">
                <Button 
                    style={Style.secondary}
                    text="Previous Page"
                    onClick={() => previousPage()}
                    hidden={page <= 1 ? true : false}
                />
            </div>
            <div className="page" data-testid="page-number"> Page {page} </div>
            <div className="next-button" data-testid="next-page">
                <Button 
                    style={Style.secondary}
                    text="Next Page"
                    onClick={() => nextPage()}
                />
            </div>
        </div>
    );
}
