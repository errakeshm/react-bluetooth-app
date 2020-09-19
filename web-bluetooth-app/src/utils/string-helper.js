const toCamelCase = (str) =>{
    return str.substr(0,1).toUpperCase() + str.toLowerCase().substr(1);
}

export { toCamelCase }