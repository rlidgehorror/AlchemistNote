export class UUID {

    static random(){
        return `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.replace(/x/g,() => {
            return parseInt((Math.random() * 16).toFixed(0)).toString(16);
        })
    }
}
