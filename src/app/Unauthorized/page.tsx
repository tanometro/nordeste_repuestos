import React from "react";

function Unauthorized() {

    const blackTextStyle: React.CSSProperties = {
        color: 'blue',
    };


    return (
        <><h1 style={blackTextStyle}>NO ESTAS LOGUEADO MOSTRO </h1><h2 style={blackTextStyle}>Cogido por un tutorial y un tipo que nunca tocó TS en su vida. </h2></>)

}
export default Unauthorized;