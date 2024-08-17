window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
window.Script1 = function()
{
  //create a function to add the music elements dynamically into the head of the html document
function add_line() {
var line = document.createElement("audio");
var head=document.getElementsByTagName('body')[0];
line.type = "audio/mp3";
line.src="";
line.id="bgSong" ;
line.autoplay = true;
line.loop = true;
head.appendChild(line);
}

//run the function only if the added html lines have not already been added
if(document.getElementById('bgSong')==null){
add_line();
var audio = document.getElementById('bgSong');
audio.volume = 0.5;
}
}

window.Script2 = function()
{
  var player = GetPlayer();
this.Location= player.GetVar("Location");
var audio = document.getElementById('bgSong');
audio.src = Location + "1.mp3";
audio.load();
audio.play();
}

window.Script3 = function()
{
  var player = GetPlayer();

// Lấy giá trị của các biến true/false từ 1 đến 10
var cau1 = player.GetVar("cau1");
var cau2 = player.GetVar("cau2");
var cau3 = player.GetVar("cau3");
var cau4 = player.GetVar("cau4");
var cau5 = player.GetVar("cau5");
var cau6 = player.GetVar("cau6");
var cau7 = player.GetVar("cau7");
var cau8 = player.GetVar("cau8");
var cau9 = player.GetVar("cau9");
var cau10 = player.GetVar("cau10");

// Danh sách các câu hỏi
const missions = [
    { question: "Câu 1", condition: cau1 },
    { question: "Câu 2", condition: cau2 },
    { question: "Câu 3", condition: cau3 },
    { question: "Câu 4", condition: cau4 },
    { question: "Câu 5", condition: cau5 },
    { question: "Câu 6", condition: cau6 },
    { question: "Câu 7", condition: cau7 },
    { question: "Câu 8", condition: cau8 },
    { question: "Câu 9", condition: cau9 },
    { question: "Câu 10", condition: cau10 }
];

// Lọc bỏ các câu hỏi có biến điều kiện là true
const availableMissions = missions.filter(m => !m.condition).map(m => m.question);

// Chọn ngẫu nhiên một câu hỏi từ danh sách còn lại
if (availableMissions.length > 0) {
    var cauhoi = availableMissions[Math.floor(Math.random() * availableMissions.length)];
    player.SetVar("cauhoi", cauhoi);
} else {
    // Xử lý khi không còn câu hỏi nào có thể chọn
    console.log("Không còn câu hỏi nào có thể chọn.");
    player.SetVar("cauhoi", "Không có câu hỏi nào khả dụng");
}
}

window.Script4 = function()
{
  const url = "https://script.google.com/macros/s/AKfycbxIOMRo2hCAOlDSyRSj-ZO764h7VoTAYpjyPN-NF_VNX3pS8AvGn_3kHOKZFI6MKI8/exec";
const player = GetPlayer();

// Tạo một đối tượng Date đại diện cho thời gian hiện tại
const currentDate = new Date();

// Lấy thông tin ngày, tháng, năm, giờ, phút, giây
const day = String(currentDate.getDate()).padStart(2, '0'); //Thêm số 0 phía trước nếu ngày tháng chỉ có 1 chữ số
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0, nên cần cộng thêm 1
const year = currentDate.getFullYear();
const hours = String(currentDate.getHours()).padStart(2, '0'); //Thêm số 0 phía trước nếu giờ chỉ có 1 chữ số
const minutes = String(currentDate.getMinutes()).padStart(2, '0'); //Thêm số 0 phía trước nếu phút chỉ có 1 chữ số
const seconds = String(currentDate.getSeconds()).padStart(2, '0'); //Thêm số 0 phía trước nếu giây chỉ có 1 chữ số

// Tạo chuỗi đại diện cho timestamp
const timestamp = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

fetch(url, {
    method: "POST",
    mode: 'no-cors',
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    body: JSON.stringify({
        tennhanvien: player.GetVar("hovaten"),
        masonhanvien: player.GetVar("masonv"),
        nhapcuahang: player.GetVar("cuahang"),
        diemso: player.GetVar("diem"),
        tggio: player.GetVar("GIO"),
        tgphut: player.GetVar("PHUT"),
        tggiay: player.GetVar("GIAY"),
        timestamp: timestamp // Thêm timestamp vào dữ liệu gửi đi
    })
});
}

};
