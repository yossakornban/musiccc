export class BeanUtils {
    public static isEmpty(dataCheck: any): boolean{
        var result = false;
        if(dataCheck == undefined || dataCheck.toString() == "" || dataCheck.toString() == null){
            result = true;
        }
    return result;
    }

    public static isNotEmpty(dataCheck: any): boolean{
        return !this.isEmpty(dataCheck);
    }

    public static toArray(obj: Object){
        return Object.keys(obj).map((key)=>{return obj[key]});
    }
}