<template>
    <div class="start">
        <div class="start-item">
            <span v-for="itemClass in itemClasses" :class="itemClass"  v-bind:style="startType"></span>
        </div>
    </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';
export default {
    props: {
        score: {
            type: Number
        },
        starType: {
            type: Number
        }
    },
    data() {
        return {
            startType:{
                width: this.starType / 100 + 'rem',
                height: this.starType / 100 + 'rem'
            }
        }
    },
    computed: {
        itemClasses() {
            let result = [];
            let score = Math.floor(this.score * 2) / 2;
            let hasDecimal = score % 1 !== 0;
            let integer = Math.floor(score);
            for (let i = 0; i < integer; i++){
                result.push(CLS_ON);
            }
            if (hasDecimal) {
                result.push(CLS_HALF);
            }
            while (result.length < LENGTH) {
                result.push(CLS_OFF);
            }
            return result;
        }
    },
    methods: {
    }

}
</script>

<style lang="scss">
    .start{
        position: relative;
        width:100%;
        height: 100%;
        font-size:0;
        z-index: 9000;
        .start-item{
            width:100%;
            .on{
                display: inline-block;
                background: url(../../images/star48_on@3x.png) no-repeat;
                background-size:cover;
            }
            .half{
                display: inline-block;
                background: url(../../images/star48_half@3x.png) no-repeat;
                background-size:cover;
            }
            .off{
                display: inline-block;
                background: url(../../images/star48_off@3x.png) no-repeat;
                background-size:cover;
            }
        }
    }
</style>