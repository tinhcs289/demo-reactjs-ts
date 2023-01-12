import stringFormator from "@/helpers/stringHelpers/_stringFormator";

export default function slugify(str: string) {
    if (!str) return '';

    const formater = stringFormator(
        t => t.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a"),
        t => t.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A"),
        t => t.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e"),
        t => t.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E"),
        t => t.replace(/ì|í|ị|ỉ|ĩ/g, "i"),
        t => t.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I"),
        t => t.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o"),
        t => t.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O"),
        t => t.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u"),
        t => t.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U"),
        t => t.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y"),
        t => t.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y"),
        t => t.replace(/đ/g, "d"),
        t => t.replace(/Đ/g, "D"),
        t => t.replace(/[^a-zA-Z0-9 ]/g, ""),
        t => t.trim().toLowerCase().replaceAll(/[\s]+/g, " "),
        t => t.replaceAll(/\s/g, "-"),
    );

    return formater(str);
}