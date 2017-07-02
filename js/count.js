/*
根据经纬度计算距离
*/

function countDis(obj){
        var that = this;
        that.startLon = $(obj.startLon);   //起点经度框
        that.startLa = $(obj.startLa);   //起点纬度框
        that.endLon = $(obj.endLon);    //终点经度框
        that.endLa = $(obj.endLa);    //终点纬度框
        that.distance = $(obj.distance);   //计算结果框
        that.subM = $(obj.subM);    //提交框
        that.reset = $(obj.reset);    //重置框
        that.defau = $(obj.defau);    //设置默认值框
        that.init = function(){
            //为提交框绑定事件
            that.subM.on('click',that.count);

            //为重置框绑定事件
            that.reset.on('click',that.res);

            //为设置默认值框绑定事件
            that.defau.on('click',that.def);
        };

        //计算距离
        that.count = function (){
            var startLongi = rad(getVal(that.startLon));   //起点经度
            var startLagi = rad(getVal(that.startLa));    //起点纬度
            var endLongi = rad(getVal(that.endLon));   //终点经度
            var endLagi = rad(getVal(that.endLa));    //终点纬度
            var a = startLagi - endLagi;   //两点纬度之差
            var b = startLongi - endLongi;   //两点经度之差
            var distance = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2)+Math.cos(startLagi)*Math.cos(endLagi)*Math.pow(Math.sin(b/2),2))) * 6378.137;
            distance = Math.round(distance*10000)/10000; 
            that.distance.val(distance);
        };

        //重置事件
        that.res = function (){
            $(this).parent().find('input[type=text]').val('');
        }

       //设置默认经纬度
        that.def = function (){
            var arr1=[114,17,44];
            var arr2=[30,34,56];
            for (var i = 0; i < that.endLon.length; i++) {
                that.endLon.eq(i).val(arr1[i]);
            };
            for (var i = 0; i < that.endLa.length; i++) {
                that.endLa.eq(i).val(arr2[i]);
            };
        }


        //获得经纬度数值
        function getVal(m){
            var arr=[];
            for (var i = 0; i < m.length; i++) {
                arr.push(m.eq(i).val());
            };
            return swm.apply(null,arr);
        }

        //将度分秒转换成度
        function swm(a,b,c){
            var deg =a * 1 +( c*1 + b*60 )/3600 ;
            return deg;
        }

        //经纬度转换成三角函数中度分表形式
        function rad(d){
           return d * Math.PI / 180.0;
        }

        that.init();
    }