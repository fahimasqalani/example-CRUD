import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';

import { ServicesService } from '@services/services.service';

@Component({
    selector: ".m-wrapper",
    templateUrl: "./charts.component.html",
    styleUrls: ['./charts.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ChartsComponent implements OnInit {

    hourlySalesData = {
        "data": [
            {
                "y": "2019-12-04 10",
                "Outlet A": 0,
                "Outlet B": 0,
                "Outlet C": 0,
                "Outlet D": 0
            },
            {
                "y": "2019-12-04 11",
                "Outlet A": 18,
                "Outlet B": 0,
                "Outlet C": 0,
                "Outlet D": 0
            },
            {
                "y": "2019-12-04 12",
                "Outlet A": 0,
                "Outlet B": 0,
                "Outlet C": 36.49,
                "Outlet D": 0
            },
            {
                "y": "2019-12-04 13",
                "Outlet A": 154.9,
                "Outlet B": 424.9,
                "Outlet C": 125.92,
                "Outlet D": 0
            },
            {
                "y": "2019-12-04 14",
                "Outlet A": 0,
                "Outlet B": 0,
                "Outlet C": 82.39,
                "Outlet D": 0
            },
            {
                "y": "2019-12-04 15",
                "Outlet A": 0,
                "Outlet B": 0,
                "Outlet C": 58.85,
                "Outlet D": 0
            },
            {
                "y": "2019-12-04 16",
                "Outlet A": 0,
                "Outlet B": 10.59,
                "Outlet C": 77.7,
                "Outlet D": 0
            },
            {
                "y": "2019-12-04 17",
                "Outlet A": 0,
                "Outlet B": 0,
                "Outlet C": 11.77,
                "Outlet D": 0
            },
            {
                "y": "2019-12-04 18",
                "Outlet A": 0,
                "Outlet B": 119.1,
                "Outlet C": 0,
                "Outlet D": 25.3
            }
        ],
        "labels": [
            "Outlet A",
            "Outlet B",
            "Outlet C",
            "Outlet D"
        ],
        "xkey": "y",
        "ykeys": [
            "Outlet A",
            "Outlet B",
            "Outlet C",
            "Outlet D"
        ]
    }

    chart: any;

    constructor(
        private _services: ServicesService) { }


    ngOnInit() {
        this.initHourlySalesChart();
    }

    initHourlySalesChart() {
        let data = [];
        let xAxis = [];
        for (let n of this.hourlySalesData.labels) {
            let obj = {
                name: n,
                data: []
            }
            data.push(obj)
        }

        for (let d of data) {
            for (let h of this.hourlySalesData.data) {
                d.data.push(h[d.name])

                let from = moment(h.y, ['YYYY-MM-DD H']).format('hA')
                let to = moment(from, ['hA']).add(1, 'hour').format('hA');
                xAxis.push(from + ' - ' + to)
            }
        }

        Highcharts.chart('hourly_sales_chart', {
            chart: {
                scrollablePlotArea: {
                    minWidth: 700
                },
                style: {
                    fontFamily: 'Poppins'
                }
            },
            credits: {
                enabled: true
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: xAxis,
                labels: {
                    style: {
                        fontSize: '15px'
                    }
                }
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    style: {
                        fontSize: '13px'
                    },
                    formatter: function () {
                        return '$' + Highcharts.numberFormat(this.value, 2);
                    }
                }
            },
            legend: {
                align: 'center',
                verticalAlign: 'bottom',
                borderWidth: 0,
                itemStyle: {
                    fontSize: '15px',
                    fontWeight: 'normal'
                }
            },
            tooltip: {
                shared: true,
                crosshairs: true,
                backgroundColor: 'white',
                headerFormat: `
                    <p style="font-size: 15px; font-weight: bold">{point.key}</p>
                `,
                pointFormat: `
                    <span style="color:{point.color}">\u25CF </span>{series.name}: 
                    <b>$ {point.y:,.2f}</b>
                    <br/>
                `,
                useHTML: true,
                style: {
                    fontFamily: 'Poppins',
                    fontSize: '15px'
                }
            },
            series: <Array<Highcharts.SeriesOptionsType>>data
        });
    }

}