<template>
    <div style="width:100%;height:300px" class="visite_danliang"></div>
</template>

<script>
import echarts from 'echarts';
export default {
    name: '有效投注',
    data () {
        return {
            //
        };
    },
    mounted () {
        this.$nextTick(() => {
            let visiteVolume = echarts.init(
                document.getElementsByClassName('visite_danliang')[0]
            );
            let xAxisData = [];
            let data1 = [];
            let data2 = [];
            for (let i = 0; i < 20; i++) {
                xAxisData.push('类目' + i);
                data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
                data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
            }

            const option = {
                title: {
                    text: '有效投注',
                    subtext: '',
                    sublink: ''
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: ['01/18', '01/19', '01/20', '01/21', '01/22', '01/23', '01/24'],
                    nameTextStyle: {
                        color: '#c3c3c3'
                    }
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                series: [
                    {
                        name: '金额',
                        type: 'bar',
                        barWidth: '60%',
                        data: [
                            {
                                value: 453682,
                                name: 'Mon',
                                itemStyle: { normal: { color: '#dc3912' } }
                            },
                            {
                                value: 879545,
                                name: 'Tues',
                                itemStyle: { normal: { color: '#dc3912' } }
                            },
                            {
                                value: 2354678,
                                name: 'Wed',
                                itemStyle: { normal: { color: '#dc3912' } }
                            },
                            {
                                value: 1598403,
                                name: 'Thur',
                                itemStyle: { normal: { color: '#dc3912' } }
                            },
                            {
                                value: 543250,
                                name: 'Fri',
                                itemStyle: { normal: { color: '#dc3912' } }
                            },
                            {
                                value: 1305923,
                                name: 'Sat',
                                itemStyle: { normal: { color: '#dc3912' } }
                            },
                            {
                                value: 1103456,
                                name: 'Sun',
                                itemStyle: { normal: { color: '#dc3912' } }
                            }
                        ]
                    }
                ]
            };

            visiteVolume.setOption(option);

            window.addEventListener('resize', function () {
                visiteVolume.resize();
            });
        });
    }
};
</script>
<style scoped>
#visite_volume_con {
}
</style>
