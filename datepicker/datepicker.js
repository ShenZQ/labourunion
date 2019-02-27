; (function () {
    
    //预定义内部函数
    
    /**
     * @param  {number} offset 为正整数时，向后偏移，为负整数时，向前偏移
     * @returns {Date} 返回一个新的以当前Date对象为基准偏移天数的Date对象
     */
    Date.prototype.offsetDays = function (offset) {
        return new Date(this.getTime() + offset * 86400000);
    }

    /**
     * @param  {string|number} v 为number时，转换为string
     * @param  {number} l 转换后的长度
     * @returns {string} 返回一个用前导‘0’将v补齐到l长度的字符串
     */
    function pad(v, l) {
        if (!l) l = 2;
        v = String(v);
        while (v.length < l) v = '0' + v;
        return v;
    }

    //查找'[gallary="datepicker"]'的input，逐一生成对应的'canl-pane'，并绑定事件
    let today = new Date();
    let elInputs = document.querySelectorAll('input[gallary="datepicker"]');

    for(let i = 0; i < elInputs.length; i++){
        let elInput = elInputs[i];
        let elId = elInput.getAttribute('id');
        if(!elId){
            elId = 'picker'+ (Math.random()*256|0);
            elInput.setAttribute('id',elId);
        }
        elInput.setAttribute('placeholder', today.toLocaleDateString());
        //创建对应的canl-pane
        let elCanlPane = document.createElement('div');
        elCanlPane.setAttribute('id', 'date'+elId);
        elCanlPane.setAttribute('selectedDay', today.toLocaleDateString());
        elCanlPane.setAttribute('currentYear', today.getFullYear());
        elCanlPane.setAttribute('currentMonth', today.getMonth());
        elCanlPane.setAttribute('class','canl-pane');
        elCanlPane.innerHTML = '<div class="canl-header"><span class="prevYear">&lt;&lt;</span><span class="prevMonth">&lt;</span>' +
                             '<span class="year">2018年</span><span class="month">2月</span><span class="nextMonth">&gt;</span>' + 
                             '<span class="nextYear">&gt;&gt;</span></div><div class="canl-body"><div class="weekTitle"><div>日</div>' + 
                             '<div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div></div><div class="date"></div>';
        elInput.parentElement.appendChild(elCanlPane);
        elInput.onfocus = (e)=>{
            console.log(e.target.id);
            let elCanlPane = document.getElementById('date' + e.target.id);
            console.log(elCanlPane);
            elCanlPane.style.left = e.target.offsetLeft + 'px';
            elCanlPane.style.top = e.target.offsetTop + e.target.offsetHeight + 'px';
            elCanlPane.style.display = 'block';
            refreshCanlPane(elCanlPane);
        }

    }

    function dayClick(e){
        let selectedDay = new Date(e.target.getAttribute('value'));
        let elCanlPane = e.target.parentElement.parentElement.parentElement;
        elCanlPane.setAttribute('selectedDay', selectedDay.toLocaleDateString());
        elCanlPane.setAttribute('currentYear', selectedDay.getFullYear());
        elCanlPane.setAttribute('currentMonth', today.getMonth());

        let currentYear = selectedDay.getFullYear();
        let currentMonth = selectedDay.getMonth();
        refreshCanl();         
        document.getElementById('selectedDate').innerText = e.target.getAttribute('value');
    }

    function refreshCanlPane(el) {
        let selectedDay = new Date(el.getAttribute('selectedDay'));
        let currentYear = Number(el.getAttribute('currentYear'));
        let currentMonth = Number(el.getAttribute('currentMonth'));
        el.querySelector('.canl-header > span.year').innerText = currentYear + '年';
        el.querySelector('.canl-header > span.month').innerText = (currentMonth + 1) + '月';
        let date = el.querySelector('.canl-body > div.date');
        while (date.children.length > 0)
            date.removeChild(date.children[0]);
        let firstDate = new Date(currentYear, currentMonth, 1);
        let lastDate = new Date(currentYear, currentMonth + 1, 1).offsetDays(-1);
        let offset = firstDate.getDay() % 7;
        let startDate = firstDate.offsetDays(-offset);
        let totalDays = (lastDate - startDate) / 86400000 + 1;
        let rows = Math.ceil(totalDays / 7);
        let day = startDate;
        for (let i = 0; i < rows; i++) {
            let daterow = document.createElement('div');
            daterow.setAttribute('class', 'dateRow');
            for (let j = 0; j < 7; j++) {
                let dateel = document.createElement('div');
                dateel.setAttribute('value', day.toLocaleDateString());
                if(day.getMonth() !== currentMonth) dateel.setAttribute('class','otherMonth');
                if(day.getMonth() === today.getMonth() && day.getFullYear() === today.getFullYear() && day.getDate() === today.getDate()) dateel.setAttribute('class','today');
                if(day.getMonth() === selectedDay.getMonth() && day.getFullYear() === selectedDay.getFullYear() && day.getDate() === selectedDay.getDate()) dateel.setAttribute('class','selected');
                dateel.appendChild(document.createTextNode(pad(day.getDate())));
                
                dateel.onclick = dayClick;
                
                daterow.appendChild(dateel);
                day = day.offsetDays(1);
            }
            date.appendChild(daterow);
        }
    }

    document.querySelector('.canl-header > span.prevYear').onclick = () => {
        currentYear -= 1;
        refreshCanl();
    }

    document.querySelector('.canl-header > span.prevMonth').onclick = () => {
        currentMonth -= 1;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear -= 1;
        }
        refreshCanl();
    }

    document.querySelector('.canl-header > span.nextYear').onclick = () => {
        currentYear += 1;
        refreshCanl();
    }

    document.querySelector('.canl-header > span.nextMonth').onclick = () => {
        currentMonth += 1;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear += 1;
        }
        refreshCanl();
    }

    refreshCanl();
})(); 