<template>
    <div class="container">
		<header class="contacts__header">
			<h1>Книга контактов</h1>
			<router-link to="/add">Добавить</router-link>
		</header>
		<main class="contacts__main">
			<div class="contacts__search">
				<input type="text" placeholder="Поиск по контактам...">
			</div>
			<ul class="contacts__list">
				<li class="contacts__item" v-for="contact in contacts" :key="contact.id">
					<router-link class="contacts__link" :to="'contact/' + contact.id">
						<div class="contacts__image">
							<img v-if="contact.image" :src="contact.image" :alt="contact.name">
						</div>
						<div class="contacts__name">
							<span class="name">{{contact.name}}</span>
							<span class="role">{{contact.role}}</span>
						</div>
					</router-link>
					<div class="contacts__action">
						<button @click="showModal = contact.id">
							<img :src="trashSVG" alt="Удалить контакт">
						</button>
					</div>	
					<modalConfirm 
						@accept="removeContact(contact)" 
						@decline="showModal = false" 
						v-if="showModal === contact.id" 
					/>
				</li>
			</ul>
		</main>
	</div>
</template>

<script>
import trashSVG from '@/assets/trash.svg'
import modalConfirm from '@/components/modalConfirm'
export default {
	name: "ContactList",
	components: { modalConfirm },
    data() {
        return {
			trashSVG,
			showModal: false
		};
	},
	computed: {
		contacts () {
            return this.$store.getters.contacts
		}
	},
	methods: {
		removeContact(contact) {
			this.$store.dispatch('removeContact', contact)
			this.showModal = false
		}
	}
};
</script>

<style lang="scss">
.contacts__header {
	display: flex;
	justify-content: space-between;
	background: #eee;
	padding: 15px 25px;
	h1 {
		font-size: 28px;
		margin: 0;
	}
	a {
		display: inline-flex;
		align-items: center;
		text-decoration: none;
		color: #000;
		cursor: pointer;
	}
}
.contacts__main {
	padding: 15px 25px;
}
.contacts__search {
	display: flex;
	input {
		flex-grow: 1;
		height: 35px;
		border-radius: 20px;
		padding: 0 25px;
		background: #f5f5f5;
		border: 1px solid #f5f5f5;
		&:focus {
			outline: none;
		}
	}
}
.contacts__list {
	margin-top: 20px;
	padding: 0;
}
.contacts__item {
	list-style: none;
	display: flex;
	align-items: stretch;
	border-bottom: 1px solid #eee;
}
.contacts__link {
	display: flex;
	flex-grow: 1;
	height: 100%;
	padding: 10px 0;
	color: #3b3b3b;
	text-decoration: none;
	text-align: left;
}
.contacts__image {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background: #eee;
	margin-right: 15px;
	overflow: hidden;
	img {
		max-width: 100%;
		min-height: 100%;
	}
}
.contacts__name {
	display: flex;
    flex-direction: column;
    justify-content: center;
	.name {
		display: inline-block;
		margin-bottom: 2px;
	}
	.role {
		font-size: 13px;
		color: #aaa;
	}
}
.contacts__action {
	width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
	img {
		max-width: 15px;
	}
}
</style>
