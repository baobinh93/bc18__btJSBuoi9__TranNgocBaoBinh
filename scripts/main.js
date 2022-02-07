const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// ---DOM---
const maNvInputEl = $("#maNhanVien");
const maNvWarningEl = $("#spanMaNhanVien");

const tenNvInputEl = $("#tenNhanVien");
const tenNvWarningEl = $("#spanTenNhanVien");

const emailNvInputEl = $("#emailNhanVien");
const emailNvWarningEl = $("#spanEmailNhanVien");

const passInputEl = $("#passwordNhanVien");
const passWarningEl = $("#spanPassword");

const ngaySinhNvInputEl = $("#ngaySinhNhanVien");
const ngaySinhNvWarningEl = $("#spanNgaySinh");

const chucVuInputEl = $("#chucVu");
const chucVuWarningEl = $("#spanChucVu");

const warningInputListEl = $$(".input__warning");

const themNhanVienBtn = $("#addUserBtn");

const modalForm = $("#modal__form");

const tableForRenderDsNv = $("#dsNhanVienList");

const updateUserBtnEl = $("#updateUserBtn");

const openModalAddUserBtnEl = $("#openModalAddUserBtn");
// --- Object  Contructor
function NhanVien(_ma, _ten, _email, _pass, _dateOfBirth, _job) {
  this.ma = _ma;
  this.ten = _ten;
  this.email = _email;
  this.pass = _pass;
  this.dateOfBirth = _dateOfBirth;
  this.job = _job;
}

// Mẫu cho danh sách nhân viên
const danhSachNhanVien = [];
let nv1 = new NhanVien(
  "123",
  "Bình",
  "binh@gmail.com",
  12,
  "1993-09-14",
  "Sếp"
);
let nv2 = new NhanVien(
  "126",
  "Nhật",
  "hangn@gmail.com",
  12,
  "1998-12-09",
  "Thư Ký"
);
let nv3 = new NhanVien(
  "186a",
  "Tuấn",
  "tuann@gmail.com",
  "18",
  "1980-09-14",
  "Nhân Viên"
);
danhSachNhanVien.push(nv1, nv2, nv3);
tableForRenderDsNv.innerHTML = renderDsNv(danhSachNhanVien);

// --- Function Validation---

function checkNullValue(input) {
  if (input.toString().trim() === "") {
    return false;
  } else {
    return true;
  }
}

function checkEmail(input) {
  var reg = /\S+@\S+\.\S+/;
  return reg.test(input.toString());
}

function checkHaveNumber(input) {
  var reg = /[0-9]/;
  return reg.test(input);
}

function hiddenWarning() {
  warningInputListEl.forEach((item) => {
    item.classList.add("d-none");
    item.classList.remove("d-block");
  });
}

// function Kiểm tra mã nhân viên trùng
function checkMaNv(_maNv) {
  let listMaNv = [];
  danhSachNhanVien.forEach((nv) => {
    listMaNv.push(nv.ma);
  });

  //console.log(listMaNv);
  return listMaNv.includes(_maNv);
}
// --- Function Add User

themNhanVienBtn.onclick = () => {
  const maNv = maNvInputEl.value;
  const tenNv = tenNvInputEl.value;
  const emailNv = emailNvInputEl.value;
  const passNv = passInputEl.value;
  const ngaySinhNv = ngaySinhNvInputEl.value;

  const chucVuNv = chucVuInputEl.value;

  if (!checkNullValue(maNv)) {
    return (maNvWarningEl.innerHTML = "Vui lòng nhập mã nhân viên!");
  } else if (checkMaNv(maNv)) {
    return (maNvWarningEl.innerHTML = "Mã nhân viên đã được sử dụng !");
  } else if (!checkNullValue(tenNv)) {
    return (tenNvWarningEl.innerHTML = "Vui lòng nhập tên nhân viên !");
  } else if (checkHaveNumber(tenNv)) {
    return (tenNvWarningEl.innerHTML =
      "Tên nhân viên không được chứa kí tự số !");
  } else if (!checkNullValue(emailNv)) {
    return (emailNvWarningEl.innerHTML = "Vui lòng nhập email");
  } else if (!checkEmail(emailNv)) {
    return (emailNvWarningEl.innerHTML = "Email không hợp lệ");
  } else if (!checkNullValue(passNv)) {
    return (passWarningEl.innerHTML = "Vui lòng nhập password");
  } else if (!checkNullValue(ngaySinhNv)) {
    return (ngaySinhNvWarningEl.innerHTML = "Vui lòng nhập ngày sinh");
  } else if (!checkNullValue(chucVuNv)) {
    return (chucVuWarningEl.innerHTML = "Vui lòng chọn chức vụ");
  } else {
    let nhanVienMoi = new NhanVien(
      maNv,
      tenNv,
      emailNv,
      passNv,
      ngaySinhNv,
      chucVuNv
    );
    danhSachNhanVien.push(nhanVienMoi);
    tableForRenderDsNv.innerHTML = renderDsNv(danhSachNhanVien);
    resetForm();
    alert("Thêm thành công");
  }
};

// --- Xử lý khi gõ dữ liệu các cảnh báo được xoá đi
maNvInputEl.onkeyup = () => {
  maNvWarningEl.innerHTML = "";
};
tenNvInputEl.onkeyup = () => {
  tenNvWarningEl.innerHTML = "";
};
emailNvInputEl.onkeyup = () => {
  emailNvWarningEl.innerHTML = "";
};
passInputEl.onkeyup = () => {
  passWarningEl.innerHTML = "";
};
ngaySinhNvInputEl.onchange = () => {
  ngaySinhNvWarningEl.innerHTML = "";
};
chucVuInputEl.onchange = () => {
  chucVuWarningEl.innerHTML = "";
};

// --- Hàm reset Form
function resetForm() {
  modalForm.reset();
}

// --- Hàm render danh sách nhân viên
function renderDsNv(arr) {
  let content = "";
  arr.forEach((nhanVien) => {
    let row = `
    <tr class="text-center">
              <td>${nhanVien.ma}</td>
              <td>${nhanVien.ten}</td>
              <td>${nhanVien.email}</td>
              <td>${nhanVien.dateOfBirth}</td></td>
              <td>${nhanVien.job}</td>
              <td>
                <button type="button" class="btn btn-info" onclick="editUserInfo('${nhanVien.ma}')"   data-toggle="modal"
                data-target="#addUser">Edit</button>
                <button type="button" class="btn btn-danger" onclick="removeUser('${nhanVien.ma}')">Delete</button>
              </td>
    </tr>
    `;
    content += row;
  });
  return content;
}

// Hàm sửa thông tin
function editUserInfo(_maNv) {
  let vitriNhanVien = danhSachNhanVien.findIndex(function (nhanVien) {
    return _maNv == nhanVien.ma;
  });
  let nhanVienCanSua = danhSachNhanVien[vitriNhanVien];
  //console.log(vitriNhanVien);
  maNvInputEl.value = nhanVienCanSua.ma;
  maNvInputEl.disabled = true;
  tenNvInputEl.value = nhanVienCanSua.ten;
  emailNvInputEl.value = nhanVienCanSua.email;
  passInputEl.value = nhanVienCanSua.pass;

  ngaySinhNvInputEl.value = nhanVienCanSua.dateOfBirth;
  chucVuInputEl.value = nhanVienCanSua.job;
  updateUserBtnEl.classList.remove("d-none");
  themNhanVienBtn.classList.add("d-none");
}
openModalAddUserBtnEl.onclick = () => {
  updateUserBtnEl.classList.add("d-none");
  themNhanVienBtn.classList.remove("d-none");
  maNvInputEl.disabled = false;
  resetForm();
};
// --- Function Update User
updateUserBtnEl.onclick = () => {
  const maNv = maNvInputEl.value;
  const tenNv = tenNvInputEl.value;
  const emailNv = emailNvInputEl.value;
  const passNv = passInputEl.value;
  const ngaySinhNv = ngaySinhNvInputEl.value;
  const chucVuNv = chucVuInputEl.value;

  if (!checkNullValue(tenNv)) {
    return (tenNvWarningEl.innerHTML = "Vui lòng nhập tên nhân viên !");
  } else if (checkHaveNumber(tenNv)) {
    return (tenNvWarningEl.innerHTML =
      "Tên nhân viên không được chứa kí tự số !");
  } else if (!checkNullValue(emailNv)) {
    return (emailNvWarningEl.innerHTML = "Vui lòng nhập email");
  } else if (!checkEmail(emailNv)) {
    return (emailNvWarningEl.innerHTML = "Email không hợp lệ");
  } else if (!checkNullValue(passNv)) {
    return (passWarningEl.innerHTML = "Vui lòng nhập password");
  } else if (!checkNullValue(ngaySinhNv)) {
    return (ngaySinhNvWarningEl.innerHTML = "Vui lòng nhập ngày sinh");
  } else if (!checkNullValue(chucVuNv)) {
    return (chucVuWarningEl.innerHTML = "Vui lòng chọn chức vụ");
  } else {
    let vitriNhanVien = danhSachNhanVien.findIndex(function (nhanVien) {
      return maNv == nhanVien.ma;
    });
    let nhanVienCanSua = danhSachNhanVien[vitriNhanVien];
    nhanVienCanSua.ten = tenNv;
    nhanVienCanSua.email = emailNv;
    nhanVienCanSua.pass = passNv;
    nhanVienCanSua.dateOfBirth = ngaySinhNv;
    nhanVienCanSua.job = chucVuNv;

    tableForRenderDsNv.innerHTML = renderDsNv(danhSachNhanVien);

    alert("Sửa thành công");
  }
};

// Hàm Xoá nhân viên
function removeUser(_maNv) {
  if (confirm("Bạn Có Muốn Xoá ?")) {
    let vitriNhanVien = danhSachNhanVien.findIndex(function (nhanVien) {
      return _maNv == nhanVien.ma;
    });
    danhSachNhanVien.splice(vitriNhanVien, 1);
    tableForRenderDsNv.innerHTML = renderDsNv(danhSachNhanVien);
    console.log(danhSachNhanVien);
  }
}
