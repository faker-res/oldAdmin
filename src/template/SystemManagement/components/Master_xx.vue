<template>
    <div>
        <Row class="expand-row">
            <h2 class="expand-key">权限: </h2>
            <span class="expand-value" style="font-size:14px">{{ row.Authorities.join(' , ') }}</span>
        </Row>
    </div>
</template>

<script>
export default {
    props: {
        row: Object
    }
};
</script>

<style>

</style>
