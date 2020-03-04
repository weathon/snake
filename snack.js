screentext="\
###################################################################################\n\
#                                                                                 #\n\
#                                                                                 #\n\
#                                                                                 #\n\
#                                                                                 #\n\
#                                                                                 #\n\
#                                                                                 #\n\
#                                                                                 #\n\
#                                                                                 #\n\
#                                                                                 #\n\
#                                                                                 #\n\
#                                                                                 #\n\
#                                                                                 #\n\
#                                                                                 #\n\
#                                                                                 #\n\
#                                                                                 #\n\
#                                                                                 #\n\
#                                                                                 #\n\
#                                                                                 #\n\
#                                                                                 #\n\
#                                                                                 #\n\
#                                                                                 #\n\
###################################################################################\n"

function perstart()
{
    myspace="&nbsp;";
    mywindow=document.getElementById("window");
    mywindow.innerText=screentext;
    // 80* 21 begin from 1
}


snackstring="Ilikeyou"
len=3;
headx=1;
heady=1;

function start()
{
    headx=Math.round(Math.random()*40)+20;
    heady=Math.round(Math.random()*5)+10;
    screentext[(heady+1)*83+headx+1]='*';
    mywindow.innerText=screentext;
}

function refresh()
{

}

function creatfood()
{
    var x=Math.round(Math.random()*80);
    var y=Math.round(Math.random()*21);
}