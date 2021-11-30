var a = setTimeout(() => {
    console.log("aaaaa")
}, 2000);

Number(a)


setTimeout(()=>{
    console.log("setTimeout1")
    setTimeout(()=>{
        console.log("setTimeout2")
    },0)
    Promise.resolve().then(()=>{
        console.log("promise1")
        Promise.resolve().then(()=>{
            console.log("promise2")
        })
    })
},0)

setTimeout(()=>{
    console.log("setTimeout1")
    Promise.resolve().then(()=>{
        console.log("promise1")
    })
},0)

setTimeout(()=>{
    console.log("setTimeout2")
    Promise.resolve().then(()=>{
        console.log("promise2")
    })
},0)

// console.log(a)