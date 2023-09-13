import {FC, ReactNode } from "react";

interface MacrosLayoutProps {
    children: ReactNode;
}

const MacrosLayout: FC<MacrosLayoutProps> = ({ children }) => {
    return (  
        <div className="bg-slate-200 p-10 rounded-md flex flex-col justify-center items-center">
            {children}
        </div>
    );
}
 
export default MacrosLayout;