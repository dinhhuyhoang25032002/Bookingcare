import { useState } from "react";

let Button12 = () => {
    let [state, setValue] = useState(0);

    let handleChangeValue = () => {
        setValue(state + 1);
    }
    return (
        <>
            <button onClick={handleChangeValue()}>Click me</button>
        </>
    )
}
export default Button12;