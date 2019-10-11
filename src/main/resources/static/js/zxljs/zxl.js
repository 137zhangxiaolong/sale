
$(function () {
    //退出
    $("#userExit").click(function () {
        var r=confirm("确定要退出系统？")
        if (r==true){
            window.location.href="index.html";
        }
    })
    //销售
    $("#zxlsale").click(function () {
        $.post("myzxlsale",function (res) {
            var obj = $.dealJSONObj(res);
            //console.log(obj.data);
            var inf = '<option value="0">--请选择商品--</option>';
            //console.log(obj.data.length);
            var inf1 =
                '<div>'+
                '<h3>添加销售</h3>'+
                '商品名称：'+
                '<select name="productid" style="width: 160px;">';
            var inf2 = '</select><br>'+
                '商品单价：'+
                '<input type="text" id="proprice"><br>'+
                '商品数量：'+
                '<input type="text" id="pronum"><br>'+
                '<button onclick="addsalebtn()">保存</button><br>'+
                '</div>';
            for (var i=0;i<obj.data.length;i++){
                //console.log(obj.data[i].id);
                //console.log(obj.data[i].productname);
                inf +=
                    '<option value="'+obj.data[i].id+'">'+obj.data[i].productname+'</option>';
            }
            $("#showinf").html(inf1+inf+inf2);
        })
    })
    //查看销售信息
    $("#zxlshowsale").click(function () {
        $.post("myzxlshowsale",function (res) {
            var obj = $.dealJSONObj(res);
            //console.log(obj.data);
            var inf = '';
            //console.log(obj.data.length);
            var inf1 = '<div>'+
                '<span style="padding-right: 150px;">销售信息查询</span>'+
                '<span>排序方式</span>'+
                '<select name="flag">'+
                '<option value="0">销售日期</option>'+
                '<option value="1">单笔总价</option>'+
                '</select>'+
                '<button onclick="changeshowsale()">提交</button>'+
                '</div>'+
                '<table style="text-align: center;" border="1" width="480px;">'+
                '<tr style="background-color: #ADDBE7;">'+
                '<th>ID</th>'+
                '<th>商品</th>'+
                '<th>单价</th>'+
                '<th>数量</th>'+
                '<th>总价</th>'+
                '<th>销售日期</th>'+
                '<th>销售员</th>'+
                '</tr>'+
                '<tbody id="idData">';
            var inf2 = '</tbody>'+
                '</table>'+
                '<table width="100%" align="right">'+
                '<tr><td><div id="barcon" name="barcon"></div></td></tr>'+
                '</table>';
            var trs = $("#tablebody");
            //console.log(trs.length);
            for (var i=0;i<obj.data.length;i++){
                //console.log(obj.data[i].id);
                inf += '<tr>'+
                    '<td>'+obj.data[i].id+'</td>'+
                    '<td>'+obj.data[i].product.productname+'</td>'+
                    '<td>'+obj.data[i].price+'</td>'+
                    '<td>'+obj.data[i].quantity+'</td>'+
                    '<td>'+obj.data[i].totalprice+'</td>'+
                    '<td>'+obj.data[i].saledate+'</td>'+
                    '<td>'+obj.data[i].user.userName+'</td>'+
                    '</tr>';
            }
            $("#showinf").html(inf1+inf+inf2);
            $("#idData tr:nth-child(even)").css("background-color","#94EF94");
            window.onload = goPage(1,6);
        })
    })
    //查看库存
    $("#showprodect").click(function () {
        $.post("myzxlsale",function (res) {
            var obj = $.dealJSONObj(res);
            //console.log(obj.data);
            var inf = '';
            //console.log(obj.data.length);
            var inf1 ='<div>'+
                '<span style="padding-right: 150px;">查看库存</span>'+
                '<span>商品名称：</span>'+
                '<select name="productnum" id="productnum">'+
                '<option value="0">--请选择商品--</option>';
            var inf2 = '</select>'+
                '<button onclick="showproductnum()">查询</button>'+
                '</div>'+
                '<div id="shownumdiv">'+
                /*'<h3>该商品的库存数量是：43</h3>'+*/
                '</div>';
            for (var i=0;i<obj.data.length;i++){
                //console.log(obj.data[i].id);
                //console.log(obj.data[i].productname);
                inf +=
                    '<option value="'+obj.data[i].id+'">'+obj.data[i].productname+'</option>';
            }
            $("#showinf").html(inf1+inf+inf2);
        })


    })
    //下一个方法

})
//分页
function goPage(pno,psize){
    var itable = document.getElementById("idData");
    var num = itable.rows.length;//表格所有行数(所有记录数)
    console.log(num);
    var totalPage = 0;//总页数
    var pageSize = psize;//每页显示行数
    //总共分几页
    if(num/pageSize > parseInt(num/pageSize)){
        totalPage=parseInt(num/pageSize)+1;
    }else{
        totalPage=parseInt(num/pageSize);
    }
    var currentPage = pno;//当前页数
    var startRow = (currentPage - 1) * pageSize+1;//开始显示的行  31
    var endRow = currentPage * pageSize;//结束显示的行   40
    endRow = (endRow > num)? num : endRow;    40
    console.log(endRow);
    //遍历显示数据实现分页
    for(var i=1;i<(num+1);i++){
        var irow = itable.rows[i-1];
        if(i>=startRow && i<=endRow){
            irow.style.display = "table-row";
        }else{
            irow.style.display = "none";
        }
    }
    var pageEnd = document.getElementById("pageEnd");
    var tempStr = "共"+num+"条记录&nbsp;&nbsp; 分"+totalPage+"页&nbsp;&nbsp; 当前第"+currentPage+"页&nbsp;&nbsp;";
    if(currentPage>1){
        tempStr += "<a href=\"#\" onClick=\"goPage("+(1)+","+psize+")\">首页&nbsp;&nbsp;</a>";
        tempStr += "<a href=\"#\" onClick=\"goPage("+(currentPage-1)+","+psize+")\"><上一页&nbsp;&nbsp;</a>"
    }else{
        tempStr += "首页&nbsp;&nbsp;";
        tempStr += "<上一页&nbsp;&nbsp;";
    }

    if(currentPage<totalPage){
        tempStr += "<a href=\"#\" onClick=\"goPage("+(currentPage+1)+","+psize+")\">下一页>&nbsp;&nbsp;</a>";
        tempStr += "<a href=\"#\" onClick=\"goPage("+(totalPage)+","+psize+")\">尾页&nbsp;&nbsp;</a>";
    }else{
        tempStr += "下一页>&nbsp;&nbsp;";
        tempStr += "尾页&nbsp;&nbsp;";
    }

    document.getElementById("barcon").innerHTML = tempStr;

}

//添加销售
function addsalebtn(){
    var proprice = $("#proprice").val();
    var pronum = $("#pronum").val();
    var productid = $("select[name='productid']").val();
    //console.log(proprice+pronum);
    //console.log(productid)
    if(productid=='0'){
        alert("请选择商品");
    }else if(!isRealNum(proprice)){
        alert("商品单价必须是数字");
    }else if(!isRealNum(pronum)){
        alert("商品数量必须是数字");
    }else{
        //alert("销售");

        var mydata = {
            price:proprice,
            quantity:pronum,
            productid:productid
        }
        //console.log(productid);
        $.post("relmyzxlsale",mydata,function (res) {
            alert(res);
            window.location.reload();
        })
    }
}
//判断是否是数字函数一
function isRealNum(val){
    // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除，
    if(val === "" || val ==null){
        return false;
    }
    if(!isNaN(val)){
        //对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,
        //所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )
        return true;
    }
    else{
        return false;
    }
}
//判断是否是数字函数二
function myIsNaN(value) {
    return typeof value === 'number' && !isNaN(value);
}
//销售信息排序
function changeshowsale() {
    var flag = $("select[name='flag']").val();
    $.post("myzxlshowsale",{flag:flag},function (res) {
        var obj = $.dealJSONObj(res);
        //console.log(obj.data);
        var inf = '';
        //console.log(obj.data.length);
        if(flag=='1'){
            var inf1 = '<div>'+
                '<span style="padding-right: 150px;">销售信息查询</span>'+
                '<span>排序方式</span>'+
                '<select name="flag">'+
                '<option value="0">销售日期</option>'+
                '<option value="1" selected="selected">单笔总价</option>'+
                '</select>'+
                '<button onclick="changeshowsale()">提交</button>'+
                '</div>'+
                '<table style="text-align: center;" border="1" width="480px;">'+
                '<tr style="background-color: #ADDBE7;">'+
                '<th>ID</th>'+
                '<th>商品</th>'+
                '<th>单价</th>'+
                '<th>数量</th>'+
                '<th>总价</th>'+
                '<th>销售日期</th>'+
                '<th>销售员</th>'+
                '</tr>'+
                '<tbody id="idData">';
        }else{
            var inf1 = '<div>'+
                '<span style="padding-right: 150px;">销售信息查询</span>'+
                '<span>排序方式</span>'+
                '<select name="flag">'+
                '<option value="0">销售日期</option>'+
                '<option value="1">单笔总价</option>'+
                '</select>'+
                '<button onclick="changeshowsale()">提交</button>'+
                '</div>'+
                '<table style="text-align: center;" border="1" width="480px;">'+
                '<tr style="background-color: #ADDBE7;">'+
                '<th>ID</th>'+
                '<th>商品</th>'+
                '<th>单价</th>'+
                '<th>数量</th>'+
                '<th>总价</th>'+
                '<th>销售日期</th>'+
                '<th>销售员</th>'+
                '</tr>'+
                '<tbody id="idData">';
            }
        var inf2 = '</tbody>'+
            '</table>'+
            '<table width="100%" align="right">'+
            '<tr><td><div id="barcon" name="barcon"></div></td></tr>'+
            '</table>';
        var trs = $("#tablebody");
        //console.log(trs.length);
        for (var i=0;i<obj.data.length;i++){
            //console.log(obj.data[i].id);
            inf += '<tr>'+
                '<td>'+obj.data[i].id+'</td>'+
                '<td>'+obj.data[i].product.productname+'</td>'+
                '<td>'+obj.data[i].price+'</td>'+
                '<td>'+obj.data[i].quantity+'</td>'+
                '<td>'+obj.data[i].totalprice+'</td>'+
                '<td>'+obj.data[i].saledate+'</td>'+
                '<td>'+obj.data[i].user.userName+'</td>'+
                '</tr>';
        }
        $("#showinf").html(inf1+inf+inf2);
        $("#idData tr:nth-child(even)").css("background-color","#94EF94");
        window.onload = goPage(1,6);
    })
}
//查看库存数量
function showproductnum() {
    var pro = $("#productnum").val();
    //console.log(pro);
    if(pro=="0"){
        alert("请选择商品");
    }else{
        var inf = '';
        $.post("selectProductNum",{id:pro},function (res) {
            var obj = $.dealJSONObj(res);
            //console.log(obj.data);
            inf = '<h3>该商品的库存数量是：'+obj.data.quantity+'</h3>';
            $("#shownumdiv").html(inf);
        })
        //$("#shownumdiv").html(inf);
    }

}
