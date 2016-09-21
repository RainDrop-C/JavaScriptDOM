//实现了JavaScript与HTML的分离
/*1.共享onload事件*/
/*为了执行prepare的函数，例如Window.onload = preparePicture。因为没有完整的
DOM，getElementsByTagName等方法就不能工作。有了这个语句可以在JavaScript文件
被加载时立即执行，使DOM完整。而addLoadEvent，只有一个打算在页面加载完毕时执行
的函数名字的参数，可以将window.onload事件存入变量oldonload，把几个函数添加到
执行队列中去。这是个常用函数。*/
function addLoadEvent(func) {
    var oldonload = window.onload;
    if(typeof window.onload !="function"){
        window.onload = func;
    }else{
        window.onload = function(){
            oldonload();
            func();
        }
    }
}
/*2.在先用元素后插入一个新元素*/
/*在insertBefore方法上进行编写，新元素（newElement），目标
元素（targetElement），父元素（parentElement）。
语法：parentElement.insertBefore(newElement,targetElement)
appendChild让新创建的节点成为某个现有节点的子节点。
lastChild是childNodes数组的最后一个元素。
nextSibling属性如果目标元素不是最后一个属性，将插入到目标元素
下一个兄弟元素。
insertAfter函数也是个实用函数*/
function insertAfter(newElement,targetElement) {
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
/*preparePicture函数创建元素插入到节点树里图片库清单的后面*/
function preparePicture(){
    if(!document.createElement) return false;
    if(!document.createTextNode) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById("imagegallery")) return false;
    var picture = document.createElement("img");
    picture.setAttribute("id","picture");
    picture.setAttribute("src","photo/picture.jpg");
    picture.setAttribute("alt","The most famous songstress");
    var description = document.createElement("p");
    description.setAttribute("id","description");
    var desctext = document.createTextNode("Choose a singer");
    description.appendChild(desctext);
    var gallery = document.getElementById("imagegallery");
    insertAfter(picture,gallery);
    insertAfter(description,picture);
}
/*prepareGallery函数负责处理事件，遍历处理图片库清单每个链接，发生事件
调用showPic函数*/
function prepareGallery() {
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById)  return false;
    if(!document.getElementById("imagegallery")) return false;
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    for (var i=0;i<links.length;i++){
        links[i].onmouseover = function () {
            return showPic(this);
        }
        links[i].onkeypress = links[i].onmouseover;
    }
}
/*事件处理函数showPic*/
function showPic(whichpic) {
    if (!document.getElementById("picture"))return false;
    var source = whichpic.getAttribute("href");
    var picture = document.getElementById("picture");
    picture.setAttribute("src",source);
    if (!document.getElementById("description")) return false;
    if (whichpic.getAttribute("title")){
        var text = whichpic.getAttribute("title")?whichpic.getAttribute("title"):"";
        var description = document.getElementById("description");
        if (description.firstChild.nodeType == 3){
            description.firstChild.nodeValue = text;
        }
    }
    return false;
}
addLoadEvent(preparePicture);
addLoadEvent(prepareGallery);
