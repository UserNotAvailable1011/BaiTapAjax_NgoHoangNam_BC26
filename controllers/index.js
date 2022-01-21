//Tạo biến kiểm tra
var kiemTra = new Validation();

//Lấy data từ server
function getDataApi(){
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien', //đường dẫn
        method: 'GET',
        responseType: 'json'
    });
    promise.then(function(result){
     //   console.log('Data', result.data)
        renderTable(result.data);
    });
    promise.catch(function(err){
        console.log('error', err)
    });
}
getDataApi();

//Tạo bảng
function renderTable(mangNhanVien){
    var nhanVienConTent = '';
    for (var i = 0; i < mangNhanVien.length ; i++){
        var nhanVien = mangNhanVien[i];     
        nhanVienConTent += `
            <tr>
                <td>${nhanVien.maNhanVien}</td>
                <td>${nhanVien.tenNhanVien}</td>
                <td>${nhanVien.chucVu}</td>
                <td>${nhanVien.luongCoBan}</td>
                <td>${nhanVien.soGioLamTrongThang}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaNhanVien(${nhanVien.maNhanVien})">Xóa</button>
                    <button class="btn btn-primary" onclick="suaNhanVien(${nhanVien.maNhanVien})">Sửa</button>
                </td>
            </tr>
        `
    }
    document.getElementById('tblNhanVien').innerHTML = nhanVienConTent;
}

//Thêm nhân viên

document.querySelector('#btnThemNhanVien').onclick = function(){
    var nhanVien = new NhanVien();
    var sltChucVu = document.getElementById('chucVu');
    var arrTagChucVu = sltChucVu.options;
    var indexOptionSelected = sltChucVu.selectedIndex;
    nhanVien.chucVu = arrTagChucVu[indexOptionSelected].innerHTML; 

    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value ;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value ;
    nhanVien.heSoChucVu = document.querySelector('#chucVu').value;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLam').value;

    //Kiểm tra hợp lệ
    var valid = true;
    //Kiểm tra rỗng
    valid &= kiemTra.kiemTraRong(nhanVien.maNhanVien,'#error_required_maNhanVien', 'Mã nhân viên') &
             kiemTra.kiemTraRong(nhanVien.tenNhanVien,'#error_required_tenNhanVien', 'Tên nhân viên') &
             kiemTra.kiemTraRong(nhanVien.luongCoBan,'#error_required_luongCoban', 'Lương nhân viên') &
             kiemTra.kiemTraRong(nhanVien.soGioLamTrongThang,'#error_required_soGioLam', 'Số giờ làm'); 
    //Kiểm tra ký tự
    valid &= kiemTra.kiemTraKyTu(nhanVien.tenNhanVien, '#error_allLetter_tenNhanVien', 'Tên nhân viên');
    // Kiểm tra độ dài
    valid &= kiemTra.kiemTraDoDai(nhanVien.maNhanVien, '#error_length_maNhanVien', 6 , 4, 'Mã nhân viên' );
    //Kiểm tra giá trị
    valid &= kiemTra.kiemTraGiaTri(nhanVien.luongCoBan, '#error_luongCoban', 20000000 , 1000000 , 'Lương từ', 'VNĐ') &
             kiemTra.kiemTraGiaTri(nhanVien.soGioLamTrongThang, '#error_value_soGioLam', 150 , 50 , 'Số giờ làm từ' ,'giờ')   
    //Xử lí
    if(!valid){
        return;
    }
    
    
    //Gọi axios để thêm data
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',
        method: 'POST',
        data: nhanVien
    })
    promise.then(function(result){
        console.log(result.data);

        getDataApi();
    })
    promise.catch(function(err){
        console.log('error', err)
    })
    
    //Clear input
    clearInput();
    
}

//Xóa nhân viên

function xoaNhanVien(maNhanVien){
    var promise = axios({
        url : 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien='+ maNhanVien,
        method : 'DELETE',
    })
    promise.then(function(result){
        getDataApi();
    })
    promise.catch(function(err){
        console.log('error', err)
    })
}

//Sửa sinh viên

function suaNhanVien(maNhanVien){
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien='+ maNhanVien,
        method: 'GET'
    })
    promise.then(function(result){
      //  console.log(result.data);
        var nhanVien = result.data;
        // var sltChucVu = document.getElementById('chucVu');
        // var arrTagChucVu = sltChucVu.options;
        // var indexOptionSelected = sltChucVu.selectedIndex;
        // arrTagChucVu[indexOptionSelected].innerHTML = nhanVien.chucVu;
        document.querySelector('#maNhanVien').value = nhanVien.maNhanVien;
        document.querySelector('#tenNhanVien').value = nhanVien.tenNhanVien;
        document.querySelector('#chucVu').value = nhanVien.heSoChucVu;
        document.querySelector('#luongCoBan').value = nhanVien.luongCoBan;  
        document.querySelector('#soGioLam').value = nhanVien.soGioLamTrongThang;
        //Khóa mã
        document.querySelector('#maNhanVien').disabled = true;
        document.querySelector('#btnThemNhanVien').disabled = true;
    })
    promise.catch(function(err){
        console.log('error', err);
    })
}

//Cập nhật thông tin

document.querySelector('#btnCapNhatThongTin').onclick = function(){
    var nhanVien = new NhanVien();
    var sltChucVu = document.querySelector('#chucVu');
    var arrTagChucVu = sltChucVu.options;
    var indexOptionSelected = sltChucVu.selectedIndex;
    nhanVien.chucVu = arrTagChucVu[indexOptionSelected].innerHTML; 

    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value ;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value ;
    nhanVien.heSoChucVu = document.querySelector('#chucVu').value;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLam').value;

    //Kiểm tra hợp lệ
    var valid = true;
    //Kiểm tra rỗng
    valid &= kiemTra.kiemTraRong(nhanVien.maNhanVien,'#error_required_maNhanVien', 'Mã nhân viên') &
             kiemTra.kiemTraRong(nhanVien.tenNhanVien,'#error_required_tenNhanVien', 'Tên nhân viên') &
             kiemTra.kiemTraRong(nhanVien.luongCoBan,'#error_required_luongCoban', 'Lương nhân viên') &
             kiemTra.kiemTraRong(nhanVien.soGioLamTrongThang,'#error_required_soGioLam', 'Số giờ làm'); 
    //Kiểm tra ký tự
    valid &= kiemTra.kiemTraKyTu(nhanVien.tenNhanVien, '#error_allLetter_tenNhanVien', 'Tên nhân viên');
    // Kiểm tra độ dài
    valid &= kiemTra.kiemTraDoDai(nhanVien.maNhanVien, '#error_length_maNhanVien', 6 , 4, 'Mã nhân viên' );
    //Kiểm tra giá trị
    valid &= kiemTra.kiemTraGiaTri(nhanVien.luongCoBan, '#error_luongCoban', 20000000 , 1000000 , 'Lương từ', 'VNĐ') &
             kiemTra.kiemTraGiaTri(nhanVien.soGioLamTrongThang, '#error_value_soGioLam', 150 , 50 , 'Số giờ làm từ' ,'giờ')   
    //Xử lí
    if(!valid){
        return;
    }

    //API
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=' + nhanVien.maNhanVien,
        method : 'PUT',
        data: nhanVien
    })
    promise.then(function(result){
        getDataApi();
        clearInput();
    })
    promise.catch(function(err){
        console.log('error', err);
    })
}

function clearInput(){
        document.querySelector('#maNhanVien').value = '';
        document.querySelector('#tenNhanVien').value = '';
        document.querySelector('#luongCoBan').value = '';
        document.querySelector('#soGioLam').value = '';    
        document.querySelector('#maNhanVien').disabled = false;
        document.querySelector('#btnThemNhanVien').disabled = false;
}