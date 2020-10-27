<template>
    <div class="container">
        <header class="contacts__header">
            <router-link to="/" class="contact__back">
				<img :src="backSVG" alt="Вернутся к списку контактов">
			</router-link>
            <button class="contact__undo">
				<img :src="undoSVG" alt="Отменить последнее действие">
			</button>
        </header>
		<main class="contacts__main">
			<div class="contact__top">
				<div class="contact__image">
					<span class="image-holder">
						<img v-if="contact.image" :src="contact.image" alt="contact.name">
					</span>
				</div>
				<div class="contact__name">
					<span class="name">{{contact.name}}</span>
					<span class="role">{{contact.role}}</span>
				</div>
				<div class="contact__actions">
					<a :href="'tel:' + contact.phone" class="contact__btn tel">
						<img :src="phoneSVG" alt="Позвонить">
					</a>
					<button class="contact__btn edit">
						<img :src="editSVG" alt="Редактировать">
					</button>
					<button class="contact__btn remove" @click="showModal = true">
						<img :src="trashSVG" alt="Удалить">
					</button>
				</div>
			</div>
		</main>
		<modalConfirm 
			@accept="removeContact(contact)" 
			@decline="showModal = false" 
			v-if="showModal" 
		/>
    </div>
</template>

<script>
import backSVG from '@/assets/back.svg'
import undoSVG from '@/assets/undo.svg'
import phoneSVG from '@/assets/phone.svg'
import editSVG from '@/assets/edit.svg'
import trashSVG from '@/assets/trash.svg'
import modalConfirm from '@/components/modalConfirm'

export default {
	name: "ContactInfo",
	props: ['id'],
	components: {
		modalConfirm
	},
    data() {
        return {
			backSVG, undoSVG, phoneSVG, editSVG, trashSVG,
			showModal: false
		};
	},
	computed: {
		contact () {
            return this.$store.getters.contactById(this.id)
        }
	},
	methods: {
		removeContact(contact) {
			this.$store.dispatch('removeContact', contact)
			this.showModal = false
			this.$router.push('/')
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
.contact__undo {
	border: 0;
	img {
		max-width: 16px;
	}
}
.contact__top {
	height: 300px;
	width: 100%;
	padding: 15px 25px;
	margin: -15px -25px;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-bottom: 1px solid #eee;
}
.contact__image {
	flex-grow: 1;
	.image-holder {
		display: inline-block;
		height: 165px;
		width: 165px;
		background: #eee;
		border-radius: 50%;
		overflow: hidden;
		img {
			max-width: 100%;
			min-height: 100%;
		}
	}
}
.contact__name {
	display: flex;
    flex-direction: column;
    padding: 10px 0 15px 0;
	.name {
		font-size: 24px;
		margin-bottom: 5px;
	}
	.role {
		font-size: 14px;
    	color: #aaa;
	}
}
.contact__actions {
	min-width: 210px;
	width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.contact__btn {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 50px;
	height: 50px;
	border: 1px solid #eee;
	background: #eee;
	border-radius: 50%;
	cursor: pointer;
	img {
		max-width: 16px;
	}
}
</style>
