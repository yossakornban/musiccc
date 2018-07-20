export class DateUtils {

    public static setFormatDate(dataValue: Date): string{
        var dateConvertValue: string;
        if(this.checkDateObject(dataValue)){
                var monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];
                var month = dataValue.getMonth();
                var day = (dataValue.getDate()>9 ? '' : '0')+dataValue.getDate();
                dateConvertValue = day+" "+monthNames[month]+" "+dataValue.getFullYear();
        }
        return dateConvertValue;
    }

    public static setFormatDateDDMMYYYY(dataValue: Date): string{
        var dateConvertValue: string;
        if(this.checkDateObject(dataValue)){
                var monthNo = ["01", "02", "03", "04", "05", "06",
                    "07", "08", "09", "10", "11", "12"
                ];
                var month = dataValue.getMonth();
                var day = (dataValue.getDate()>9 ? '' : '0')+dataValue.getDate();
                dateConvertValue = day+" "+monthNo[month]+" "+dataValue.getFullYear();
        }
        return dateConvertValue;
    }

    public static setFormatDateDMY(dataValue: Date): string{
        var dateConvertValue: string;
        if(this.checkDateObject(dataValue)){
                var monthNo = ["01", "02", "03", "04", "05", "06",
                    "07", "08", "09", "10", "11", "12"
                ];
                var month = dataValue.getMonth();
                var day = (dataValue.getDate()>9 ? '' : '0')+dataValue.getDate();
                dateConvertValue = day+"/"+monthNo[month]+"/"+dataValue.getFullYear();
        }
        return dateConvertValue;
    }

    public static setFormatDateDD_MM_YYYY(dataValue: Date): string{
        var dateConvertValue: string;
        if(this.checkDateObject(dataValue)){
                var monthNo = ["01", "02", "03", "04", "05", "06",
                    "07", "08", "09", "10", "11", "12"
                ];
                var month = dataValue.getMonth();
                var day = (dataValue.getDate()>9 ? '' : '0')+dataValue.getDate();
                dateConvertValue = dataValue.getFullYear()+"-"+monthNo[month]+"-"+day;
        }
        return dateConvertValue;
    }

    public static setFormatDateYYYY_MM(dataValue: Date): string{
        var dateConvertValue: string;
        if(this.checkDateObject(dataValue)){
                var monthNo = ["01", "02", "03", "04", "05", "06",
                    "07", "08", "09", "10", "11", "12"
                ];
                var month = dataValue.getMonth();
                var day = (dataValue.getDate()>9 ? '' : '0')+dataValue.getDate();
                dateConvertValue = dataValue.getFullYear()+monthNo[month];
        }
        return dateConvertValue;
    }

    public static setFormatDateMM_YYYYY(dataValue: Date): string{
        var dateConvertValue: string;
        if(this.checkDateObject(dataValue)){
                var monthNo = ["01", "02", "03", "04", "05", "06",
                    "07", "08", "09", "10", "11", "12"
                ];
                var month = dataValue.getMonth();
                var day = (dataValue.getDate()>9 ? '' : '0')+dataValue.getDate();
                dateConvertValue = monthNo[month]+"/"+dataValue.getFullYear();
        }
        return dateConvertValue;
    }

    private static checkDateObject(dataValue: Date): boolean{
        var result: boolean = false;
        if(dataValue != null){
            if(Object.keys(dataValue).length != 1){
                result = true;
            }
        }
        return result;
    }

}