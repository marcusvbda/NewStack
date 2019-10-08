import PTBR from "./ptbr"
import Store from "../Store"
export default (index,params=[]) => {
    let data = {
        PTBR
    }
    let content = index
    let language = Store.getters.language
    if(data[language]) content =  data[language][index] ? data[language][index] : index
    for(let i in params) {
        content = content.replace("%%",params[i])
    }
    return content
}
