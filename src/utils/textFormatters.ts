export function capitalize(str:string = ''): string{
    return str.length > 0 
    ? str[0].toUpperCase() + str.slice(1)
    : ''
}

export function fromUrlString(str:string = ''):string{
    return str.length > 0 
    ? capitalize(str.replaceAll('_', ' ')).replaceAll('and', '&')
    : ''
}

export function toUrlString(str:string = ''):string{
    return str.length > 0 
    ? str.toLowerCase().replaceAll(' ', '_')
    : ''
}