
import { useState, useEffect } from "react";


export default function useValidate() {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [valid, setValid] = useState(false);

    // const myIP = "36.231.88.198";
    const myIP = 'asdjlkasjkj'
    useEffect(() => {
        fetch('https://api.ipify.org').then(res => res.text()).then(ip => {
            const flag = !!ip.match(/140\.112\.\d+\.\d+/) || !!ip.match(myIP)
            setValid(valid => valid || flag);
            setLoading(false);
        }).catch(_ => {
            setError(true);
        });

        const storage = localStorage.getItem('valid');
        if (storage) {
            setValid(true);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (valid)
            localStorage.setItem('valid', 'true');
    }, [valid]);


    return [loading, error, valid];
}
