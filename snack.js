//本来因该用C++写的，js不适合文本处理，字符串不可变加上DOM，性能十分差劲！


//其实可以用二维数组
function perstart() {
    myspace = "&nbsp;";
    mywindow = document.getElementById("mywindow");
    // mywindow.innerText = screentext;
    refreshscreen();
    // 80* 21 begin from 1
}


snackstring = "Ilikeyou"
len = 3;
headx = 1;
heady = 1;
bodyxy = [];
// bodydri = [];//上下左右分别为 1 2 3 4
waytogo = 4;
stepquery = [[], [], []]

function start() {

    for (var i = 0; i < len; i++)//Also needed when added lenth
    {
        for (var j = 0; j <= i; j++) {
            stepquery[i].push(4);
        }
    }

    headx = Math.round(Math.random() * 40) + 20;
    heady = Math.round(Math.random() * 30);
    screentext[(heady + 1) * 84 + headx] = '*';
    screentext[(heady + 1) * 84 + headx - 2] = '*';
    screentext[(heady + 1) * 84 + headx - 1] = '*';
    // mywindow.innerText=screentext;
    bodyxy.push((heady + 1) * 84 + headx)
    bodyxy.push((heady + 1) * 84 + headx - 1)
    bodyxy.push((heady + 1) * 84 + headx - 2)//是-不是+
    // bodydri.push(1)
    // bodydri.push(1)
    document.getElementById("btn").remove();
    // document.getElementById("mybody").innerHTML+="<span>Your Score: </span><span id='ss'></span>"
    myss = document.getElementById("ss");//不可以用innerHTML here  这两行会影响主窗口区域刷新
    refreshscreen();
    creatfood();
    var hardness = Number(document.getElementById("hard").value);
    handle = setInterval(gametime, hardness * 1000);
}
function gameover(){
    alert("Game Over");
    clearInterval(handle);
}
// laststep=4;
//新尺寸 一共45行
function gametime() {
    if(headx==foodx && heady==foody)
    {
        len++;
        stepquery.push([])
        for (var j = 0; j < len-1; j++) {
            stepquery[len-1].push(stepquery[len-1][len-1]);//速度似乎也影响错误？显示时间问题
            //转弯时多出一个格子
            //没有完全碰到食物也会
            //食物还是会失踪？无限延长导致的？
            //冲出边框有问题
            //无限延长
        }
        creatfood();//missing
    }
    for (var i = 0; i < len; i++) {
        stepquery[i].splice(0, 0, waytogo);//应该是队列而不是栈
    }

    if ((headx <= 0) || (heady <= 0) || headx >= 82 || heady > 42) {
            gameover();
        //http://cly7796.net/wp/javascript/setinterval-and-settimeout-and-clearinterval-and-cleartimeout/
    }
    ifdid = 0;
    for (var i = 0; i < len; i++) {//这里for和if的关系搞错了？没有，每一个的方向不一样
        way = stepquery[i].pop();
        if (way == 4) {
            bodyxy[i]++;
            screentext[bodyxy[i]] = "*"
            // screentext[bodyxy[i] - len] = " "
            if (ifdid == 0) { headx++; ifdid = 1; }
            if (i == len - 1) screentext[bodyxy[i] - 1] = " "
        }
        else if (way == 1) {//最后会pop到没有，还有一个问题就是pop了两次
            screentext[bodyxy[i]] = "*"
            screentext[bodyxy[i] - 84] = "*"//在这里联想到是不是只有最后一个要清除？
            bodyxy[i] -= 84;//加上这个距离长了一些
            //scratch简单很多啊
            if (ifdid == 0) { heady--; ifdid = 1; }
            if (i == len - 1) {
                // console.log(i)
                // // screentext[bodyxy[i] - 84] = " "
                screentext[bodyxy[i] + 84] = " "
            }
        }
        else if (way == 2) {//最后会pop到没有，还有一个问题就是pop了两次
            screentext[bodyxy[i]] = "*"
            screentext[bodyxy[i] + 84] = "*"//在这里联想到是不是只有最后一个要清除？
            bodyxy[i] += 84;//加上这个距离长了一些
            //scratch简单很多啊
            if (ifdid == 0) { heady++; ifdid = 1; }
            if (i == len - 1) {
                // console.log(i)
                // // screentext[bodyxy[i] - 84] = " "
                screentext[bodyxy[i] - 84] = " "
            }
        }
        else if (way == 3) {//最后会pop到没有，还有一个问题就是pop了两次
            bodyxy[i] --;
            screentext[bodyxy[i]] = "*"
            // screentext[bodyxy[i] + 1] = " "//在这里联想到是不是只有最后一个要清除？
            //scratch简单很多啊
            if (ifdid == 0) { headx--; ifdid = 1; }
            if (i == len - 1) {
                // console.log(i)
                // // screentext[bodyxy[i] - 84] = " "
                screentext[bodyxy[i] + 1] = " ";
            }
        }

        refreshscreen();
    }}

    function refreshscreen() {
        windowstring = ""
        for (var i = 0; i < 3779; i++) {
            windowstring += screentext[i];
        }
        mywindow.innerHTML = windowstring;
        myss.innerHTML = len;
    }
    x = 0;
    y = 0;
    function creatfood() {
        foodx = Math.round((Math.random()) * 75);
        foody = Math.round((Math.random()) * 30);
        if (foodx == 0 || foodx == 1) foodx++;
        if (foody == 0 || foody == 1) foody++;
        // foodx=foodx*80+1;
        // foody=foody*15+1;//每次数字都一样
        // x, y = foodx, foody;
        x = foodx;
        y = foody;
        screentext[(y+1) * 84 + (x)] = '$';//不再需要y*84？ 位置搞错了 双次纠错
        windowstring = "";
        for (var i = 0; i < 3779; i++) {
            windowstring += screentext[i];
        }
        mywindow.innerHTML = windowstring;
    }


    function keyevent() {
        key = event.keyCode;
        if (key == 37) //left
        {
            waytogo = 3;
        }
        if (key == 38) //up
        {
            waytogo = 1;
        }
        if (key == 39) //right
        {
            waytogo = 4;
        }
        if (key == 40) //down
        {
            waytogo = 2;
        }
    }
    document.onkeydown = keyevent;
//还有一个问题就是反应会慢一拍（一个事件循环），插入时直接覆盖？
//到后面卡顿很严重
//无缘无故game over，变量没设置好
  //https://www.jb51.net/article/70603.htm