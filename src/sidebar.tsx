import React from 'react';

export default function Sidebar(props: {isMobile: boolean, width: number, height: number}) {

    const isMobile = props.isMobile;
    const { width, height } = props;

    return (
        <div className={`sidebar bg-gray-700`} style={{width: width, height: height}}>
            {isMobile ? <SidebarContent isMobile={isMobile} /> : null}
        </div>
    );
}

function SidebarContent(props: {isMobile: boolean}) {

    const isMobile = props.isMobile;
    const [isAppend, setIsAppend] = React.useState(false);

    return (
        <div>
            
        </div>
    );
}