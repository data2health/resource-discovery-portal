<template>
    <div>
        <canvas :id="name" :key="uniqueID" width="100" height="100"></canvas>
    </div>
    
</template>

<script>
import Chart from 'chart.js/auto';

// import Tabulator from 'tabulator-tables';


export default {
    name: "Chart",
    data: function() {
        return{
            uniqueID: Math.floor(Math.random()*90000) + 10000,
        }
    },
    props: ['data', 'type', 'name'],
    methods:{
        handleChartClick(item){
            console.log('clicking', item)
        },
        // makeTable(data, hideSecondCol){
        //     if(this.showDetails){
        //         new Tabulator("#"+this.type+'table', {
        //             height:300, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically
        //             data: data, 
        //             layout:"fitColumns",
        //             columns: [
        //                 {title:"API", field:"name", formatter:function(cell){
        //                     var value = cell.getValue();
        //                     cell.getElement().style.whiteSpace = "pre-wrap";
        //                     return "<b class='blue-text'>" + value + " <i class='material-icons tiny blue-text'>launch</i></b>";
        //                 }},
        //                 hideSecondCol ? {title:'', visible: false} : {title:this.name.replaceAll('_',' '), field:"label", formatter:"textarea"},
        //             ],
        //             rowClick:function(e, row){ 
        //                 var a = document.createElement("a");
        //                 a.href = "/registry?q="+row.getData().id 
        //                 a.target = '_blank'
        //                 a.click();
        //             },
        //         });
        //     }
        // },
        getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },
        getRandomColors(numberOfColors){
            let colors = []
            for (var i = 0; i < numberOfColors; i++){
                colors.push(this.getRandomColor())
            }
            return colors;
        },
        drawDoughnutChart(data){
            let self = this;
            var ctx = document.getElementById(this.name);

            new Chart(ctx, {
                'type': 'doughnut',
                'data': data,
                'options': {
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: self.name,
                            fontSize: '40'
                        }
                    },
                    onClick: function (e, item) {
                        if (item.length && Object.prototype.hasOwnProperty.call(item[0], '_view')) {
                            self.handleChartClick(item[0]._view.label, item[0]._view.backgroundColor)
                        }else{
                            self.showDetails = false
                        }
                    },
                }
            });
        },
        drawPieChart(data){
            let self = this;
            var ctx = document.getElementById(this.name);

            new Chart(ctx, {
                'type': 'pie',
                'data': data,
                'options': {
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: self.name,
                            fontSize: '40'
                        }
                    },
                    onClick: function (e, item) {
                        if (item.length && Object.prototype.hasOwnProperty.call(item[0], '_view')) {
                            self.handleChartClick(item[0]._view.label, item[0]._view.backgroundColor)
                        }else{
                            self.showDetails = false
                        }
                    },
                }
            });
        },
        drawHorBarChart(data){
            let self = this;
            var ctx = document.getElementById(this.name);

            new Chart(ctx, {
                'type': 'horizontalBar',
                'data': data,
                'options': {
                    'title': {
                        display: true,
                        text: self.name.replaceAll('_',' ')+ " ("+data.datasets[0].data.reduce((a, b) => a + b, 0)+")",
                        fontColor: 'black',
                        fontSize: '20'
                    },
                    legend: {
                        display: false,
                    },
                    'scales': {
                        yAxes: [{
                            ticks: {
                                precision:0
                            }
                        }],
                    },
                    onClick: function (e, item) {
                        if (item.length && Object.prototype.hasOwnProperty.call(item[0], '_view')) {
                            self.handleChartClick(item[0]._view.label, item[0]._view.backgroundColor)
                        }else{
                            self.showDetails = false
                        }
                    },
                }
            });
        },
        drawBarChart(data, includeTotal){
            let self = this;
            var ctx = document.getElementById(this.name);

            new Chart(ctx, {
                'type': 'bar',
                'data': data,
                'options': {
                    'title': {
                        display: true,
                        text: includeTotal ? self.name.replaceAll('_',' ')+ " ("+data.datasets[0].data.reduce((a, b) => a + b, 0)+")" : self.name.replaceAll('_',' '),
                        fontColor: 'black',
                        fontSize: '20'
                    },
                    legend: {
                        display: false,
                    },
                    'scales': {
                        yAxes: [{
                            ticks: {
                                precision:0
                            }
                        }],
                    },
                    onClick: function (e, item) {
                        if (item.length && Object.prototype.hasOwnProperty.call(item[0], '_view')) {
                            self.handleChartClick(item[0]._view.label, item[0]._view.backgroundColor)
                        }else{
                            self.showDetails = false
                        }
                    },
                }
            });
        },
        draw(type){
            if (!this.data) {
                this.data = {
                    labels: ['Dataset', 'Video', 'Repository', 'Article', 'Educational', 'Person'],
                    datasets: [
                        {
                        label: this.name,
                        data: [200, 300, 40, 377, 23, 1000],
                        backgroundColor: this.getRandomColors(6),
                        }
                    ]
                }
            }else{
                this.data.datasets[0].backgroundColor = this.getRandomColors(this.data.datasets[0].data.length);
            }
            switch (type) {
                case 'pie':
                    this.drawPieChart(this.data);
                    break;
                case 'doughnut':
                    this.drawDoughnutChart(this.data);
                    break;
                default:
                    break;
            }
        }
    },
    mounted: function(){
        this.draw(this.type);
    }

}
</script>