export function getDateTimeStamp() {
    var m = new Date();
    var dateString =
        m.getUTCFullYear() + 
        ("0" + (m.getUTCMonth()+1)).slice(-2) +
        ("0" + m.getUTCDate()).slice(-2) + "_" +
        ("0" + m.getUTCHours()).slice(-2) +
        ("0" + m.getUTCMinutes()).slice(-2) +
        ("0" + m.getUTCSeconds()).slice(-2) + "_" +
        ("000" + m.getUTCMilliseconds()).slice(-3);

    return dateString;
}