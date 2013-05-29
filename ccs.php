<?php 
session_start();
if(!isset($_SESSION['usrID'])){
	header("Location: index.php");
}
include_once 'config.php';
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title></title>
<link href="css/font-awesome.css" rel="stylesheet" type="text/css"/>
<link href="ccs.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/ds_a.js"></script>
<script type="text/javascript" src="js/pi.js"></script>
<script type="text/javascript" src="js/drag.js"></script>
<script>
function toggle_dropdown(evt,obj){ 
	myEvt(evt,obj,function(){});
	toggle(obj.id,function(){obj.show();},function(){obj.hide();});
}
var recarr=[],reci=0;//recipient array & index
function chatBoxDialog(boxTitle,recID){//recipient id
	if(isDefined(getObj('chat_box_'+recID))){//already opened chatbox
		var box=getObj('chat_box_'+recID);
		if(isDefined(getObj('chat_box_'+recID+"_tab"))){
			box.show();
			sat.remove(getObj('chat_box_'+recID+"_tab"));
			}
		activeBox(box.getPosition()[0],box.getPosition()[1],box);
		return false;
		}
	var box=document.createElement("div"),pCoor=getObj('group_chat').getPosition(),gCoor=(isDefined(recarr[reci-1]))?(recarr[reci-1].getPosition()):(pCoor);
    box.className="chat";
	box.style.position="fixed";
	box.style.top=(((gCoor[1]==0)?(pCoor[1]):(gCoor[1]))+20)+"px";
	box.style.left=(((gCoor[0]==0)?(pCoor[0]):(gCoor[0]))+20)+"px";
	box.id='chat_box_'+recID;
	box.title=boxTitle;
	box.setAttribute("rec",recID);
	box.innerHTML="<header onmousedown=\"dragObj(event,getObj('chat_box_"+recID+"'),activeBox,["+pCoor[0]+",1,"+pCoor[1]+",1])\">"+box.title+"<a href='javascript:void(0)' onclick=\"getObj('chat_box_"+recID+"').parentNode.removeChild(getObj('chat_box_"+recID+"'));\" title='Close'><i class='icon-remove'></i></a>&nbsp;<a href='javascript:void(0)' title='Minimize' onclick=\"sat.add(function(){getObj('chat_box_"+recID+"').show();},'chat_box_"+recID+"');getObj('chat_box_"+recID+"').hide()\"><i class='icon-minus'></i></a></header><iframe src='private/chat.php?recID="+recID+"' name='"+box.id+"_frame'></iframe><div class='clear'></div>";
	window.document.body.appendChild(box);
	addEvent(box,"click",function(){activeBox(box.getPosition()[0],box.getPosition()[1],box);});
	addEvent(window.frames[box.id+"_frame"],"click",function(){activeBox(box.getPosition()[0],box.getPosition()[1],box);});
	activeBox(box.getPosition()[0],box.getPosition()[1],box);
	recarr[reci++]=box;
	}


	function switchChannel(n,o){
        getObj('group_chat_frame').src="group/chat.php?channelID="+n;
        getObj('members_online_frame').src="members/online.php?channelID="+n;
        var obj=getObj('channel_dropdown');
        getObj('channel').innerHTML=o.innerHTML;
        toggle(obj.id,function(){obj.show();},function(){obj.hide();});
		}
	
	window.onload=function(){
		sat=new ScrollableTabs('scrollabletabs');
	};
</script>
</head>
<body>
<section class='pple_online'>
<header>
<table>
<tbody>
<tr><td><?=$_SESSION['name'];?> <span></span></td></tr>
<tr><td style="position:relative"><div class='search'><table><tr><td><i class="icon-comment"></i></td><td><input type="text" placeholder="&nbsp;Chat with..."/></td></tr></table></div></td></tr>
</tbody>
</table>
</header>
<article>
<iframe src="members/online.php?channelID=1" name="members_online_frame" id="members_online_frame" style="position:relative;width:250px;height:500px;border:none"></iframe>
</article>
</section>	
<section class="chat_tab">
<div class='group_chat' id="group_chat">
<header id="group_chat_header">
<table>
<tbody>
<tr><td style='position:relative'><button class='but' id='button_dropdown' onclick="toggle_dropdown(event,getObj('channel_dropdown'))"><span id='channel'>#General channel</span>&nbsp;<i class='icon-caret-down'></i></button>
<div class='channel_dropdown' id='channel_dropdown'>
<ul>
<?php 
foreach($pdo->query("select * from channel") as $fetch){
echo "<li><a href='javascript:void(0)' onclick='switchChannel({$fetch['channelID']},this)'>{$fetch['name']} channel</a></li>";
}
?>
</ul>
<div class="clear"></div>
</div>
</td><td></td><td><a href='javascript:void(0)' onclick="toggle('group_chat_body',function(obj){getObj('group_chat_body').hide();obj.title='Maximize';getObj('group_chat_header').style.borderBottom='none';},function(obj){getObj('group_chat_body').show();obj.title='Minimize';getObj('group_chat_header').style.borderBottom='1px solid #ccc';},this)" title='Minimize'><i class='icon-minus'></i></a></td></tr>
</tbody>
</table>
</header>
<section id="group_chat_body">
<article>
<iframe src="group/chat.php?channelID=1" name="group_chat_frame" id="group_chat_frame" style="position:relative;width:100%;height:450px;border:none"></iframe>
</article>
</section>
<div class="clear"></div>
</div>

<div class="grp_chat_tab">&nbsp;</div>
<div class="tab">
<div class='scrollabletabs' id='scrollabletabs'>
<table>
<tbody>
<tr><td><button class='st000'><i class='icon-circle-arrow-left'></i></button></td><td style="position:relative">
<div><ul class='st000'></ul></div>
</td><td><button class='st000'><i class='icon-circle-arrow-right'></i></button></td></tr>
</tbody>
</table>
</div>
</div>

</section>
</body>
</html>
