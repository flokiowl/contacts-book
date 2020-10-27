<template>
    <div class="container">
        <header class="contacts__header">
            <router-link to="/" class="contact__back">
				<img :src="backSVG" alt="Вернутся к списку контактов">
			</router-link>
            <button class="contact__accept" @click="createContact">
				<img :src="acceptSVG" alt="Добавить контакт">
			</button>
        </header>
		<main class="contacts__main">
            <form ref="form" class="contact__form">
                <div class="contact__form-image">
                    <label class="image-holder">
                        <input type="file" @change="onFileChange($event)">
                        <img :src="image" v-if="image" alt="">
                    </label>
                    <span v-if="errorText" class="note">{{errorText}}</span>
                </div>
                <label class="contact__label">
                    <span>Имя*</span>
                    <input v-model="name" type="text" placeholder="Введите имя">
                </label>
                <label class="contact__label">
                    <span>Роль</span>
                    <input v-model="role" type="text" placeholder="Укажите роль">
                </label>
                <label class="contact__label">
                    <span>Телефон*</span>
                    <input v-model="phone" type="text" placeholder="Введите телефон">
                </label>
            </form>
		</main>
    </div>
</template>

<script>
import backSVG from '@/assets/back.svg'
import acceptSVG from '@/assets/accept.svg'
export default {
    name: "AddContact",
    data() {
        return {
            backSVG, acceptSVG,
            id: null,
            image: null,
            name: '',
            role: '',
            phone: '',
            errorText: null
		};
    },
    methods: {
        createContact () {
            const contact = {
                id: Date.now(),
                image: this.image,
                name: this.name,
                role: this.role,
                phone: this.phone
            }
            this.$store.dispatch('createContact', contact)
                .then(() => this.$router.push('/'))
                .catch(() => {})
        },
        onFileChange (e) {
            var file  = e.target.files[0];
            let reader = new FileReader()
            console.log('file', file.size)
            if (file.size < 2100000 && (file.type === 'image/jpeg' || file.type === 'image/png')) {
                reader.onload = (e) => {
                    this.image = e.target.result
                }
                reader.readAsDataURL(file) 
                this.errorText = null
            } else {
                this.image = null
                this.errorText = 'Не больше 2мб, формат: jpg,png'
            }
             
        }
    }
};
</script>

<style lang="scss">
.contact__back {
	display: inline-block;
	padding: 15px 25px;
	margin: -15px -25px;
	img {
		max-width: 16px;
	}
}
.contact__accept {
	border: 0;
    padding: 15px 25px;
    margin: -15px -25px;
    border-radius: 50%;
    cursor: pointer;
	img {
		max-width: 16px;
	}
}
.contact__form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.contact__form-image {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 25px;
    height: 200px;
    width: 100%;
    .image-holder {
        display: block;
        width: 150px;
        height: 150px;
        background: #eee;
        border-radius: 50%;
        margin-bottom: 20px;
        overflow: hidden;
    }
    img {
        max-width: 100%;
        min-height: 100%;
    }
    input {
        opacity: 0;
        position: absolute;
    }
    .note {
        font-size: 14px;
        color: red;
    }
}
.contact__label {
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    span {
        display: inline-block;
        width: 30%;
        text-align: left;
        padding: 10px;
        border-bottom: 1px solid #eee;
    }
    input {
        flex-grow: 1;
        padding: 10px;
        border: 0;
        border-bottom: 1px solid #eee;
    }
}
</style>