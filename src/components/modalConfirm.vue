<template>
    <div class="modal__wrapper">
        <div class="container">
            <div class="modal confirm">
                <div class="modal__overlay" @click="$emit('decline')"></div>
                <div class="modal__content">
                    <div class="modal__inner">
                        <p>Вы уверены?</p>
                    </div>
                    <div class="modal__actions">
                        <button class="modal__delete" @click="$emit('accept')">
                            Удалить
                        </button>
                        <button class="modal__decline" @click="$emit('decline')">
                            Отмена
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['contact'],
    data() {
        return {}
    }
}
</script>

<style lang="scss">
.modal__wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    .container {
        position: relative;
    }
}
.modal {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
.modal__overlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5));
    z-index: 99;
}
.modal__content {
    background: #fff;
    z-index: 101;
    position: relative;
    max-width: 70%;
    margin: 50px auto;
    padding: 20px;
    border-radius: 20px;
}
.modal__inner {
    min-height: 50px;
}
</style>