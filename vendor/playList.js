$(document).ready(function () {

    document.getElementById("au").volume = 0.5;
    document.body.addEventListener("mousemove", playMusic);
    function playMusic() {
        playListSong = getPlayListByTitle();
        log("playListSong: " + playListSong);
        playList(playListSong);
        
    }
});
var isUserStop = false;
function pause() {
    var au = document.getElementById("au");
    var stop = document.getElementById("stopMusic");
    if (!au.paused) {
        au.pause();
        stop.innerText="Play Music";
    }
    else {
        // au.play();
        //play();
        playList(playListSong);
        stop.innerText="Stop Music";
    }
    isUserStop = !isUserStop;
}
var playListSong;

function playList(listSong){
    var i = Math.floor(Math.random() * listSong.length);
    var au = document.getElementById("au");
    if (au.paused && !isUserStop) {
    log("PlayList"+i);
    au.src = listSong[i];
    au.play();
    }
}

TitleDay = {
    TETDUONGLICH : "TETDUONGLICH",
    TETAMLICH : "TETAMLICH",
    VALENTINE : 'VALENTINE',
    QUOCTEPHUNU: "QUOCTEPHUNU",
    CHRISTMAS: "CHRISTMAS",
    DEFAULT: "DEFAULT"
}
function getPlayListByTitle(){
    let title = getDate();
    let defaultPlayList = [];
    switch(title){
        case TitleDay.TETDUONGLICH:
            return ["https://aredir.nixcdn.com/Unv_Audio5/HappyNewYear-ABBA_3rkqc.mp3"];
        case TitleDay.TETAMLICH:
            return [
                        //Ngay xuan long phung sum vay
                        "http://vnso-zn-15-tf-mp3-s1-zmp3.zadn.vn/ac5c45409f04765a2f15/8150194042498772463?authen=exp=1578490043~acl=/ac5c45409f04765a2f15/*~hmac=8ccd0a694b84eb47ed59f509206dbc66&amp;filename=Ng%C3%A0y%20Xu%C3%A2n%20Long%20Ph%E1%BB%A5ng%20Sum%20V%E1%BA%A7y.mp3"
                        //Ngay tet que em
                        ,"https://aredir.nixcdn.com/NhacCuaTui960/NgayTetQueEm-DuongCuongXPro-5386523.mp3"
                        //Xuan da ve
                        ,"http://data57.chiasenhac.com/downloads/1209/2/1208114-936ca890/128/Xuan%20Da%20Ve%20-%20Ha%20Thuy%20Anh_%20The%20Voice%20Team%20[128kbps_MP3].mp3"
                    ];
         case TitleDay.VALENTINE:
            return defaultPlayList;
         case TitleDay.QUOCTEPHUNU:
            return defaultPlayList;
         case TitleDay.CHRISTMAS:
            return ["vendor/mp3/WeWishYouAMerryChristmas-CrazyFrog-783766.mp3","vendor/mp3/We-Wish-You-A-Merry-Christmas-Enya.mp3"];
         default:
             return defaultPlayList;
            
    }
}

function getDate(){
//15/12/2020
let currentDate = new Date();
let currentTime = currentDate.getTime();
let currentYear = currentDate.getFullYear();

//1/1/..
let start = new Date(currentYear,0,1);
let end = new Date(currentYear,1,1);
//Tet duong lich
if(currentTime > start.getTime() && currentTime < end.getTime()){
    log("CHUC MUNG NAM MOI!!!");
    return TitleDay.TETDUONGLICH;
}
//14/2/...
start = new Date(currentYear,1,14);
end = new Date(currentYear,1,15);
if(currentTime > start.getTime() && currentTime < end.getTime()){
    log("CHUC MUNG LE TINH YEU!!!");
    return TitleDay.VALENTINE;
}
//TODO calulate tet am lich ...


//8/3/...
start = new Date(currentYear,2,6);
end = new Date(currentYear,2,9);
if(currentTime > start.getTime() && currentTime < end.getTime()){
    log("CHUC MUNG NGAY QUOC TE PHU NU!!!");
    return TitleDay.QUOCTEPHUNU;
}
//TODO 6/4;30/4;1/5;19/5;1/6;27/7;5/9;9/10(mybirthday);20/10;20/11;22/12

//15/11/...
start = new Date(currentYear,10,15);
end = new Date(currentDate.getFullYear()+1,0,1);
if(currentTime > start.getTime() && currentTime < end.getTime()){
    log("MARRY CHRISTMAS!!!");
    return TitleDay.CHRISTMAS;
}

return TitleDay.DEFAULT;
}
