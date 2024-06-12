import { createContext, useContext, useState } from "react";

const MySearchContext = createContext();

const SearchWrapper = ({ children }) => {

    const [search, setSearch] = useState({
        keywords: "",
        results: [],
    });


    return (
        <MySearchContext.Provider value={[search, setSearch]} >
            {children}
        </MySearchContext.Provider>
    )
};

// To use this context api data everywhere very easily we need to do the following 

const useSearch = () => useContext(MySearchContext)

export { useSearch, SearchWrapper };
