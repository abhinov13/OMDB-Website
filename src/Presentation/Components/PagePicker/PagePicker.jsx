import "./PagePicker.css";
//needs current page, last page
/** 
 * if pages < 7 only display required nodes with numbers
 * currentPage < 4 display first 4 nodes, ... and last two nodes
 * if currentPage among last 4 pages display first 2 nodes, ..., last 4 nodes 
*/

const lessThan6Pages = (current, last, setPage) => {
    const nodeList = [];
    for (let i = 1; i <= last; i++) {
        nodeList.push(
            <div
                key={i}
                className={`Page${current === i ? " ActivePage" : ""}`}
                onClick={() => setPage(i)}
            >
                {i}
            </div>
        );
    }
    return <>
        {nodeList.map((node) => node)}
    </>
}

const atStart = (current, last, setPage) => {
    const nodeList = [];
    for (let i = 1; i <= 3; i++) {
        nodeList.push(
            <div
                key={i}
                className={`Page${current === i ? " ActivePage" : ""}`}
                onClick={() => setPage(i)}
            >
                {i}
            </div>
        );
    }

    nodeList.push(
        <div
            key={"..."}
            className={`Page`}
        >
            ...
        </div>
    );

    for (let i = last - 1; i <= last; i++) {
        nodeList.push(
            <div
                key={i}
                className={`Page${current === i ? " ActivePage" : ""}`}
                onClick={() => setPage(i)}
            >
                {i}
            </div>
        );
    }

    return <>
        {nodeList.map((node) => node)}
    </>
}

const atEnd = (current, last, setPage) => {
    const nodeList = [];
    for (let i = 1; i <= 2; i++) {
        nodeList.push(
            <div
                key={i}
                className={`Page${current === i ? " ActivePage" : ""}`}
                onClick={() => setPage(i)}
            >
                {i}
            </div>
        );
    }

    nodeList.push(
        <div
            key={"..."}
            className={`Page`}
        >
            ...
        </div>
    );

    for (let i = last - 2; i <= last; i++) {
        nodeList.push(
            <div
                key={i}
                className={`Page${current === i ? " ActivePage" : ""}`}
                onClick={() => setPage(i)}
            >
                {i}
            </div>
        );
    }

    return <>
        {nodeList.map((node) => node)}
    </>
}

const atBetween = (current, last, setPage) => {
    const nodeList = [];
    for (let i = current - 1; i <= current + 1; i++) {
        nodeList.push(
            <div
                key={i}
                className={`Page${current === i ? " ActivePage" : ""}`}
                onClick={() => setPage(i)}
            >
                {i}
            </div>
        );
    }

    nodeList.push(
        <div
            key={"..."}
            className={`Page`}
        >
            <span>...</span>
        </div>
    );

    for (let i = last - 1; i <= last; i++) {
        nodeList.push(
            <div
                key={i}
                className={`Page${current === i ? " ActivePage" : ""}`}
                onClick={() => setPage(i)}
            >
                {i}
            </div>
        );
    }

    return <>
        {nodeList.map((node) => node)}
    </>
}
const PagePicker = ({ currentPage, lastPage, setPage }) => {
    return <div className="PagePickerWrapper">
        <div className="PagePicker">
            <div
                className={`Page${currentPage === 1? " DisabledPage": ""}`}
                onClick={() => { if (currentPage > 1) setPage(currentPage - 1) }}
            >
                &lt;
            </div>

            {lastPage <= 6 ? lessThan6Pages(currentPage, lastPage, setPage)
                : currentPage <= 3 ? atStart(currentPage, lastPage, setPage)
                    : currentPage > lastPage - 3 ? atEnd(currentPage, lastPage, setPage)
                        : atBetween(currentPage, lastPage, setPage)
            }

            <div
                className={`Page${currentPage === lastPage? " DisabledPage": ""}`}
                onClick={() => { if (currentPage < lastPage) setPage(currentPage + 1) }}
            >
                &gt;
            </div>
        </div>
    </div>
};

export default PagePicker;