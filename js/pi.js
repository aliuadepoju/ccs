var g_index=[];
sprintf=function(f){
	alert(arguments[0].split('%')+' '+arguments[1]);
};

zerofill=function(arg){return (arg<10)?('0'+arg):(arg);};
// http request
var req=(window.XMLHttpRequest)?(new XMLHttpRequest()):((window.ActiveXObject)?(new ActiveXObject("Msxml2.XMLHTTP")):(new ActiveXObject("Microsoft.XMLHTTP")));
// bind the event handlers
      function addEvent(elem, evtType, func) {
         if (elem.addEventListener) {
            elem.addEventListener(evtType, func, false);
         } else if (elem.attachEvent) {
            elem.attachEvent("on"+evtType, func);
         } else {
            elem["on"+evtType]=func;
         }
      }
      
   var getObj=function(id){return document.getElementById(id);};
   
   Object.prototype.getObjN=function(o){return this.getElementsByTagName(o);};
   
   Object.prototype.getObjN2=function(o,func){
	   var arr=[],c=0,obj=this.getElementsByTagName(o);
	   for(var i=0;i<obj.length;i++){
			if ((isDefined(func) && func(obj[i])) || !isDefined(func)){
			arr[c++]=obj[i];
			}
		}
	   return arr;
	   };
   
   Object.prototype.getObj2=function(id){
	   return this.contentDocument.getElementById(id);
   };
 // trim function
    String.prototype.trim=function(){return this.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');};
    String.prototype.stripHTML=function(){return this.replace(/(?:<[^>]+>)|(?:,)/g,' ');};///<(?:.|\s)*?>/g
    String.prototype.isEmpty=function(){
    	if(this.trim()=='' || this.trim()==null) {
    		return true;
    		}
    		return false;
    };
    
    function evtObj(evt){return (isDefined(evt))?(evt.target):(window.event.srcElement);}
    function evtype(e){return (isDefined(e))?(e):(window.event);}
    
          //is defined
   var isDefined=function(obj){
    	if(obj==null || typeof obj=="undefined"){
    		return false;
    	}
    	return true;
    };

Object.prototype.center=function(){
	var top,left;
	top=Math.round((window.innerHeight-this.offsetHeight)/2);
	left=Math.round((window.innerWidth-this.offsetWidth)/2);
	this.style.top=(top < 0)?(0):(top+"px");
	this.style.left=(left < 0)?(0):(left+"px");
};

Object.prototype.hide=function(){
	 this.style.display='none';
};

Object.prototype.show=function(){
	 this.style.display='block';
};
	
		function ajaxThread(){//thread([url,args],function(e){},function(e){},function(e){});
			var i=0,thr=[],request,method;
			function f(args,processing,completed,error){
				request=args[1] || null;
				method=(args[1])?("POST"):("GET");
				thr[i]=(window.XMLHttpRequest)?(new XMLHttpRequest()):((window.ActiveXObject)?(new ActiveXObject("Msxml2.XMLHTTP")):(new ActiveXObject("Microsoft.XMLHTTP")));
				thr[i].open(method,(args[0].indexOf('?')==-1)?(args[0]+"?"):(args[0])+'&rand='+Math.random(),true);
				if(args[2])
					thr[i].setRequestHeader("Content-Type","text/xml");
				 else if(args[1])
					 thr[i].setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				thr[i].send(request);
				thr[i].onreadystatechange=function(){
				if (this.readyState < 4)
					processing(this);
				else if (this.readyState==4 && this.status==200)
					completed(this);
				else
					error();
				};
				i++;
				return this;
			}
			return f;
		}
	
		function abortThread(obj){
		   // if (obj){
		    	obj.onreadystatechange=function(){};
		    	obj.abort();
		    	obj=null;
		   // }
		  }
		
		
//check form
function check(param,status,func){
var x=param,s=(status==1)?(true):(false);
if(typeof x == "object"){
	if(x.tagName=='FORM'){
for (var i=0;i<x.elements.length;i++){
	if (x.elements[i].type=="checkbox" && !x.elements[i].value.isEmpty()){
x.elements[i].checked=s;
if (isDefined(func)) func(obj[i].value);
}
}
}
	else{
		obj=x.getElementsByTagName('input');
		for(var i=0;i<obj.length;i++){
			if (obj[i].type=="checkbox" && !obj[i].value.isEmpty()){
			obj[i].checked=s;
			if (isDefined(func)) func(obj[i].value);
			}
		}
	}
}
else{
	if(getObj(x).checked){
		getObj(x).checked=false;
		if (isDefined(func)) func(getObj(x).value);
	}
	else{
		getObj(x).checked=true;
		if (isDefined(func)) func(getObj(x).value);
	}
	}
}

function toggle_check(obj,func){
	    // toggle checkbox
	   toggle(obj.id,function(){
		   check(obj,1,func);
	   },function(){
		   check(obj,0,func);  
	   });
}

function trigger(func,t,data){
	var i=0,proc=[],timer=[];
	function f(){
		var c=0,arr=[],n=0;
		for(var m=0;m<arguments.length;m++) arr[n++]=arguments[m];
		proc[i]=counter=function(){
			if(c==t) func(arr,data);
			c++;
		timer[i]=setTimeout(counter,500);
		};
		clearTimeout(timer[i]);
		proc[i++]();
		for(var j=0;j<proc.length;j++){
			proc[j]=null;
			delete proc[j];
			}
		return this;
		}
		return f;
		}
 
function Run(load,r,t){//new Run(load,10,100); argument1=load,argument2=no of time to execute,argument3=time of execution
	var c=0,timer=null;
	this.task=function(n){
    c=n;
	if(isDefined(timer)) this.stop();
    timer=setInterval(function(){
		if(c >=r+1) {
			this.stop();
			 return false;		
		}
		load(c++);
      },t || 2000);
		};
		
	this.start=function(n){
			this.task(n || c);
		};
		
	this.stop=function(){
	   clearInterval(timer);
	};
	} 


function Queue(t){//t=time interval,queue series of task to run
	var load=[];
    this.run=function(){
	timer=setInterval(function(){
	if(load.length==0) return false;
	load.shift()(load.length);
	},t);
	};
	this.add=function(task){
	load.push(task);
	};
	this.run();
}

function RQueue(arr,t){//recursive queue
	var load=[];
    this.run=function(){
	timer=setInterval(function(){
	if(load.length==0) load=load.concat(arr);
	load.shift()(load.length);
	},t);
	};
	this.run();
}
	var togVar=[];
	function toggle(key,func1,func2,src){
		if (!isDefined(togVar[key]) || togVar[key]==0){
			togVar[key]=1;
			func1(src);
			}
		else{
			togVar[key]=0;
			func2(src);
			}
	}
	
	var n=0,regId=[],UID=function(obj){
	 for(var c in obj.parentNode.childNodes){
		 if (isDefined(obj.parentNode.childNodes[c]) && obj.parentNode.childNodes[c].tagName=="INPUT" && obj.parentNode.childNodes[c].type=="hidden"){
			 return obj.parentNode.childNodes[c].value; 
		 }
	 }
with(Math){var i=round(random()*1000);}
if(!regId.in_array(i)){
	regId[n++]=i;
    var HI=document.createElement("input");
    HI.type='hidden';
   // HI.name='regId'; && obj.parentNode.childNodes[c].name=="regId"
    HI.value=i;
    obj.parentNode.appendChild(HI);
	return i;
}
else{
	return UID();
}
 };	
	
 

	var myEvt=function(evt,obj,func){//assign id to event source and div object
		var arr=[],c=0,arr2,iObj=evtObj(evt);
		function iter(obj){
			for(var i=0;i<obj.childNodes.length;i++){
				if(obj.childNodes[i].hasChildNodes()){
					arr[c++]=obj.childNodes[i];
					iter(obj.childNodes[i]);
				}
				else{
					arr[c++]=obj.childNodes[i];
				}
				
			}
		return arr;
		}
		arr2=iter(obj);
	
		window.onmousedown=function(evt){
			var nObj=evtObj(evt);
			if(nObj.id==obj.id) return false;//if main_div: ignore
			if(!arr2.in_array(nObj)){
				obj.hide();
				if (nObj.id != iObj.id) togVar[obj.id]=0;
				if(isDefined(func)) func();
			}
			};
	};

	cloneSelect=function(obj){
		var str='';
		for (var i=0;i<obj.options.length;i++){
			str+="<option value='"+obj.options[i].value+"'>"+obj.options[i].innerHTML+"<\/option>";
		}
		return str;
	};

			// maximize img
			function max_img(img,size){getObj(img).style.width=size+"px";}
			// minimize img
			function min_img(img,size){getObj(img).style.width=size+"px";}
					
		// accordion function
		accordion=function(param){
		for (var i=0;i<param[1].length;i++){
			(param[1][i]==param[0])?(getObj(param[0]).show()):(getObj(param[1][i]).hide());
			}
			};
			
			Object.prototype.getAttrs=function(){
				var arr={};
				for(var i=0;i<this.attributes.length;i++){
					arr[this.attributes[i].name]=this.attributes[i].value;
					}
					return arr;
				};
			
			
			Object.prototype.setAttrs=function(obj){
				for(var x in obj){
						this.setAttribute(x,obj[x]);
						}
				};
			
	// fetch table data
				Object.prototype.fetchTableData=function(){
					var bd=this.tBodies[0],arr=[];
					for(var i=0;i<bd.rows.length;i++){
						arr[i]=this.rows[i].outerHTML;
						}
					return arr;
					};
				
					Object.prototype.updateTableData=function(obj,arr){
						this.removeChild(this.firstChild);
						var tb=document.createElement("tbody");
						if(arr.length==0){
							tb.insertRow(0).outerHTML="<tr><td >No match found</td></tr>";
							this.appendChild(tb);
							return false;
						}
						for(var i=0;i<arr.length;i++){
							tb.insertRow(i).outerHTML=obj[arr[i]];
							}
						this.appendChild(tb);
						};
					
				
			function fetchTableData(obj,f){
				var bd=obj.tBodies[0],attrs=[],arr=[],format=f || 'text';
				for(var i=0;i<bd.rows.length;i++){
					var arr1=[],cellAttrs=[bd.rows[i].getAttrs()];
					for(var j=0;j<bd.rows[i].cells.length;j++){
						cellAttrs[j+1]=bd.rows[i].cells[j].getAttrs();
						arr1[j]=(format=='text')?(bd.rows[i].cells[j].innerText):(bd.rows[i].cells[j].innerHTML);
						}
					    attrs[i]=cellAttrs;
						arr[i]=arr1;
					}
				return [arr,attrs];
				}
			
			Object.prototype.fetchDataByCol=function(c){
				var bd=this.tBodies[0],arr=[],j=0,chkbox=this.tBodies[0].getElementsByTagName('input');
				if(!this.tagName.toLowerCase()=='table'){
					return false;
				}
				
				for(var i=0;i<bd.rows.length;i++){
				if(chkbox[i].type=="checkbox" && chkbox[i].checked){
					arr[j++]=(isDefined(document.innerText))?(bd.rows[i].cells[c].innerText):(bd.rows[i].cells[c].textContent);
				}
				}
				return arr;
			};
			
			Object.prototype.fetchDataByCols=function(col){
				var bd=this.tBodies[0],arr=[];
				if(!this.tagName.toLowerCase()=='table'){
					return false;
				}
				
				for(var i=0;i<bd.rows.length;i++){
					var arr2=[];
					for(var k=0;k<col.length;k++){
						arr2[k]=(isDefined(document.innerText))?(bd.rows[i].cells[col[k]].innerText):(bd.rows[i].cells[col[k]].textContent);
					}
					arr[i]=arr2;
				  }
				return arr;
			};
			
			Object.prototype.fetchDataByRow=function(r){
				var bd=this.tBodies[0],arr=[],j=0;
				if(!this.tagName.toLowerCase()=='table'){
					return false;
				}
				
				for(var i=1;i<bd.rows[r].cells.length;i++){
				arr[j++]=(isDefined(document.innerText))?(bd.rows[r].cells[i].innerText):(bd.rows[r].cells[i].textContent);
				}
				return arr;
			};
			
			 Object.prototype.getRowByTabIndex=function(n){
				 var r=this.tBodies[0].rows;
				 for(var i=0;i<r.length;i++){
					 if(r[i].tabIndex==n){
						return r[i];
				 }
			 }
			 };
			
			
			function updateTableData(obj,data){
				//moveRow(from,to)
				//refresh()
				var tb=obj.tBodies[0],arr=data[0],rw,ce0;
				for(var i=0;i<arr.length;i++){
				rw=tb.deleteRow(i);
				rw=tb.insertRow(i);
				rw.setAttrs(data[1][i][0]);
				ce0=rw.insertCell(0);
				ce0.innerHTML=(isNaN(Number(arr[i][0])))?(arr[i][0]):(i+1);
				ce0.setAttrs(data[1][i][1]);
				var ce1;
				for(var j=1;j<arr[i].length;j++){
					ce1=rw.insertCell(j);
					ce1.innerHTML=arr[i][j];
					ce1.setAttrs(data[1][i][j+1]);
				}

			}
				}

	/*
		//initialize an icons
		inputIcon=new Image();
			inputIcon.src="../icons/question.png";
			warningIcon=new Image();
			warningIcon.src="../icons/warning32.png";
				closeIcon=new Image();
				closeIcon.src="../icons/closebox.png";
				*/
				
				// Lock screen function
				var lok=document.createElement("div");
				lock=function(){
					toggle(UID(window.document.body),function(){
						lok.className="lock";
					window.document.body.appendChild(lok);
					},function(){
						window.document.body.removeChild(lok);
					});
				};
				
				
				function xdialog(){
					var div=document.createElement("div"),arr=[],c=0;
					function f(label,pat,url,func){
						lock();
						arr[c]=div;
						var str,ctrl_id,but_id,wrap_id,cls_id,uid="id_"+Math.round(Math.random()*100);
					    ctrl_id="ctrl_"+uid;
					    but_id="but_"+uid;
					    wrap_id="wrap_"+uid;
					    cls_id="cls_"+uid;
					    arr[c].className='xdialog';
					    str ="<form action='javascript:void(0)'>";
					    str +="<table><thead><tr><th style='text-align:left'>"+label+" <img src='../icons/closedlg.png' style='float:right;margin:3px' title='close' id='"+cls_id+"'/><\/th><\/tr><\/thead><tbody><tr><td style='position:relative'><div id='"+wrap_id+"'><table><tr><td><input type='text' onmouseover='this.focus()' id='"+ctrl_id+"'/><\/td><td><input type='image' src='../icons/go-next-8.png' id='"+but_id+"'/><\/td><\/tr><\/table><div class='clear'><\/div><\/div><\/td><\/tr><\/tbody><\/table>";
					    str+="<\/form>";
						arr[c].innerHTML=str;
						window.document.body.appendChild(arr[c]);
						arr[c].center();
						addEvent(getObj(cls_id),"click",function(){
							lock();
							window.document.body.removeChild(arr[c-1]);
							});
							
						addEvent(getObj(but_id),"click",function(){
							if(pat.test(getObj(ctrl_id).value)==true){
								getObj(wrap_id).style.border='1px solid #ccc';
								thread([url,'value='+getObj(ctrl_id).value],
										function(){
									getObj(but_id).src='../icons/arrows16.gif';
										},
									function(e){
										if(parseInt(e.responseText)==0){
											getObj(wrap_id).style.border='1px solid #F9E920';
											getObj(but_id).src='../icons/go-next-8.png';
										}
										else{
										func(e);
										getObj(wrap_id).style.border='1px solid #068000';
										getObj(but_id).src='../icons/accept.png';
										getObj(ctrl_id).value='';
										
										}
								},
								function(){}
								);
							}
							else{
								getObj(wrap_id).style.border='1px solid #F9E920';
								getObj(but_id).src='../icons/go-next-8.png';
									}
						});
						c++;
						return this;
					}
					return f;
				}
				
				
				
			MsgDialog=function(content,func){
				    var str;
				    dialog[dc]=div;
				    Lock();
					dialog[dc].className="dialog";
					dialog[dc].id="dialog";
					str="<form action='javascript:void(0);RmDialog(dialog["+dc+"])' name='dialog_form'>";
					str+="<div class='Dheader' onmousedown=\"_drag(event,dialog)\">"+content[0]+"<\/div>";
					str+="<div class='Dbody'>"+content[1]+"<\/div>";
					str+="<\/form>";
					dialog[dc].innerHTML=str;
					window.document.body.appendChild(dialog[dc]);
					toCenter(dialog[dc],"fixed");
					func(dc);
					dc++;
			};	
			
			
			// RmDialog
			RmDialog=function(obj){
				lock();
				window.document.body.removeChild(obj);
				};
				
				Warning=function(str){
			    Lock();
			    dialog=document.createElement("div");
				dialog.className="dialog";
				dialog.id="dialog";
				var contents="<a href='javascript:void(0);RmDialog();Unlock()' title='Close' ><img src='"+closeIcon.src+"' style='position:absolute;top:-20px;right:-20px;z-index:999999'\/><\/a><form action='javascript:void(0)' name='dialog_form'><div class='header' onmousedown=\"_drag(event,dialog)\">&nbsp;<img src='"+warningIcon.src+"' style='float:left'/>&nbsp;Warning<\/div><div class='body'><table style='width:300px;margin:0 auto'><tbody><tr><td>"+str+"<\/td><\/tr><\/tbody><\/table><\/div><\/form>";
                dialog.innerHTML=contents;
			    window.document.body.appendChild(dialog);
			    toCenter(dialog,"fixed");
					};
					
					
				function psearch(params){
						var tbObj=params[1],tb=tbObj.tBodies[0];
					 	if(params[0].value.isEmpty()){
					 		tbObj.removeChild(tb);
							tb=document.createElement("tbody");
							var a_keys=range(0,params[2][0].length);
							for(var i=0;i<a_keys.length;i++){
								tb.insertRow(i).outerHTML=params[2][0][a_keys[i]];
								}
							if(isDefined(params[3])) params[3].innerText=zerofill(a_keys.length);
							tbObj.appendChild(tb);
							
							if(isDefined(params[4])) params[4](tb);
							// params[5]();//enable
					 		return false;
					 		}

			    tbObj.removeChild(tb);
				tb=document.createElement("tbody");
				var tb=document.createElement("tbody"),arr3=params[2][1].array_search(params[0].value);
				if(arr3.length==0){
					tb.insertRow(0).outerHTML="<tr><td>No match found</td></tr>";
					tbObj.appendChild(tb);
					return false;
				}
				for(var i=0;i<arr3.length;i++){
					tb.insertRow(i).outerHTML=params[2][0][arr3[i]];
					}
				
				if(isDefined(params[3])) params[3].innerText=zerofill(arr3.length);
				tbObj.appendChild(tb);
				if(isDefined(params[4])) params[4](tb);
				
			     // params[5]();//enable
					}
					 
					 
				
					//column sorter
					 function columnSorter(obj,order){
						 var arr,tbObj=getElementsByClassName(document,"table","sortable")[0],data=tbObj.fetchTableData(),tb=tbObj.tBodies[0];
                       	 arr=tbObj.fetchDataByCols([obj.cellIndex]);
						 keys=arr.array_map_keys(arr.array_sort(order));
						 tbObj.removeChild(tb);
						 tb=document.createElement("tbody");
						 for(var i=0;i<keys.length;i++) tb.insertRow(i).outerHTML=data[keys[i]];
						 tbObj.appendChild(tb);
						 for(var i=0;i<tb.rows.length;i++) tb.rows[i].cells[0].innerHTML=i+1;
						 	}
					 
						 	
					 Object.prototype.disable=function(){
						  if(isDefined(getObj(this.id+'_disable'))) return false;
						  var obj=document.createElement("div");
							 obj.className="disable";
							 obj.id=this.id+'_disable';
							 this.appendChild(obj);
							 return true;
					 };
					 
					 
					 Object.prototype.enable=function(){
						 this.removeChild(getObj(this.id+'_disable'));
					 };
					 
					 Object.prototype.clear=function(){
						 this.innerHTML='';
						 this.hide();
					 };
					 
					 Object.prototype.destroy=function(){
						 this.parentNode.removeChild(this);
					 };
					 
					 Object.prototype.any=function(){
							var obj=this.getElementsByTagName("input"),bool=false;
							for(var i=0;i<obj.length;i++){
								if (obj[i].type=="checkbox"  && !obj[i].value.isEmpty() && obj[i].checked){
									bool=true;
								}
							}
							return bool;
						};
						
						function addEvent(elm, evType, fn, useCapture){
					        if (elm.addEventListener) {
					          elm.addEventListener(evType, fn, useCapture); 
					          return true; 
					        } else if (elm.attachEvent) {
					          var r=elm.attachEvent('on'+evType, fn); 
					          return r; 
					        } else {
					          elm['on'+evType]=fn;
					        }
					      }
						
						function clock(obj){
							function f(){
							 var d=new Date();
							  var digits, readout='';
							  digits=d.getHours();
							  readout+=(digits > 9 ? '':'0')+digits+':';
							  digits=d.getMinutes();
							  readout+=(digits > 9 ? '':'0')+digits+':';
							  digits=d.getSeconds();
							  readout+=(digits > 9 ? '':'0')+digits;
							  obj.innerHTML=readout;
							}
							setInterval(function(){f();},1000);
							}
						
						function formatTo(base,precision){
						  var a,s;
						  a=roundTo(base,precision);
						  s=a.toString();
						  var decimalIndex=s.indexOf(".");
						  if (precision > 0 && decimalIndex < 0){
						    decimalIndex=s.length;
						    s+='.';
						  }
						  while (decimalIndex+precision+1 > s.length){
						    s+='0';
						  }
						  return s;
						}

						function roundTo(base,precision){
						  var m,a;
						  m=Math.pow(10,precision);
						  a=Math.round(base*m)/m;
						  return a;
						}	
						
						function getElementsByClassName(oElm,strTagName,oClassNames){
							var arrReturnElements = new Array();
							if ( typeof( oElm.getElementsByClassName ) == "function" ) {
								/* Use a native implementation where possible FF3, Saf3.2, Opera 9.5 */
								var arrNativeReturn = oElm.getElementsByClassName( oClassNames );
								if ( strTagName == "*" )
									return arrNativeReturn;
								for ( var h=0; h < arrNativeReturn.length; h++ ) {
									if( arrNativeReturn[h].tagName.toLowerCase() == strTagName.toLowerCase() )
										arrReturnElements[arrReturnElements.length] = arrNativeReturn[h];
								}
								return arrReturnElements;
							}
							var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
							var arrRegExpClassNames = new Array();
							if(typeof oClassNames == "object"){
								for(var i=0; i<oClassNames.length; i++){
									arrRegExpClassNames[arrRegExpClassNames.length]=new RegExp("(^|\\s)" + oClassNames[i].replace(/\-/g, "\\-") + "(\\s|$)");
								}
							}
							else{
								arrRegExpClassNames[arrRegExpClassNames.length]=new RegExp("(^|\\s)" + oClassNames.replace(/\-/g, "\\-") + "(\\s|$)");
							}
							var oElement;
							var bMatchesAll;
							for(var j=0; j<arrElements.length; j++){
								oElement = arrElements[j];
								bMatchesAll = true;
								for(var k=0; k<arrRegExpClassNames.length; k++){
									if(!arrRegExpClassNames[k].test(oElement.className)){
										bMatchesAll = false;
										break;
									}
								}
								if(bMatchesAll){
									arrReturnElements[arrReturnElements.length] = oElement;
								}
							}
							return (arrReturnElements);
						}
						
						Object.prototype.getPosition=function(){
							var posX=0,posY=0,obj=this;
							while (obj != null){
							posX += obj.offsetLeft;
							posY += obj.offsetTop;
							obj=obj.offsetParent;
							}
						return [posX, posY];
						};
						
						
						function scrollPosition(){
							var pos=[0,0];
							if (typeof window.pageYOffset != 'undefined'){
							pos=[window.pageXOffset,window.pageYOffset];
							}
							else if (typeof document.documentElement.scrollTop != 'undefined' && document.documentElement.scrollTop > 0){
							pos=[document.documentElement.scrollLeft,document.documentElement.scrollTop];
							}
							else if (typeof document.body.scrollTop != 'undefined'){
							pos=[document.body.scrollLeft,document.body.scrollTop];
							}
							return pos;
							}

						function cursorPosition(e){
							var evt=evtype(e),scrollpos=scrollPosition(),cursorpos=[0,0];
							if (typeof evt.pageX != "undefined" && typeof evt.x != "undefined"){
							cursorpos[0]=evt.pageX;
							cursorpos[1]=evt.pageY;
							}
							else{
							cursorpos[0]=evt.clientX+scrollpos[0];
							cursorpos[1]=evt.clientY+scrollpos[1];
							}
							return cursorpos;
							}
						
					Object.prototype.addClass=function(classValue){
						var pattern = new RegExp("(^| )" + classValue + "( |$)");
						if (!pattern.test(this.className)){
						if (this.className == "")
							this.className=classValue;
						else
							this.className += " " +classValue;
						}
						return true;
						};


					Object.prototype.removeClass=function(classValue){
						var removedClass=this.className;
						var pattern=new RegExp("(^| )" + classValue+"( |$)");
						removedClass=removedClass.replace(pattern, "$1");
						removedClass=removedClass.replace(/ $/, "");
						this.className=removedClass;
						return true;
						};
						
						function setCookie(sName,sValue,oExpires,sPath,sDomain,bSecure){
							var sCookie=sName+"="+encodeURIComponent(sValue);
							if (oExpires){
							sCookie +=";expires="+oExpires.toGMTString();
							}
							if (sPath){
							sCookie +=";path="+sPath;
							}
							if (sDomain){
							sCookie +=";domain="+sDomain;
							}
							if (bSecure){
							sCookie += ";secure";
							}
							document.cookie=sCookie;
							}
						
						
						function getCookie(sName){
							var sRE="(?:; )?"+sName+"=([^;]*);?";
							var oRE=new RegExp(sRE);
							if (oRE.test(document.cookie)){
							return decodeURIComponent(RegExp["$1"]);
							} 
							else {
							return null;
							}
							}

						function deleteCookie(sName,sPath,sDomain) {
							setCookie(sName,"",new Date(0),sPath,sDomain);
							}
						
						 Object.prototype.isFilled=function(){
							 this.style.backgroundColor='transparent'; 
						 };
						
						 Object.prototype.isNotFilled=function(){
							 this.style.backgroundColor='#F4F3BE';
							 return false;
						 };
						 
						  Object.prototype.bind_gauge=function(){
						   this.innerHTML="<table style='position:relative;width:200px;height:40px;background:#fff;margin:5px auto' class='format gauge'><tbody><tr class='grid'><td colspan='2' id='gauge_msg' style='text-align:left'></td></tr><tr class='grid'><td style='position:relative;width:150px;height:20px'><div id='gauge' style='position:relative;width:0px;height:100%;margin:0px;background-color:#f5f5f5'></div></td><td style='width:50px' id='per'>0%</td></tr></tbody></table>";
				           };
				           
				           function update_gauge(v,s,msg){//v=step,s=length,msg=message in action
				        	   if (v>s) v=s;
				        	   getObj('gauge').style.width=(150/s)*v+"px";
				        	   getObj('per').innerHTML=Math.round(((150/s)*v)*100/150)+"%";
				        	   if(isDefined(getObj('gauge_msg'))) getObj('gauge_msg').innerHTML=msg;
				           }
				           
				           Object.prototype.bind_gauge2=function(){
							   this.innerHTML="<table style='position:relative;width:200px;height:20px;float:right;background:#fff;margin:5px auto' class='format gauge'><tbody><tr class='grid'><td style='position:relative;width:150px'><div id='gauge' style='position:relative;width:0px;height:100%;margin:0px;background-color:#f5f5f5'></div></td><td style='width:50px' id='per'>0%</td></tr></tbody></table>";
					           };
					           
					          
				           
				           Object.prototype.getCheckBox=function(func){
								 var obj=this.getElementsByTagName('input'),arr=[],c=0;
								 for(var i=0;i<obj.length;i++){
										if (obj[i].type=="checkbox"  && !obj[i].value.isEmpty() && obj[i].checked){
											arr[c++]=(typeof func=="function")?(func(obj[i].value)):(obj[i].value);
										}
									}
								 return arr;
							 };
							 
							 Object.prototype.getFormData=function(typ,func){
								 //takes 2 arguments, the type and function to check the operation of the object
								 var arr=[],c=0;//obj=(this.nodeName=='FORM')?(this.elements):(this.tBodies[0].getElementsByTagName('input'))
								 if(this.nodeName=='FORM')
									 obj=this.elements;
								 else if(this.nodeName=='TABLE')
									 obj=this.tBodies[0].getObjN('input');
								 else
									 obj=this.getObjN('input');
										 
								 for(var i=0;i<obj.length;i++){
									 if(typ=="select"){
										 if((obj[i].nodeName=="SELECT" && (typeof func=="function" && func(obj[i]))) || (obj[i].nodeName=="SELECT" && typeof func=="undefined")){
												arr[c++]=obj[i].value;
											}
									 }
									 else{
									if((obj[i].type==typ && (typeof func=="function" && func(obj[i]))) || (obj[i].type==typ && typeof func=="undefined")){
										arr[c++]=obj[i].value;
									}
								 }
								 }
								 return arr;
							 };
							 
			function Slider(o,w,delay){//o=slide wrap object,w=width of elements
				var p=-1;
				var arr=zoom(w);
				var timer=null;
				var self=this;
				var pause=false;
				var deto=null;//delay time-out
				this.task=function(n){
			    p=n;
			    var ulObj=getObj(o).getObj('ul')[0];
				if(typeof timer != "undefined") this.stop();
	            timer=setInterval(function(){
				var liObj=ulObj.getObj('li');
				var li=document.createElement("li");
				li.innerHTML=liObj[0].innerHTML;
				liObj[0].style.marginLeft=p+'px';
				p -=arr.pop();
				if(Math.abs(p) >= w){
					self.stop();
					p=-1;
					arr=zoom(w);
					ulObj.removeChild(liObj[0]);
					ulObj.appendChild(li);
					deto=setTimeout(function(){
						if(!pause) self.start();
						},delay);
						
						
				}
					
	              },100);
					};
					
				this.start=function(n){
						this.task(n || p);
					};
					
				this.stop=function(flag){
					pause=isDefined(flag);
				   clearInterval(timer);
				};
				
				getObj(o).onmouseover=function(){
				self.stop(true);
				};
				
				getObj(o).onmouseout=function(){
					clearTimeout(deto);
				self.start();
				};
				this.start(0);
				}

function ScrollableTabs(o){
var obj=getObj(o),buttons=obj.getObjN2('button',function(o){ return o.className=='st000';}),ulObj=obj.getObjN2('ul',function(o){ return o.className=='st000';})[0],liObj=ulObj.getObjN('li');

buttons[0].onclick=function(){
	if(liObj.length <= 4) return false;
	li=document.createElement("li"),attrs=liObj[0].getAttrs();
	li.innerHTML=liObj[0].innerHTML;
	li.setAttrs(attrs);
	ulObj.removeChild(liObj[0]);
	ulObj.appendChild(li);
	};
	
buttons[1].onclick=function(){
	if(liObj.length <= 4) return false;
    li=document.createElement("li"),attrs=liObj[liObj.length-1].getAttrs();
	li.innerHTML=liObj[liObj.length-1].innerHTML;
	li.setAttrs(attrs);
	ulObj.removeChild(liObj[liObj.length-1]);
	ulObj.insertBefore(li,ulObj.firstChild);
	};
	
	this.add=function(func,box){//callback function & minimized box
		var li=document.createElement("li"),bt=(getObj(box).title.length > 13)?(getObj(box).title.substring(0,10)+"..."):(getObj(box).title);
		li.innerHTML=bt+"<a href='javascript:void(0)' title='Remove' style='float:right'><i class='icon-remove'></i></a>";
		li.title=getObj(box).title;//getObj(box).getAttribute("rec")
		li.id=box+"_tab";
		addEvent(li,'click',function(){
			func();
			sat.remove(li);
			}
		);
		ulObj.insertBefore(li,ulObj.firstChild);
		if(liObj.length > 0) getObj(o).show();
		addEvent(li.getObjN("a")[0],'click',function(){
			sat.remove(li);
			getObj(box).parentNode.removeChild(getObj(box));
		});
	};
	
	this.remove=function(li){
		ulObj.removeChild(li);
		if(liObj.length==0) getObj(o).hide();
	};
	
}

function getRel(arr,obj){//get relatives
		var rels=[],c=0;
		for(var i=0;i<arr.length;i++){
			var targetObj=document.elementFromPoint(arr[i][0],arr[i][1]).parentNode;
			if(targetObj.nodeName==obj.nodeName && targetObj.className==obj.className) rels[c++]=targetObj;
			}
			return rels;//return relatives
		}
	
	var activeBox=function(x,y,obj){//put active box to front
		var targetObj=getRel([[x-1,y-1],[x-1+obj.offsetWidth,y-1],[x-1,y-1+obj.offsetWidth],[x+2+obj.offsetWidth,y+2+obj.offsetWidth]],obj);
        if(targetObj.length > 0){
			obj.style.zIndex="10";
			for(var i=0;i<targetObj.length;i++) targetObj[i].style.zIndex="0";
	     }
        };
