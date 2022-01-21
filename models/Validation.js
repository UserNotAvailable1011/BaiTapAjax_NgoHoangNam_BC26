function Validation() {

    //Chứa các phương thức kiểm tra hợp lệ
    this.kiemTraRong = function (value,selectorError, name) {
        //Xử lý không hợp lệ
        //.trim(): loại bỏ khoảng trắng đầu và cuối chuỗi
        if(value.trim() === '') {
            document.querySelector(selectorError).innerHTML = name + ' không được bỏ trống !';
            return false;
        }
        //Xử lý hợp lệ
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.kiemTraKyTu = function(value,selectorError,name) {
        var regexAllLetter = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/
        //Xử lý hợp lệ
        if(regexAllLetter.test(value)){
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }

        document.querySelector(selectorError).innerHTML = name + ' tất cả phải là ký tự!';
        return false;
    }

    this.kiemTraDoDai = function (value, selectorError, maxLength, minLength, name){
        if(value.length < minLength || value.length > maxLength){
            document.querySelector(selectorError).innerHTML = name + ' có độ dài từ ' + minLength + ' đến ' + maxLength + ' ký số ';
            return false;
        }

        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    
    this.kiemTraGiaTri = function (value, selectorError, maxValue, minValue , name, nameValue){
        if(Number(value) < minValue || Number(value) > maxValue){
            document.querySelector(selectorError).innerHTML = name + ' ' + minValue +' '+ nameValue  + ' đến ' + maxValue + ' ' +  nameValue;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
}