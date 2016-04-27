/* 
    Change Content JavaScript from Dynamic Web Coding at dyn-web.com
    Copyright 2001-2013 by Sharon Paine
    For demos, documentation and updates, visit http://www.dyn-web.com/code/basics/change_content/

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see http://www.gnu.org/licenses
*/

// DYN_WEB is namespace used for code from dyn-web.com
// replacing previous use of dw_ prefix for object names
var DYN_WEB = DYN_WEB || {};

/*
    dw_event.js - version date May 2013 (added .domReady)
    .domReady uses whenReady fn from JavaScript the Definitive Guide
    6th edition by David Flanagan, example 17.01
*/
DYN_WEB.Event=(function(Ev){Ev.add=document.addEventListener?function(obj,etype,fp,cap){cap=cap||false;obj.addEventListener(etype,fp,cap);}:function(obj,etype,fp){obj.attachEvent('on'+etype,fp);};Ev.remove=document.removeEventListener?function(obj,etype,fp,cap){cap=cap||false;obj.removeEventListener(etype,fp,cap);}:function(obj,etype,fp){obj.detachEvent('on'+etype,fp);};Ev.DOMit=function(e){e=e?e:window.event;if(!e.target){e.target=e.srcElement;}if(!e.preventDefault){e.preventDefault=function(){e.returnValue=false;return false;};}if(!e.stopPropagation){e.stopPropagation=function(){e.cancelBubble=true;};}return e;};Ev.getTarget=function(e){e=Ev.DOMit(e);var tgt=e.target;if(tgt.nodeType!==1){tgt=tgt.parentNode;}return tgt;};Ev.domReady=(function(){var funcs=[];var ready=false;function handler(e){if(ready){return;}if(e.type==="readystatechange"&&document.readyState!=="complete"){return;}for(var i=0,len=funcs.length;i<len;i++){funcs[i].call(document);}ready=true;funcs=[];}if(document.addEventListener){document.addEventListener("DOMContentLoaded",handler,false);document.addEventListener("readystatechange",handler,false);window.addEventListener("load",handler,false);}else if(document.attachEvent){document.attachEvent("onreadystatechange",handler);window.attachEvent("onload",handler);}return function whenReady(f){if(ready){f.call(document);}else{funcs.push(f);}};})();return Ev;})(DYN_WEB.Event||{});

DYN_WEB.Util=(function(Ut){var Ev=DYN_WEB.Event;Ut.$=function(id){return document.getElementById(id);};Ut.getElementsByClassName=function(cl,tag,el){el=(el&&el.getElementsByTagName)?el:document;if(tag&&el.querySelectorAll){return el.querySelectorAll(tag+'.'+cl);}else if(el.getElementsByClassName){return el.getElementsByClassName(cl);}else{tag=tag||'*';var result=[],re=new RegExp('\\b'+cl+'\\b','i'),list=el.getElementsByTagName(tag);for(var i=0,len=list.length;i<len;i++){if(re.test(list[i].className)){result.push(list[i]);}}return result;}};Ut.contained=function(oNode,oCont){if(!oNode){return false;}while((oNode=oNode.parentNode)){if(oNode===oCont){return true;}}return false;};Ut.mouseleave=function(e,oNode){e=Ev.DOMit(e);var toEl=e.relatedTarget?e.relatedTarget:e.toElement?e.toElement:null;if(oNode!==toEl&&!Ut.contained(toEl,oNode)){return true;}return false;};return Ut;})(DYN_WEB.Util||{});

DYN_WEB.ContentSwap=(function(){var Ut=DYN_WEB.Util,Ev=DYN_WEB.Event;function Swap(opts){this.cls=opts.className||'showInfo';this.id=opts.displayId||'infoDiv';this.eventType=opts.eventType||'mouseover';this.restoreDefault=(typeof opts.restoreDefault==='boolean')?opts.restoreDefault:true;if(this.restoreDefault){this.defaultInfo=Ut.$(this.id).innerHTML;}this.content=opts.content;if(this.content){this.init();}else{throw new Error('It seems you have not provided content to be displayed for DYN_WEB.ContentSwap.');}}Swap.prototype={init:function(){var els=Ut.getElementsByClassName(this.cls);var el,loc,info;var id=this.id;var eType=this.eventType;for(var i=0,len=els.length;i<len;i++){el=els[i];loc=(el.dataset&&el.dataset.loc)?el.dataset.loc:el.getAttribute('data-loc');if(loc&&this.content[loc]){info=this.content[loc];if(eType==='mouseover'){Ev.add(el,'mouseover',function(id,info){return function(e){Swap.doSwap(id,info);};}(id,info));if(this.restoreDefault){info=this.defaultInfo;Ev.add(el,'mouseout',function(id,info){return function(e){var tgt=Ev.getTarget(e);if(Ut.mouseleave(e,tgt)){Swap.doSwap(id,info);}};}(id,info));}}else{Ev.add(el,'click',function(id,info){return function(e){e=Ev.DOMit(e);Swap.doSwap(id,info);e.preventDefault();};}(id,info));}}}}};Swap.doSwap=function(id,info){Ut.$(id).innerHTML=info;};Swap.setup=function(){for(var i=0;arguments[i];i++){new Swap(arguments[i]);}};return Swap;})();